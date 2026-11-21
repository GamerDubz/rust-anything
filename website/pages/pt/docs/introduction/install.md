---
title: Instalação
description: Instale o rust-anything a partir do crates.io, do npm ou de um binário de lançamento, e os runtimes de que cada linguagem precisa.
---

# Instalação

## A partir do crates.io, do npm ou de um lançamento

::: tabs
== cargo
```sh
cargo install rust-anything
rust-anything setup
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

O npm instala o mesmo binário, para projetos JavaScript.

Os binários pré-compilados para macOS, Linux e Windows estão anexados a cada [lançamento no GitHub](https://github.com/erkamyaman/rust-anything/releases). No Claude Code, também o pode instalar como plugin (o servidor MCP e a skill; a CLI tem de estar no seu `PATH`):

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

## A partir do código-fonte

```sh
cargo install --path .
```

O `record`, o `diff` e o `bench` executam o original no seu próprio runtime: Node 22.6+ para TS (executa diretamente
fontes `.ts`), Python 3.9+ para Python e C (ctypes), Go 1.21+, Ruby 3+, JDK 17+
(`javac` e `java`). O `profile` em Node precisa do Node 24+, que permite `--cpu-prof` em `NODE_OPTIONS`. O C precisa também de um compilador de C. As bridges wasm precisam ainda de `rustup target add wasm32-unknown-unknown` e de
`cargo install wasm-bindgen-cli --version <the crate's wasm-bindgen version> --locked`; o `build` indica
a versão exata.

## Windows

A CI nativa em Windows utiliza o target Rust `x86_64-pc-windows-msvc`. Instale a toolchain MSVC estável
e as Visual Studio Build Tools com a carga de trabalho **Desktop development with C++**; o
compilador de C e o linker são necessários para as bridges de C e as extensões nativas em Rust. Instale o runtime
da linguagem de origem que está a migrar. O Python pode estar disponível como `python3` ou
`python`; o rust-anything deteta ambos. O target GNU para Windows não é testado pela CI.

Execute a suite de integração das bridges nativas a partir de uma linha de comandos Developer PowerShell:

```powershell
rustup default stable-x86_64-pc-windows-msvc
cargo test --locked --test native -- --nocapture
```

A suite compila e carrega extensões reais de Node e Python baseadas em DLL, bem como as bridges nativas
suportadas para cada runtime presente no `PATH`. Os runtimes opcionais em falta são assinalados como ignorados;
o Cargo, a biblioteca padrão do Rust ativa e o linker MSVC são obrigatórios. Se o Cargo indicar que
não encontra `std`, reinstale o target ativo com
`rustup target remove x86_64-pc-windows-msvc` seguido de
`rustup target add x86_64-pc-windows-msvc`. Se a ligação (linking) falhar, execute a partir de uma Developer
PowerShell do Visual Studio e verifique se `where.exe link` encontra o linker MSVC. Os testes utilizam pastas temporárias,
incluindo um caminho com espaços e caracteres Unicode, e removem os artefactos gerados após uma
execução bem-sucedida.

Para agentes, o `rust-anything setup` regista tudo (consulte o Início rápido). Para adicionar manualmente o servidor MCP a
um único projeto (`.mcp.json`):

```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

Cada ferramenta, os seus parâmetros e aquilo em que pode mexer: [docs/tools.md](/docs/reference/mcp-tools). O servidor oferece também
dois prompts, `port_unit` e `port_whole_app`, construídos a partir da skill.
## Atualizar ou remover

```sh
cargo install rust-anything                                    # atualizar (Cargo)
npm install -g rust-anything@latest                            # atualizar (npm)
rust-anything setup                                            # atualizar as definições dos agentes
rust-anything setup --remove && cargo uninstall rust-anything  # remover (Cargo)
rust-anything setup --remove && npm uninstall -g rust-anything # remover (npm)
```

O `setup --remove` remove apenas as entradas do rust-anything; as cópias guardadas
(`<file>.rust-anything.bak`) ficam até as apagar.
