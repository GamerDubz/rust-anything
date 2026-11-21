---
title: Python
description: Python paketini və ya modulunu PyO3 vasitəsilə, tipli exception-larla və orijinal API saxlanılmaqla Rust-a port edin.
---

# Python

| | |
| --- | --- |
| Vahid | paket və ya modul |
| Körpü | PyO3 (abi3), birbaşa çevirmə, tipli exception-lar |
| Qeydə alan və təkrar oynadan | orijinalı import edən Python |
| Tələb olunur | Python 3.9+ |
| Vəziyyət | CPython 3.13-dən `colorsys.py` üzərində yoxlanılıb: 2,400/2,400, gate keçir |

Tiplər type hint-lərdən gəlir. Rəqəm kimi istifadə olunan tipsiz parametrlər (`r - g`, `max(r, g, b)`, `x < 1`) rəqəm kimi müəyyən edilir. `record --from-tests -- pytest` orijinalın öz test dəstinin etdiyi hər çağırışı qeydə alır (Sınaqdan keçirilib).

## Portun düzgün etməli olduğu şeylər

- Python çağıranları `1.0` qədər tez-tez `1` də ötürür və int-lər olduğu kimi keçir. Qeyd hər dördüncü halda tam qiymətli rəqəmləri int kimi ötürür; `f64` tipli port int-lər qeydə alınanda 134 uyğunsuzluq göstərdi. int və ya float üçün `crate::pynum::Num` istifadə edin.
- `max(nan, 1, 2)` `nan`-dır: sonrakı dəyər müqayisədə böyük olmasa, birinci dəyər qalib gəlir.
- `-0.0 % 1.0` `0.0`-dır.
- `Err("TypeName: message")` kimi qaytarılan xətalar həmin exception-a çevrilir.

numba, Cython və ya JAX tərəfindən artıq kompilyasiya olunmuş kod maşın kodu kimi işləyir: `profile` və `analyze` onu işarələyir, çünki onu port etmək az sürət qazandırır.

## Sürət

Rust-a çağırış təxminən 100-300 ns tutur və Rust kodu interpretatordan xeyli sürətlidir, buna görə hətta kiçik funksiyalar da qazanır. `colorsys` üzərində `bench` portu çağırış başına CPython-dan **1.35x daha sürətli** ölçdü (əksər çağırışlarda 1.5-1.9x). Batch kimi, 20,000 string üzərində `slugify` 4 nüvədə 98 ms-dən **17x daha sürətliyə** keçdi.

Təfərrüatlar: [Altı dil](/docs/real-world/six-languages).
