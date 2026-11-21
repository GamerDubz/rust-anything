---
title: Python
description: Bir Python paketini ya da modülünü, tipli exception'larla ve orijinal API korunarak PyO3 üzerinden Rust'a port edin.
---

# Python

| | |
| --- | --- |
| Birim | bir paket ya da modül |
| Köprü | PyO3 (abi3), doğrudan dönüşüm, tipli exception'lar |
| Kaydeden ve yeniden oynatan | orijinali import eden Python |
| Gerekenler | Python 3.9+ |
| Durum | CPython 3.13'ün `colorsys.py` modülü üzerinde doğrulandı: 2,400/2,400, gate geçiyor |

Tipler type hint'lerden gelir. Sayı olarak kullanılan tipsiz parametreler (`r - g`, `max(r, g, b)`, `x < 1`) sayı olarak çıkarılır. `record --from-tests -- pytest`, orijinalin kendi test takımının yaptığı her çağrıyı kaydeder (Tested).

## Bir portun doğru yapması gerekenler

- Python'da çağıranlar `1`'i `1.0` kadar sık geçirir ve int'ler olduğu gibi geçer. Kayıt, her dört vakadan birinde tam sayı değerli sayıları int olarak geçirir; `f64` tipli bir port, int'ler kaydedildiğinde 134 uyuşmazlık gösterdi. int-veya-float için `crate::pynum::Num` kullanın.
- `max(nan, 1, 2)` sonucu `nan`'dır: sonraki bir değer daha büyük çıkmadıkça ilk değer kazanır.
- `-0.0 % 1.0` sonucu `0.0`'dır.
- `Err("TypeName: message")` olarak döndürülen hatalar o exception'a dönüşür.

numba, Cython veya JAX ile zaten derlenmiş kod makine kodu olarak çalışır: `profile` ve `analyze` bunu işaretler, çünkü onu port etmek pek hız kazandırmaz.

## Hız

Rust'a yapılan çağrı yaklaşık 100-300 ns tutar ve Rust kodu yorumlayıcıdan çok daha hızlıdır, bu yüzden küçük fonksiyonlar bile kazanır. `colorsys` üzerinde `bench`, portu çağrı başına CPython'dan **1.35x daha hızlı** ölçtü (çoğu çağrıda 1.5-1.9x). Batch olarak, 20,000 string üzerinde `slugify` 4 çekirdekte 98 ms'den **17x daha hızlıya** çıktı.

Ayrıntılar: [Altı dil](/docs/real-world/six-languages).
