---
title: Abdeckung
description: Wie viel vom Original die aufgezeichneten Fälle ausgeführt haben, gemeldet von record und gate für TypeScript/JavaScript.
---

# Abdeckung

Dass `diff` besteht, heißt, dass die Portierung mit jedem aufgezeichneten Fall übereinstimmt. Die Abdeckung sagt dir, wie viel vom Original diese Fälle ausgeführt haben, damit du weißt, was die Aufzeichnung nicht abdeckt.

Für TypeScript/JavaScript misst `record` die Zeilen des Originals, die die Fälle ausgeführt haben, aus der Coverage von V8, und `gate` gibt sie als bestehende, informative Prüfung aus: den Anteil der erreichten Zeilen und die Dateien mit den meisten verfehlten Zeilen. Andere Sprachen messen das noch nicht.

Bei Fuse.js haben die Fälle 81% der Zeilen ausgeführt, die die Unit importiert ([Status](/docs/project/status)).

## Sie erhöhen

Zeilen, die die Fälle nie erreichen, sind Verhalten, das niemand geprüft hat. Erreiche sie mit:

- `record --from-tests -- <test command>`, um jeden Aufruf aufzuzeichnen, den die eigene Testsuite des Originals macht;
- `record --inputs`, mit echten Eingaben, die die Pfade nehmen, die die generierten verfehlen (strukturierte Argumente, domänenspezifische Strings).

Siehe [Record](/docs/concepts/record) und [Was es nicht erkennt](/docs/concepts/limits).
