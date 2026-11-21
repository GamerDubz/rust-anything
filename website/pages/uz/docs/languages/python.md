---
title: Python
description: Python paketi yoki modulini PyO3 orqali, tiplangan exception'lar bilan va asl API'ni saqlagan holda Rust'ga port qiling.
---

# Python

| | |
| --- | --- |
| Birlik | paket yoki modul |
| Ko'prik | PyO3 (abi3), to'g'ridan-to'g'ri konvertatsiya, tiplangan exception'lar |
| Yozib oluvchi va qayta ijro etuvchi | asl nusxani import qiladigan Python |
| Talablar | Python 3.9+ |
| Holat | CPython 3.13'dagi `colorsys.py` da tekshirilgan: 2,400/2,400, gate o'tadi |

Tiplar type hint'lardan olinadi. Son sifatida ishlatilgan tipsiz parametrlar (`r - g`, `max(r, g, b)`, `x < 1`) son deb aniqlanadi. `record --from-tests -- pytest` asl nusxaning o'z test to'plami qiladigan har bir chaqiruvni yozib oladi (Tested).

## Port nimani to'g'ri qilishi kerak

- Python chaqiruvchilari `1` ni `1.0` kabi tez-tez uzatadi va int'lar o'tib ketadi. Yozib olish har to'rtinchi holatda butun qiymatli sonlarni int sifatida uzatadi; `f64` tipli port int'lar yozib olingach 134 ta nomuvofiqlik ko'rsatdi. Int yoki float uchun `crate::pynum::Num` dan foydalaning.
- `max(nan, 1, 2)` `nan` ga teng: keyingi qiymat kattaroq deb solishtirilmasa, birinchi qiymat yutadi.
- `-0.0 % 1.0` `0.0` ga teng.
- `Err("TypeName: message")` sifatida qaytarilgan xatolar shu exception'ga aylanadi.

numba, Cython yoki JAX tomonidan allaqachon kompilyatsiya qilingan kod mashina kodi sifatida ishlaydi: `profile` va `analyze` uni belgilaydi, chunki uni port qilish tezlikka kam foyda beradi.

## Tezlik

Rust'ga chaqiruv taxminan 100-300 ns turadi va Rust kodi interpretatordan ancha tez, shuning uchun hatto kichik funksiyalar ham yutadi. `colorsys` da `bench` portni har bir chaqiruvda CPython'dan **1.35x tezroq** deb o'lchadi (ko'pchilik chaqiruvlarda 1.5-1.9x). Batch sifatida 20,000 string ustida `slugify` 4 yadroda 98 ms dan **17x tezroq** ga o'tdi.

Batafsil: [Olti til](/docs/real-world/six-languages).
