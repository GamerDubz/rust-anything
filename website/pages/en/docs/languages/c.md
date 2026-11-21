---
title: C
description: Port a C file to Rust behind extern "C" functions with the original names and a header.
---

# C

| | |
| --- | --- |
| Unit | a `.c` file |
| Bridge | `extern "C"` functions with the original names and a header |
| Recorded and replayed by | the original compiled to a shared library, called through ctypes, one fork per case |
| Needs | a C compiler and Python 3.9+ (ctypes) |
| Status | Verified on glibc behind a facade: 1,859/1,859 after dropping one undefined-behavior case, gate passes |

C gets no batch classes.

## Crashes and undefined behavior

Inputs outside a C function's contract (`isalpha(INT_MAX)`) can segfault. The C driver runs each case in a forked child and records `crash: SIGSEGV`; `diff` accepts any port behavior there, since C's is undefined. Undefined behavior that does not crash (`ispunct(1000)` reads past glibc's table and returns 1) has no built-in marker yet: such a case is removed from `cases.jsonl` by hand.

## Should you port it?

Often not, and `analyze` tells you where. C that touches hardware registers, relies on its compiler's type sizes or memory layout, or uses inline assembly (`volatile`, bitfields, packed structs, `__asm__`, integers cast to addresses) is marked "keep in C": a recording on your machine proves nothing about the target, and stable driver or firmware code gains little from a rewrite. The portable logic around it (parsing, protocols, data handling) is what moves well.

## Limits

- **APIs that pass buffers.** The C bridge carries scalars and `const char *` only. Functions taking `char *out, size_t *outlen` or a state struct stay in C, with the reason.
- **Macros.** Functions defined through macros make the parser report errors, and the plan marks those units partial.

## Speed

There is no crossing: the Rust code is compared with the C code directly. On the glibc facade, `bench` measured 0.87x overall: ctype 1.1-1.4x faster, glibc's tuned `strtod`, `strspn`, `strcmp` 0.5-0.7x.

Details: [Six languages](/docs/real-world/six-languages).
