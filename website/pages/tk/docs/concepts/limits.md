---
title: "Onuň tutup bilmeýän zatlary"
description: Geçmek diňe Rust-yň ýazga alnan her ýagdaýa gabat gelýändigini aňladýar, ondan artyk zat däl. Çäkler nirede.
---

# Onuň tutup bilmeýän zatlary

Geçmek diňe Rust-yň ýazga alnan her ýagdaýa gabat gelýändigini aňladýar, ondan artyk zat däl. Täzeden ýazmalara zyýan berýän zatlar
adatça ýazgynyň daşynda bolýar, şonuň üçin çäkleriň nirededigini biliň:

- **Hiç kimiň ýazga almadyk girişleri.** Döredilen ýagdaýlar, duzaklar, asyl nusganyň test toplumy
  (`record --from-tests`) we siziň öz `--inputs` girişleriňiz iň ýokary çäkdir. Hakyky girişleri goşuň (production
  nusgalary, ýalňyşlyk hasabatlary); prod-y döwýän ulanyjy girişi generatoryň pikir edýän girişi seýrek bolýar.
- **Öňe giden asyl nusga.** `record` birligiň faýllarynyň barmak yzyny saklaýar
  (`recorded-from.json`); asyl nusga soňra üýtgände, asyl nusganyň öň eden zadyna garşy geçmegiň ýerine, siz
  täzeden ýazga alýançaňyz `diff` duýduryş berýär we `gate` şowsuz bolýar.
- **Regex-ler.** `regex` crate-inde lookaround ýa-da backreference ýok, hatda kompilirlenýän nusga hem
  ASCII däl tekstde `\w`, `\b`, `\d` we registre duýgur däl gabat gelmegi JS, Python ýa-da Java-dan
  başgaça işläp biler. `fancy-regex` goýmak ýa-da nusgany täzeden ýazmak ýazga alnan her
  ýagdaýdan geçip, şonda-da türk nokatsyz `ı` ýa-da zero-width joiner-de tapawutlanyp biler. `record`
  regex ulanýan faýldaky her funksiýa regex duzaklaryny (şolar, Kelvin belgisi, uzyn s, arap-hindi sifrleri, setir aýyryjylar, soňky sigma)
  goşýar, ýöne hakyky nusgalaryňyzy hakyky tekstde hem fuzz ediň.
- **Işletmeleriň arasynda üýtgeýän zatlar.** `record` asyl nusgany iki gezek işledýär we tapawutlanan zatlary saýlaýar:
  üýtgän bahalar (wagtlar, id-ler) wildcard bolýar; başga tertipdäki şol bir setirler (hash map-ler,
  bäsdeşlik) islendik tertipde deňeşdirilýär, şonuň üçin port henizem edil şol setirleri öndürmeli;
  setirleriň başga sany `...` bolýar, ol islendik zada gabat gelýär. `record` her görnüşi sanaýar:
  olaryň her birine serediň, sebäbi hash tertibi ýa-da bäsdeşlik tapawudy portda hakykatdan
  üýtgäp bilýän zatdyr.
- **Float-lar.** Sanlary tekste öwürmek diller arasynda tapawutlanýar (`1e21`, `-0`, sifrleriň sany).
  Duzaklar şol bahalary öz içine alýar we olar takyk gabat gelmeli; `--float-tolerance` diňe
  tegeleklemäni bagyşlaýar, hiç haçan formatlamany däl.
- **Çykyşda bolmadyk islendik zat.** Wagt, ýat, ýük astyndaky bäsdeşlik we stdout, stderr, çykyş kodlary,
  ýazylan faýllar we HTTP jogaplaryndan başga täsirler (tor çagyryşlary, maglumat binalary,
  signallar) deňeşdirilmeýär.
- **Beýleki platformalar.** Ýazgy özüni alyp barşy diňe ony işleden maşynda subut edýär. Netijeleri
  tip ölçeglerine, endianness-e ýa-da kompilýatora bagly C target-de başgaça özüni alyp biler; şol sebäpli `analyze`
  enjam bilen işleýän C-ni C-de galdyrýar.
