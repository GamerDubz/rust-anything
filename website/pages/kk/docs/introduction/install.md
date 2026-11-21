---
title: Орнату
description: rust-anything-ті crates.io, npm немесе release бинарлық файлынан орнату, және әр тілге қажет runtime-дар.
---

# Орнату

## crates.io, npm немесе release арқылы

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

npm JavaScript жобалары үшін сол бинарлық файлды орнатады.

macOS, Linux және Windows үшін дайын бинарлық файлдар әр [GitHub release](https://github.com/erkamyaman/rust-anything/releases) бетіне тіркелген. Claude Code ішінде оны плагин ретінде де орнатуға болады (MCP сервер және skill; CLI сіздің `PATH` ішінде болуы керек):

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

## Бастапқы кодтан

```sh
cargo install --path .
```

`record`, `diff` және `bench` түпнұсқаны өз runtime-ында іске қосады: TS үшін Node 22.6+ (ол `.ts`
бастапқы файлдарын тікелей іске қосады), Python мен C үшін Python 3.9+ (ctypes), Go 1.21+, Ruby 3+, JDK 17+
(`javac` және `java`). Node-та `profile` үшін Node 24+ керек, ол `NODE_OPTIONS` ішінде `--cpu-prof` рұқсат етеді. C үшін C компиляторы да керек. wasm bridge-тері үшін тағы `rustup target add wasm32-unknown-unknown` және
`cargo install wasm-bindgen-cli --version <the crate's wasm-bindgen version> --locked` керек; нақты нұсқасын
`build` атайды.

## Windows

Windows-тағы нативті CI `x86_64-pc-windows-msvc` Rust target-ін қолданады. Тұрақты MSVC
toolchain-ін және **Desktop development with C++** workload-ы бар Visual Studio Build Tools орнатыңыз;
C компиляторы мен linker C bridge-тері және нативті Rust кеңейтімдері үшін қажет. Көшіріп жатқан
бастапқы тіліңіздің runtime-ын орнатыңыз. Python `python3` немесе `python` ретінде қолжетімді болуы
мүмкін; rust-anything екеуін де анықтайды. GNU Windows target-і CI-да тексерілмейді.

Нативті bridge интеграциялық тесттерін Developer PowerShell терезесінен іске қосыңыз:

```powershell
rustup default stable-x86_64-pc-windows-msvc
cargo test --locked --test native -- --nocapture
```

Бұл тесттер нақты DLL негізіндегі Node және Python кеңейтімдерін, сондай-ақ `PATH` ішінде бар әр
runtime үшін қолдау көрсетілетін нативті bridge-терді құрастырып, жүктейді. Жоқ қосымша runtime-дар
өткізіп жіберілді деп хабарланады; Cargo, белсенді Rust стандартты кітапханасы және MSVC linker міндетті.
Егер Cargo `std` таба алмайтынын хабарласа, белсенді target-ті
`rustup target remove x86_64-pc-windows-msvc`, содан кейін
`rustup target add x86_64-pc-windows-msvc` арқылы қайта орнатыңыз. Егер байланыстыру (linking) құласа,
Visual Studio Developer PowerShell ішінен іске қосып, `where.exe link` MSVC linker-ін табатынын тексеріңіз.
Тесттер уақытша бумаларды қолданады, оның ішінде бос орындар мен Unicode таңбалары бар жол да бар, және
сәтті іске қосудан кейін генерацияланған артефактілерді жояды.

Агенттер үшін `rust-anything setup` барлығын тіркейді (Жылдам бастау бөлімін қараңыз). MCP серверді оның
орнына бір жобаға қолмен қосу үшін (`.mcp.json`):

```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

Әр құрал, оның параметрлері және ол неге қол тигізуі мүмкін: [docs/tools.md](/docs/reference/mcp-tools). Сервер
сондай-ақ skill негізінде құрылған екі prompt ұсынады: `port_unit` және `port_whole_app`.
## Жаңарту немесе жою

```sh
cargo install rust-anything                                    # жаңарту (Cargo)
npm install -g rust-anything@latest                            # жаңарту (npm)
rust-anything setup                                            # агент баптауларын жаңарту
rust-anything setup --remove && cargo uninstall rust-anything  # жою (Cargo)
rust-anything setup --remove && npm uninstall -g rust-anything # жою (npm)
```

`setup --remove` тек rust-anything жазбаларын алып тастайды; ол сақтаған көшірмелер
(`<file>.rust-anything.bak`) өзіңіз жоймайынша қала береді.
