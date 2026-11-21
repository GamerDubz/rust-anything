---
title: Ruby
description: Ruby modul funksiýalaryny asyl modullaryň aşagyndaky magnus giňeltmesi arkaly Rust-a geçiriň.
---

# Ruby

| | |
| --- | --- |
| Birlik | modul funksiýalaryndan ybarat faýl ýa-da bukja |
| Bridge | asyl modullaryň aşagyndaky magnus giňeltmesi |
| Kim ýazga alýar we gaýtadan işledýär | döredilen Ruby draýweri |
| Näme gerek | Ruby 3+ |
| Ýagdaý | Ruby 3.3-iň `shellwords.rb` faýlynda barlandy: 1,617/1,617 (446-sy raise edýär), gate geçýär |

Tipler YARD teglerinden alynýar; san hökmünde ulanylýan tipsiz parametrler san diýlip kabul edilýär. Batch-lar `Mod::FnBatch.new(items)`, batch elementleri bolsa islendik baha bolup biler.

## Portuň dogry etmeli zatlary

- `downcase` her nyşany aýratynlykda kiçeldýär, Rust-yň soňky sigma düzgüni bolmazdan.
- `Array#sum` Kahan-Babuska jemlemesini ulanýar we bitin 0-dan başlaýar, şonuň üçin `[-0.0].sum` `0.0`.
- `Float#to_s` 1e15-den başlap eksponent görnüşini ulanýar (`1e15.to_s` `1.0e+15`, `1e14.to_s` `100000000000000.0`); massiwleriň içindäki `nil.inspect` `nil`.
- Dinamik tipleşdirme kod talap edýär: `shellwords` porty sanlar, nil, massiwler we hash-lar üçin Ruby-nyň `to_s` we `inspect` funksiýalaryny täzeden amala aşyrýar, sebäbi `shellescape` islendik zady kabul edýär.

## Tizlik

Interpretator ýeterlik haýal, şonuň üçin kiçi funksiýalar hem utýar. `shellwords`-da `bench` portuň bir çagyryşda Ruby-dan **4.4x has çaltdygyny** ölçedi (her funksiýa üçin 3.6-7x). 4 ýadroda batch hökmünde: 50,000 garyşyk baha boýunça `Shellwords.shellescape` (Ruby-da 88 ms) **11.8x has çalt** işledi, 20,000 setir boýunça `slugify` (110 ms) bolsa **12.7x**.

Jikme-jiklikler: [Alty dil](/docs/real-world/six-languages).
