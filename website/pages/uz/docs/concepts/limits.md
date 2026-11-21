---
title: "Nimalarni aniqlay olmaydi"
description: O'tish Rust yozib olingan har bir holatga mos kelishini anglatadi, boshqa hech narsani emas. Chegaralar qayerda.
---

# Nimalarni aniqlay olmaydi

O'tish Rust yozib olingan har bir holatga mos kelishini anglatadi, boshqa hech narsani emas. Qayta yozishlarni
odatda yozuvdan tashqaridagi narsalar qiynaydi, shuning uchun chegaralar qayerda ekanini biling:

- **Hech kim yozib olmagan kirish ma'lumotlari.** Generatsiya qilingan holatlar, tuzoqlar, asl nusxaning test to'plami
  (`record --from-tests`) va o'zingizning `--inputs` lar shift hisoblanadi. Haqiqiy kirish ma'lumotlarini qo'shing (production
  namunalari, xato hisobotlari); prod'ni buzadigan foydalanuvchi kiritmasi kamdan-kam hollarda generator o'ylab topadigan narsa bo'ladi.
- **O'zgarib ketgan asl nusxa.** `record` birlik fayllarining barmoq izini saqlaydi
  (`recorded-from.json`); asl nusxa keyinroq o'zgarsa, asl nusxa avval nima qilganiga qarshi o'tib ketish o'rniga,
  siz qayta yozib olmaguningizcha `diff` ogohlantiradi va `gate` muvaffaqiyatsiz bo'ladi.
- **Regex'lar.** `regex` crate'ida lookaround yoki backreference yo'q, hatto kompilyatsiya bo'ladigan
  pattern ham ASCII bo'lmagan matnda `\w`, `\b`, `\d` va registrdan mustaqil moslashtirishni JS, Python yoki Java'dan
  boshqacha talqin qilishi mumkin. `fancy-regex` ga almashtirish yoki pattern'ni qayta yozish har bir
  yozib olingan holatdan o'tishi va baribir turkcha nuqtasiz `ı` yoki zero-width joiner'da farq qilishi mumkin. `record`
  regex'lar ishlatiladigan fayldagi har bir funksiyaga regex tuzoqlarini (yuqoridagilar, Kelvin belgisi, uzun s, arab-hind raqamlari, qator ajratgichlari, so'z oxiridagi sigma)
  qo'shadi, lekin haqiqiy pattern'laringizni haqiqiy matnga qarshi fuzz ham qiling.
- **Ishga tushirishlar orasida o'zgaradigan narsalar.** `record` asl nusxani ikki marta ishga tushiradi va nima farq qilganini ajratadi:
  o'zgargan qiymatlar (vaqtlar, id'lar) wildcard'larga aylanadi; boshqa tartibdagi bir xil qatorlar (hash map'lar,
  parallellik) istalgan tartibda solishtiriladi, shuning uchun port baribir aynan o'sha qatorlarni chiqarishi kerak;
  qatorlar sonining farqi istalgan narsaga mos keladigan `...` ga aylanadi. `record` har bir turni ro'yxatlaydi:
  har birini ko'rib chiqing, chunki hash tartibi yoki parallellik farqi aynan portda haqiqatan o'zgarishi
  mumkin bo'lgan narsa.
- **Float'lar.** Sonni matnga formatlash tillar orasida farq qiladi (`1e21`, `-0`, raqamlar soni).
  Tuzoqlar bu qiymatlarni o'z ichiga oladi va ular aynan mos kelishi kerak; `--float-tolerance` faqat
  yaxlitlashni kechiradi, formatlashni hech qachon.
- **Chiqishda bo'lmagan har qanday narsa.** Vaqt, xotira, yuklama ostidagi parallellik va stdout, stderr, exit kodlari,
  yozilgan fayllar va HTTP javoblaridan boshqa yon ta'sirlar (tarmoq chaqiruvlari, ma'lumotlar bazalari,
  signallar) solishtirilmaydi.
- **Boshqa platformalar.** Yozuv xatti-harakatni faqat uni ishga tushirgan mashinada isbotlaydi. Natijalari
  tip o'lchamlari, bayt tartibi yoki kompilyatorga bog'liq bo'lgan C kodi target'da boshqacha ishlashi mumkin; shu sababli `analyze`
  apparatga yaqin C kodini C'da qoldiradi.
