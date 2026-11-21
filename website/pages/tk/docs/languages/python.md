---
title: Python
description: Python paketini ýa-da modulyny PyO3 arkaly, tipli exception-lar bilen we asyl API-ni saklap Rust-a geçiriň.
---

# Python

| | |
| --- | --- |
| Birlik | paket ýa-da modul |
| Bridge | PyO3 (abi3), göni öwrülişik, tipli exception-lar |
| Kim ýazga alýar we gaýtadan işledýär | Python, asyl nusgany import edýär |
| Näme gerek | Python 3.9+ |
| Ýagdaý | CPython 3.13-iň `colorsys.py` faýlynda barlandy: 2,400/2,400, gate geçýär |

Tipler type hint-lerden alynýar. San hökmünde ulanylýan tipsiz parametrler (`r - g`, `max(r, g, b)`, `x < 1`) san diýlip kabul edilýär. `record --from-tests -- pytest` asyl nusganyň öz test toplumynyň edýän her çagyryşyny ýazga alýar (Tested).

## Portuň dogry etmeli zatlary

- Python çagyryjylary `1`-i `1.0` ýaly ýygy geçirýär, int-ler bolsa üýtgemän geçýär. Ýazga almak her dördünji ýagdaýda bitin sanlary int hökmünde geçirýär; `f64` tipli port int-ler ýazga alnandan soň 134 gabat gelmezlik görkezdi. int-or-float üçin `crate::pynum::Num` ulanyň.
- `max(nan, 1, 2)` `nan`: soňky baha has uly bolmasa, birinji baha ýeňýär.
- `-0.0 % 1.0` `0.0`.
- `Err("TypeName: message")` görnüşinde gaýtarylan ýalňyşlyklar şol exception bolýar.

numba, Cython ýa-da JAX tarapyndan eýýäm kompilirlenen kod maşyn kody hökmünde işleýär: `profile` we `analyze` ony belleýär, sebäbi ony geçirmek az tizlik berýär.

## Tizlik

Rust-a çagyryş takmynan 100-300 ns durýar, Rust kody bolsa interpretatordan has çalt, şonuň üçin kiçi funksiýalar hem utýar. `colorsys`-de `bench` portuň bir çagyryşda CPython-dan **1.35x has çaltdygyny** ölçedi (köp çagyryşlarda 1.5-1.9x). Batch hökmünde 20,000 setir boýunça `slugify` 4 ýadroda 98 ms-den **17x has çalt** boldy.

Jikme-jiklikler: [Alty dil](/docs/real-world/six-languages).
