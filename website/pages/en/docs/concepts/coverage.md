---
title: Coverage
description: How much of the original the recorded cases ran, reported by record and gate for TypeScript/JavaScript.
---

# Coverage

Passing `diff` means the port matches every recorded case. Coverage tells you how much of the original those cases ran, so you know what the recording does not cover.

For TypeScript/JavaScript, `record` measures the lines of the original the cases ran, from V8's coverage, and `gate` prints it as a passing, informational check: the share of lines reached, and the files with the most lines missed. Other languages do not measure it yet.

On Fuse.js, the cases ran 81% of the lines the unit imports ([status](/docs/project/status)).

## Raising it

Lines the cases never reach are behavior nobody checked. Reach them with:

- `record --from-tests -- <test command>`, to record every call the original's own test suite makes;
- `record --inputs`, with real inputs that take the paths the generated ones miss (structured arguments, domain strings).

See [Record](/docs/concepts/record) and [What it can't catch](/docs/concepts/limits).
