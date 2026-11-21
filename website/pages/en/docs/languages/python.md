---
title: Python
description: Port a Python package or module to Rust through PyO3, with typed exceptions and the original API kept.
---

# Python

| | |
| --- | --- |
| Unit | a package or a module |
| Bridge | PyO3 (abi3), direct conversion, typed exceptions |
| Recorded and replayed by | Python, importing the original |
| Needs | Python 3.9+ |
| Status | Verified on `colorsys.py` from CPython 3.13: 2,400/2,400, gate passes |

Types come from type hints. Untyped parameters used as numbers (`r - g`, `max(r, g, b)`, `x < 1`) are inferred as numbers. `record --from-tests -- pytest` records every call the original's own test suite makes (Tested).

## What a port has to get right

- Python callers pass `1` as often as `1.0`, and ints pass through. Recording passes integral numbers as ints in every fourth case; a port typed `f64` showed 134 mismatches once ints were recorded. Use `crate::pynum::Num` for int-or-float.
- `max(nan, 1, 2)` is `nan`: the first value wins unless a later one compares greater.
- `-0.0 % 1.0` is `0.0`.
- Errors returned as `Err("TypeName: message")` become that exception.

Code already compiled by numba, Cython or JAX runs as machine code: `profile` and `analyze` flag it, since porting it buys little speed.

## Speed

The call into Rust costs about 100-300 ns and the Rust code is much faster than the interpreter, so even small functions win. On `colorsys`, `bench` measured the port **1.35x faster** than CPython per call (1.5-1.9x on most calls). As a batch, `slugify` over 20,000 strings went from 98 ms to **17x faster** on 4 cores.

Details: [Six languages](/docs/real-world/six-languages).
