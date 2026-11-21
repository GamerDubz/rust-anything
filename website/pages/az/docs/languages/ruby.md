---
title: Ruby
description: Ruby modul funksiyalarını orijinal modulların altında magnus genişlənməsi vasitəsilə Rust-a port edin.
---

# Ruby

| | |
| --- | --- |
| Vahid | modul funksiyalarından ibarət fayl və ya qovluq |
| Körpü | orijinal modulların altında magnus genişlənməsi |
| Qeydə alan və təkrar oynadan | yaradılmış Ruby drayveri |
| Tələb olunur | Ruby 3+ |
| Vəziyyət | Ruby 3.3-dən `shellwords.rb` üzərində yoxlanılıb: 1,617/1,617 (446-sı raise edir), gate keçir |

Tiplər YARD teqlərindən gəlir; rəqəm kimi istifadə olunan tipsiz parametrlər rəqəm kimi müəyyən edilir. Batch-lər `Mod::FnBatch.new(items)`-dir və batch elementləri istənilən dəyər ola bilər.

## Portun düzgün etməli olduğu şeylər

- `downcase` hər simvolu ayrıca kiçildir, Rust-un son sigma qaydası olmadan.
- `Array#sum` Kahan-Babuska cəmləməsindən istifadə edir və tam ədəd 0-dan başlayır, buna görə `[-0.0].sum` `0.0`-dır.
- `Float#to_s` 1e15-dən yuxarı eksponent formasından istifadə edir (`1e15.to_s` `1.0e+15`-dir, `1e14.to_s` `100000000000000.0`-dır); massivlərin içində `nil.inspect` `nil`-dir.
- Dinamik tipləşdirmə koda baha başa gəlir: `shellwords` portu rəqəmlər, nil, massivlər və hash-lər üçün Ruby-nin `to_s` və `inspect` metodlarını yenidən həyata keçirir, çünki `shellescape` istənilən şeyi qəbul edir.

## Sürət

İnterpretator kifayət qədər yavaşdır ki, hətta kiçik funksiyalar da qazansın. `shellwords` üzərində `bench` portu çağırış başına Ruby-dən **4.4x daha sürətli** ölçdü (funksiya başına 3.6-7x). 4 nüvədə batch-lər kimi: 50,000 qarışıq dəyər üzərində `Shellwords.shellescape` (Ruby-də 88 ms) **11.8x daha sürətli**, 20,000 string üzərində `slugify` (110 ms) isə **12.7x** işlədi.

Təfərrüatlar: [Altı dil](/docs/real-world/six-languages).
