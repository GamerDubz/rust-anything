---
title: Python
description: 透過 PyO3 將 Python 套件或 module 移植到 Rust，具型別的例外，並保留原本的 API。
---

# Python

| | |
| --- | --- |
| 單元 | 一個套件或 module |
| 橋接 | PyO3（abi3），直接轉換，具型別的例外 |
| 錄製與重播方式 | Python，匯入原始版本 |
| 需求 | Python 3.9+ |
| 狀態 | 已在 CPython 3.13 的 `colorsys.py` 上驗證：2,400/2,400，gate 通過 |

型別來自型別提示。當作數字使用的未標型別參數（`r - g`、`max(r, g, b)`、`x < 1`）會被推斷為數字。`record --from-tests -- pytest` 會錄製原始版本自己的測試套件所做的每一次呼叫（已測試）。

## 移植版本必須做對的地方

- Python 的呼叫端傳入 `1` 的頻率和 `1.0` 一樣高，而整數會原樣傳遞。錄製時每四個案例中就有一個會將整數值以 int 傳入；一個型別為 `f64` 的移植版本在錄製了整數之後出現 134 個不一致。對於可能是整數或浮點數的值，請使用 `crate::pynum::Num`。
- `max(nan, 1, 2)` 是 `nan`：除非後面的值比較起來更大，否則第一個值勝出。
- `-0.0 % 1.0` 是 `0.0`。
- 以 `Err("TypeName: message")` 回傳的錯誤會變成該例外。

已由 numba、Cython 或 JAX 編譯的程式碼是以機器碼執行：`profile` 與 `analyze` 會標出它，因為移植它幾乎不會提升速度。

## 速度

呼叫 Rust 的成本約為 100-300 ns，而 Rust 程式碼比直譯器快得多，所以即使是小函式也能勝出。在 `colorsys` 上，`bench` 量測到移植版本單次呼叫比 CPython **快 1.35x**（大多數呼叫 1.5-1.9x）。改用批次時，`slugify` 處理 20,000 個字串從 98 ms 變成在 4 核心上**快 17x**。

詳情：[六種語言](/docs/real-world/six-languages)。
