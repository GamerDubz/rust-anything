---
title: "Was es nicht erkennt"
description: Bestehen heißt, das Rust stimmt mit jedem aufgezeichneten Fall überein, mehr nicht. Wo die Grenzen liegen.
---

# Was es nicht erkennt

Bestehen heißt, das Rust stimmt mit jedem aufgezeichneten Fall überein, mehr nicht. Was Neufassungen zum Verhängnis wird,
liegt meist außerhalb der Aufzeichnung, also kenne die Grenzen:

- **Eingaben, die niemand aufgezeichnet hat.** Die generierten Fälle, die Fallen, die Testsuite des Originals
  (`record --from-tests`) und deine eigenen `--inputs` sind die Obergrenze. Füge echte Eingaben hinzu (Produktionsbeispiele,
  Fehlerberichte); die Nutzereingabe, die die Produktion lahmlegt, ist selten eine, auf die ein Generator kommt.
- **Ein Original, das sich weiterentwickelt hat.** `record` speichert einen Fingerabdruck der Dateien der Unit
  (`recorded-from.json`); ändert sich das Original später, warnt `diff` und `gate` schlägt fehl, bis du
  erneut aufzeichnest, statt gegen das zu bestehen, was das Original früher tat.
- **Regexe.** Das Crate `regex` hat weder Lookaround noch Rückverweise, und selbst ein Muster, das
  kompiliert, kann `\w`, `\b`, `\d` und Groß-/Kleinschreibung ignorierendes Matching bei Nicht-ASCII-Text anders behandeln
  als JS, Python oder Java. Ein Wechsel zu `fancy-regex` oder ein umgeschriebenes Muster kann jeden
  aufgezeichneten Fall bestehen und trotzdem bei einem türkischen punktlosen `ı` oder einem Zero-Width-Joiner abweichen. `record` fügt
  Regex-Fallen (diese, das Kelvin-Zeichen, das lange s, arabisch-indische Ziffern, Zeilentrenner, finales Sigma)
  zu jeder Funktion in einer Datei hinzu, die Regexe nutzt, aber fuzze deine echten Muster auch gegen echten Text.
- **Was sich zwischen Läufen ändert.** `record` führt das Original zweimal aus und sortiert, was sich unterschied:
  Geänderte Werte (Zeiten, IDs) werden zu Platzhaltern; dieselben Zeilen in anderer Reihenfolge (Hash-Maps,
  Nebenläufigkeit) werden in beliebiger Reihenfolge verglichen, sodass eine Portierung trotzdem genau diese Zeilen erzeugen muss; eine
  andere Anzahl von Zeilen wird zu `...`, das auf alles passt. `record` listet jede Art auf:
  Sieh dir jeden Fall an, denn ein Unterschied durch Hash-Reihenfolge oder Nebenläufigkeit ist genau das, was sich
  in einer Portierung tatsächlich ändern kann.
- **Floats.** Die Umwandlung von Zahlen in Text unterscheidet sich zwischen Sprachen (`1e21`, `-0`, Anzahl der Ziffern).
  Die Fallen enthalten diese Werte, und sie müssen exakt übereinstimmen; `--float-tolerance` verzeiht
  nur Rundung, nie Formatierung.
- **Alles, was nicht in der Ausgabe steht.** Laufzeit, Speicher, Nebenläufigkeit unter Last und andere Seiteneffekte
  als stdout, stderr, Exit-Codes, geschriebene Dateien und HTTP-Antworten (Netzwerkaufrufe, Datenbanken,
  Signale) werden nicht verglichen.
- **Andere Plattformen.** Eine Aufzeichnung beweist das Verhalten auf dem Rechner, der sie ausgeführt hat. C, dessen Ergebnisse
  von Typgrößen, Endianness oder dem Compiler abhängen, kann sich auf dem Zielsystem anders verhalten; `analyze`
  belässt hardwarenahes C aus diesem Grund in C.
