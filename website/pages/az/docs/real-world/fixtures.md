---
title: Fixture-lar və statik işləmələr
description: Aləti sınamaq üçün yazılmış fixture-lar və analiz edilib körpü ilə bağlanmış, amma işə salınmamış xarici kitabxanalar.
---

# Fixture-lar və statik işləmələr

## Aləti sınamaq üçün yazılmış fixture-lar

| Fixture | Nəyi sınayır | Nəticə |
| --- | --- | --- |
| `tests/fixtures/async` | hər iki körpüdə async funksiyalar | 900/900, hər iki gate keçir |
| `tests/fixtures/classes` | siniflər: vəziyyət, konstruktor xətaları, `Map` ardıcıllığı, emoji üzərində `split('')` | 600/600 ssenari, hər iki gate keçir |
| `tests/fixtures/aliases` | `extends`, şərhlər və sondakı vergüllərlə tsconfig `paths` | analyze və record onları izləyir |
| `tests/fixtures/monorepo` | build çıxışı olmayan qonşu paketi import edən paket | record onu mənbəyə həll edir |

Alətdə tapılıb və düzəldilib: napi `None`-u `null`-a çevirirdi (JS `undefined` verir); ssenarilər
vəziyyətli xətanı tutmaq üçün çox qısa və çox təsadüfi idi (indi əvvəlki string-ləri təkrar istifadə etməklə 12 çağırışa qədər);
clippy-nin rədd etdiyi `let out = ()` və dərhal çağırılan closure-lar yaradılırdı.
## Xarici kitabxanalar (yalnız statik)

`unjs/scule`, `unjs/ufo` və `unjs/pathe` klonlandı, analiz edildi və körpü ilə bağlandı. Onların
kodunu işə salmaq (`record` orijinalı icra edir) sessiyanın internetdən endirilmiş kod üçün
təhlükəsizlik siyasəti tərəfindən rədd edildi, buna görə bu işləmələr `record`-dan əvvəl dayanır.

| Kitabxana | analyze | bridge |
| --- | --- | --- |
| scule (registr çevirmə) | 2 vahid, hazır | aşağıdakı düzəlişdən sonra 11 funksiyanın hamısı körpü ilə bağlana bilir |
| ufo (URL utilitləri) | 7 vahid, hazır; `punycode.ts` birinci sırada | `toASCII` körpü ilə bağlandı (tipsiz JS: JSON kimi keçir) |
| pathe (yol utilitləri) | 5 vahid; `_glob.ts` ehtiyat (dinamik regex) | 13 funksiya körpü ilə bağlandı; `typeof path.join` tipli export-lar JSON kimi keçir |

Alətdə tapılıb və düzəldilib: məhdudlaşdırılmış generic-lər (`camelCase<T extends string | readonly
string[]>`) "istənilən dəyər, funksiyalar daxil" kimi qəbul edilirdi, bu da scule-un 11 funksiyasından
10-unu TS-də saxlayırdı. Məlumat məhdudiyyətli tip parametrləri indi məhdudiyyətlə əvəz olunur.

scule-un portu yazıldı (`demo` daxil edilməyib: o, heç vaxt orijinala qarşı qeydə alınmayıb).
