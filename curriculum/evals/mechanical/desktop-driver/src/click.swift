// usage: click <x> <y> [glideMs]   (screen points; glides the cursor there, then left-clicks)
import CoreGraphics
import Foundation

let a = CommandLine.arguments
guard a.count >= 3, let x = Double(a[1]), let y = Double(a[2]) else {
  FileHandle.standardError.write("usage: click x y [glideMs]\n".data(using: .utf8)!); exit(2)
}
let glide = a.count > 3 ? (Double(a[3]) ?? 0) : 0
let src = CGEventSource(stateID: .hidSystemState)
let start = CGEvent(source: nil)?.location ?? CGPoint(x: x, y: y)
let target = CGPoint(x: x, y: y)
let steps = max(1, Int(glide / 10))
for i in 1...steps {  // eased glide so the viewer can follow the pointer
  let t = Double(i) / Double(steps), e = t * t * (3 - 2 * t)
  let p = CGPoint(x: start.x + (target.x - start.x) * e, y: start.y + (target.y - start.y) * e)
  CGEvent(mouseEventSource: src, mouseType: .mouseMoved, mouseCursorPosition: p, mouseButton: .left)?.post(tap: .cghidEventTap)
  if glide > 0 { usleep(10_000) }
}
usleep(120_000)
CGEvent(mouseEventSource: src, mouseType: .leftMouseDown, mouseCursorPosition: target, mouseButton: .left)?.post(tap: .cghidEventTap)
usleep(60_000)
CGEvent(mouseEventSource: src, mouseType: .leftMouseUp, mouseCursorPosition: target, mouseButton: .left)?.post(tap: .cghidEventTap)
