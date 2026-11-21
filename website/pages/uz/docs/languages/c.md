---
title: C
description: C faylini asl nomlar va header bilan extern "C" funksiyalar ortida Rust'ga port qiling.
---

# C

| | |
| --- | --- |
| Birlik | `.c` fayl |
| Ko'prik | asl nomlar bilan `extern "C"` funksiyalar va header |
| Yozib oluvchi va qayta ijro etuvchi | umumiy kutubxona sifatida kompilyatsiya qilingan asl nusxa, ctypes orqali chaqiriladi, har bir holat uchun bitta fork |
| Talablar | C kompilyatori va Python 3.9+ (ctypes) |
| Holat | Fasad ortidagi glibc'da tekshirilgan: bitta aniqlanmagan xatti-harakat holati olib tashlangandan keyin 1,859/1,859, gate o'tadi |

C batch klasslarini olmaydi.

## Crash'lar va aniqlanmagan xatti-harakat

C funksiyasi shartnomasidan tashqaridagi kirish ma'lumotlari (`isalpha(INT_MAX)`) segfault'ga olib kelishi mumkin. C drayveri har bir holatni fork qilingan child jarayonda ishga tushiradi va `crash: SIGSEGV` ni yozib oladi; `diff` u yerda portning istalgan xatti-harakatini qabul qiladi, chunki C'niki aniqlanmagan. Crash bermaydigan aniqlanmagan xatti-harakat (`ispunct(1000)` glibc jadvalidan tashqarini o'qiydi va 1 qaytaradi) uchun hozircha o'rnatilgan belgi yo'q: bunday holat `cases.jsonl` dan qo'lda olib tashlanadi.

## Uni port qilish kerakmi?

Ko'pincha yo'q, va `analyze` qayerda ekanini aytadi. Apparat registrlariga tegadigan, kompilyatorining tip o'lchamlari yoki xotira joylashuviga tayanadigan yoki inline assembly ishlatadigan C kodi (`volatile`, bitfield'lar, packed struct'lar, `__asm__`, manzilga cast qilingan butun sonlar) "C'da qoldirish" deb belgilanadi: sizning mashinangizdagi yozuv target haqida hech narsani isbotlamaydi, barqaror drayver yoki firmware kodi esa qayta yozishdan kam foyda oladi. Uning atrofidagi ko'chiriladigan mantiq (parsing, protokollar, ma'lumotlar bilan ishlash) yaxshi ko'chadi.

## Cheklovlar

- **Bufer uzatadigan API'lar.** C ko'prigi faqat skalyarlar va `const char *` ni olib o'tadi. `char *out, size_t *outlen` yoki holat struct'ini qabul qiladigan funksiyalar sababi ko'rsatilgan holda C'da qoladi.
- **Makrolar.** Makrolar orqali aniqlangan funksiyalar parser'ning xato berishiga sabab bo'ladi va reja bunday birliklarni qisman deb belgilaydi.

## Tezlik

Hech qanday o'tish yo'q: Rust kodi C kodi bilan to'g'ridan-to'g'ri solishtiriladi. glibc fasadida `bench` umumiy 0.87x o'lchadi: ctype 1.1-1.4x tezroq, glibc'ning sozlangan `strtod`, `strspn`, `strcmp` funksiyalari 0.5-0.7x.

Batafsil: [Olti til](/docs/real-world/six-languages).
