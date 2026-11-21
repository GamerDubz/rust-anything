---
title: Ruby
description: Migre funções de módulos Ruby para Rust através de uma extensão magnus sob os módulos originais.
---

# Ruby

| | |
| --- | --- |
| Unidade | um ficheiro ou uma pasta de funções de módulo |
| Bridge | uma extensão magnus sob os módulos originais |
| Registado e reproduzido por | um driver Ruby gerado |
| Requisitos | Ruby 3+ |
| Estado | Verificado em `shellwords.rb` do Ruby 3.3: 1,617/1,617 (446 lançam exceções), o gate passa |

Os tipos vêm das tags YARD; parâmetros sem tipo utilizados como números são inferidos como números. Os lotes são `Mod::FnBatch.new(items)`, e os itens de lote podem ser qualquer valor.

## O que uma migração tem de acertar

- `downcase` converte cada carácter isoladamente, sem a regra do sigma final do Rust.
- `Array#sum` utiliza a soma de Kahan-Babuska e começa no inteiro 0, por isso `[-0.0].sum` é `0.0`.
- `Float#to_s` utiliza a forma exponencial a partir de 1e15 (`1e15.to_s` é `1.0e+15`, `1e14.to_s` é `100000000000000.0`); `nil.inspect` dentro de arrays é `nil`.
- A tipagem dinâmica custa código: a migração de `shellwords` reimplementa o `to_s` e o `inspect` do Ruby para números, nil, arrays e hashes, porque `shellescape` aceita qualquer coisa.

## Velocidade

O interpretador é suficientemente lento para que até funções pequenas ganhem. Em `shellwords`, o `bench` mediu a migração **4.4x mais rápida** do que o Ruby por chamada (3.6-7x por função). Em lotes em 4 núcleos: `Shellwords.shellescape` sobre 50,000 valores mistos (88 ms em Ruby) correu **11.8x mais rápido**, e `slugify` sobre 20,000 strings (110 ms) **12.7x**.

Detalhes: [Seis linguagens](/docs/real-world/six-languages).
