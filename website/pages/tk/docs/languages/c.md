---
title: C
description: C faýlyny asyl atlary we header bilen extern "C" funksiýalarynyň arkasynda Rust-a geçiriň.
---

# C

| | |
| --- | --- |
| Birlik | `.c` faýly |
| Bridge | asyl atlary we header bilen `extern "C"` funksiýalary |
| Kim ýazga alýar we gaýtadan işledýär | shared library hökmünde kompilirlenen asyl nusga, ctypes arkaly çagyrylýar, her ýagdaý üçin bir fork |
| Näme gerek | C kompilýatory we Python 3.9+ (ctypes) |
| Ýagdaý | Fasadyň arkasyndaky glibc-de barlandy: kesgitlenmedik özüni alyp barşly bir ýagdaý aýrylandan soň 1,859/1,859, gate geçýär |

C batch klaslaryny almaýar.

## Çökmeler we kesgitlenmedik özüni alyp barş

C funksiýasynyň şertnamasyndan daşardaky girişler (`isalpha(INT_MAX)`) segfault döredip biler. C draýweri her ýagdaýy fork edilen çagalyk prosesde işledýär we `crash: SIGSEGV` ýazga alýar; ol ýerde `diff` portuň islendik özüni alyp barşyny kabul edýär, sebäbi C-niňki kesgitlenmedik. Çökmeýän kesgitlenmedik özüni alyp barş (`ispunct(1000)` glibc-iň tablisasyndan daşary okaýar we 1 gaýtarýar) üçin entek içki bellik ýok: şeýle ýagdaý `cases.jsonl` faýlyndan el bilen aýrylýar.

## Ony geçirmelimi?

Köplenç ýok, `analyze` bolsa muny nirededigini aýdýar. Enjam registrlerine degýän, kompilýatorynyň tip ölçeglerine ýa-da ýat ýerleşişine bil baglaýan ýa-da inline assembly ulanýan C kody (`volatile`, bitfield-ler, packed struct-lar, `__asm__`, salgylara öwrülýän bitin sanlar) "C-de galdyr" diýlip bellenýär: siziň maşynyňyzdaky ýazgy target barada hiç zat subut etmeýär, durnukly draýwer ýa-da firmware kody bolsa täzeden ýazmakdan az peýda görýär. Onuň daşyndaky göçürip bolýan logika (parsing, protokollar, maglumatlary işlemek) gowy göçýän bölekdir.

## Çäkler

- **Bufer geçirýän API-ler.** C bridge diňe skalýarlary we `const char *` göterýär. `char *out, size_t *outlen` ýa-da ýagdaý struct-yny alýan funksiýalar sebäbi bilen C-de galýar.
- **Makroslar.** Makroslar arkaly kesgitlenen funksiýalar parser-iň ýalňyşlyk habar bermegine sebäp bolýar, meýilnama bolsa şol birlikleri bölekleýin diýip belleýär.

## Tizlik

Serhet geçişi ýok: Rust kody C kody bilen göni deňeşdirilýär. glibc fasadynda `bench` umumy 0.87x ölçedi: ctype 1.1-1.4x has çalt, glibc-iň sazlanan `strtod`, `strspn`, `strcmp` funksiýalary 0.5-0.7x.

Jikme-jiklikler: [Alty dil](/docs/real-world/six-languages).
