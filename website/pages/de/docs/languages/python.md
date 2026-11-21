---
title: Python
description: Portiere ein Python-Package oder -Modul nach Rust über PyO3, mit typisierten Exceptions und unveränderter API.
---

# Python

| | |
| --- | --- |
| Unit | ein Package oder ein Modul |
| Bridge | PyO3 (abi3), direkte Konvertierung, typisierte Exceptions |
| Aufgezeichnet und abgespielt durch | Python, das das Original importiert |
| Braucht | Python 3.9+ |
| Status | Verifiziert mit `colorsys.py` aus CPython 3.13: 2,400/2,400, gate besteht |

Typen kommen aus Type Hints. Untypisierte Parameter, die als Zahlen verwendet werden (`r - g`, `max(r, g, b)`, `x < 1`), werden als Zahlen erkannt. `record --from-tests -- pytest` zeichnet jeden Aufruf auf, den die eigene Testsuite des Originals macht (Tested).

## Was eine Portierung richtig machen muss

- Python-Aufrufer übergeben `1` genauso oft wie `1.0`, und Ints werden durchgereicht. Die Aufzeichnung übergibt ganzzahlige Werte in jedem vierten Fall als Ints; eine als `f64` typisierte Portierung zeigte 134 Abweichungen, sobald Ints aufgezeichnet wurden. Nutze `crate::pynum::Num` für Int-oder-Float.
- `max(nan, 1, 2)` ist `nan`: Der erste Wert gewinnt, außer ein späterer ist im Vergleich größer.
- `-0.0 % 1.0` ist `0.0`.
- Fehler, die als `Err("TypeName: message")` zurückgegeben werden, werden zu dieser Exception.

Code, der bereits von numba, Cython oder JAX kompiliert wird, läuft als Maschinencode: `profile` und `analyze` markieren ihn, da eine Portierung kaum Geschwindigkeit bringt.

## Geschwindigkeit

Der Aufruf nach Rust kostet etwa 100-300 ns, und der Rust-Code ist viel schneller als der Interpreter, daher gewinnen selbst kleine Funktionen. Bei `colorsys` maß `bench` die Portierung pro Aufruf **1.35x schneller** als CPython (1.5-1.9x bei den meisten Aufrufen). Als Batch wurde `slugify` über 20,000 Strings von 98 ms auf 4 Kernen **17x schneller**.

Details: [Sechs Sprachen](/docs/real-world/six-languages).
