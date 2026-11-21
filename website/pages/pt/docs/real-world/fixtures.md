---
title: Fixtures e execuções estáticas
description: Fixtures escritas para pôr a ferramenta à prova, e bibliotecas externas que foram analisadas e ligadas por bridge mas não executadas.
---

# Fixtures e execuções estáticas

## Fixtures escritas para pôr a ferramenta à prova

| Fixture | O que exercita | Resultado |
| --- | --- | --- |
| `tests/fixtures/async` | funções assíncronas em ambas as bridges | 900/900, ambos os gates passam |
| `tests/fixtures/classes` | classes: estado, erros no construtor, ordem de `Map`, `split('')` em emoji | 600/600 cenários, ambos os gates passam |
| `tests/fixtures/aliases` | `paths` do tsconfig com `extends`, comentários, vírgulas finais | o analyze e o record seguem-nos |
| `tests/fixtures/monorepo` | um pacote que importa um pacote irmão sem resultado de build | o record resolve-o para o código-fonte |

Encontrado na ferramenta, e corrigido: o napi transformava `None` em `null` (o JS dá `undefined`); cenários
demasiado curtos e demasiado aleatórios para detetar um bug com estado (agora até 12 chamadas, reutilizando strings anteriores);
`let out = ()` gerado e closures chamadas de imediato que o clippy rejeita.
## Bibliotecas externas (apenas estático)

`unjs/scule`, `unjs/ufo` e `unjs/pathe` foram clonadas, analisadas e ligadas por bridge. Executar o seu
código (o `record` executa o original) foi recusado pela política de segurança da sessão para código
descarregado da internet, por isso estas execuções param antes do `record`.

| Biblioteca | analyze | bridge |
| --- | --- | --- |
| scule (conversão de maiúsculas/minúsculas) | 2 unidades, prontas | todas as 11 funções passíveis de bridge após a correção abaixo |
| ufo (utilitários de URL) | 7 unidades, prontas; `punycode.ts` em primeiro lugar | `toASCII` com bridge (JS sem tipos: passa como JSON) |
| pathe (utilitários de caminhos) | 5 unidades; cuidado com `_glob.ts` (regex dinâmica) | 13 funções com bridge; exports tipados com `typeof path.join` passam como JSON |

Encontrado na ferramenta, e corrigido: os genéricos com restrições (`camelCase<T extends string | readonly
string[]>`) eram tratados como "qualquer valor, incluindo funções", o que mantinha 10 das 11
funções do scule em TS. Os parâmetros de tipo com restrições de dados são agora substituídos pela restrição.

Foi escrita uma migração do scule (`demo` não incluída: nunca foi registada face ao original).
