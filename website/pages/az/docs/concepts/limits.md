---
title: "Nəyi tuta bilmir"
description: Keçmək Rust-un qeydə alınmış hər hala uyğun gəldiyi deməkdir, artıq heç nə. Sərhədlər haradadır.
---

# Nəyi tuta bilmir

Keçmək Rust-un qeydə alınmış hər hala uyğun gəldiyi deməkdir, artıq heç nə. Yenidən yazmalara
zərər verən şey adətən qeydin xaricində olur, buna görə sərhədlərin harada olduğunu bilin:

- **Heç kimin qeydə almadığı girişlər.** Yaradılmış hallar, tələlər, orijinalın test dəsti
  (`record --from-tests`) və sizin öz `--inputs` girişləriniz tavandır. Real girişlər əlavə edin (production
  nümunələri, xəta hesabatları); prod-u sındıran istifadəçi girişi nadir hallarda generatorun ağlına gələn olur.
- **İrəliləmiş orijinal.** `record` vahidin fayllarının barmaq izini saxlayır
  (`recorded-from.json`); orijinal sonradan dəyişəndə `diff` xəbərdarlıq edir, `gate` isə siz yenidən
  qeydə alana qədər uğursuz olur, orijinalın əvvəllər etdiyinə qarşı keçmək əvəzinə.
- **Regex-lər.** `regex` crate-ində lookaround və backreference yoxdur, hətta kompilyasiya olunan
  pattern belə ASCII olmayan mətndə `\w`, `\b`, `\d` və hərf registrindən asılı olmayan uyğunluğu
  JS, Python və ya Java-dan fərqli işləyə bilər. `fancy-regex`-ə keçmək və ya pattern-i yenidən yazmaq qeydə alınmış
  hər haldan keçə və yenə də türk nöqtəsiz `ı`-sında və ya zero-width joiner-də fərqlənə bilər. `record`
  regex istifadə edən fayldakı hər funksiyaya regex tələləri (bunlar, Kelvin işarəsi, uzun s, ərəb-hind rəqəmləri,
  sətir ayırıcıları, son sigma) əlavə edir, amma real pattern-lərinizi real mətnə qarşı da fuzz edin.
- **İşləmələr arasında dəyişənlər.** `record` orijinalı iki dəfə işə salır və fərqlənəni ayırır:
  dəyişən dəyərlər (vaxtlar, id-lər) wildcard-a çevrilir; başqa ardıcıllıqdakı eyni sətirlər (hash map-lər,
  paralellik) istənilən ardıcıllıqla müqayisə olunur, buna görə port yenə də məhz həmin sətirləri çıxarmalıdır;
  fərqli sayda sətir isə istənilən şeyə uyğun gələn `...`-a çevrilir. `record` hər növü siyahıya alır:
  hər birinə baxın, çünki hash ardıcıllığı və ya paralellik fərqi məhz portda həqiqətən dəyişə bilən şeydir.
- **Float-lar.** Rəqəmdən mətnə formatlama dillər arasında fərqlənir (`1e21`, `-0`, rəqəm sayları).
  Tələlər bu dəyərləri əhatə edir və onlar dəqiq uyğun gəlməlidir; `--float-tolerance` yalnız
  yuvarlaqlaşdırmanı bağışlayır, formatlamanı heç vaxt.
- **Çıxışda olmayan hər şey.** Vaxt, yaddaş, yük altında paralellik və stdout, stderr, çıxış kodları,
  yazılmış fayllar və HTTP cavablarından başqa yan təsirlər (şəbəkə çağırışları, verilənlər bazaları,
  siqnallar) müqayisə olunmur.
- **Digər platformalar.** Qeyd davranışı yalnız onu işə salan maşında sübut edir. Nəticələri tip ölçülərindən,
  endianness-dən və ya kompilyatordan asılı olan C kodu hədəfdə fərqli davrana bilər; `analyze`
  bu səbəbdən aparatla işləyən C kodunu C-də saxlayır.
