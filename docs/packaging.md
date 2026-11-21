# Ship a port as a package

Once a port passes `gate`, `rust-anything package <crate>` lays it out the way end users install
Rust extensions: maturin wheels for Python, napi-rs's per-platform npm packages for Node, one npm
package for wasm. It writes files only. It builds nothing for other platforms (the generated
GitHub Actions workflow does that) and never publishes. Back to the [README](../README.md).

```sh
rust-anything package rust/fuzzy-rs                     # writes rust/fuzzy-rs/package/
rust-anything package rust/fuzzy-rs --dry-run           # lists the files instead
rust-anything package rust/textkit-rs --name textkit-fast --version 2.0.0 --out dist/textkit
```

| Flag | Default |
| --- | --- |
| `--name` | the crate name (`fuzzy-rs`): one ported unit is not the whole original package |
| `--version` | the original package's: the nearest `package.json`, or `pyproject.toml` (`setup.cfg`, `__version__`) |
| `--out` | `<crate>/package` |
| `--fallback` | napi only: the module loaded where no binary fits |
| `--dry-run` | write nothing, list the files |

The output folder holds `rust-anything-package.json`, the list of files the last run wrote; a
rerun replaces those and leaves anything else you added. A non-empty folder without it is
refused.

## Python (PyO3)

A self-contained maturin project: `pyproject.toml`, a copy of the crate (`Cargo.toml` with an
empty `[workspace]`, `Cargo.lock`, `build.rs`, `src/`) and the wrapper package, renamed to the
original's module. The port of `src/textkit/` installs as `import textkit`; a single module such
as `src/textkit/words.py` installs as `textkit.words`. The bridge already builds against PyO3's
`abi3-py39`, so one wheel per platform covers every CPython from 3.9 on.

```sh
pip install rust/textkit-rs/package                       # builds with maturin from PyPI
cd rust/textkit-rs/package && maturin build --release     # or a wheel in target/wheels
```

`.github/workflows/<name>-wheels.yml` builds wheels with `PyO3/maturin-action` for macOS
(arm64, x86_64), Linux (manylinux x86_64, aarch64) and Windows x86_64, plus an sdist, installs and
imports the wheel where the runner can run it, and uploads everything as artifacts.

## Node (napi-rs)

The napi-rs layout:

```
package/
  package.json        main package: optionalDependencies on every <name>-<platform>
  index.cjs           the Rust port for this platform, or the fallback
  native.cjs          picks the binary: ./npm/<key>/ (a local build), then <name>-<key>
  binding.cjs         the crate's index.cjs (codecs, error classes) over that binary
  fallback/           the original, when it is one plain JS file that imports nothing
  npm/<key>/          one package per platform, each holding <lib>.<key>.node
```

Keys are napi-rs's: `darwin-arm64`, `darwin-x64`, `linux-x64-gnu`, `linux-arm64-gnu`,
`win32-x64-msvc`. npm installs only the platform package whose `os`, `cpu` and `libc` match. Where
none does (musl, FreeBSD, 32-bit), `index.cjs` loads the fallback: the original file copied in,
or the module given with `--fallback` (for example the original npm package). A TypeScript
original is not copied, since Node does not strip types under `node_modules`; pass built JS with
`--fallback`. Without a fallback the package throws, naming the platform and the builds it has.
`RUST_ANYTHING_MODE=old` loads the fallback on any platform.

When the crate was built (`rust-anything build`), this machine's binary is copied into its
platform folder, so the package can be tried before CI runs:

```sh
npm pack rust/fuzzy-rs/package/npm/darwin-arm64 && npm pack rust/fuzzy-rs/package
npm install ./fuzzy-rs-darwin-arm64-0.1.0.tgz ./fuzzy-rs-0.1.0.tgz
```

`.github/workflows/<name>-npm.yml` builds every platform with cargo (macOS x86_64 is
cross-compiled on the arm64 runner; Linux is built on Ubuntu 22.04, so it needs glibc 2.35 or
newer), checks that the binary loads where the runner can load it, and packs every package into
the `npm-tarballs` artifact. Publish the platform packages before the main one, and only under
names you own: until `<name>-<key>` exists on npm, anyone could publish it.

## Node (wasm-bindgen)

One package for every platform: `index.cjs`, the built `pkg/` and its type declarations. Run
`rust-anything build` first; `package` refuses without `pkg/`.

## Where it was checked

On macOS arm64 (Node 24, CPython 3.9), on copies of the demos, each installed
outside its source folder and replayed with `diff --module` or the Python driver:

| Demo | Installed from | Recorded cases |
| --- | --- | --- |
| `demo/fuzzy-napi` | `npm install` of the main and darwin-arm64 tarballs, offline | 2000/2000 |
| `demo/fuzzy-rs` (wasm) | `npm install` of the one tarball, offline | 2000/2000 |
| `demo/fixtures/python-textkit-rs` | `pip install` of the maturin wheel (abi3, cp39) into a venv | 1144/1144 |

`tests/package.rs` repeats the napi round trip in `cargo test`, including the fallback with the
platform package removed. The generated workflows have not been run on GitHub yet: the other
platforms' binaries are untested until they are.

## Where the workflow goes

GitHub runs workflows only from the repository's `.github/workflows/`. `package` writes the
workflow inside the output folder, with `working-directory` set to that folder relative to the
repository root, and says where to move it.
