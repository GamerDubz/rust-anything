---
title: Qamrov
description: Yozib olingan holatlar asl nusxaning qancha qismini ishga tushirgani, TypeScript/JavaScript uchun record va gate tomonidan xabar qilinadi.
---

# Qamrov

`diff` dan o'tish port har bir yozib olingan holatga mos kelishini anglatadi. Qamrov esa bu holatlar asl nusxaning qancha qismini ishga tushirganini aytadi, shunda yozuv nimani qamramasligini bilasiz.

TypeScript/JavaScript uchun `record` V8 qamrovi asosida holatlar asl nusxaning qaysi qatorlarini ishga tushirganini o'lchaydi, `gate` esa uni o'tadigan, ma'lumot beruvchi tekshiruv sifatida chiqaradi: yetib borilgan qatorlar ulushi va eng ko'p qator o'tkazib yuborilgan fayllar. Boshqa tillar uni hozircha o'lchamaydi.

Fuse.js'da holatlar birlik import qiladigan qatorlarning 81% ini ishga tushirdi ([holat](/docs/project/status)).

## Uni oshirish

Holatlar hech qachon yetib bormaydigan qatorlar hech kim tekshirmagan xatti-harakatdir. Ularga quyidagilar bilan yeting:

- `record --from-tests -- <test command>`, asl nusxaning o'z test to'plami qiladigan har bir chaqiruvni yozib olish uchun;
- `record --inputs`, generatsiya qilinganlari o'tkazib yuboradigan yo'llardan o'tadigan haqiqiy kirish ma'lumotlari bilan (tuzilmali argumentlar, soha string'lari).

[Record](/docs/concepts/record) va [Nimalarni aniqlay olmaydi](/docs/concepts/limits) sahifalariga qarang.
