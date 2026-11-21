---
title: Fixture'lar ve statik çalıştırmalar
description: Aracı zorlamak için yazılmış fixture'lar ve analiz edilip köprülenmiş ama çalıştırılmamış dış kütüphaneler.
---

# Fixture'lar ve statik çalıştırmalar

## Aracı zorlamak için yazılmış fixture'lar

| Fixture | Sınadığı | Sonuç |
| --- | --- | --- |
| `tests/fixtures/async` | her iki köprüde async fonksiyonlar | 900/900, iki gate de geçiyor |
| `tests/fixtures/classes` | sınıflar: durum, constructor hataları, `Map` sırası, emoji üzerinde `split('')` | 600/600 senaryo, iki gate de geçiyor |
| `tests/fixtures/aliases` | `extends`, yorumlar ve sondaki virgüllerle tsconfig `paths` | analyze ve record bunları izliyor |
| `tests/fixtures/monorepo` | derleme çıktısı olmayan bir kardeş paketi import eden bir paket | record onu kaynağa çözümlüyor |

Araçta bulunan ve düzeltilenler: napi `None`'ı `null`'a çeviriyordu (JS `undefined` verir); durum
hatasını yakalamak için fazla kısa ve fazla rastgele senaryolar (artık önceki string'leri yeniden
kullanan 12 çağrıya kadar); clippy'nin reddettiği üretilmiş `let out = ()` ve hemen çağrılan closure'lar.

## Dış kütüphaneler (yalnızca statik)

`unjs/scule`, `unjs/ufo` ve `unjs/pathe` klonlandı, analiz edildi ve köprülendi. Kodlarını çalıştırmak
(`record` orijinali çalıştırır), oturumun internetten indirilen kod için güvenlik politikası tarafından
reddedildi, bu yüzden bu çalıştırmalar `record`'dan önce durur.

| Kütüphane | analyze | bridge |
| --- | --- | --- |
| scule (büyük/küçük harf dönüşümü) | 2 birim, hazır | aşağıdaki düzeltmeden sonra 11 fonksiyonun tamamı köprülenebilir |
| ufo (URL yardımcıları) | 7 birim, hazır; `punycode.ts` ilk sırada | `toASCII` köprülendi (tipsiz JS: JSON olarak geçer) |
| pathe (yol yardımcıları) | 5 birim; `_glob.ts` dikkat (dinamik regex) | 13 fonksiyon köprülendi; `typeof path.join` tipli export'lar JSON olarak geçer |

Araçta bulunan ve düzeltilenler: kısıtlı generic'ler (`camelCase<T extends string | readonly
string[]>`) "fonksiyonlar dahil herhangi bir değer" olarak ele alınıyordu, bu da scule'ün 11
fonksiyonundan 10'unu TS'te tutuyordu. Veri kısıtlı tip parametreleri artık kısıtla değiştiriliyor.

scule'ün bir portu yazıldı (`demo` dahil değil: hiçbir zaman orijinale karşı kaydedilmedi).
