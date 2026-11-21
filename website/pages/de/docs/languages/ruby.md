---
title: Ruby
description: Portiere Ruby-Modulfunktionen nach Rust über eine magnus-Erweiterung unter den ursprünglichen Modulen.
---

# Ruby

| | |
| --- | --- |
| Unit | eine Datei oder ein Ordner mit Modulfunktionen |
| Bridge | eine magnus-Erweiterung unter den ursprünglichen Modulen |
| Aufgezeichnet und abgespielt durch | einen generierten Ruby-Treiber |
| Braucht | Ruby 3+ |
| Status | Verifiziert mit `shellwords.rb` aus Ruby 3.3: 1,617/1,617 (446 lösen eine Exception aus), gate besteht |

Typen kommen aus YARD-Tags; untypisierte Parameter, die als Zahlen verwendet werden, werden als Zahlen erkannt. Batches sind `Mod::FnBatch.new(items)`, und Batch-Elemente können beliebige Werte sein.

## Was eine Portierung richtig machen muss

- `downcase` wandelt jedes Zeichen einzeln um, ohne Rusts Regel für das finale Sigma.
- `Array#sum` nutzt Kahan-Babuska-Summation und beginnt bei der Ganzzahl 0, daher ist `[-0.0].sum` gleich `0.0`.
- `Float#to_s` nutzt ab 1e15 die Exponentenform (`1e15.to_s` ist `1.0e+15`, `1e14.to_s` ist `100000000000000.0`); `nil.inspect` innerhalb von Arrays ist `nil`.
- Dynamische Typisierung kostet Code: Die `shellwords`-Portierung implementiert Rubys `to_s` und `inspect` für Zahlen, nil, Arrays und Hashes nach, weil `shellescape` alles akzeptiert.

## Geschwindigkeit

Der Interpreter ist langsam genug, dass selbst kleine Funktionen gewinnen. Bei `shellwords` maß `bench` die Portierung pro Aufruf **4.4x schneller** als Ruby (3.6-7x pro Funktion). Als Batches auf 4 Kernen: `Shellwords.shellescape` über 50,000 gemischte Werte (88 ms in Ruby) lief **11.8x schneller** und `slugify` über 20,000 Strings (110 ms) **12.7x**.

Details: [Sechs Sprachen](/docs/real-world/six-languages).
