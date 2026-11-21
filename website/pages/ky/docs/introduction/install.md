---
title: Орнотуу
description: rust-anything'ти crates.io, npm же release бинардык файлынан орнотуу жана ар бир тилге керектүү runtime'дар.
---

# Орнотуу

## crates.io, npm же release аркылуу

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

npm JavaScript долбоорлору үчүн ошол эле бинардык файлды орнотот.

macOS, Linux жана Windows үчүн даяр бинардык файлдар ар бир [GitHub release](https://github.com/erkamyaman/rust-anything/releases) барагына тиркелген. Claude Code ичинде аны плагин катары да орнотсоңуз болот (MCP сервер жана skill; CLI сиздин `PATH` ичинде болушу керек):

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

## Баштапкы коддон

```sh
cargo install --path .
```

`record`, `diff` жана `bench` түп нусканы өзүнүн runtime'ында иштетет: TS үчүн Node 22.6+ (ал `.ts`
баштапкы файлдарын түз иштетет), Python жана C үчүн Python 3.9+ (ctypes), Go 1.21+, Ruby 3+, JDK 17+
(`javac` жана `java`). Node'догу `profile` үчүн Node 24+ керек, анткени ал `NODE_OPTIONS` ичинде `--cpu-prof` колдонууга уруксат берет. C үчүн C компилятору да керек. wasm bridge'дерине `rustup target add wasm32-unknown-unknown` жана
`cargo install wasm-bindgen-cli --version <the crate's wasm-bindgen version> --locked` да керек; так версиясын
`build` айтат.

## Windows

Windows'тогу нативдик CI `x86_64-pc-windows-msvc` Rust target'ин колдонот. Туруктуу MSVC
toolchain'ин жана **Desktop development with C++** workload'у менен Visual Studio Build Tools'ту орнотуңуз;
C компилятору жана linker C bridge'дери жана нативдик Rust кеңейтүүлөрү үчүн милдеттүү. Көчүрүп жаткан
баштапкы тилиңиздин runtime'ын орнотуңуз. Python `python3` же
`python` катары жеткиликтүү болушу мүмкүн; rust-anything экөөн тең табат. Windows'тун GNU target'и CI'да текшерилбейт.

Нативдик bridge интеграция тесттерин Developer PowerShell терезесинен иштетиңиз:

```powershell
rustup default stable-x86_64-pc-windows-msvc
cargo test --locked --test native -- --nocapture
```

Тесттер DLL'ге негизделген чыныгы Node жана Python кеңейтүүлөрүн, ошондой эле `PATH` ичинде бар ар бир
runtime үчүн колдоого алынган нативдик bridge'дерди куруп, жүктөйт. Жок болгон милдеттүү эмес runtime'дар өткөрүлүп жиберилди деп
көрсөтүлөт; Cargo, активдүү Rust стандарттык китепканасы жана MSVC linker милдеттүү. Эгер Cargo
`std` табылбады деп айтса, активдүү target'ти
`rustup target remove x86_64-pc-windows-msvc`, андан кийин
`rustup target add x86_64-pc-windows-msvc` менен кайра орнотуңуз. Эгер байланыштыруу (linking) ишке ашпаса, Visual Studio Developer
PowerShell'ден иштетип, `where.exe link` MSVC linker'ин тапканын текшериңиз. Тесттер убактылуу папкаларды,
анын ичинде боштуктары жана Unicode символдору бар жолду колдонот жана ийгиликтүү иштетүүдөн кийин
генерацияланган артефакттарды өчүрөт.

Агенттер үчүн `rust-anything setup` баарын каттайт (Тез баштоо барагын караңыз). Анын ордуна MCP серверди
бир долбоорго кол менен кошуу үчүн (`.mcp.json`):

```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

Ар бир курал, анын параметрлери жана ал эмнеге тие алары: [docs/tools.md](/docs/reference/mcp-tools). Сервер ошондой эле
skill'ден курулган эки prompt сунуштайт: `port_unit` жана `port_whole_app`.
## Жаңыртуу же өчүрүү

```sh
cargo install rust-anything                                    # update (Cargo)
npm install -g rust-anything@latest                            # update (npm)
rust-anything setup                                            # refresh agent settings
rust-anything setup --remove && cargo uninstall rust-anything  # remove (Cargo)
rust-anything setup --remove && npm uninstall -g rust-anything # remove (npm)
```

`setup --remove` rust-anything'тин жазууларын гана алып салат; ал сактаган көчүрмөлөр
(`<file>.rust-anything.bak`) сиз өчүрмөйүнчө калат.
