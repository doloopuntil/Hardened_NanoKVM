# NanoKVM Native Runtime Assets

This directory contains the native NanoKVM runtime pieces used by the Rust
backend.

- `dl_lib/` is packaged to the device as `/kvmapp/server/dl_lib`.
- `include/` contains the C ABI header used by the Rust FFI bindings.

The corresponding native sources are under `support/sg2002/additional/kvm`,
`kvm_mmf`, `vision`, and `peripheral`. The Rust FFI mutex serializes calls made
by Rust, but native capture/detection threads still have their own lifecycle.
Known native lifecycle, VENC, bounds, and hardware-error findings are tracked in
[`docs/native-code-audit.md`](../../docs/native-code-audit.md).

The Rust server is the only supported backend for these runtime assets.

## libkvm.so: removed video NEEDED entry

`dl_lib/libkvm.so` originally declared `DT_NEEDED` on
`libopencv_video.so.409`, which in this build's OpenCV pulls in a chain
(`video`→`dnn`+`calib3d`; `calib3d`→`features2d`+`flann`; `dnn`→`protobuf`)
of 6 additional non-redistributable vendor libraries. Verified via
`readelf --dyn-syms` that `libkvm.so` calls nothing from any of them: its
184 undefined function symbols were checked against video's exports
directly (zero overlap) and against the full export set unique to
video/dnn/calib3d/features2d/flann as a group, not also provided by
core/imgproc/imgcodecs/highgui (still zero overlap, 978 candidate symbols
checked). This points to the dependency being a MaixCDK build-convention
artifact (linking a common library set), not a real call path.

Patched with `patchelf --remove-needed libopencv_video.so.409 dl_lib/libkvm.so`.
This only edits the ELF dynamic section (verified: file size and the full
184-symbol undefined-symbol set are unchanged) -- no code is modified.
`libkvm.so` now needs only `core`/`highgui`/`imgcodecs`/`imgproc` from
OpenCV, matching the exact 4 modules `sipeed/NanoKVM` (the GPL-3.0
upstream) ships in its own `server/dl_lib/`, rather than the 9 this fork's
vendor-runtime staging previously carried. `libkvm_mmf.so` never needed
any OpenCV module.

Not yet verified on real hardware -- this is static analysis (symbol-table
comparison), not a device boot/video test. If HDMI capture or any vision
feature breaks after this change, this is the first thing to revert.
