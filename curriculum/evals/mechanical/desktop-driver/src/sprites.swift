// sprites <dir>: draw the cursor and press-ring PNGs the recordings are annotated with (retina size, 2x).
// cursor.png: the classic arrow, black with a white edge, tip at (4,4). ring.png: a dark ring, 72 px across.
import AppKit
let dir = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "."
func png(_ w: Int, _ h: Int, _ name: String, _ draw: (CGContext) -> Void) {
  let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(),
                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.translateBy(x: 0, y: CGFloat(h)); ctx.scaleBy(x: 1, y: -1)   // top-left origin, like the video
  draw(ctx)
  let rep = NSBitmapImageRep(cgImage: ctx.makeImage()!)
  try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(dir)/\(name)"))
}
png(40, 56, "cursor.png") { c in
  let pts: [(CGFloat, CGFloat)] = [(4,4),(4,44),(13,35),(19,50),(25,48),(19,33),(32,33)]
  let path = CGMutablePath(); path.move(to: CGPoint(x: pts[0].0, y: pts[0].1))
  for p in pts.dropFirst() { path.addLine(to: CGPoint(x: p.0, y: p.1)) }; path.closeSubpath()
  c.addPath(path); c.setFillColor(NSColor.black.cgColor); c.setStrokeColor(NSColor.white.cgColor); c.setLineWidth(3.0)
  c.setLineJoin(.round); c.drawPath(using: .fillStroke)
}
png(80, 80, "ring.png") { c in
  c.setStrokeColor(NSColor(white: 0.1, alpha: 0.9).cgColor); c.setLineWidth(4); c.strokeEllipse(in: CGRect(x: 4, y: 4, width: 72, height: 72))
}
print("wrote \(dir)/cursor.png \(dir)/ring.png")
