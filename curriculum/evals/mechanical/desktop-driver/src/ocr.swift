// usage: ocr <png> <originX> <originY> <pointsWide>
// Prints one line per recognised text: "<screenX>\t<screenY>\t<text>" (centre, screen points).
// The png is a screencapture -R of a region at (originX, originY), pointsWide points wide.
import Foundation
import Vision
import AppKit

let a = CommandLine.arguments
guard a.count == 5, let img = NSImage(contentsOfFile: a[1]),
      let ox = Double(a[2]), let oy = Double(a[3]), let pw = Double(a[4]),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
  FileHandle.standardError.write("usage: ocr png originX originY pointsWide\n".data(using: .utf8)!); exit(2)
}
let scale = Double(cg.width) / pw
let ph = Double(cg.height) / scale
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false
try VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
for o in req.results ?? [] {
  guard let t = o.topCandidates(1).first else { continue }
  let b = o.boundingBox  // normalised, origin bottom-left
  let x = ox + (b.midX * pw), y = oy + ((1 - b.midY) * ph)
  print(String(format: "%.0f\t%.0f\t%@", x, y, t.string))
}
