---
title: Ruby
description: Ruby modul funksiyalarini asl modullar ostidagi magnus kengaytmasi orqali Rust'ga port qiling.
---

# Ruby

| | |
| --- | --- |
| Birlik | modul funksiyalaridan iborat fayl yoki papka |
| Ko'prik | asl modullar ostida magnus kengaytmasi |
| Yozib oluvchi va qayta ijro etuvchi | generatsiya qilingan Ruby drayveri |
| Talablar | Ruby 3+ |
| Holat | Ruby 3.3'dagi `shellwords.rb` da tekshirilgan: 1,617/1,617 (446 tasi raise qiladi), gate o'tadi |

Tiplar YARD teglaridan olinadi; son sifatida ishlatilgan tipsiz parametrlar son deb aniqlanadi. Batch'lar `Mod::FnBatch.new(items)`, batch elementlari esa istalgan qiymat bo'lishi mumkin.

## Port nimani to'g'ri qilishi kerak

- `downcase` har bir belgini alohida kichik harfga o'tkazadi, Rust'ning so'z oxiridagi sigma qoidasisiz.
- `Array#sum` Kahan-Babuska yig'indisidan foydalanadi va butun son 0 dan boshlaydi, shuning uchun `[-0.0].sum` `0.0` ga teng.
- `Float#to_s` 1e15 dan boshlab eksponentli shakldan foydalanadi (`1e15.to_s` `1.0e+15`, `1e14.to_s` `100000000000000.0`); massivlar ichida `nil.inspect` `nil` bo'ladi.
- Dinamik tiplash kod talab qiladi: `shellwords` porti sonlar, nil, massivlar va hash'lar uchun Ruby'ning `to_s` va `inspect` ini qayta amalga oshiradi, chunki `shellescape` istalgan narsani qabul qiladi.

## Tezlik

Interpretator shunchalik sekinki, hatto kichik funksiyalar ham yutadi. `shellwords` da `bench` portni har bir chaqiruvda Ruby'dan **4.4x tezroq** deb o'lchadi (har bir funksiya uchun 3.6-7x). 4 yadroda batch'lar sifatida: 50,000 aralash qiymat ustida `Shellwords.shellescape` (Ruby'da 88 ms) **11.8x tezroq** ishladi, 20,000 string ustida `slugify` (110 ms) esa **12.7x**.

Batafsil: [Olti til](/docs/real-world/six-languages).
