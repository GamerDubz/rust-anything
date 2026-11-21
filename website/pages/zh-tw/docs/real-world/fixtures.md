---
title: Fixture 與靜態執行
description: 為了對工具施壓而撰寫的 fixture，以及經過分析與橋接但未執行的外部函式庫。
---

# Fixture 與靜態執行

## 為了對工具施壓而撰寫的 fixture

| Fixture | 測試內容 | 結果 |
| --- | --- | --- |
| `tests/fixtures/async` | 兩種橋接上的 async 函式 | 900/900，兩個 gate 都通過 |
| `tests/fixtures/classes` | 類別：狀態、建構子錯誤、`Map` 順序、對 emoji 執行 `split('')` | 600/600 個情境，兩個 gate 都通過 |
| `tests/fixtures/aliases` | 含 `extends`、註解、結尾逗號的 tsconfig `paths` | analyze 與 record 都能正確跟隨 |
| `tests/fixtures/monorepo` | 匯入沒有建置輸出的同層套件的套件 | record 會將它解析到原始碼 |

在工具中發現並已修正的問題：napi 把 `None` 轉成了 `null`（JS 會得到 `undefined`）；情境
太短且太隨機，抓不到有狀態的錯誤（現在最多 12 次呼叫，並重複使用先前的字串）；
產生了 clippy 會拒絕的 `let out = ()` 與立即呼叫的閉包。
## 外部函式庫（僅靜態）

`unjs/scule`、`unjs/ufo` 與 `unjs/pathe` 經過複製、分析與橋接。執行它們的
程式碼（`record` 會執行原始版本）被工作階段針對從網路下載之程式碼的安全政策拒絕，
所以這些執行在 `record` 之前就停止了。

| 函式庫 | analyze | bridge |
| --- | --- | --- |
| scule（大小寫轉換） | 2 個單元，就緒 | 經過下方的修正後，全部 11 個函式都可橋接 |
| ufo（URL 工具） | 7 個單元，就緒；`punycode.ts` 排名第一 | `toASCII` 已橋接（未標型別的 JS：以 JSON 跨越） |
| pathe（路徑工具） | 5 個單元；`_glob.ts` 需注意（動態正規表示式） | 13 個函式已橋接；型別為 `typeof path.join` 的匯出以 JSON 跨越 |

在工具中發現並已修正的問題：有約束的泛型（`camelCase<T extends string | readonly
string[]>`）被視為「任何值，包括函式」，導致 scule 的 11 個函式中有 10 個
被留在 TS 中。具有資料約束的型別參數現在會以其約束取代。

已撰寫了 scule 的移植版本（未包含在 `demo` 中：它從未與原始版本比對錄製過）。
