---
title: C
description: C faylını orijinal adlı extern "C" funksiyaları və header arxasında Rust-a port edin.
---

# C

| | |
| --- | --- |
| Vahid | `.c` faylı |
| Körpü | orijinal adlarla `extern "C"` funksiyaları və header |
| Qeydə alan və təkrar oynadan | paylaşılan kitabxana kimi kompilyasiya olunmuş orijinal, ctypes ilə çağırılır, hər hal üçün bir fork |
| Tələb olunur | C kompilyatoru və Python 3.9+ (ctypes) |
| Vəziyyət | Fasad arxasında glibc üzərində yoxlanılıb: bir qeyri-müəyyən davranış halı çıxarıldıqdan sonra 1,859/1,859, gate keçir |

C batch sinifləri almır.

## Çökmələr və qeyri-müəyyən davranış

C funksiyasının müqaviləsindən kənar girişlər (`isalpha(INT_MAX)`) segfault verə bilər. C drayveri hər halı fork edilmiş child prosesdə işə salır və `crash: SIGSEGV` qeydə alır; `diff` orada portun istənilən davranışını qəbul edir, çünki C-nin davranışı qeyri-müəyyəndir. Çökməyən qeyri-müəyyən davranış üçün (`ispunct(1000)` glibc-nin cədvəlindən kənarı oxuyur və 1 qaytarır) hələ daxili işarə yoxdur: belə hal `cases.jsonl`-dən əllə silinir.

## Onu port etməlisinizmi?

Çox vaxt yox, və `analyze` harada olduğunu deyir. Aparat registrlərinə toxunan, kompilyatorunun tip ölçülərinə və ya yaddaş düzülüşünə güvənən, ya da inline assembly istifadə edən C kodu (`volatile`, bitfield-lər, packed struct-lar, `__asm__`, ünvana çevrilən tam ədədlər) "C-də saxla" kimi işarələnir: sizin maşınınızdakı qeyd hədəf haqqında heç nə sübut etmir, stabil drayver və ya firmware kodu isə yenidən yazılmaqdan az qazanır. Onun ətrafındakı portativ məntiq (parsing, protokollar, məlumat emalı) yaxşı köçən hissədir.

## Məhdudiyyətlər

- **Bufer ötürən API-lər.** C körpüsü yalnız skalyarları və `const char *` daşıyır. `char *out, size_t *outlen` və ya state struct-ı qəbul edən funksiyalar səbəbi göstərilməklə C-də qalır.
- **Makrolar.** Makrolar vasitəsilə təyin olunmuş funksiyalar parser-in xəta bildirməsinə səbəb olur və plan həmin vahidləri qismən kimi işarələyir.

## Sürət

Körpü keçidi yoxdur: Rust kodu birbaşa C kodu ilə müqayisə olunur. glibc fasadında `bench` ümumilikdə 0.87x ölçdü: ctype 1.1-1.4x daha sürətli, glibc-nin optimallaşdırılmış `strtod`, `strspn`, `strcmp` funksiyaları 0.5-0.7x.

Təfərrüatlar: [Altı dil](/docs/real-world/six-languages).
