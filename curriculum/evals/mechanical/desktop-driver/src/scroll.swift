// usage: scroll <x> <y> <lines>   (positive = up/towards top)
import CoreGraphics
import Foundation
let a = CommandLine.arguments
guard a.count == 4, let x = Double(a[1]), let y = Double(a[2]), let n = Int32(a[3]) else { exit(2) }
let p = CGPoint(x: x, y: y)
CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: p, mouseButton: .left)?.post(tap: .cghidEventTap)
if let path = ProcessInfo.processInfo.environment["CLICK_LOG"], let h = FileHandle(forWritingAtPath: path) {   // a park move
  h.seekToEndOfFile(); h.write(String(format: "%.3f\t%.1f\t%.1f\tmove\n", Date().timeIntervalSince1970, x, y).data(using: .utf8)!); h.closeFile()
}
usleep(80_000)
CGEvent(scrollWheelEvent2Source: nil, units: .line, wheelCount: 1, wheel1: n, wheel2: 0, wheel3: 0)?.post(tap: .cghidEventTap)
