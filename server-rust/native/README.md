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
