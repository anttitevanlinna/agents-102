// redact: blur every piece of on-screen text that is not on an allowlist, then crop, scale, encode.
//
// usage: redact <in.mov> <out.mp4> <allow.txt> [--crop x,y,w,h] [--width 1280] [--fps 30]
//               [--trim seconds] [--pad 14] [--spread 30] [--sigma 28] [--blur x,y,w,h[@from-to]]... [--report-only]
//
// Fail-safe by design: text OCR cannot match to the allowlist (unknown names, misreads) is blurred.
// Pass 1 OCRs every output frame; pass 2 blurs each frame with the tracks lit at that frame (see shaping),
// so text that slides (dialogs opening/closing) stays covered.
// --report-only: OCR the input and print disallowed text per frame, write nothing (use it on the OUTPUT
// to verify: blurred text does not OCR, so a clean output prints nothing).
// Coordinates are input-video pixels, origin top-left. Allowlist: one entry per line, matched against a
// normalised line (case-folded, leading icon glyphs and trailing chevrons stripped); "re:" prefix = regex;
// "#" = comment.
import AVFoundation
import CoreImage
import Foundation
import Vision

func fail(_ s: String) -> Never { FileHandle.standardError.write((s + "\n").data(using: .utf8)!); exit(1) }

var args = Array(CommandLine.arguments.dropFirst())
guard args.count >= 3 else { fail("usage: redact in.mov out.mp4 allow.txt [--crop x,y,w,h] [--width N] [--fps N] [--trim S] [--pad N] [--spread N] [--report-only]") }
let inURL = URL(fileURLWithPath: args[0]), outURL = URL(fileURLWithPath: args[1]), allowPath = args[2]
var crop: CGRect? = nil, outW = 1280, fps = 30.0, trim: Double? = nil, pad: CGFloat = 14, spread = 30, reportOnly = false, sigma = 28.0
var fixed: [(CGRect, Double, Double)] = []   // --blur x,y,w,h[@from-to] (input px, top-left; seconds): blurred regardless of OCR, for private pixels OCR cannot read (thumbnails)
var i = 3
while i < args.count {
  switch args[i] {
  case "--crop": let p = args[i+1].split(separator: ",").compactMap { Double($0) }; crop = CGRect(x: p[0], y: p[1], width: p[2], height: p[3]); i += 2
  case "--width": outW = Int(args[i+1])!; i += 2
  case "--fps": fps = Double(args[i+1])!; i += 2
  case "--trim": trim = Double(args[i+1])!; i += 2
  case "--pad": pad = CGFloat(Double(args[i+1])!); i += 2
  case "--spread": spread = Int(args[i+1])!; i += 2
  case "--blur":
    let parts = args[i+1].split(separator: "@"); let p = parts[0].split(separator: ",").compactMap { Double($0) }
    var a = 0.0, b = Double.infinity
    if parts.count > 1 { let w = parts[1].split(separator: "-").compactMap { Double($0) }; a = w[0]; b = w[1] }
    fixed.append((CGRect(x: p[0], y: p[1], width: p[2], height: p[3]), a, b)); i += 2
  case "--sigma": sigma = Double(args[i+1])!; i += 2
  case "--report-only": reportOnly = true; i += 1
  default: fail("unknown option \(args[i])")
  }
}

// ---- allowlist
let allowLines = (try? String(contentsOfFile: allowPath, encoding: .utf8))?.split(separator: "\n").map(String.init) ?? []
var exact = Set<String>(), regexes: [NSRegularExpression] = []
for l in allowLines {
  let t = l.trimmingCharacters(in: .whitespaces)
  if t.isEmpty || t.hasPrefix("#") { continue }
  if t.hasPrefix("re:") { regexes.append(try! NSRegularExpression(pattern: String(t.dropFirst(3)), options: [.caseInsensitive])) }
  else { exact.insert(t.lowercased()) }
}
func normalise(_ s: String) -> String {
  var t = s.trimmingCharacters(in: .whitespaces)
  // leading icon glyphs OCR as stray symbols or a single letter + space ("D Documents", "• Recents")
  while let f = t.first, !(f.isLetter || f.isNumber || f == "~" || f == "/") { t.removeFirst(); t = t.trimmingCharacters(in: .whitespaces) }
  // trailing chevrons / cursor bars
  for suf in [" v", " ~", " |", "|", " >", " ›", " •"] where t.hasSuffix(suf) { t = String(t.dropLast(suf.count)) }
  return t.lowercased().trimmingCharacters(in: .whitespaces)
}
func lev(_ a: String, _ b: String) -> Int {
  let a = Array(a), b = Array(b); if a.isEmpty { return b.count }; if b.isEmpty { return a.count }
  var row = Array(0...b.count)
  for i in 1...a.count { var prev = row[0]; row[0] = i
    for j in 1...b.count { let cur = row[j]; row[j] = min(row[j] + 1, row[j-1] + 1, prev + (a[i-1] == b[j-1] ? 0 : 1)); prev = cur } }
  return row[b.count]
}
// report mode only: a half-blurred or cursor-tailed UI label is not a leak
func nearAllowed(_ raw: String) -> Bool {
  let t = normalise(raw)
  if t.count < 3 { return true }
  return exact.contains { e in lev(t, e) <= 2 || (t.count >= 4 && e.hasPrefix(t)) }
}
func allowed(_ raw: String) -> Bool {
  let t = normalise(raw)
  if t.isEmpty { return true }
  if exact.contains(t) { return true }
  // tolerate one leading icon letter: "d documents" -> "documents"
  if let sp = t.firstIndex(of: " "), t.distance(from: t.startIndex, to: sp) <= 2, exact.contains(String(t[t.index(after: sp)...])) { return true }
  let r = NSRange(t.startIndex..., in: t)
  if regexes.contains(where: { $0.firstMatch(in: t, range: r) != nil }) { return true }
  // OCR noise around a known label can never be a private name, so it stays sharp:
  // a chevron or cursor glued to the end ("agents-101v"), a label cut off by the frame or a
  // dialog edge ("Previous 7"), or a one-letter misread ("Openl", "New Fplder").
  if let last = t.last, "vil|~.".contains(last), t.count > 3, allowed(String(t.dropLast())) { return true }
  // labels fading in or out misread worse: 2 letters of slack on long labels, 1 on short ones
  if t.count >= 4 && exact.contains(where: { $0.hasPrefix(t) || lev(t, $0) <= ($0.count >= 8 ? 2 : 1) }) { return true }
  return false
}

// ---- frame reading
let asset = AVURLAsset(url: inURL)
let track = asset.tracks(withMediaType: .video).first ?? { fail("no video track") }()
let natural = track.naturalSize
let srcW = natural.width, srcH = natural.height
let duration = min(CMTimeGetSeconds(asset.duration), trim ?? .infinity)

func eachFrame(_ body: (Int, Double, CVPixelBuffer) -> Void) {
  let reader = try! AVAssetReader(asset: asset)
  reader.timeRange = CMTimeRange(start: .zero, duration: CMTime(seconds: duration, preferredTimescale: 600))
  let out = AVAssetReaderTrackOutput(track: track, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
  out.alwaysCopiesSampleData = false
  reader.add(out); reader.startReading()
  var next = 0.0, idx = 0
  while let sb = out.copyNextSampleBuffer() {
    let t = CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(sb))
    guard t + 1e-6 >= next, let pb = CMSampleBufferGetImageBuffer(sb) else { continue }
    body(idx, t, pb); idx += 1; next += 1.0 / fps
  }
}

// ---- pass 1: OCR, collect disallowed boxes (CI coordinates: origin bottom-left, pixels)
var boxes: [[CGRect]] = []
var times: [Double] = []
eachFrame { idx, t, pb in
  let req = VNRecognizeTextRequest(); req.recognitionLevel = .accurate; req.usesLanguageCorrection = false
  try? VNImageRequestHandler(cvPixelBuffer: pb, options: [:]).perform([req])
  var bs: [CGRect] = []
  for o in req.results ?? [] {
    guard let s = o.topCandidates(1).first?.string, !allowed(s) else { continue }
    if reportOnly && nearAllowed(s) { continue }
    let b = o.boundingBox
    let r = CGRect(x: b.minX * srcW, y: b.minY * srcH, width: b.width * srcW, height: b.height * srcH).insetBy(dx: -pad, dy: -pad)
    bs.append(r)
    if reportOnly { print(String(format: "%.2f\t%@", t, s)) }
  }
  boxes.append(bs); times.append(t)
}
if reportOnly { exit(0) }
FileHandle.standardError.write("pass 1: \(boxes.count) frames, \(boxes.reduce(0) { $0 + $1.count }) boxes\n".data(using: .utf8)!)

// ---- shaping: local in space, steady in time.
// Time: every box is snapped to a coarse grid and becomes a track keyed by its snapped rect. A track is on from
// `lead` frames before its first sighting to `tail` frames after its last, bridging OCR dropouts up to `gap`
// frames. So a still label is one still patch for as long as it is on screen, and a new scene (a dialog
// opening) brings its own tracks instead of inheriting the last second's boxes.
// Space: tracks lit in the same frame merge only when stacked in one column (a list becomes one block);
// nothing chains sideways across columns.
let grid: CGFloat = 32, lead = 2, tail = 2, gap = 10
let feather: CGFloat = 24   // mask edge softness, px
func snap(_ r: CGRect) -> CGRect {
  let x0 = (r.minX / grid).rounded(.down) * grid, y0 = (r.minY / grid).rounded(.down) * grid
  let x1 = (r.maxX / grid).rounded(.up) * grid, y1 = (r.maxY / grid).rounded(.up) * grid
  return CGRect(x: x0, y: y0, width: x1 - x0, height: y1 - y0)
}
var trackRect: [String: CGRect] = [:], sightings: [String: [Int]] = [:]
for (f, bs) in boxes.enumerated() {
  for b in bs { let r = snap(b); let k = "\(r.minX),\(r.minY),\(r.width),\(r.height)"; trackRect[k] = r
    if sightings[k]?.last != f { sightings[k, default: []].append(f) } }
}
var lit = Array(repeating: [CGRect](), count: boxes.count)
for (k, fs) in sightings {
  var start = fs[0], prev = fs[0]
  func light(_ a: Int, _ b: Int) { for f in max(0, a - lead)...min(boxes.count - 1, b + tail) { lit[f].append(trackRect[k]!) } }
  for f in fs.dropFirst() { if f - prev > gap { light(start, prev); start = f }; prev = f }
  light(start, prev)
}
func sameColumn(_ a: CGRect, _ b: CGRect) -> Bool {
  let overlap = min(a.maxX, b.maxX) - max(a.minX, b.minX)
  let vgap = max(a.minY, b.minY) - min(a.maxY, b.maxY)
  return overlap >= 0.3 * min(a.width, b.width) && vgap <= 24
}
func merge(_ rs: [CGRect]) -> [CGRect] {
  var seen = Set<String>(), out: [CGRect] = []
  for r in rs where seen.insert("\(r.minX),\(r.minY),\(r.width),\(r.height)").inserted { out.append(r) }
  var changed = true
  while changed {
    changed = false
    outer: for a in 0..<out.count { for b in (a + 1)..<max(a + 1, out.count) where out[a].intersects(out[b]) || sameColumn(out[a], out[b]) {
      out[a] = out[a].union(out[b]); out.remove(at: b); changed = true; break outer } }
  }
  return out
}

// ---- pass 2: blur, crop, scale, encode
let cropCI: CGRect = {  // top-left input rect -> CI bottom-left rect
  guard let c = crop else { return CGRect(x: 0, y: 0, width: srcW, height: srcH) }
  return CGRect(x: c.minX, y: srcH - c.maxY, width: c.width, height: c.height)
}()
let scale = CGFloat(outW) / cropCI.width
let outH = Int((cropCI.height * scale / 2).rounded()) * 2
try? FileManager.default.removeItem(at: outURL)
let writer = try! AVAssetWriter(outputURL: outURL, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: outW, AVVideoHeightKey: outH,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 2_500_000]])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA, kCVPixelBufferWidthKey as String: outW, kCVPixelBufferHeightKey as String: outH])
writer.add(input); writer.startWriting(); writer.startSession(atSourceTime: .zero)
let ctx = CIContext()
var prevShape = "", shapeChanges = 0
eachFrame { idx, t, pb in
  var img = CIImage(cvPixelBuffer: pb)
  let shaped = merge(lit[min(idx, lit.count - 1)])
  let shape = shaped.map { "\($0)" }.sorted().joined(separator: ";")
  if shape != prevShape { shapeChanges += 1; prevShape = shape }
  let rects = shaped + fixed.filter { t >= $0.1 && t < $0.2 }.map { CGRect(x: $0.0.minX, y: srcH - $0.0.maxY, width: $0.0.width, height: $0.0.height) }
  if !rects.isEmpty {
    let blurred = img.clampedToExtent().applyingGaussianBlur(sigma: sigma).cropped(to: img.extent)
    var mask = CIImage(color: .black).cropped(to: img.extent)
    for r in rects { mask = CIImage(color: .white).cropped(to: r.insetBy(dx: -feather / 2, dy: -feather / 2)).composited(over: mask) }
    mask = mask.clampedToExtent().applyingGaussianBlur(sigma: Double(feather) / 2).cropped(to: img.extent)
    img = blurred.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: img, kCIInputMaskImageKey: mask])
  }
  img = img.cropped(to: cropCI).transformed(by: CGAffineTransform(translationX: -cropCI.minX, y: -cropCI.minY).concatenating(CGAffineTransform(scaleX: scale, y: scale)))
  var out: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &out)
  ctx.render(img, to: out!)
  while !input.isReadyForMoreMediaData { usleep(2000) }
  adaptor.append(out!, withPresentationTime: CMTime(seconds: Double(idx) / fps, preferredTimescale: 600))
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
if writer.status != .completed { fail("write failed: \(String(describing: writer.error))") }
FileHandle.standardError.write("wrote \(outURL.path) \(outW)x\(outH); blur shape changed on \(shapeChanges) of \(boxes.count) frames\n".data(using: .utf8)!)
