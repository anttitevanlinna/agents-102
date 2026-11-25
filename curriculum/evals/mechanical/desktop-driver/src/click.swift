// usage: click <x> <y> [glideMs] [move]   (screen points; glides the cursor there, then left-clicks; `move` = glide only)
// CLICK_LOG=<file>: append "epoch<TAB>x<TAB>y<TAB>move|down|up" per event, so the recording's cursor and press rings can
// be drawn afterwards (the screen recorder draws the cursor unreliably for posted events).
import CoreGraphics
import Foundation
let logPath = ProcessInfo.processInfo.environment["CLICK_LOG"]
func log(_ p: CGPoint, _ kind: String) {
  guard let path = logPath, let h = FileHandle(forWritingAtPath: path) ?? { FileManager.default.createFile(atPath: path, contents: nil); return FileHandle(forWritingAtPath: path) }() else { return }
  h.seekToEndOfFile(); h.write(String(format: "%.3f\t%.1f\t%.1f\t%@\n", Date().timeIntervalSince1970, p.x, p.y, kind).data(using: .utf8)!); h.closeFile()
}

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
  log(p, "move")
  if glide > 0 { usleep(10_000) }
}
if a.count > 4 && a[4] == "move" { exit(0) }
usleep(120_000)
CGEvent(mouseEventSource: src, mouseType: .leftMouseDown, mouseCursorPosition: target, mouseButton: .left)?.post(tap: .cghidEventTap)
log(target, "down")
usleep(60_000)
CGEvent(mouseEventSource: src, mouseType: .leftMouseUp, mouseCursorPosition: target, mouseButton: .left)?.post(tap: .cghidEventTap)
log(target, "up")
