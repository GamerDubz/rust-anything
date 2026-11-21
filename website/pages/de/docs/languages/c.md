---
title: C
description: Portiere eine C-Datei nach Rust, hinter extern "C"-Funktionen mit den ursprünglichen Namen und einem Header.
---

# C

| | |
| --- | --- |
| Unit | eine `.c`-Datei |
| Bridge | `extern "C"`-Funktionen mit den ursprünglichen Namen und einem Header |
| Aufgezeichnet und abgespielt durch | das Original, kompiliert zu einer Shared Library, aufgerufen über ctypes, ein Fork pro Fall |
| Braucht | einen C-Compiler und Python 3.9+ (ctypes) |
| Status | Verifiziert mit glibc hinter einer Fassade: 1,859/1,859 nach dem Entfernen eines Falls mit undefiniertem Verhalten, gate besteht |

C bekommt keine Batch-Klassen.

## Abstürze und undefiniertes Verhalten

Eingaben außerhalb des Vertrags einer C-Funktion (`isalpha(INT_MAX)`) können einen Segfault auslösen. Der C-Treiber führt jeden Fall in einem geforkten Kindprozess aus und zeichnet `crash: SIGSEGV` auf; `diff` akzeptiert dort jedes Verhalten der Portierung, da das von C undefiniert ist. Undefiniertes Verhalten ohne Absturz (`ispunct(1000)` liest über die Tabelle von glibc hinaus und gibt 1 zurück) hat noch keine eingebaute Markierung: Ein solcher Fall wird von Hand aus `cases.jsonl` entfernt.

## Solltest du es portieren?

Oft nicht, und `analyze` sagt dir, wo. C, das Hardware-Register anfasst, sich auf die Typgrößen oder das Speicherlayout seines Compilers verlässt oder Inline-Assembler nutzt (`volatile`, Bitfelder, gepackte Structs, `__asm__`, Ganzzahlen, die in Adressen gecastet werden), wird als „in C belassen“ markiert: Eine Aufzeichnung auf deinem Rechner beweist nichts über das Zielsystem, und stabiler Treiber- oder Firmware-Code gewinnt durch eine Neufassung wenig. Was sich gut verlagern lässt, ist die portable Logik drumherum (Parsing, Protokolle, Datenverarbeitung).

## Grenzen

- **APIs, die Puffer übergeben.** Die C-Bridge transportiert nur Skalare und `const char *`. Funktionen, die `char *out, size_t *outlen` oder ein Zustands-Struct nehmen, bleiben in C, mit Begründung.
- **Makros.** Über Makros definierte Funktionen lassen den Parser Fehler melden, und der Plan markiert diese Units als partiell.

## Geschwindigkeit

Es gibt keinen Übergang: Der Rust-Code wird direkt mit dem C-Code verglichen. Auf der glibc-Fassade maß `bench` insgesamt 0.87x: ctype 1.1-1.4x schneller, die optimierten `strtod`, `strspn`, `strcmp` von glibc 0.5-0.7x.

Details: [Sechs Sprachen](/docs/real-world/six-languages).
