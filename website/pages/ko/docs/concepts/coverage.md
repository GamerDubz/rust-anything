---
title: 커버리지
description: 기록된 케이스가 원본을 얼마나 실행했는지를 TypeScript/JavaScript에 대해 record와 gate가 보고합니다.
---

# 커버리지

`diff`를 통과했다는 것은 포트가 기록된 모든 케이스와 일치한다는 뜻입니다. 커버리지는 그 케이스들이 원본을 얼마나 실행했는지 알려 주므로, 기록이 다루지 않는 부분을 알 수 있습니다.

TypeScript/JavaScript의 경우 `record`는 V8의 커버리지로 케이스가 실행한 원본의 줄을 측정하고, `gate`는 이를 정보용 검사(항상 통과)로 출력합니다: 도달한 줄의 비율과, 놓친 줄이 가장 많은 파일. 다른 언어는 아직 측정하지 않습니다.

Fuse.js에서는 케이스가 유닛이 import하는 줄의 81%를 실행했습니다([현황](/docs/project/status)).

## 커버리지 높이기

케이스가 한 번도 도달하지 않는 줄은 아무도 검사하지 않은 동작입니다. 다음 방법으로 도달하세요:

- `record --from-tests -- <test command>`: 원본의 자체 테스트 스위트가 하는 모든 호출을 기록합니다.
- `record --inputs`: 생성된 입력이 놓치는 경로를 타는 실제 입력(구조화된 인자, 도메인 문자열)을 넣습니다.

[기록](/docs/concepts/record)과 [잡아내지 못하는 것](/docs/concepts/limits)을 참고하세요.
