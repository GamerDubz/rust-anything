---
title: Cobertura
description: Quanto do original os casos registados executaram, reportado pelo record e pelo gate para TypeScript/JavaScript.
---

# Cobertura

Passar no `diff` significa que a migração corresponde a todos os casos registados. A cobertura indica quanto do original esses casos executaram, para saber o que o registo não abrange.

Para TypeScript/JavaScript, o `record` mede as linhas do original que os casos executaram, a partir da cobertura do V8, e o `gate` apresenta-a como uma verificação informativa que passa sempre: a percentagem de linhas alcançadas e os ficheiros com mais linhas por alcançar. As outras linguagens ainda não a medem.

No Fuse.js, os casos executaram 81% das linhas que a unidade importa ([estado](/docs/project/status)).

## Como aumentá-la

As linhas que os casos nunca alcançam são comportamento que ninguém verificou. Alcance-as com:

- `record --from-tests -- <test command>`, para registar todas as chamadas feitas pela própria suite de testes do original;
- `record --inputs`, com entradas reais que percorram os caminhos que as geradas não alcançam (argumentos estruturados, strings do domínio).

Consulte [Record](/docs/concepts/record) e [O que não consegue detetar](/docs/concepts/limits).
