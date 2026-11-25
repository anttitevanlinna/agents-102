// nocursor <seconds>: hide the system cursor for that long, then show it again. Takes draw their own cursor from the click
// log; the recorder draws the system cursor late, doubling the drawn one. Uses the window server property
// "SetsCursorInBackground" (private) so a background process may hide it. The cursor returns when this process exits.
import CoreGraphics
import Foundation
typealias CGSConnectionID = UInt32
@_silgen_name("_CGSDefaultConnection") func _CGSDefaultConnection() -> CGSConnectionID
@_silgen_name("CGSSetConnectionProperty") func CGSSetConnectionProperty(_ c: CGSConnectionID, _ t: CGSConnectionID, _ k: CFString, _ v: CFTypeRef) -> Int32
let secs = Double(CommandLine.arguments.dropFirst().first ?? "5") ?? 5
let cid = _CGSDefaultConnection()
_ = CGSSetConnectionProperty(cid, cid, "SetsCursorInBackground" as CFString, kCFBooleanTrue)
let end = Date().addingTimeInterval(secs)
while Date() < end { CGDisplayHideCursor(CGMainDisplayID()); usleep(200_000) }   // re-assert: apps re-show it on hover
CGDisplayShowCursor(CGMainDisplayID())
