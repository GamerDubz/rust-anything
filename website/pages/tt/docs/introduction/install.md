---
title: Урнаштыру
description: rust-anything'ны crates.io, npm яки релиз бинар файлыннан урнаштыру, һәм һәр телгә кирәкле runtime'лар.
---

# Урнаштыру

## crates.io, npm яки релизтан

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

npm JavaScript проектлары өчен шул ук бинар файлны урнаштыра.

macOS, Linux һәм Windows өчен әзер бинар файллар һәр [GitHub релизына](https://github.com/erkamyaman/rust-anything/releases) беркетелгән. Claude Code'та аны плагин итеп тә урнаштырып була (MCP сервер һәм skill; CLI сезнең `PATH` эчендә булырга тиеш):

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

## Чыганак коддан

```sh
cargo install --path .
```

`record`, `diff` һәм `bench` оригиналны аның үз runtime'ында җибәрә: TS өчен Node 22.6+ (ул `.ts`
чыганакларын турыдан-туры җибәрә), Python һәм C өчен Python 3.9+ (ctypes), Go 1.21+, Ruby 3+, JDK 17+
(`javac` һәм `java`). Node'та `profile` өчен Node 24+ кирәк, ул `NODE_OPTIONS` эчендә `--cpu-prof` рөхсәт итә. C өчен тагын C компиляторы кирәк. wasm bridge'лар өчен шулай ук `rustup target add wasm32-unknown-unknown` һәм
`cargo install wasm-bindgen-cli --version <the crate's wasm-bindgen version> --locked` кирәк; төгәл версияне
`build` әйтә.

## Windows

Windows'тагы туган CI `x86_64-pc-windows-msvc` Rust target'ын куллана. Тотрыклы MSVC
toolchain'ын һәм **Desktop development with C++** workload'лы Visual Studio Build Tools урнаштырыгыз;
C компиляторы һәм linker C bridge'лары һәм туган Rust киңәйтмәләре өчен кирәк. Сез күчерә торган чыганак тел
өчен runtime урнаштырыгыз. Python `python3` яки `python` исеме белән булырга мөмкин;
rust-anything икесен дә таба. GNU Windows target'ы CI'да тикшерелми.

Туган bridge интеграция тестларын Developer PowerShell'дан җибәрегез:

```powershell
rustup default stable-x86_64-pc-windows-msvc
cargo test --locked --test native -- --nocapture
```

Тестлар чын DLL нигезендәге Node һәм Python киңәйтмәләрен һәм `PATH` эчендә булган һәр runtime өчен
ярдәм ителгән туган bridge'ларны җыя һәм йөкли. Булмаган өстәмә runtime'лар төшереп калдырылган дип күрсәтелә;
Cargo, актив Rust стандарт китапханәсе һәм MSVC linker мәҗбүри. Cargo `std` таба алмый дип хәбәр итсә,
актив target'ны яңадан урнаштырыгыз: башта
`rustup target remove x86_64-pc-windows-msvc`, аннары
`rustup target add x86_64-pc-windows-msvc`. Link итү уңышсыз булса, Visual Studio Developer
PowerShell'дан җибәрегез һәм `where.exe link` MSVC linker'ны табуын тикшерегез. Тестлар вакытлыча папкалар куллана,
шул исәптән бушлыклы һәм Unicode символлы юлны, һәм уңышлы җибәрүдән соң ясалган артефактларны бетерә.

Агентлар өчен `rust-anything setup` барысын да теркәп куя (Тиз башлау битен карагыз). MCP серверны
бер проектка кулдан өстәргә теләсәгез (`.mcp.json`):

```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

Һәр корал, аның параметрлары һәм ул нәрсәгә кагыла ала: [docs/tools.md](/docs/reference/mcp-tools). Сервер шулай ук
skill нигезендә төзелгән ике prompt тәкъдим итә: `port_unit` һәм `port_whole_app`.
## Яңарту яки бетерү

```sh
cargo install rust-anything                                    # яңарту (Cargo)
npm install -g rust-anything@latest                            # яңарту (npm)
rust-anything setup                                            # агент көйләнмәләрен яңарту
rust-anything setup --remove && cargo uninstall rust-anything  # бетерү (Cargo)
rust-anything setup --remove && npm uninstall -g rust-anything # бетерү (npm)
```

`setup --remove` rust-anything язмаларын гына алып ташлый; ул саклаган күчермәләр
(`<file>.rust-anything.bak`) сез аларны бетергәнче кала.
