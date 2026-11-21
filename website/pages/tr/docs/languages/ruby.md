---
title: Ruby
description: Ruby modül fonksiyonlarını, orijinal modüllerin altında bir magnus eklentisi üzerinden Rust'a port edin.
---

# Ruby

| | |
| --- | --- |
| Birim | modül fonksiyonlarından oluşan bir dosya ya da klasör |
| Köprü | orijinal modüllerin altında bir magnus eklentisi |
| Kaydeden ve yeniden oynatan | üretilmiş bir Ruby sürücüsü |
| Gerekenler | Ruby 3+ |
| Durum | Ruby 3.3'ün `shellwords.rb` dosyası üzerinde doğrulandı: 1,617/1,617 (446'sı raise ediyor), gate geçiyor |

Tipler YARD etiketlerinden gelir; sayı olarak kullanılan tipsiz parametreler sayı olarak çıkarılır. Batch'ler `Mod::FnBatch.new(items)` şeklindedir ve batch öğeleri herhangi bir değer olabilir.

## Bir portun doğru yapması gerekenler

- `downcase` her karakteri tek başına küçültür, Rust'ın son sigma kuralı olmadan.
- `Array#sum` Kahan-Babuska toplamını kullanır ve tam sayı 0'dan başlar, bu yüzden `[-0.0].sum` sonucu `0.0`'dır.
- `Float#to_s` 1e15 ve üzerinde üslü biçim kullanır (`1e15.to_s` sonucu `1.0e+15`, `1e14.to_s` sonucu `100000000000000.0`); diziler içindeki `nil.inspect` sonucu `nil`'dir.
- Dinamik tipleme koda mal olur: `shellwords` portu, `shellescape` her şeyi kabul ettiği için Ruby'nin sayılar, nil, diziler ve hash'ler için `to_s` ve `inspect` davranışını yeniden uygular.

## Hız

Yorumlayıcı, küçük fonksiyonların bile kazanacağı kadar yavaştır. `shellwords` üzerinde `bench`, portu çağrı başına Ruby'den **4.4x daha hızlı** ölçtü (fonksiyon başına 3.6-7x). 4 çekirdekte batch olarak: 50,000 karışık değer üzerinde `Shellwords.shellescape` (Ruby'de 88 ms) **11.8x daha hızlı**, 20,000 string üzerinde `slugify` (110 ms) ise **12.7x** daha hızlı çalıştı.

Ayrıntılar: [Altı dil](/docs/real-world/six-languages).
