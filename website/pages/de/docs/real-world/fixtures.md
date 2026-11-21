---
title: Fixtures und statische Läufe
description: Fixtures, die geschrieben wurden, um das Tool zu fordern, und externe Bibliotheken, die analysiert und gebridget, aber nicht ausgeführt wurden.
---

# Fixtures und statische Läufe

## Fixtures, die das Tool fordern sollen

| Fixture | Prüft | Ergebnis |
| --- | --- | --- |
| `tests/fixtures/async` | async-Funktionen auf beiden Bridges | 900/900, beide Gates bestehen |
| `tests/fixtures/classes` | Klassen: Zustand, Konstruktorfehler, `Map`-Reihenfolge, `split('')` auf Emoji | 600/600 Szenarien, beide Gates bestehen |
| `tests/fixtures/aliases` | tsconfig-`paths` mit `extends`, Kommentaren, nachgestellten Kommas | analyze und record folgen ihnen |
| `tests/fixtures/monorepo` | ein Paket, das ein Nachbarpaket ohne Build-Ausgabe importiert | record löst es zum Quellcode auf |

Im Tool gefunden und behoben: napi machte aus `None` ein `null` (JS liefert `undefined`); Szenarien
waren zu kurz und zu zufällig, um einen zustandsabhängigen Fehler zu finden (jetzt bis zu 12 Aufrufe, die frühere Strings wiederverwenden);
generierte `let out = ()` und sofort aufgerufene Closures, die clippy ablehnt.
## Externe Bibliotheken (nur statisch)

`unjs/scule`, `unjs/ufo` und `unjs/pathe` wurden geklont, analysiert und gebridget. Das Ausführen ihres
Codes (`record` führt das Original aus) wurde von der Sicherheitsrichtlinie der Sitzung für aus dem Internet
heruntergeladenen Code abgelehnt, daher enden diese Läufe vor `record`.

| Bibliothek | analyze | bridge |
| --- | --- | --- |
| scule (Umwandlung der Schreibweise) | 2 Units, bereit | alle 11 Funktionen nach der Korrektur unten bridgebar |
| ufo (URL-Hilfsfunktionen) | 7 Units, bereit; `punycode.ts` an erster Stelle | `toASCII` gebridget (untypisiertes JS: überquert die Bridge als JSON) |
| pathe (Pfad-Hilfsfunktionen) | 5 Units; `_glob.ts` mit Vorsicht (dynamische Regex) | 13 Funktionen gebridget; mit `typeof path.join` typisierte Exporte überqueren die Bridge als JSON |

Im Tool gefunden und behoben: eingeschränkte Generics (`camelCase<T extends string | readonly
string[]>`) wurden als „beliebiger Wert, Funktionen eingeschlossen“ behandelt, wodurch 10 der 11
Funktionen von scule in TS blieben. Typparameter mit Daten-Constraints werden jetzt durch den Constraint ersetzt.

Eine Portierung von scule wurde geschrieben (`demo` nicht enthalten: Sie wurde nie gegen das Original aufgezeichnet).
