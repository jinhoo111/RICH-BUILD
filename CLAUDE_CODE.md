# CLAUDE_CODE.md — 리치빌드 (RichBuild) Claude Code 프롬프트 모음
> 버전: v2.0 | 작성일: 2026-06-07
>
> 이 파일의 용도:
> - PHASE 0-1 ~ 0-3: Claude 대화창(claude.ai)에 붙여넣는 프롬프트
> - PHASE 0-4 ~ 이후: Claude Code CLI(터미널)에 붙여넣는 프롬프트
>
> 새 세션 시작 시: CLAUDE.md + 이 파일 + 해당 PRD를 함께 첨부
> Phase 완료 시: § 3 진행 상태 업데이트 후 다음 Phase로 이동

---

## 1. Claude Code 핵심 규칙

모든 Phase 시작 시 Claude Code에 이 규칙이 인식되어야 한다.
세션 오프닝 프롬프트에 항상 포함.

### 규칙 A — 보고 → 승인 → 실행 (3단계 필수)
```
어떤 작업이든 반드시 이 순서를 따른다:

[1단계] 보고
  코드 작성 전 반드시 아래 형식으로 먼저 보고:
  - 생성/수정할 파일 목록
  - 각 파일에서 할 작업 요약
  - 기존 기능에 미치는 영향

[2단계] 승인
  사용자가 "진행해" / "OK" / "승인" 이라고 말할 때까지 대기
  승인 없이 파일 생성·수정 절대 금지

[3단계] 실행
  승인된 범위 내에서만 작업
  승인 범위를 벗어나면 즉시 멈추고 다시 보고
```

### 규칙 B — 범위 외 절대 금지
```
이번 Phase에서 명시된 파일·기능 외 절대 건드리지 않는다.

금지 사항:
  ❌ 명시되지 않은 파일 수정
  ❌ 임의로 기능 추가
  ❌ 리팩토링·코드 정리 (지시 없으면 금지)
  ❌ 변수명·함수명 임의 변경
  ❌ 외부 라이브러리 임의 추가
  ❌ PRD 내용 임의 해석·확장

범위 외 작업이 필요하다고 판단되면:
  → 즉시 멈추고 보고
  → "[파일명] 수정이 필요합니다. 이유: [이유]. 진행해도 될까요?" 형식으로 질문
```

### 규칙 C — 오류 발생 시 처리
```
오류 발생 시 즉시 아래 형식으로 보고:

[오류 보고]
발생 위치: (파일명, 줄 번호)
오류 메시지: (전문 그대로)
원인 분석: (추정 원인)
영향 범위: (다른 기능 영향 여부)
해결 방안:
  - 옵션 A: [방법] → 장단점
  - 옵션 B: [방법] → 장단점

⚠️ 절대 규칙:
  - 보고 후 사용자가 "진행해" / "옵션 A로" / "OK" 라고 할 때까지
    코드 수정 절대 금지
  - 오류가 명백해 보여도 임의로 수정하지 않음
  - 여러 오류가 동시에 발생해도 하나씩 보고 → 확답 → 수정 순서 준수
  - "빠르게 고치겠습니다" 같은 말 후 바로 수정하는 것 금지
```

### 규칙 D — 비전공자 친화 설명
```
모든 설명은 비전공자가 이해할 수 있게:
  - 전문 용어는 반드시 비유로 풀어서 설명
  - 각 파일이 무엇을 하는지 한 줄로 설명
  - 다음에 할 일을 번호 체크리스트로 제시
  - 에러는 "이게 왜 나왔는지" 일상 언어로 설명

예시:
  ❌ "RLS 정책 위반으로 인한 PostgreSQL 권한 오류"
  ✅ "데이터베이스 보안 설정 때문에 접근이 막혔어요.
      잠금장치가 걸려있는데 열쇠를 안 가져온 상황입니다."
```

### 규칙 E — Phase 완료 조건
```
각 Phase는 아래를 모두 만족해야 완료:
  □ QA 체크리스트 전 항목 통과
  □ 브라우저에서 직접 확인
  □ GitHub Desktop으로 commit 완료
  □ GitHub Pages URL에서 동작 확인
  □ CLAUDE_CODE.md § 3 진행 상태 업데이트
```

---

## 2. 전체 개발 로드맵

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1단계: HTML 단일 파일 MVP (4~6주)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 0   환경 세팅                              ← 지금 여기
  0-1. VS Code + GitHub Desktop 설치 확인        (claude.ai 대화창)
  0-2. Supabase 계정 + 프로젝트 생성             (claude.ai 대화창)
  0-3. GitHub 레포 생성 + Pages 설정             (claude.ai 대화창)
  0-4. index.html 뼈대 + CSS 토큰 등록           (Claude Code CLI)
  0-5. persona-text.js 생성                      (Claude Code CLI)
  0-6. supabase-client.js 생성 + 연결 테스트     (Claude Code CLI)
  0-7. GitHub Pages 배포 + 최종 확인             (Claude Code CLI)

PHASE 1   Supabase 스키마 생성
  1-1. 테이블 23개 순차 생성
  1-2. app_config 초기값 INSERT + RLS 확인

PHASE 2   인증 + 온보딩
  2-1. 구글 OAuth 설정                         (claude.ai 대화창)
  2-2. 인증 + 온보딩 전체 구현                 (Claude Code CLI)
       (로그인·닉네임·페르소나·조직명·세션 유지·로그아웃 포함)

PHASE 3   다중 계좌 관리 ← 킬러 기능
  3-1. 계좌 CRUD
  3-2. 종목 CRUD + 수익률 계산
  3-3. 국내 주가 연동 (Yahoo Finance)
  3-4. 미국 주가 연동 (Finnhub)
  3-5. 환율 연동 + 원화/달러 토글
  3-6. 포트폴리오 수익률 최종 계산
  ★ PHASE 3 통합 QA

PHASE 4   시장 지표 위젯
PHASE 5   뉴스 피드 + 공지 배너
PHASE 6   투자 일지
PHASE 7   마이페이지 + 공지사항
PHASE 8   구독 UI + 접근 제어
PHASE 9   MVP 디자인 폴리싱
PHASE 10  MVP 통합 QA + 베타 출시

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2단계: v1.x 고도화 (MVP 검증 후)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 11  결제 활성화 (포트원 v2)
PHASE 12  FCM 알림 예약 + 계좌 인증
PHASE 13  수익 그래프 (30일 데이터 적재 후)
PHASE 14  PostHog + Sentry 연동
PHASE 15  관리자 대시보드
PHASE 16  섹터 필터 + 페르소나 변경 유료화

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3단계: v2.0 게이미피케이션 + 커뮤니티 (MAU 5,000+)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 17  AI 번역·요약 활성화
PHASE 18  배지 시스템 전체
PHASE 19  커뮤니티 오픈
PHASE 20  광고 관리

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4단계: v2.x BM 고도화 (MAU 3만+)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 21  모의투자 대회 이벤트 시스템
PHASE 22  리그 랭킹 + 시즌제
PHASE 23  React Native 앱 전환 + Play Store
```

---

## 3. 현재 진행 상태

```
마지막 업데이트: 2026-06-09

[문서 완료]
  ✅ PRD_00~PRD_10 + PRD_MASTER 작성
  ✅ CLAUDE.md v2 (스택 확정 반영)
  ✅ bx_richbuild.md (BX 6종)
  ✅ designsystem_richbuild.md (디자인 시스템 토큰)
  ✅ CLAUDE_CODE.md (전체 Phase 0~10 프롬프트 완성)

[개발 진행 상태]
  ⏳ PHASE 0  환경 세팅
    □ 0-1. VS Code + GitHub Desktop 설치 확인
    □ 0-2. Supabase 계정 + 프로젝트 생성
    □ 0-3. GitHub 레포 생성 + Pages 설정
    □ 0-4. index.html 뼈대 + CSS 토큰 등록
    □ 0-5. persona-text.js 생성
    □ 0-6. supabase-client.js 생성 + 연결 테스트
    □ 0-7. GitHub Pages 배포 + 최종 확인

  ⏳ PHASE 1  Supabase 스키마
    □ 1-1. 테이블 23개 순차 생성
    □ 1-2. app_config 초기값 INSERT + RLS 설정

  ⏳ PHASE 2  인증 + 온보딩
    □ 2-1. 구글 OAuth 설정
    □ 2-2. 인증 + 온보딩 전체 구현

  ⏳ PHASE 3  다중 계좌 관리 (킬러 기능)
    □ 3-1. 계좌 CRUD
    □ 3-2. 종목 CRUD + 수익률 계산
    □ 3-3. 국내 주가 연동 + 티커 자동완성
    □ 3-4. 미국 주가 연동 (Finnhub)
    □ 3-5. 환율 연동 + 원화/달러 토글
    □ 3-6. 포트폴리오 수익률 최종 계산 + 통합 QA

  ⏳ PHASE 4  시장 지표 위젯
    □ 4-1. 시장 지표 위젯

  ⏳ PHASE 5  뉴스 피드 + 공지 배너
    □ 5-1. 뉴스 피드 + get-news Edge Function

  ⏳ PHASE 6  투자 일지
    □ 6-1. 일지 CRUD + 계명 체크 + 예약 알림 + 자동생성

  ⏳ PHASE 7  마이페이지
    □ 7-1. 마이페이지 메인 + 프로필 + API 키 + 설정 + 탈퇴

  ⏳ PHASE 8  구독 UI + 접근 제어
    □ 8-1. 구독 UI + checkPremiumAccess 유틸

  ⏳ PHASE 9  디자인 폴리싱
    □ 9-1. CSS 토큰 정의 + 공통 컴포넌트
    □ 9-2. 화면별 디자인 적용

  ⏳ PHASE 10  통합 QA + 베타 출시
    □ 10-1. API 키 QA + 성능 최적화 (7초 이내)
    □ 10-2. 전체 통합 QA + 베타 출시

[진행 방법]
  각 Phase 완료 시 □ → ✅ 로 직접 체크
  새 세션 시작 시 이 섹션 보고 현재 Phase 확인 후 해당 프롬프트로 이동

[파일 구조 현재 상태]
  richbuild/
  (아직 없음 — PHASE 0 실행 후 생성 예정)
```

> 새 세션 시작 시 이 섹션을 보고 현재 Phase 확인 후 해당 프롬프트로 이동

---

## 4. PHASE 0 — 환경 세팅

> 목표: 개발 환경 세팅 + GitHub Pages 배포 확인
> 산출물: GitHub Pages URL에서 빈 앱 뼈대가 뜨는 상태
> 예상 소요: 2~3시간
> 주의: 0-1 → 0-7 순서대로 진행. 각 완료 조건 확인 후 다음으로.

---

### PHASE 0-1. VS Code + GitHub Desktop 설치 확인

> 실행 위치: claude.ai 대화창 (Claude Code 아님)

```
나는 리치빌드(RichBuild) 투자 관리 웹서비스를 개발하려고 합니다.
비전공자이고 Claude와 함께 단계별로 개발합니다.
Windows 환경입니다.

지금은 PHASE 0-1입니다.
개발 환경이 제대로 설치되어 있는지 확인하고 싶습니다.

아래 3가지를 확인하는 방법을 단계별로 알려주세요.
각 항목마다 "설치 확인 방법"과 "설치 안 되어 있을 때 설치 방법"을 같이 알려주세요.

1. VS Code 설치 여부
2. GitHub Desktop 설치 여부
3. Chrome 브라우저 설치 여부

전문 용어는 쉽게 풀어서 설명해주세요.
확인이 끝나면 아래 형식으로 완료 체크리스트를 주세요:
□ VS Code 실행 확인
□ GitHub Desktop 실행 확인
□ Chrome 브라우저 확인
```

**완료 조건:**
```
□ VS Code 실행됨
□ GitHub Desktop 실행됨
□ Chrome 브라우저 있음
→ 전부 OK → 0-2로 이동
```

---

### PHASE 0-2. Supabase 계정 + 프로젝트 생성

> 실행 위치: claude.ai 대화창 (Claude Code 아님)

```
PHASE 0-1 완료했습니다.
이제 PHASE 0-2입니다.

Supabase 계정을 만들고 프로젝트를 생성하려고 합니다.
Supabase는 처음 써봅니다.

아래 순서로 안내해주세요:

1. Supabase 계정 생성 (supabase.com 접속부터 단계별로)

2. 새 프로젝트 생성
   - 프로젝트명: richbuild
   - 지역: Northeast Asia (Seoul) 선택
   - DB 비밀번호: 안전한 것으로 직접 설정

3. 프로젝트 생성 완료 후 아래 두 가지를 어디서 찾는지 알려주세요:
   - Project URL (예: https://xxxx.supabase.co)
   - anon public key (공개해도 되는 키)

각 단계마다 어떤 화면이 나올지 미리 알려주세요.
전문 용어는 쉽게 풀어서 설명해주세요.
```

**완료 조건:**
```
□ Supabase 계정 생성 완료
□ richbuild 프로젝트 생성 완료 (Seoul 리전)
□ Project URL 메모장에 복사해둠
□ anon public key 메모장에 복사해둠
→ 전부 OK → 0-3으로 이동
```

---

### PHASE 0-3. GitHub 레포 생성 + Pages 설정

> 실행 위치: claude.ai 대화창 (Claude Code 아님)

```
PHASE 0-2 완료했습니다.
이제 PHASE 0-3입니다.

GitHub에 레포지토리를 만들고 GitHub Pages를 설정하려고 합니다.
GitHub 계정이 있고 GitHub Desktop이 설치되어 있습니다.
Windows 환경입니다.

아래 순서로 안내해주세요:

1. GitHub.com에서 새 레포지토리 생성
   - 이름: richbuild
   - Public으로 설정
   - "Add a README file" 체크

2. GitHub Desktop으로 내 컴퓨터에 클론하기
   - 저장 위치: 바탕화면

3. GitHub Pages 활성화
   - 레포 Settings → Pages → Branch: main → Save

4. 생성된 GitHub Pages URL 확인
   예: https://[내아이디].github.io/richbuild

각 단계마다 어떤 화면에서 뭘 클릭하는지 구체적으로 알려주세요.
```

**완료 조건:**
```
□ GitHub richbuild 레포 생성 완료 (Public)
□ 바탕화면에 richbuild 폴더 클론 완료
□ 폴더 안에 README.md 파일 있음
□ GitHub Pages 활성화 완료
□ Pages URL 메모장에 복사해둠
  (예: https://[아이디].github.io/richbuild)
→ 전부 OK → 0-4로 이동 (이제부터 Claude Code CLI 사용)
```

---

### PHASE 0-4. index.html 뼈대 + CSS 토큰 등록

> 실행 위치: Claude Code CLI (터미널)
> Claude Code 시작 방법: 터미널에서 richbuild 폴더로 이동 후 `claude` 입력

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
개발자: 비전공자, Windows, Claude Code로 개발
현재 폴더 구조:
richbuild/
└── README.md

== 이번 Phase 목표 ==
index.html 파일 1개 생성
(HTML + CSS + JS 모두 이 파일 하나에 통합)

== 만들 내용 ==

[1] Supabase JS SDK CDN 연결 (아직 실제 연결 코드 없이 script 태그만)
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

[2] Google Fonts — Noto Sans KR 연결
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">

[3] CSS 변수 (디자인 시스템 토큰 전체 등록):

브랜드 컬러:
--color-primary: #1D9E75
--color-primary-dark: #085041
--color-accent: #EF9F27
--color-accent-text: #633806
--color-profit: #E53935
--color-loss: #1565C0

그레이 스케일:
--color-gray-50: #F8F8F6
--color-gray-100: #F0F0ED
--color-gray-200: #E2E2DE
--color-gray-300: #C8C8C3
--color-gray-400: #A8A8A2
--color-gray-600: #5A5A56
--color-gray-700: #3A3A37
--color-gray-900: #1E1E1C

서피스:
--color-bg: #F8F8F6
--color-card: #FFFFFF
--color-text-primary: #1E1E1C
--color-text-secondary: #5A5A56
--color-text-placeholder: #A8A8A2
--color-border: #E2E2DE
--color-border-strong: #C8C8C3

타이포그래피:
--font-base: 'Noto Sans KR', sans-serif
--font-size-display: 36px
--font-size-h1: 24px
--font-size-h2: 20px
--font-size-h3: 18px
--font-size-body: 16px
--font-size-sm: 14px
--font-size-caption: 12px

스페이싱 (8pt grid):
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
--space-16: 64px

라운딩:
--radius-xs: 4px
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-full: 9999px

그림자:
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06)
--shadow-md: 0 4px 12px rgba(0,0,0,0.08)

[4] 기본 레이아웃:
- body 배경: var(--color-bg)
- 폰트: var(--font-base)
- 전체 래퍼: max-width 480px, 중앙 정렬, min-height 100vh
- 상단 앱바:
  - 높이 56px
  - 배경 흰색
  - 하단 border 1px var(--color-border)
  - 좌측: 로고 텍스트 "RichBuild" (Primary 색상, 18px Medium)
- 콘텐츠 영역:
  - 상단 앱바(56px) ~ 하단 탭(56px) 사이
  - 지금은 빈 화면 (텍스트 없음)
- 하단 탭 바:
  - 높이 56px
  - 배경 흰색
  - 상단 border 1px var(--color-border)
  - position: fixed, bottom: 0
  - 탭 5개: 홈 / 뉴스 / 커뮤니티 / 일지 / 마이
  - 커뮤니티 탭: 🔒 아이콘 + "커뮤니티" 텍스트 (회색, 비활성)
  - 나머지 탭: 아이콘 없이 텍스트만 (지금은 텍스트만, 아이콘은 PHASE 9에서 추가)
  - 활성 탭: var(--color-primary)
  - 비활성 탭: var(--color-gray-400)
  - 첫 번째 활성 탭: 홈

[5] 기본 JS:
- 현재 활성 탭 상태 관리 (변수 하나로)
- 탭 클릭 시 활성 탭 전환
- 커뮤니티 탭 클릭 시: "v2.0에서 오픈 예정입니다 🔒" 알림(alert)

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- Supabase 실제 연결 코드 작성 (0-6에서 할 것)
- 실제 기능 구현 (지금은 뼈대만)
- persona-text.js 생성 (0-5에서 할 것)
- supabase-client.js 생성 (0-6에서 할 것)
- 외부 CSS 프레임워크 추가 (Tailwind 등 금지)

== 완료 후 ==
비전공자가 확인할 수 있는 QA 체크리스트를 주세요.
```

**완료 조건:**
```
□ richbuild/index.html 파일 생성됨
□ 브라우저에서 더블클릭으로 열림
□ 상단에 "RichBuild" 텍스트 보임 (녹색)
□ 하단에 탭 5개 보임
□ 커뮤니티 탭에 🔒 표시됨
□ 탭 클릭 시 활성 색상 전환됨
□ 커뮤니티 탭 클릭 시 알림 뜸
□ 배경색이 연한 회색임
□ 콘솔 에러 없음 (F12 → Console 탭 확인)
[회귀 테스트] 이전 기능 영향 없음 확인:
□ README.md 및 기타 파일 변경 없음
  (0-4는 뼈대 단계 — index.html만 신규 생성, 나머지 파일 미수정 확인)
→ 전부 OK → 0-5로 이동
```

---

### PHASE 0-5. persona-text.js 생성

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 현재 파일 구조 ==
richbuild/
├── README.md
└── index.html  ← 건드리지 말 것

== 이번 Phase 목표 ==
persona-text.js 파일 1개 생성
(index.html은 절대 수정하지 않음)

== persona-text.js 역할 ==
앱 전체에서 사용하는 텍스트 상수 파일.
대표님 모드(ceo)와 사령관 모드(commander)에 따라
다른 텍스트를 보여주기 위한 것.
예: 대표님 → "자산 편입", 사령관 → "전력 배치"

== 파일 구조 ==
window.PERSONA_TEXT 전역 변수로 선언
(index.html에서 <script src="persona-text.js">로 불러올 것)

== 포함할 텍스트 상수 ==

ceo (🏢 대표님 모드):
  title: "대표님"
  grade: ["스타트업", "중소기업", "중견기업", "대기업"]
  orgSuffix: ["에셋", "캐피탈", "인베스트먼트"]
  tabPortfolio: "운용 현황"
  tabNews: "시장 리포트"
  tabJournal: "운용 일지"
  tabYnr: "모의 운용"
  holdingAdd: "자산 편입"
  holdingSell: "자산 청산"
  journalSaved: "운용 일지가 저장됐어요."
  notificationArrived: "리포트가 도착했습니다."
  profitLabel: "운용 수익"
  lossLabel: "운용 손실"
  emptyPortfolio: "첫 자산을 편입해볼까요?"
  buyReasonPlaceholder: "이 자산을 편입한 이유를 기록하세요."
  portfolioSummaryLabel: "운용 포트폴리오"

commander (⚔️ 사령관 모드):
  title: "사령관님"
  grade: ["준장", "소장", "중장", "대장", "원수"]
  orgSuffix: ["사단", "부대", "전략사령부"]
  tabPortfolio: "전략 배치"
  tabNews: "정보 브리핑"
  tabJournal: "작전 일지"
  tabYnr: "모의 작전"
  holdingAdd: "전력 배치"
  holdingSell: "병력 철수"
  journalSaved: "작전 일지가 저장됐어요."
  notificationArrived: "긴급 브리핑이 도착했습니다."
  profitLabel: "작전 수익"
  lossLabel: "전술적 후퇴"
  emptyPortfolio: "첫 전력을 배치해볼까요?"
  buyReasonPlaceholder: "이 전력을 배치한 이유를 기록하세요."
  portfolioSummaryLabel: "전략 배치 현황"

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- index.html 수정 금지
- 실제 모드 전환 로직 구현 금지 (상수 파일만)
- README.md 수정 금지

== 완료 후 ==
index.html에 <script src="persona-text.js"></script> 추가하는 방법과
브라우저 콘솔에서 확인하는 방법을 알려주세요.
비전공자용 QA 체크리스트도 주세요.
```

**완료 조건:**
```
□ richbuild/persona-text.js 파일 생성됨
□ index.html에 <script src="persona-text.js"> 추가됨
  (Supabase SDK script 태그 다음 줄)
□ 브라우저에서 F12 → Console 탭 열기
  → window.PERSONA_TEXT 입력 시 내용 표시됨
[회귀 테스트] 이전 기능 영향 없음 확인:
□ index.html 기존 기능 정상 (탭 전환, 커뮤니티 잠금 알림)
□ 콘솔 에러 없음
→ 전부 OK → 0-6으로 이동
```

---

### PHASE 0-6. supabase-client.js 생성 + 연결 테스트

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 현재 파일 구조 ==
richbuild/
├── README.md
├── index.html       ← 건드리지 말 것 (script 태그 추가만 허용)
└── persona-text.js  ← 건드리지 말 것

== 이번 Phase 목표 ==
supabase-client.js 파일 1개 생성

== supabase-client.js 역할 ==
앱과 Supabase 데이터베이스를 연결하는 파일.
(전화선 역할 — 이 파일 없으면 데이터 저장·불러오기 불가)

== Supabase 정보 ==
SUPABASE_URL: [여기에 0-2에서 복사한 Project URL 입력]
SUPABASE_ANON_KEY: [여기에 0-2에서 복사한 anon key 입력]

참고: anon key는 공개해도 되는 키입니다.
      service_role key는 절대 이 파일에 넣으면 안 됩니다.

== 만들 내용 ==

1. Supabase 클라이언트 초기화
   window.supabase = supabase.createClient(URL, KEY)
   형태로 전역 변수 선언

2. 연결 테스트 함수 (자동 실행)
   - 페이지 로드 시 자동으로 연결 확인
   - 성공 시: 화면 하단에 작은 녹색 텍스트로
     "✅ DB 연결 성공" 표시 (2초 후 자동 사라짐)
   - 실패 시: 화면 하단에 빨간 텍스트로
     "❌ DB 연결 실패: [이유]" 표시

   연결 확인 방법:
   app_config 테이블에서 데이터 1개 조회 시도
   (테이블이 아직 없어도 에러 메시지로 연결 여부 확인 가능)

== index.html 수정 허용 범위 ==
</body> 태그 바로 앞에 아래 한 줄만 추가:
<script src="supabase-client.js"></script>
그 외 index.html 수정 절대 금지

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- service_role key 코드에 포함 금지
- index.html 내용 수정 (script 태그 추가 제외)
- persona-text.js 수정 금지
- 실제 데이터 저장·수정 (연결 테스트만)

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
□ richbuild/supabase-client.js 파일 생성됨
□ index.html 하단에 script 태그 추가됨
□ 브라우저에서 index.html 열었을 때
  화면 하단에 "✅ DB 연결 성공" 또는 연결 메시지 보임
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 탭 전환 정상 동작
□ 커뮤니티 탭 잠금 알림 정상
□ window.PERSONA_TEXT 콘솔 확인 정상
□ F12 콘솔에 에러 없음
→ 전부 OK → 0-7로 이동
```

---

### PHASE 0-7. GitHub Pages 배포 + 최종 확인

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 현재 파일 구조 ==
richbuild/
├── README.md
├── index.html
├── persona-text.js
└── supabase-client.js

== 이번 Phase 목표 ==
1. GitHub Desktop으로 commit + push
2. GitHub Pages URL에서 동작 확인
3. PHASE 0 최종 QA

== 작업 내용 ==

[1] commit 전 최종 점검
아래 항목을 코드에서 확인해줘:
- supabase-client.js에 service_role key가 없는지 확인
- console.log가 남아있으면 제거
- 하드코딩된 테스트용 텍스트가 없는지 확인

[2] GitHub Desktop 사용법 안내
비전공자가 따라할 수 있게 단계별로:
- 변경 파일 확인하는 방법
- Commit 메시지 입력 (메시지: "init: phase 0 complete - project setup")
- Push 하는 방법
- GitHub Pages 배포 확인 (1~3분 소요)

[3] 배포 URL 동작 확인 체크리스트
GitHub Pages URL: https://[아이디].github.io/richbuild

== 완료 후 ==
PHASE 0 전체 완료 기념 요약 메시지 주세요.
다음 단계(PHASE 1)에서 할 일을 한 줄로 알려주세요.
```

**완료 조건 (PHASE 0 최종 완료):**
```
□ GitHub Desktop commit 완료
  (메시지: "init: phase 0 complete - project setup")
□ GitHub push 완료
□ GitHub Pages URL 접속됨
  (https://[아이디].github.io/richbuild)
□ 배포된 페이지에서 확인:
  - "RichBuild" 텍스트 보임
  - 하단 탭 5개 보임
  - 커뮤니티 탭 🔒 표시됨
  - "✅ DB 연결 성공" 메시지 보임
[회귀 테스트] 전체 기능 최종 확인:
□ 탭 전환 전부 정상 (홈·뉴스·일지·마이)
□ 커뮤니티 탭 잠금 알림 정상
□ window.PERSONA_TEXT 콘솔 정상
□ F12 콘솔에 에러 없음

✅ PHASE 0 완료!
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 1 프롬프트로 이동
```

---

## 5. PHASE 1 — Supabase 스키마 생성

> 목표: 서비스에 필요한 DB 테이블 23개 생성 + 초기 설정값 입력
> 산출물: Supabase 대시보드에서 테이블 23개 확인 가능한 상태
> 주의: SQL은 Supabase 대시보드 SQL Editor에 붙여넣기 방식으로 실행
> 예상 소요: 1~2시간

---

### PHASE 1-1. 테이블 23개 순차 생성

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 현재 파일 구조 ==
richbuild/
├── README.md
├── index.html
├── persona-text.js
└── supabase-client.js

== 이번 Phase 목표 ==
Supabase DB 테이블 23개를 생성하는 SQL 파일 작성
(코드 파일 수정 없음 — SQL만 작성)

== 작업 방식 ==
1. 각 테이블의 CREATE TABLE SQL을 작성
2. 나는 Supabase 대시보드 → SQL Editor에 붙여넣어서 실행
3. 에러 나면 그 메시지를 그대로 여기에 붙여넣을 것

== 생성할 테이블 목록 (의존성 순서 지켜서 작성) ==

[그룹 1 — 독립 테이블, 먼저 생성]
1. app_config
2. announcements

[그룹 2 — auth.users 참조]
3. users (Supabase Auth의 auth.users를 참조)

[그룹 3 — users 참조]
4. accounts
5. subscriptions
6. api_key_usage_logs
7. security_logs
8. admin_action_logs
9. config_change_logs
10. announcement_reads
11. notifications

[그룹 4 — accounts 참조]
12. holdings

[그룹 5 — holdings/users 참조]
13. ynr_portfolios
14. market_cache
15. event_cache
16. journal_entries
17. investment_commandments
18. news_cache
19. regulation_news
20. search_history
21. account_verifications
22. badges
23. ynr_token_logs

== 각 테이블 공통 규칙 ==
- id: uuid DEFAULT gen_random_uuid() PRIMARY KEY
- created_at: timestamptz DEFAULT now() NOT NULL
- updated_at: timestamptz DEFAULT now() (해당되는 경우)
- 모든 테이블에 RLS 활성화 (ALTER TABLE ... ENABLE ROW LEVEL SECURITY)
- updated_at 자동 갱신 트리거 함수 1개 생성 후 재사용

== 테이블별 핵심 컬럼 (PRD 기반) ==

app_config:
  key TEXT UNIQUE NOT NULL
  value TEXT NOT NULL
  description TEXT
  -- updated_by 컬럼 없음 (users 테이블보다 먼저 생성되므로 참조 불가)
  -- 변경 이력은 config_change_logs 테이블에서 관리

announcements:
  title TEXT NOT NULL
  content TEXT NOT NULL
  is_active BOOLEAN DEFAULT true
  banner_visible BOOLEAN DEFAULT false
  starts_at timestamptz
  ends_at timestamptz

users:
  id uuid REFERENCES auth.users(id) PRIMARY KEY
  email TEXT UNIQUE NOT NULL
  nickname TEXT                              -- 최대 10자 (순수 닉네임)
  nickname_display TEXT                      -- 중복 시 "지훈#2" 형태로 표시
  persona_mode TEXT DEFAULT 'ceo' CHECK (persona_mode IN ('ceo','commander'))
  org_name TEXT                              -- 최대 15자
  mode_change_count INTEGER DEFAULT 0
  mode_changed_at timestamptz
  role TEXT DEFAULT 'user' CHECK (role IN ('user','admin'))
  status TEXT DEFAULT 'active' CHECK (status IN ('active','suspicious','suspended','deleted'))
  onboarding_completed BOOLEAN DEFAULT false  -- 신규/기존 사용자 구분용 (필수)
  deleted_at timestamptz
  ynr_balance NUMERIC(15,2) DEFAULT 2000.00
  -- Y&R 화폐 초기 지급량. 단위: YR (앱 내 가상 화폐, 현금 전환 불가)
  widget_settings JSONB DEFAULT '{}'::jsonb
  notification_settings JSONB DEFAULT '{}'::jsonb
  finnhub_api_key_encrypted TEXT             -- AES-256 암호화 저장
  display_currency TEXT DEFAULT 'KRW' CHECK (display_currency IN ('KRW','USD'))
  -- 투자자 프로필 (온보딩 선택사항 — NULL 허용)
  invest_career TEXT CHECK (invest_career IN ('beginner','intermediate','advanced'))
  invest_purpose TEXT CHECK (invest_purpose IN ('growth','retirement','short_term'))
  age_group TEXT CHECK (age_group IN ('10s','20s','30s','40s','50s','60s','70s'))
  gender TEXT CHECK (gender IN ('male','female','none'))

accounts:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  broker_name TEXT NOT NULL
  account_alias TEXT
  account_type TEXT DEFAULT 'domestic' CHECK (account_type IN ('domestic','foreign','ynr'))
  currency TEXT DEFAULT 'KRW' CHECK (currency IN ('KRW','USD'))
  cash_balance NUMERIC(15,2) DEFAULT 0
  is_verified BOOLEAN DEFAULT false
  verified_at timestamptz
  display_order INTEGER DEFAULT 0

holdings:
  account_id uuid REFERENCES accounts(id) ON DELETE CASCADE NOT NULL
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  ticker TEXT NOT NULL
  name TEXT NOT NULL
  market TEXT DEFAULT 'KR' CHECK (market IN ('KR','US'))
  quantity NUMERIC(15,4) NOT NULL DEFAULT 0
  avg_price NUMERIC(15,4) NOT NULL DEFAULT 0
  currency TEXT DEFAULT 'KRW' CHECK (currency IN ('KRW','USD'))
  current_price NUMERIC(15,4)
  price_updated_at timestamptz
  UNIQUE(account_id, ticker)

ynr_portfolios:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  ticker TEXT NOT NULL
  name TEXT NOT NULL
  market TEXT DEFAULT 'US' CHECK (market IN ('KR','US'))
  quantity NUMERIC(15,4) NOT NULL DEFAULT 0
  avg_price NUMERIC(15,4) NOT NULL DEFAULT 0
  currency TEXT DEFAULT 'USD'
  current_price NUMERIC(15,4)
  price_updated_at timestamptz
  UNIQUE(user_id, ticker)

market_cache:
  ticker TEXT NOT NULL
  name TEXT
  current_price NUMERIC(15,4)
  prev_close NUMERIC(15,4)
  change_amount NUMERIC(15,4)
  change_pct NUMERIC(8,4)
  currency TEXT DEFAULT 'USD'
  market_type TEXT
  data_source TEXT
  expires_at timestamptz NOT NULL
  UNIQUE(ticker)

event_cache:
  ticker TEXT NOT NULL
  event_type TEXT NOT NULL CHECK (event_type IN ('earnings','fomc','dividend'))
  event_date DATE NOT NULL
  title TEXT
  detail JSONB DEFAULT '{}'::jsonb
  expires_at timestamptz NOT NULL

journal_entries:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  entry_type TEXT NOT NULL CHECK (entry_type IN ('buy','sell','macro','review','idea','earnings','commandment'))
  ticker TEXT
  holding_id uuid REFERENCES holdings(id) ON DELETE SET NULL
  title TEXT
  content TEXT NOT NULL
  quantity NUMERIC(15,4)
  price NUMERIC(15,4)
  currency TEXT DEFAULT 'KRW'
  is_important BOOLEAN DEFAULT false
  is_archived BOOLEAN DEFAULT false
  archived_at timestamptz
  alert_at timestamptz
  commandments_checked JSONB DEFAULT '[]'::jsonb

investment_commandments:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  content TEXT NOT NULL
  display_order INTEGER DEFAULT 0
  is_active BOOLEAN DEFAULT true

notifications:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  type TEXT NOT NULL
  title TEXT NOT NULL
  body TEXT
  is_read BOOLEAN DEFAULT false
  related_id uuid
  related_type TEXT

news_cache:
  ticker TEXT
  source TEXT NOT NULL CHECK (source IN ('naver','finnhub','regulation'))
  title TEXT NOT NULL
  url TEXT NOT NULL UNIQUE
  published_at timestamptz
  summary TEXT
  expires_at timestamptz NOT NULL

regulation_news:
  agency TEXT NOT NULL CHECK (agency IN ('SEC','Fed','FTC','DOJ','CFTC'))
  title TEXT NOT NULL
  url TEXT NOT NULL UNIQUE
  published_at timestamptz
  fetched_at timestamptz DEFAULT now()

search_history:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  query TEXT NOT NULL
  search_type TEXT DEFAULT 'news'

subscriptions:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','premium'))
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly','yearly'))
  status TEXT DEFAULT 'active' CHECK (status IN ('active','cancelled','expired'))
  -- 가입 시 INSERT: plan='free', status='active', started_at=now()
  -- 프리미엄 전환 시: plan='premium', billing_cycle 설정, expires_at 설정
  started_at timestamptz DEFAULT now()
  expires_at timestamptz
  portone_billing_key TEXT
  cancelled_at timestamptz

account_verifications:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  account_id uuid REFERENCES accounts(id) ON DELETE CASCADE NOT NULL
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected'))
  submitted_at timestamptz DEFAULT now()
  reviewed_at timestamptz
  reviewed_by uuid REFERENCES users(id)
  reject_reason TEXT
  extracted_data JSONB DEFAULT '{}'::jsonb

api_key_usage_logs:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  api_type TEXT NOT NULL
  endpoint TEXT
  status_code INTEGER
  error_message TEXT

security_logs:
  user_id uuid REFERENCES users(id) ON DELETE SET NULL
  event_type TEXT NOT NULL
  ip_address TEXT
  detail JSONB DEFAULT '{}'::jsonb

admin_action_logs:
  admin_id uuid REFERENCES users(id) ON DELETE SET NULL NOT NULL
  action_type TEXT NOT NULL
  target_type TEXT
  target_id uuid
  detail JSONB DEFAULT '{}'::jsonb

config_change_logs:
  admin_id uuid REFERENCES users(id) ON DELETE SET NULL NOT NULL
  config_key TEXT NOT NULL
  old_value TEXT
  new_value TEXT

announcement_reads:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  announcement_id uuid REFERENCES announcements(id) ON DELETE CASCADE NOT NULL
  UNIQUE(user_id, announcement_id)

badges:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  badge_type TEXT NOT NULL
  badge_level INTEGER DEFAULT 1
  awarded_at timestamptz DEFAULT now()
  detail JSONB DEFAULT '{}'::jsonb

ynr_token_logs:
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL
  amount NUMERIC(10,2) NOT NULL
  reason TEXT NOT NULL
  balance_after NUMERIC(15,2) NOT NULL

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 출력 형식 ==
그룹별로 나눠서 SQL 출력
각 그룹 앞에 "-- 그룹 N: [설명]" 주석 포함
한 번에 다 주지 말고 그룹 1부터 하나씩 줄 것
내가 "다음" 이라고 하면 다음 그룹 출력

== 완료 후 ==
각 그룹 실행 후 확인 방법을 알려주세요.
(Supabase 대시보드 Table Editor에서 확인하는 방법)
```

**완료 조건:**
```
□ Supabase SQL Editor에서 그룹 1~5 순서대로 실행 완료
□ Supabase Table Editor에서 테이블 23개 확인됨
□ 각 테이블 RLS 활성화 확인 (테이블 클릭 → RLS 탭)
□ updated_at 트리거 함수 생성됨
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 코드 파일 변경 없음 (index.html·persona-text.js·supabase-client.js 그대로)
□ 브라우저에서 index.html 열었을 때 DB 연결 성공 메시지 여전히 표시
□ F12 콘솔에 에러 없음
→ 전부 OK → 1-2로 이동
```

---

### PHASE 1-2. app_config 초기값 INSERT + RLS 정책 설정

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 현재 상태 ==
- Supabase 테이블 23개 생성 완료
- 코드 파일: index.html, persona-text.js, supabase-client.js 유지

== 이번 Phase 목표 ==
1. app_config 초기값 INSERT SQL 작성
2. 핵심 테이블 RLS 정책 SQL 작성
(코드 파일 수정 없음 — SQL만 작성)

== 1. app_config 초기값 ==

아래 키-값을 INSERT하는 SQL 작성:

서비스 기본 설정:
  maintenance_mode / false / 점검 모드 여부
  service_version / 1.0.0 / 현재 서비스 버전
  min_app_version / 1.0.0 / 최소 지원 버전

기능 플래그 (전부 false로 시작):
  subscription_enabled / false / 구독 결제 활성화
  community_enabled / false / 커뮤니티 기능 활성화
  ai_summary_enabled / false / AI 요약 기능 활성화
  league_enabled / false / 리그 기능 활성화
  profile_image_enabled / false / 프로필 이미지 업로드
  gemini_key_enabled / false / Gemini API 사용
  use_owner_api / false / 창업자 Finnhub 키 사용 여부 (키 준비 후 true로 변경)
  marketing_push_enabled / false / 마케팅 푸시 알림

요금 설정:
  premium_monthly_price / 4900 / 월 구독 가격 (원)
  premium_yearly_price / 39000 / 연 구독 가격 (원)
  persona_mode_change_price / 990 / 페르소나 모드 변경 가격
  org_name_change_price / 490 / 조직명 변경 가격
  persona_set_change_price / 1290 / 세트 변경 가격
  premium_free_change_per_month / 1 / 프리미엄 월 무료 변경 횟수

제한 설정 (무료 플랜):
  free_max_journals / 20 / 무료 일지 최대 개수
  -- free_max_accounts 없음 (계좌 등록은 무료·프리미엄 모두 무제한)
  -- free_daily_news 없음 (뉴스 조회 무제한, AI 번역·요약만 프리미엄)

등급 기준 (추후 확정, 임시값):
  grade_threshold_lv1 / 1000000 / 등급 1 기준 자산 (원)
  grade_threshold_lv2 / 10000000 / 등급 2 기준 자산
  grade_threshold_lv3 / 100000000 / 등급 3 기준 자산

== 2. RLS 정책 설정 ==

아래 테이블들의 RLS 정책 SQL 작성:

users 테이블:
  - SELECT: 본인 데이터만 (auth.uid() = id)
  - UPDATE: 본인 데이터만
  - admin은 모든 데이터 SELECT/UPDATE 가능

accounts 테이블:
  - SELECT/INSERT/UPDATE/DELETE: 본인 데이터만 (user_id = auth.uid())

holdings 테이블:
  - SELECT/INSERT/UPDATE/DELETE: 본인 데이터만 (user_id = auth.uid())

journal_entries 테이블:
  - SELECT/INSERT/UPDATE/DELETE: 본인 데이터만 (user_id = auth.uid())

subscriptions 테이블:
  - SELECT/UPDATE: 본인 데이터만 (user_id = auth.uid())

app_config 테이블:
  - SELECT: 모든 로그인 사용자 가능 (공개 설정값)
  - INSERT/UPDATE/DELETE: admin만 가능

announcements 테이블:
  - SELECT: 모든 로그인 사용자 (is_active = true인 것만)
  - INSERT/UPDATE/DELETE: admin만 가능

notifications 테이블:
  - SELECT/UPDATE: 본인 데이터만 (user_id = auth.uid())

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 출력 형식 ==
1. app_config INSERT SQL 먼저 출력
2. 내가 "다음" 하면 RLS 정책 SQL 출력
각 섹션 앞에 주석으로 설명 포함

== 완료 후 ==
Supabase 대시보드에서 확인하는 방법 알려주세요.
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
□ app_config 테이블에 초기값 20개+ 삽입 확인
  (Supabase Table Editor → app_config → 데이터 탭)
□ 핵심 테이블 RLS 정책 적용 확인
  (각 테이블 → Authentication 탭 → Policies 확인)
□ subscription_enabled = false 확인
□ community_enabled = false 확인
□ use_owner_api = false 확인  ← 키 준비 후 true로 변경 예정
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 코드 파일 변경 없음 (index.html·persona-text.js·supabase-client.js 그대로)
□ 브라우저에서 DB 연결 성공 메시지 여전히 표시
□ 탭 전환·커뮤니티 잠금 정상 동작
□ F12 콘솔에 에러 없음

✅ PHASE 1 완료!
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 2 프롬프트로 이동
```

---

## 6. PHASE 2 — 인증 + 온보딩

> 목표: 구글 로그인 + 온보딩 플로우 (닉네임·페르소나·조직명) 완성
> 산출물: 실제 구글 계정으로 가입하고 메인 화면 진입 가능한 상태
> 예상 소요: 1일 (3시간)
> 주의: GitHub Pages 환경 특성상 OAuth redirect 처리 방식이 일반 웹과 다름

---

### PHASE 2-1. 구글 OAuth 설정 (Supabase 대시보드)

> 실행 위치: claude.ai 대화창 (Claude Code 아님)
> 이유: Google Cloud Console + Supabase 대시보드 설정은 브라우저에서 직접 진행

```
PHASE 1 완료했습니다.
이제 PHASE 2-1입니다.

Supabase Auth에 구글 로그인을 연결하려고 합니다.
아래 순서로 단계별로 안내해주세요:

1. Google Cloud Console에서 OAuth 앱 만들기
   - console.cloud.google.com 접속
   - 새 프로젝트 생성: richbuild
   - OAuth 동의 화면 설정 (외부 / 테스트 모드)
   - OAuth 2.0 클라이언트 ID 생성 (웹 애플리케이션)
   - 승인된 리디렉션 URI 추가:
     https://[내Supabase프로젝트ID].supabase.co/auth/v1/callback
   - Client ID와 Client Secret 복사

2. Supabase 대시보드에서 구글 로그인 활성화
   - Authentication → Providers → Google
   - Client ID, Client Secret 입력
   - Redirect URL 확인:
     https://[내GitHub아이디].github.io/richbuild/index.html

각 단계마다 어떤 화면에서 뭘 클릭하는지 구체적으로 알려주세요.
```

**완료 조건:**
```
□ Google Cloud Console OAuth 앱 생성 완료
□ Client ID, Client Secret 복사해둠
□ Supabase Auth Google Provider 활성화 완료
□ Redirect URL 설정 완료
→ 전부 OK → 2-2로 이동
```

---

### PHASE 2-2. 인증 + 온보딩 구현

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 현재 파일 구조 ==
richbuild/
├── README.md
├── index.html       ← 메인 수정 파일
├── persona-text.js  ← 건드리지 말 것
└── supabase-client.js ← 건드리지 말 것 (supabase 클라이언트만 참조)

== 이번 Phase 목표 ==
index.html에 인증 + 온보딩 플로우 구현

== GitHub Pages OAuth 처리 방식 (필수 준수) ==
GitHub Pages는 단일 HTML 파일이라 /auth/callback 경로가 없음.
반드시 아래 방식으로 처리:

// 로그인 요청 시
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: window.location.origin + '/richbuild/index.html'
  }
});

// 페이지 로드 시 세션 확인으로 콜백 처리
// Supabase가 URL 해시(#access_token=...)를 자동으로 처리함
const { data: { session } } = await supabase.auth.getSession();

== 구현할 화면 및 기능 ==

[1] 스플래시 화면
- RichBuild 로고 + 슬로건 "기록이 자산이 되다"
- 1.5초 후 자동 전환
- 전환 로직:
  세션 있음 + onboarding_completed=true → 메인 화면
  세션 있음 + onboarding_completed=false → 온보딩 닉네임 설정
  세션 없음 → 온보딩 소개

[2] 온보딩 소개 (3장 슬라이드)
- 1장: "흩어진 계좌를 한 눈에" (🏢 아이콘)
- 2장: "내 종목 뉴스만 자동으로" (📰 아이콘)
- 3장: "투자 근거를 기록하세요" (📝 아이콘) + [구글로 시작하기] 버튼
- 하단 인디케이터 (● ○ ○)
- [건너뛰기] 버튼 전 장에서 항상 표시
- 1~2장: [다음 →] 버튼
- [건너뛰기] 탭 → 로그인 없이 게스트 모드로 메인 화면
  (게스트는 더미 데이터만 보임, 저장 불가)

[3] 구글 로그인 처리
- [구글로 시작하기] 탭 → supabase.auth.signInWithOAuth
- 로그인 중 스피너 표시
- 성공 후:
  신규 사용자 (users 테이블에 없음) → 닉네임 설정으로
  기존 사용자 (onboarding_completed=true) → 메인 화면으로

[4] 닉네임 설정
- 입력창 (최대 10자, # 입력 불가)
- 디바운스 500ms로 중복 확인
- 중복 시: "지훈#2 로 설정됩니다" 미리 표시
- [다음 →] 버튼

[5] 페르소나 선택
- 🏢 대표님 모드 카드 / ⚔️ 사령관 모드 카드
- 선택 시 하단 미리보기 텍스트 실시간 변경
  (대표님: "○○ 에셋 대표님의 포트폴리오")
  (사령관: "○○ 사단 사령관님의 전략 배치")
- 선택 없으면 [다음 →] 비활성화

[6] 조직명 설정
- 페르소나에 따라 안내 문구 분기
  (대표님: "투자 회사 이름", 사령관: "투자 부대 이름")
- 최대 15자
- 건너뛰기 시 자동 생성: 닉네임 + 랜덤 suffix
  (대표님: 에셋/캐피탈/인베스트먼트 중 랜덤)
  (사령관: 사단/부대/전략사령부 중 랜덤)
- [완료 →] 탭 → 온보딩 완료 처리

[7] 온보딩 완료 처리
- users 테이블 UPDATE:
  nickname, nickname_display, persona_mode, org_name,
  onboarding_completed=true
- subscriptions INSERT:
  plan='free', status='active', started_at=now()
- investment_commandments INSERT (기본 3개):
  1. "손절가를 미리 정하고 지킨다"
  2. "분산 투자, 한 종목 20% 이하"
  3. "감정적 매매를 하지 않는다"
- 완료 후 → 메인 화면으로

[8] 세션 유지 / 로그아웃
- 앱 재시작 시 supabase.auth.getSession()으로 자동 로그인 확인
- 로그아웃: supabase.auth.signOut() → 스플래시로 이동

== 화면 전환 방식 ==
SPA 방식: 각 화면을 div로 만들고 show/hide로 전환
(페이지 이동 없음 — 단일 index.html 안에서 전환)

예시:
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(screenId).style.display = 'block';
}

화면 ID 목록:
  screen-splash
  screen-onboarding
  screen-login-loading
  screen-nickname
  screen-persona
  screen-org-name
  screen-main (기존 뼈대 화면)

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지 (읽기만 허용)
- supabase-client.js 수정 금지 (window.supabase 참조만)
- 메인 화면 뼈대 내용 수정 금지 (화면 전환 연결만)
- 투자자 프로필 수집 화면 구현 금지 (PostHog 연동 후 추가)

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
Google OAuth 테스트 방법도 알려주세요.
```

**완료 조건:**
```
□ 스플래시 화면 1.5초 후 자동 전환됨
□ 온보딩 소개 3장 스와이프 동작
□ [구글로 시작하기] 탭 시 구글 로그인 팝업 뜸
□ 로그인 후 닉네임 설정 화면으로 이동
□ 닉네임 중복 시 "#2" 자동 부여 미리 표시
□ 페르소나 선택 시 미리보기 텍스트 실시간 변경
□ 조직명 건너뛰기 시 자동 생성값 적용
□ 온보딩 완료 후 메인 화면 진입
□ Supabase users 테이블에 사용자 데이터 저장됨
□ Supabase subscriptions 테이블에 plan='free' 생성됨
□ investment_commandments 기본 3개 생성됨
□ 앱 새로고침 후 자동 로그인 유지됨
□ 로그아웃 후 스플래시 화면으로 이동
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 탭 5개 전환 정상 (홈·뉴스·커뮤니티🔒·일지·마이)
□ PERSONA_TEXT 콘솔 정상 (window.PERSONA_TEXT 입력 시 출력됨)
□ DB 연결 상태 정상 (로그인 전 연결 메시지 → 로그인 후 세션 유지)
□ F12 콘솔에 에러 없음
□ GitHub Pages URL에서도 동일하게 동작

✅ PHASE 2 완료!
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 3 프롬프트로 이동
```

---

## 7. PHASE 3 — 다중 계좌 관리 (킬러 기능)

> 목표: 여러 증권사 계좌 등록 + 종목 CRUD + 실시간 주가 연동 + 수익률 계산
> 산출물: 실제 계좌·종목을 등록하고 수익률이 표시되는 포트폴리오 화면
> 예상 소요: 6일 (3-1 ~ 3-6 + 통합 QA)
> 주의: 각 단계 완료 후 반드시 회귀 테스트 통과 확인 후 다음 단계 진행

---

### PHASE 3-1. 계좌 CRUD

> 실행 위치: Claude Code CLI (터미널)
> 참고 PRD: PRD_02_portfolio.md § 4-2, § 6-1

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html         ← 주요 수정 파일
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 탭 5개 전환 (홈·뉴스·커뮤니티🔒·일지·마이)
- 스플래시·온보딩·구글 로그인·세션 유지·로그아웃
- Supabase DB 연결 (window.supabase 사용)

== 이번 Phase 목표 ==
계좌 CRUD 구현 (Create · Read · Update · Delete)
주가 API 연동 없음 — 계좌 데이터 저장·조회·수정·삭제만

== 구현할 기능 ==

[1] 계좌 추가
진입 경로: 홈 탭 → "+ 계좌 추가" 버튼 (홈 탭 하단 고정)
  ※ 마이페이지는 PHASE 7에서 구현 예정
  ※ 지금은 홈 탭 내에 임시 진입 버튼 배치

입력 필드:
  - 증권사 선택 (드롭다운, 필수):
    토스증권 / 카카오페이증권 / 키움증권 / 미래에셋 / 삼성증권 /
    NH투자증권 / KB증권 / 신한투자증권 / 한화투자증권 / 대신증권 /
    하나증권 / 유안타증권 / 한국투자증권 / 기타
  - 계좌 별명 (텍스트, 최대 20자, 선택)
    예: "키움 주식", "토스 ETF", "NH 공모주"
  - 통화: KRW / USD (라디오 버튼, 기본값 KRW)

유효성 검사:
  - 증권사 미선택 시 저장 버튼 비활성화
  - 같은 증권사 + 같은 통화 중복 등록 시:
    "이미 같은 계좌가 있어요. 그래도 추가할까요?" 경고
    (막지는 않음 — 확인 시 추가)

저장:
  - Supabase accounts 테이블 INSERT
  - user_id: window.supabase.auth.getUser()로 현재 사용자 UUID
  - 저장 성공 시: "계좌가 추가됐어요." 토스트 (2초 후 자동 사라짐)
  - 저장 후 홈 화면 계좌 탭 즉시 반영

[2] 계좌 목록 조회
위치: 홈 탭 상단 계좌 탭 (가로 스크롤)
  - "전체" 탭 기본 선택
  - 등록된 계좌명 탭으로 표시 (우측에 ✏️ 아이콘)
  - 계좌 없을 때: 빈 화면 + "+ 계좌 추가" CTA

데이터 조회:
  - 로그인 시 자동으로 계좌 목록 로드
  - accounts 테이블 SELECT WHERE user_id = 현재 사용자

[3] 계좌 수정·삭제
진입: 계좌 탭 우측 ✏️ 아이콘 탭 → "수정 / 삭제" 선택 메뉴

수정:
  - 계좌 별명만 수정 가능 (최대 20자)
  - 증권사·통화 수정 불가
    → "증권사·통화 변경은 삭제 후 재등록해 주세요." 안내
  - Supabase accounts UPDATE
  - 수정 성공 시: "계좌 별명이 수정됐어요." 토스트

삭제:
  - 삭제 확인 다이얼로그:
    "계좌를 삭제하면 연결된 종목도 모두 삭제됩니다. 계속할까요?"
  - 확인 시 → accounts DELETE
    (holdings는 ON DELETE CASCADE로 자동 삭제됨)
  - 삭제 성공 시: "계좌가 삭제됐어요." 토스트

== 화면 전환 방식 ==
기존 showScreen() 함수 활용
추가할 화면 ID:
  screen-account-add    계좌 추가 화면

== UI 상태 4가지 ==
로딩:    계좌 목록 불러오는 중 → 스켈레톤 표시
빈 화면: 계좌 0개 → "아직 계좌가 없어요." + "+ 계좌 추가" 버튼
에러:    저장·삭제 실패 → 인라인 에러 메시지 + 재시도 버튼
정상:    계좌 탭 목록 표시

== 페르소나 텍스트 ==
window.PERSONA_TEXT 참조 (하드코딩 금지)
계좌 관련 신규 텍스트가 필요하면
[기능 제안] 형식으로 보고 후 확답 받을 것

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 주가 API 연동 금지 (PHASE 3-3·3-4에서 할 것)
- 종목 CRUD 구현 금지 (PHASE 3-2에서 할 것)
- 기존 온보딩·로그인·탭 전환 코드 수정 금지
- accounts 테이블 외 다른 테이블 수정 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
□ "+ 계좌 추가" 버튼 탭 시 계좌 추가 화면 열림
□ 증권사 미선택 시 저장 버튼 비활성화 확인
□ 계좌 추가 후 Supabase accounts 테이블에서 데이터 확인
  (Supabase 대시보드 → Table Editor → accounts)
□ 홈 탭 계좌 탭에 추가한 계좌 즉시 표시됨
□ 계좌 탭 우측 ✏️ 아이콘 탭 시 수정/삭제 메뉴 표시됨
□ 별명 수정 후 탭 이름 즉시 반영됨
□ 삭제 시 확인 다이얼로그 표시됨
□ 삭제 후 탭 목록에서 제거됨
□ 계좌 0개일 때 빈 화면 + CTA 표시됨
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 탭 5개 전환 정상 (홈·뉴스·커뮤니티🔒·일지·마이)
□ 로그인·로그아웃 정상
□ 온보딩 플로우 정상
□ F12 콘솔에 에러 없음
→ 전부 OK → PHASE 3-2로 이동
```

---

### PHASE 3-2. 종목 CRUD + 수익률 계산

> 실행 위치: Claude Code CLI (터미널)
> 참고 PRD: PRD_02_portfolio.md § 4-3, § 4-4, § 4-5, § 6-2

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 탭 5개 전환·로그인·온보딩
- 계좌 CRUD (accounts 테이블, ✏️ 아이콘 방식)

== 이번 Phase 목표 ==
종목 CRUD + 수익률 계산 (현재가는 임시로 매수가와 동일 처리)
주가 API 연동 없음 — PHASE 3-3·3-4에서 실제 연동
티커 자동완성 없음 — PHASE 3-3에서 Edge Function과 함께 추가
지금은 종목명·티커 직접 수동 입력

== 구현할 기능 ==

[1] 종목 추가
진입: 홈 탭 우하단 FAB 버튼
FAB 버튼 텍스트: window.PERSONA_TEXT[mode].holdingAdd 참조
  대표님 모드: "+ 자산 편입"
  사령관 모드: "+ 전력 배치"

입력 필드:
  - 계좌 선택 (드롭다운, 등록된 accounts 목록, 필수)
  - 종목명 (텍스트, 최대 50자, 필수)
  - 티커 (텍스트, 필수)
    ※ 수동 입력만 (자동완성은 PHASE 3-3에서 추가)
    ※ 입력 예시 힌트 표시:
       국내: "예: 005930 (삼성전자 6자리 숫자)"
       미국: "예: NVDA (알파벳 1~5자)"
  - 시장: 국장 / 미장 (라디오 버튼, 필수)
  - 수량 (숫자, 필수, 0 초과)
  - 평균 매수가 (숫자, 필수, 0 초과)
    국내 종목: 원화(KRW) 입력 → "원" 단위 표시
    미국 종목: 달러(USD) 입력 → "$" 단위 표시
  - 투자 유형: 단타 / 장타 (선택, 기본값 장타)
  - 상태: 보유 / 매수 / 관심 / 숨김 (선택, 기본값 보유)

계산 자동 표시 (입력 중 실시간):
  매수금액 = 수량 × 평균 매수가
  현재가 = 평균 매수가 (임시 — PHASE 3-3·3-4에서 API로 교체)
  수익률 = 0% (임시)

유효성 검사:
  - 필수 필드 미입력 시 저장 버튼 비활성화
  - 수량·매수가 음수·0 입력 불가
  - 같은 계좌에 같은 티커 중복 등록 시:
    "이미 등록된 종목이에요." 안내 (저장 막음)

저장:
  - Supabase holdings 테이블 INSERT
  - current_price = avg_price (임시 — 주석으로 명시)
  - 저장 성공 시 페르소나 토스트:
    대표님: "자산이 편입됐어요."
    사령관: "전력이 배치됐어요."

[2] 종목 목록 조회
위치: 홈 탭 계좌 탭 선택 시 해당 계좌 종목 표시
  "전체" 탭: 모든 계좌 종목 합산

종목 리스트 표시 항목:
  종목명 / 티커 / 수량 / 평균 매수가 / 수익률(임시 0%)
  시장 구분 아이콘: 🏢 국내 / 🇺🇸 미국
  상태 배지: 보유(초록) / 매수(파랑) / 관심(회색) / 숨김(점선)
  숨김 종목: 목록 표시 + 집계 모두 제외

홈 탭 요약 카드 (상단):
  페르소나 조직명 + 호칭 표시
  총 매수금액 (현재가 미연동 → 매수금액 기준, 임시 표시)
  총 종목 수
  하단 고지 문구: "현재가 연동 준비 중이에요."
    (PHASE 3-3·3-4 완료 후 실제 수익률로 교체)

[3] 종목 상세 모달
진입: 종목 탭 시
표시 정보:
  종목명 / 티커 / 시장
  수량 / 평균 매수가 / 현재가(임시)
  매수금액 / 평가금액(임시) / 수익률(임시 0%)
  투자 유형 / 상태 / 등록일
하단 버튼: [수정] [삭제]

[4] 종목 수정
종목 추가 화면과 동일한 폼 (기존 값 채워진 상태)
수정 가능: 수량 / 평균 매수가 / 투자 유형 / 상태
수정 불가: 티커 / 시장 / 계좌
  → "티커·시장·계좌 변경은 삭제 후 재등록해 주세요." 안내
Supabase holdings UPDATE

[5] 종목 삭제
확인 다이얼로그:
  "종목을 삭제하면 연결된 일지 연결도 해제됩니다. 계속할까요?"
확인 시 → holdings DELETE
페르소나 토스트:
  대표님: "자산이 청산됐어요."
  사령관: "병력이 철수됐어요."

== 화면 전환 방식 ==
기존 showScreen() 함수 활용
추가할 화면 ID:
  screen-holding-add     종목 추가 화면
  screen-holding-edit    종목 수정 화면
  screen-holding-detail  종목 상세 모달

== UI 상태 4가지 ==
로딩:    종목 목록 불러오는 중 → 스켈레톤
빈 화면: 종목 0개 → 페르소나 빈 화면 메시지 + FAB CTA
  대표님: "첫 자산을 편입해볼까요?"
  사령관: "첫 전력을 배치해볼까요?"
에러:    저장·삭제 실패 → 인라인 에러 메시지
정상:    종목 리스트 표시

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 주가 API 연동 금지 (PHASE 3-3·3-4에서 할 것)
- 티커 자동완성 구현 금지 (PHASE 3-3에서 할 것)
- 계좌 CRUD 기존 코드 수정 금지
- holdings 외 다른 테이블 수정 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
□ FAB 버튼 텍스트가 페르소나 모드에 따라 분기됨
□ 종목 추가 후 holdings 테이블에서 데이터 확인
  (Supabase 대시보드 → Table Editor → holdings)
□ 홈 탭 종목 리스트에 추가한 종목 즉시 표시됨
□ 계좌 탭 선택 시 해당 계좌 종목만 필터됨
□ 종목 탭 시 상세 모달 표시됨
□ 수정 후 리스트 즉시 반영됨
□ 삭제 후 리스트에서 제거됨
□ 숨김 종목이 리스트·집계에서 제외됨
□ 종목 0개일 때 페르소나 빈 화면 메시지 표시됨
□ 요약 카드에 "현재가 연동 준비 중" 안내 표시됨
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 계좌 CRUD 정상 (✏️ 아이콘 수정·삭제)
□ 탭 5개 전환 정상
□ 로그인·로그아웃 정상
□ F12 콘솔에 에러 없음
→ 전부 OK → PHASE 3-3으로 이동
```

---

### PHASE 3-3. 국내 주가 연동 + 티커 자동완성

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드
> 참고 PRD: PRD_02_portfolio.md § 7-1, § 7-4
> Edge Function 배포: Supabase 대시보드에서 직접 작성·배포

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 탭 전환·로그인·온보딩
- 계좌 CRUD / 종목 CRUD (현재가 임시=매수가)

== 이번 Phase 목표 ==
1. Supabase Edge Function 1개 생성 (get-prices)
   → Supabase 대시보드에서 직접 작성·배포
2. 국내 주가 연동 — Yahoo Finance 전날 종가
3. 홈 화면 수익률 실제값으로 교체
4. 종목 추가 화면에 국내 티커 자동완성 추가

== 작업 순서 (반드시 이 순서로) ==
1단계: Edge Function 코드 작성 → 내가 대시보드에 직접 붙여넣어 배포
2단계: 국내 주가 연동 + 홈 화면 수익률 교체
3단계: 국내 티커 자동완성 추가
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: Edge Function (get-prices) 코드 작성 ==

아래 스펙으로 Edge Function 코드를 작성해줘.
내가 Supabase 대시보드 → Edge Functions → New Function에
코드를 직접 붙여넣어 배포할 것임.

함수명: get-prices

처리 흐름:
1. JWT 검증 (인증된 사용자만 호출 가능)
2. 요청 바디에서 티커 목록 수신
   { "tickers": ["005930", "000660"] }
3. 각 티커에 대해 market_cache 확인
   - 캐시 유효(24시간 이내): 캐시값 반환
   - 캐시 만료 or 없음: Yahoo Finance API 호출
4. 국내 티커 → Yahoo Finance 호출
   URL: https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}.KS
   추출값: chart.result[0].meta.previousClose (전날 종가)
5. market_cache UPSERT (ticker, current_price, expires_at=내일 오전 6시)
6. 응답 반환:
   {
     "005930": { "price": 75500, "basis": "close", "currency": "KRW" },
     "000660": { "price": 128000, "basis": "close", "currency": "KRW" }
   }

보안:
- Supabase Auth JWT 검증 필수
- 티커 최대 50개 제한 (초과 시 400 에러)
- service_role key: 환경변수 Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") 사용

배포 후 확인 방법도 알려줘.
(대시보드에서 직접 테스트하는 방법 포함)

== 2단계: 국내 주가 홈 화면 연동 (index.html 수정) ==

홈 탭 진입 시 동작:
1. holdings 테이블에서 사용자 국내 종목(market='KR') 티커 목록 조회
2. get-prices Edge Function 호출
   window.supabase.functions.invoke('get-prices', { body: { tickers: [...] } })
3. 응답받은 현재가로 holdings.current_price 업데이트
4. 수익률 재계산:
   수익률 = (현재가 - 평균 매수가) / 평균 매수가 × 100
5. 화면 업데이트

UI 변경:
- 요약 카드: "현재가 연동 준비 중" 문구 제거 → 실제 수익률 표시
- 종목 리스트: 실제 수익률 표시 (수익 빨강 / 손실 파랑)
- 국내 종목 현재가 옆: "종가" 배지 (작은 회색 태그)
- 요약 카드 하단 고지 한 줄:
  "🏢 국내 전날 종가  |  💱 환율 준비 중"
  (환율은 PHASE 3-5에서 추가)

로딩 상태:
- 가격 조회 중: 종목 리스트 스켈레톤
- 조회 실패: "가격 정보를 불러오지 못했어요." + 재시도 버튼
  (마지막 캐시값 흐리게 표시)

수동 갱신:
- 홈 탭 우상단 새로고침 버튼 → get-prices 재호출

== 3단계: 국내 티커 자동완성 (index.html 수정) ==

국내 종목만 적용 (미국은 PHASE 3-4에서 추가)

동작:
1. 종목 추가 화면에서 시장=국장 선택 + 종목명 2글자 이상 입력 시 활성화
2. 300ms 디바운스 (타이핑 중 연속 API 호출 방지)
3. get-prices Edge Function에 검색 요청 추가
   (기존 get-prices 함수에 search 액션 추가)
   { "action": "search", "query": "삼성전자", "market": "KR" }
   → Yahoo Finance: https://query1.finance.yahoo.com/v1/finance/search?q={검색어}
4. 드롭다운 표시:
   005930  삼성전자  🏢 국내
   000660  SK하이닉스  🏢 국내
5. 항목 선택 시: 종목명·티커 자동 입력
6. 자동완성 실패 시: 드롭다운 닫힘 + 수동 입력 유지 (에러 표시 없음)

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 미국 주가 연동 금지 (PHASE 3-4에서 할 것)
- 환율 연동 금지 (PHASE 3-5에서 할 것)
- 계좌·종목 CRUD 기존 코드 수정 금지
- market_cache 외 다른 테이블 스키마 변경 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
각 단계별 확인 방법도 알려주세요.
```

**완료 조건:**
```
[1단계 — Edge Function]
□ Supabase 대시보드에서 get-prices 함수 배포 확인
□ 대시보드 테스트 탭에서 005930 호출 시 전날 종가 반환됨

[2단계 — 국내 주가 연동]
□ 홈 탭 진입 시 국내 종목 현재가 자동 조회됨
□ 삼성전자(005930) 현재가가 실제 전날 종가와 일치하는지 확인
  (네이버 증권에서 삼성전자 종가 비교)
□ 종목 리스트에 실제 수익률 표시됨 (0% 아님)
□ 국내 종목 현재가 옆 "종가" 배지 표시됨
□ 요약 카드 하단 가격 기준 고지 표시됨
□ 가격 조회 실패 시 에러 메시지 + 재시도 버튼 표시됨
□ market_cache 테이블에 데이터 저장됨
  (Supabase Table Editor → market_cache 확인)

[3단계 — 티커 자동완성]
□ 종목명 2글자 입력 + 국장 선택 시 드롭다운 표시됨
□ "삼성전자" 입력 시 005930 항목 표시됨
□ 항목 선택 시 종목명·티커 자동 입력됨
□ 자동완성 실패해도 수동 입력 정상 동작

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 계좌 CRUD 정상 (✏️ 아이콘)
□ 종목 CRUD 정상 (수동 입력 포함)
□ 탭 5개 전환 정상
□ 로그인·로그아웃 정상
□ F12 콘솔에 에러 없음
→ 전부 OK → PHASE 3-4로 이동
```

---

### PHASE 3-4. 미국 주가 연동 (Finnhub)

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드
> 참고 PRD: PRD_02_portfolio.md § 7-2, § 7-4
> Edge Function 수정: Supabase 대시보드에서 직접 수정·배포

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 탭 전환·로그인·온보딩
- 계좌 CRUD / 종목 CRUD
- get-prices Edge Function (국내 주가 + 티커 자동완성)
- 국내 주가 홈 화면 연동

== 이번 Phase 목표 ==
1. 기존 get-prices Edge Function에 미국 주가 조회 기능 추가
2. 미국 주가 홈 화면 연동 (Finnhub REST API)
3. 미국 티커 자동완성 추가
4. Finnhub API 키 없을 때 안내 처리

== 전제 조건 ==
Finnhub API 키는 PHASE 7(마이페이지)에서 사용자가 직접 입력 예정.
지금은 키가 없는 상태이므로:
- 키 없으면 미국 주가 조회 건너뜀
- 홈 화면에 "마이페이지에서 Finnhub API 키를 등록하면
  미국 주가를 볼 수 있어요." 안내
- 국내 종목은 키 없어도 정상 표시

== 작업 순서 ==
1단계: Supabase Secrets에 ENCRYPTION_KEY 등록 방법 안내
       → 내가 직접 등록 후 확인
2단계: get-prices Edge Function에 미국 주가 조회 코드 추가
3단계: 홈 화면 미국 주가 연동 + 키 없을 때 안내
4단계: 미국 티커 자동완성 추가
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: ENCRYPTION_KEY 등록 안내 ==
비전공자도 따라할 수 있게 단계별로 안내해줘.
Supabase 대시보드 → Edge Functions → Secrets 등록 방법.
ENCRYPTION_KEY 값은 32자리 랜덤 문자열 생성 방법도 알려줘.

== 2단계: get-prices Edge Function 수정 ==

기존 get-prices 함수에 아래 기능 추가
(국내 주가·티커 검색 기존 코드 절대 수정 금지)

추가할 내용:

[미국 주가 조회]
- 미국 티커 감지: .KS 없는 알파벳 티커
- 사용자 Finnhub 키 조회:
  users 테이블 finnhub_api_key_encrypted 조회 →
  AES-256 복호화 (환경변수 ENCRYPTION_KEY 사용)
- 키 없으면: { error: "NO_FINNHUB_KEY" } 반환
- Finnhub REST API 호출:
  GET https://finnhub.io/api/v1/quote?symbol={TICKER}&token={KEY}
  응답 추출: { c: 현재가, pc: 전일종가, d: 변동, dp: 변동률 }
- 캐시: market_cache, 유효시간 1분
- Rate Limit(429) 발생 시:
  캐시 데이터 반환 + basis: "cached" 표시

[미국 티커 자동완성 (search 액션 확장)]
기존 search 액션에 미국 종목 검색 추가
market: "US" 요청 시 →
Yahoo Finance: https://query1.finance.yahoo.com/v1/finance/search?q={검색어}
미국 주식(EQUITY)만 필터

== 3단계: 홈 화면 미국 주가 연동 (index.html 수정) ==

홈 탭 진입 시:
1. 미국 종목(market='US') 티커 목록 조회
2. get-prices 호출
3. 응답 처리:
   - 정상: 현재가 업데이트 → 수익률 재계산
   - NO_FINNHUB_KEY:
     미국 종목 행에 "🔑 API 키 필요" 배지 표시
     탭 시 "마이페이지 → 설정에서 Finnhub API 키를 등록해주세요." 안내
   - Rate Limit: 캐시값 표시 + "잠시 후 갱신됩니다" 토스트

UI 변경:
- 미국 종목 현재가 옆: "실시간" 배지 (초록 태그)
- Finnhub 키 없는 종목: "🔑 API 키 필요" 배지 (회색)
- 요약 카드 하단 고지:
  "🏢 국내 전날 종가  |  🇺🇸 미국 실시간  |  💱 환율 준비 중"
  (환율은 PHASE 3-5에서 추가)

== 4단계: 미국 티커 자동완성 (index.html 수정) ==

종목 추가 화면 시장=미장 선택 + 2글자 이상 입력 시 활성화
get-prices search 액션 (market: "US") 호출
드롭다운:
  NVDA  NVIDIA Corp  🇺🇸 미국
  AAPL  Apple Inc    🇺🇸 미국
항목 선택 시 종목명·티커 자동 입력

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 환율 연동 금지 (PHASE 3-5에서 할 것)
- 국내 주가·자동완성 기존 코드 수정 금지
- 계좌·종목 CRUD 기존 코드 수정 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
[1단계 — Secrets 등록]
□ Supabase Secrets에 ENCRYPTION_KEY 등록 확인
  (대시보드 → Edge Functions → Secrets 탭)

[2단계 — Edge Function 수정]
□ get-prices 함수에 미국 주가 코드 추가 확인
□ Finnhub 키 없을 때 NO_FINNHUB_KEY 반환 확인

[3단계 — 미국 주가 연동]
□ Finnhub 키 없을 때:
  미국 종목에 "🔑 API 키 필요" 배지 표시됨
□ Finnhub 키 등록 후 (테스트 키로 확인):
  NVDA 현재가가 실제 시세와 근접하게 표시됨
□ 미국 종목 현재가 옆 "실시간" 배지 표시됨
□ 요약 카드 하단 고지 3항목 표시됨
□ market_cache에 미국 티커 데이터 저장됨

[4단계 — 미국 티커 자동완성]
□ 시장=미장 + "NVDA" 입력 시 드롭다운 표시됨
□ 항목 선택 시 종목명·티커 자동 입력됨

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 국내 주가 연동 정상 (삼성전자 종가 표시)
□ 국내 티커 자동완성 정상
□ 계좌·종목 CRUD 정상
□ 탭 전환·로그인 정상
□ F12 콘솔에 에러 없음
→ 전부 OK → PHASE 3-5로 이동
```

---

### PHASE 3-5. 환율 연동 + 원화/달러 토글

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드
> 참고 PRD: PRD_02_portfolio.md § 7-3, § 4-1

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD
- 국내 주가 연동 (Yahoo Finance)
- 미국 주가 연동 (Finnhub, 키 없을 때 안내 포함)
- 요약 카드 하단 고지 "💱 환율 준비 중" 표시 중

== 이번 Phase 목표 ==
1. 기존 get-prices Edge Function에 환율 조회 기능 추가
2. 홈 화면 원화/달러 토글 구현
3. 요약 카드 하단 고지 환율 갱신 시각 표시

== 작업 순서 ==
1단계: get-prices Edge Function에 환율 조회 추가
       → Supabase 대시보드에서 직접 수정·배포
2단계: 홈 화면 원화/달러 토글 + 실시간 재계산
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: get-prices Edge Function 환율 추가 ==

기존 get-prices 함수에 환율 조회 추가
(기존 국내·미국 주가 코드 절대 수정 금지, 추가만)

환율 조회:
  소스: https://api.fxratesapi.com/latest?base=USD&currencies=KRW
  캐시: market_cache에 ticker='USD_KRW'로 저장, 유효시간 1시간
  캐시 유효 시: 캐시값 즉시 반환
  캐시 만료 시: API 호출 → market_cache UPSERT
  API 실패 시 폴백:
    https://open.er-api.com/v6/latest/USD (무료 백업)
  폴백도 실패 시: 마지막 캐시값 반환

응답 구조에 환율 추가:
  {
    "prices": { "005930": {...}, "NVDA": {...} },
    "exchange_rate": { "KRW": 1350.5, "updated_at": "14:00" }
  }

== 2단계: 홈 화면 원화/달러 토글 (index.html 수정) ==

토글 버튼:
  위치: 홈 탭 요약 카드 우상단
  형태: [₩ KRW] ↔ [$ USD] 전환 버튼
  선택 모드 localStorage 저장 (앱 재시작 후에도 유지)

KRW 모드 계산:
  국내 종목 평가금액 = 현재가(KRW) × 수량
  미국 종목 평가금액 = 현재가(USD) × 수량 × 환율(KRW)
  총 평가금액 = 전부 원화 합산 → ₩ 표시
  총 손익 = 총 평가금액 - 총 매수금액(KRW 환산 기준)

USD 모드 계산:
  국내 종목 평가금액 = 현재가(KRW) × 수량 ÷ 환율(KRW)
  미국 종목 평가금액 = 현재가(USD) × 수량
  총 평가금액 = 전부 달러 합산 → $ 표시
  총 손익 = 총 평가금액 - 총 매수금액(USD 환산 기준)

토글 시:
  모든 금액 즉시 재계산 (API 재호출 없음, 이미 받은 환율값 재사용)
  수익 빨강 / 손실 파랑 색상 함께 업데이트

요약 카드 하단 고지 최종:
  "🏢 국내 전날 종가  |  🇺🇸 미국 실시간  |  💱 환율 HH:MM 기준"
  HH:MM: exchange_rate.updated_at 값 표시
  탭 시 → 설명 모달:
    "국내 주식은 전날 종가 기준입니다.
     미국 주식은 실시간 현재가입니다.
     환율은 1시간마다 자동 갱신됩니다."

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 국내·미국 주가 기존 코드 수정 금지
- 계좌·종목 CRUD 기존 코드 수정 금지
- market_cache 외 테이블 스키마 변경 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
□ 홈 탭 요약 카드 우상단에 [₩ KRW] / [$ USD] 토글 표시됨
□ KRW 모드: 미국 종목이 원화 환산 금액으로 표시됨
□ USD 모드: 국내 종목이 달러 역환산 금액으로 표시됨
□ 토글 전환 시 금액 즉시 재계산됨 (API 재호출 없음)
□ 앱 새로고침 후에도 선택한 모드 유지됨
□ 요약 카드 하단 고지에 "💱 환율 HH:MM 기준" 표시됨
□ 고지 탭 시 설명 모달 표시됨
□ market_cache에 USD_KRW 데이터 저장됨
  (Supabase Table Editor → market_cache → ticker='USD_KRW' 확인)
[회귀 테스트] 이전 기능 영향 없음 확인:
□ 국내·미국 주가 연동 정상
□ Finnhub 키 없을 때 안내 표시 정상
□ 티커 자동완성 정상 (국내·미국 모두)
□ 계좌·종목 CRUD 정상
□ F12 콘솔에 에러 없음
→ 전부 OK → PHASE 3-6으로 이동
```

---

### PHASE 3-6. 포트폴리오 수익률 최종 계산 + 통합 QA

> 실행 위치: Claude Code CLI (터미널)
> 참고 PRD: PRD_02_portfolio.md § 4-1, § 5

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD
- 국내·미국 주가 연동
- 환율 연동 + 원화/달러 토글

== 이번 Phase 목표 ==
PHASE 3 전체 마무리:
1. 포트폴리오 수익률 최종 계산 완성
2. 필터 바 구현 (시장·상태·유형)
3. 현금 자산 입력
4. PHASE 3 전체 통합 QA

== 구현할 기능 ==

[1] 포트폴리오 수익률 최종 계산

요약 카드 최종 표시 항목:
  - 페르소나 조직명 + 호칭
    대표님: "[조직명] 대표님의 운용 포트폴리오"
    사령관: "[조직명] 사령관님의 전략 배치"
  - 총 평가금액 (선택 통화 기준)
  - 총 손익: +₩1,234,567 (+11.2%) — 수익 빨강 / 손실 파랑
  - 총 보유 종목 수 (숨김 제외)

종목별 수익률:
  수익률 = (현재가 - 평균 매수가) / 평균 매수가 × 100
  평가금액 = 현재가 × 수량 (선택 통화 기준)
  손익금 = 평가금액 - 매수금액
  비중 = 해당 종목 평가금액 / 전체 평가금액 × 100

숫자 표시 형식:
  금액: 천 단위 콤마 (₩ 12,345,678 / $ 9,145)
  수익률: 소수점 2자리 (+12.34%)
  비중: 소수점 1자리 (23.4%)
  모든 금융 숫자: font-variant-numeric: tabular-nums 적용

[2] 필터 바
위치: 계좌 탭 아래, 종목 리스트 위
  - 시장: 전체 / 국장 / 미장
  - 상태: 전체 / 보유 / 매수 / 관심 / 숨김
  - 유형: 전체 / 단타 / 장타
필터 선택 시 종목 리스트 즉시 필터링 (API 재호출 없음)
필터 상태 유지: 탭 전환 후 홈 복귀 시에도 유지

[3] 현금 자산 입력
위치: 종목 리스트 하단
  - 원화 현금: 수동 입력 + 저장 버튼
  - 달러 현금: 수동 입력 + 저장 버튼
  - 저장: users 테이블 cash_krw / cash_usd UPDATE
  - 총 평가금액에 현금 합산 (선택 통화 기준 환산 후 합산)

[4] PHASE 3 전체 통합 QA 체크리스트 출력
아래 시나리오를 순서대로 테스트하는 체크리스트를 만들어줘:
  시나리오 1: 신규 사용자 — 계좌 추가 → 국내 종목 추가 → 수익률 확인
  시나리오 2: 미국 종목 추가 → Finnhub 키 없을 때 안내 확인
  시나리오 3: 원화/달러 토글 전환 → 금액 재계산 확인
  시나리오 4: 필터 바 — 국장만 / 보유만 필터링
  시나리오 5: 계좌 삭제 → 연결 종목 자동 삭제 확인
  시나리오 6: 앱 새로고침 후 데이터·모드 유지 확인

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- get-prices Edge Function 수정 금지
- 계좌·종목 CRUD 기존 코드 수정 금지

== 완료 후 ==
PHASE 3 전체 통합 QA 체크리스트 출력해줘.
모든 항목 통과 시 commit 메시지 제안해줘.
```

**완료 조건 (PHASE 3 최종):**
```
[수익률 계산]
□ 요약 카드에 총 평가금액·손익·수익률 정상 표시됨
□ 페르소나 조직명·호칭 정상 표시됨
□ 종목별 평가금액·수익률·비중 정상 계산됨
□ 숫자 천 단위 콤마 정상 표시됨
□ 수익 빨강 / 손실 파랑 색상 정상 표시됨

[필터 바]
□ 시장 필터 (전체/국장/미장) 정상 동작
□ 상태 필터 (보유/매수/관심/숨김) 정상 동작
□ 유형 필터 (단타/장타) 정상 동작
□ 탭 이동 후 홈 복귀 시 필터 상태 유지됨

[현금 자산]
□ 원화 현금 입력·저장·표시 정상
□ 달러 현금 입력·저장·표시 정상
□ 현금이 총 평가금액에 합산됨

[PHASE 3 통합 시나리오]
□ 시나리오 1~6 전부 통과

[회귀 테스트] 전체 기능 최종 확인:
□ PHASE 0~2 기능 전부 정상 (온보딩·로그인·탭 전환)
□ 국내·미국 주가 연동 정상
□ 환율 토글 정상
□ F12 콘솔에 에러 없음
□ GitHub Pages URL에서도 정상 동작

✅ PHASE 3 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 3 complete - portfolio with live prices"
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 4 프롬프트로 이동
```

---

## 8. PHASE 4 — 시장 지표 위젯

> 목표: 홈 탭에 시장 지표 위젯 구현 + 실제 API 연동
> 산출물: 코스피·나스닥·VIX·환율·BTC 등 실시간 지표가 홈 화면에 표시되는 상태
> 예상 소요: 1일 (3시간)
> 참고 PRD: PRD_05_market.md

---

### PHASE 4-1. 시장 지표 위젯

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드
> Edge Function: Supabase 대시보드에서 직접 작성·배포

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD
- 국내·미국 주가 연동 (get-prices Edge Function)
- 환율 연동 + 원화/달러 토글
- 포트폴리오 수익률 계산

== 이번 Phase 목표 ==
홈 탭에 시장 지표 위젯 구현
위치: 홈 탭 요약 카드 아래, 종목 리스트 위

== 작업 순서 ==
1단계: get-market-widget Edge Function 생성
       → Supabase 대시보드에서 직접 작성·배포
2단계: 위젯 UI + 접기/펼치기 + 설정 화면
3단계: 실제 API 연동 + 커스텀 설정 저장
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: get-market-widget Edge Function ==

함수명: get-market-widget
(get-prices와 별도 함수 — 포트폴리오 가격 조회와 분리)

처리 흐름:
1. JWT 검증
2. 클라이언트로부터 ON 상태 항목 키 목록 수신
   { "keys": ["kospi", "nasdaq", "vix", "usd_krw", "btc"] }
3. 각 항목 market_cache 확인
   - 실시간 항목 (VIX·선물·원자재·코인): 1분 이내
   - 지수 항목 (코스피·나스닥 등): 15분 이내
   - 환율: 1시간 이내 (get-prices와 캐시 공유, ticker='USD_KRW')
4. 만료된 항목만 외부 API 병렬 호출:
   - Yahoo Finance 지수·선물·원자재:
     https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}
     추출: regularMarketPrice, previousClose, regularMarketChange,
           regularMarketChangePercent
   - CoinGecko (BTC·ETH):
     https://api.coingecko.com/api/v3/simple/price
     ?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true
   - 환율: market_cache ticker='USD_KRW' 재사용 (별도 호출 없음)
5. market_cache UPSERT
6. 응답 반환:
   {
     "items": [
       {
         "key": "kospi",
         "name": "코스피",
         "value": 2580.3,
         "change": -7.8,
         "change_pct": -0.30,
         "updated_at": "14:32",
         "basis": "delayed_15m"
       }
     ]
   }

항목별 Yahoo Finance 티커 매핑:
  kospi: "^KS11"    kosdaq: "^KQ11"
  nasdaq: "^IXIC"   sp500: "^GSPC"    dow: "^DJI"
  russell: "^RUT"   sox: "^SOX"       vix: "^VIX"
  es_futures: "ES=F"  nq_futures: "NQ=F"  rty_futures: "RTY=F"
  gold: "GC=F"  silver: "SI=F"  wti: "CL=F"
  natgas: "NG=F"  wheat: "ZW=F"  corn: "ZC=F"  copper: "HG=F"

환율 티커 매핑:
  usd_krw: market_cache 'USD_KRW' 재사용
  eur_usd / usd_jpy: FreeExchangeRateApi

CoinGecko 매핑:
  btc: bitcoin  eth: ethereum

== 2단계: 위젯 UI (index.html 수정) ==

위젯 구조:
```
[시장 지표]                    ⚙  ∧접기
─────────────────────────────────────
국내 지수
  코스피        2,580    -7.8   -0.30%
  코스닥          850    +0.9   +0.11%
미국 지수
  나스닥       19,240  +153.9   +0.81%
  ...
─────────────────────────────────────
마지막 갱신: 14:32
```

색상 규칙:
  등락 양수: var(--color-profit) 빨강
  등락 음수: var(--color-loss) 파랑
  보합(0): var(--color-text-secondary) 회색

접기/펼치기:
  ∧ 버튼 탭 → 위젯 전체 접힘
  접힌 상태: "[시장 지표] ⚙ ∨펼치기" 한 줄만 표시
  상태: localStorage 저장 (기기별 설정)

수동 갱신:
  "마지막 갱신: HH:MM" 탭 → get-market-widget 재호출
  갱신 중: 항목별 스켈레톤 표시

부분 에러 처리:
  특정 항목 API 실패 시 → 해당 항목만 "—" 표시
  나머지 정상 항목은 그대로 표시

== 3단계: 커스텀 설정 화면 ==

진입: 위젯 우상단 ⚙ 버튼 탭
화면: 카테고리별 ON/OFF 체크박스 목록

카테고리 및 항목 (기본 ON 표시):
  국내 지수: 코스피 ✅ / 코스닥 ✅
  미국 지수: 나스닥 ✅ / S&P500 ✅ / 다우 ✅ / 러셀 2000 ☐ / SOX ☐
  변동성: VIX ✅
  선물: S&P500 선물 ☐ / 나스닥 선물 ☐ / 러셀 선물 ☐
  환율: USD/KRW ✅ / EUR/USD ☐ / USD/JPY ☐
  가상화폐: BTC ✅ / ETH ✅
  원자재 귀금속: 금 ☐ / 은 ☐
  원자재 에너지: 유가(WTI) ☐ / 천연가스 ☐
  원자재 농산물: 밀 ☐ / 옥수수 ☐
  원자재 산업금속: 구리 ☐

동작 규칙:
  - 체크박스 탭 → 즉시 ON/OFF 토글
  - [저장] 버튼 탭 → Supabase users.widget_settings JSONB UPDATE
  - 저장 후 위젯 즉시 반영
  - [초기화] 버튼 → 확인 다이얼로그 → 기본값으로 리셋
  - 전체 OFF 시도 시: "최소 1개 이상 선택해주세요." 안내

== UI 상태 4가지 ==
로딩:    홈 탭 진입 시 → 항목별 스켈레톤
빈 화면: 전체 OFF (발생 불가 — 최소 1개 강제)
에러:    API 실패 → 해당 항목 "—" 표시
정상:    지표 목록 표시

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- get-prices Edge Function 수정 금지
- 포트폴리오 기존 코드 수정 금지
- market_cache 테이블 스키마 변경 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
[Edge Function]
□ Supabase 대시보드에서 get-market-widget 배포 확인
□ 코스피(^KS11) 호출 시 현재값 반환됨

[위젯 UI]
□ 홈 탭에 시장 지표 위젯 표시됨
□ 기본 ON 9개 항목 표시됨
  (코스피·코스닥·나스닥·S&P500·다우·VIX·USD/KRW·BTC·ETH)
□ 등락 양수 빨강 / 음수 파랑 색상 정상
□ ∧ 접기 버튼 탭 시 한 줄로 접힘
□ ∨ 펼치기 버튼 탭 시 복원됨
□ 접기 상태가 새로고침 후에도 유지됨
□ "마지막 갱신: HH:MM" 탭 시 재조회됨
□ 특정 항목 실패 시 해당 항목만 "—" 표시됨

[커스텀 설정]
□ ⚙ 버튼 탭 시 설정 화면 열림
□ 체크박스 ON/OFF 즉시 토글됨
□ 저장 후 users.widget_settings에 반영됨
  (Supabase Table Editor → users → widget_settings 컬럼 확인)
□ 로그아웃 → 재로그인 시 설정 유지됨
□ 전체 OFF 시도 시 안내 표시됨
□ 초기화 후 기본값으로 복원됨

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 포트폴리오 수익률 계산 정상
□ 원화/달러 토글 정상
□ 계좌·종목 CRUD 정상
□ 탭 전환·로그인 정상
□ F12 콘솔에 에러 없음

✅ PHASE 4 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 4 complete - market widget"
→ PHASE 5 프롬프트로 이동
```

---

## 9. PHASE 5 — 뉴스 피드 + 공지 배너

> 목표: 뉴스 탭 전체 구현 (내 종목 뉴스 + 시장 전체 뉴스 + 검색)
> 산출물: 보유 종목 기반 뉴스가 자동 필터링되고 검색 기록이 유지되는 뉴스 허브
> 예상 소요: 2일
> 참고 PRD: PRD_03_news.md 전체

---

### PHASE 5-1. 뉴스 피드 기반 구조 + get-news Edge Function

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드
> Edge Function: Supabase 대시보드에서 직접 작성·배포

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD + 주가 연동 + 환율 토글
- 시장 지표 위젯 (get-market-widget Edge Function)

== 이번 Phase 목표 ==
뉴스 탭 전체 구현:
  서브탭 A: 내 종목 뉴스
  서브탭 B: 시장 전체 뉴스
  검색 기능 (보유 종목 미리보기 + 최근 검색 + 자동완성)
  공지 배너 (announcements 테이블 연동)

== 작업 순서 ==
1단계: get-news Edge Function 생성 → 대시보드 배포
2단계: 서브탭 A — 내 종목 뉴스 UI + 공지 배너 + 어닝콜 배너
3단계: 서브탭 B — 시장 전체 뉴스
4단계: 검색 기능 (보유 종목 미리보기 + 최근 검색 + 자동완성)
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: get-news Edge Function ==

함수명: get-news
(get-prices·get-market-widget과 별도 함수)

처리 분기 (action 파라미터로 구분):

[action: "my_news"] — 내 종목 뉴스
  요청: { action: "my_news", tickers: ["005930","NVDA"], markets: {"005930":"KR","NVDA":"US"} }
  1. JWT 검증
  2. news_cache 확인 (ticker별, 15분 유효)
  3. 캐시 만료 시:
     국내 티커(KR):
       URL: https://finance.naver.com/item/news_news.naver?code={ticker}
       CORS 프록시 순서:
         1순위: https://corsproxy.io/?{encodeURIComponent(URL)}
         2순위 (폴백): https://api.allorigins.win/raw?url={encodeURIComponent(URL)}
       파싱: DOMParser로 XML → 제목·URL·발행일 추출
     미국 티커(US):
       사용자 finnhub_api_key_encrypted 복호화 (ENCRYPTION_KEY)
       키 없으면: { error: "NO_FINNHUB_KEY" }
       Finnhub: GET /api/v1/company-news?symbol={ticker}&from={7일전}&to={오늘}
  4. news_cache UPSERT (ticker, source, title, url, published_at, expires_at=15분 후)
  5. 응답: 모든 종목 뉴스 최신순 정렬 + 종목 배지 포함

[action: "market_news"] — 시장 전체 뉴스
  요청: { action: "market_news", category: "general" }
  category: general | forex | crypto | merger
  1. JWT 검증
  2. news_cache 확인 (ticker='market_{category}', 15분 유효)
  3. 만료 시 Finnhub General News API 호출
     GET /api/v1/news?category={category}
  4. news_cache UPSERT
  5. 응답 반환

[action: "search"] — 뉴스 검색 자동완성
  요청: { action: "search", query: "NVDA" }
  1. JWT 검증
  2. Finnhub Symbol Search API 호출
     GET /api/v1/search?q={query}
  3. 결과: 내 종목 여부 flag 추가 (holdings 테이블 조회)
  4. 내 종목은 상단 고정 (is_mine: true)
  5. 어닝콜: event_cache 테이블 조회 (ticker별)
  6. 응답 반환

보안:
- 모든 action JWT 검증 필수
- Finnhub 키 없는 요청: { error: "NO_FINNHUB_KEY" } 반환
- 뉴스 요청당 티커 최대 20개 제한

== 2단계: 서브탭 A — 내 종목 뉴스 (index.html 수정) ==

레이아웃 (위→아래):

[1] 상단 검색바 (항상 고정)
  "🔍 종목명 또는 티커 검색" 플레이스홀더
  탭 → 검색 화면으로 전환

[2] 종목 필터 칩 (가로 스크롤)
  "전체" 칩 기본 선택
  등록 종목 각각 칩으로 표시
  칩 탭 → 해당 종목 뉴스만 필터 (API 재호출 없음, 이미 받은 데이터 필터)

[3] 공지 배너 (미읽은 공지 있을 때만 노출)
  announcements 테이블 조건:
    is_active = true
    banner_visible = true
    starts_at <= now() <= ends_at (날짜 설정된 경우)
    announcement_reads 테이블에 현재 사용자 읽음 기록 없는 것
  표시: "📢 [공지 제목]" → 탭 시 공지 상세 모달
  X 버튼 → announcement_reads INSERT (읽음 처리)

[4] 어닝콜 배너 (D-7 이내 종목 있을 때만 노출)
  event_cache 테이블에서 보유 종목 기준 D-7 이내 어닝콜 조회
  "📅 NVDA 실적 발표 D-3 · 6월 4일" 표시
  탭 → 어닝콜 상세 모달 (예상 EPS, 전분기 EPS 포함)

[5] 대형 카드 (가장 최근 뉴스 1건)
  헤드라인 2줄
  출처 · 시간 · 종목 배지

[6] 소형 카드 2열 (나머지 뉴스)
  제목 1줄 / 출처 · 시간 · 종목 배지

[7] 각 뉴스 카드 하단: AI 요약 버튼 (비활성화 상태)
  app_config ai_summary_enabled = false 이므로:
  회색 버튼 + 🔒 아이콘
  페르소나 텍스트 분기:
    대표님: "🔒 AI 리포트 요약"
    사령관: "🔒 AI 브리핑 요약"
  탭 시 토스트: "곧 제공될 예정이에요 🔒"

뉴스 카드 탭 → 외부 링크 오픈 (새 탭)

빈 화면 (종목 0개):
  "📰 아직 종목이 없어요"
  "내가 보유한 종목의 최신 소식을 자동으로 모아드릴게요."
  [+ 첫 종목 등록하기] → 홈 탭 종목 추가로 이동

Finnhub 키 없을 때 (미국 종목만):
  해당 종목 카드 위치에 "🔑 API 키 연결 시 [TICKER] 뉴스를 볼 수 있어요." 표시
  국내 종목 뉴스는 정상 표시 유지

수동 갱신:
  화면 당겨서 새로고침 (Pull to refresh)
  뉴스 영역 상단에 "N분 전 갱신" 표시

== 3단계: 서브탭 B — 시장 전체 뉴스 (index.html 수정) ==

카테고리 필터 탭 (가로 스크롤):
  전체 / 외환 / 코인 / M&A / 기술 / 에너지
  탭 선택 시 get-news action: "market_news" 호출

뉴스 카드:
  제목 / 미디어명 / 발행 시간 / 썸네일 이미지 (있을 경우)
  탭 → 외부 링크

Finnhub 키 없을 때:
  "🔑 Finnhub API 키를 연결하면 실시간 시장 뉴스를 볼 수 있어요."
  [API 키 설정하기] → 마이페이지 설정 (PHASE 7에서 연결, 지금은 알림만)

== 4단계: 검색 기능 (index.html 수정) ==

검색바 탭 → 검색 화면 전환 (showScreen 활용)

[검색어 입력 전 화면]

① 내 보유 종목 미리보기
  holdings 테이블에서 현재 사용자 전체 종목 조회
  (보유/매수/관심/숨김 전부 — 숨김도 검색에는 표시)
  최대 5개 표시 (초과 시 "더보기" → 전체 목록)
  표시 항목: 시장 아이콘 / 종목명 / 티커 / 상태 배지
  탭 → 해당 종목 뉴스 즉시 표시 (get-news action: "search")

② 최근 검색 기록
  search_history 테이블 조회 (최대 8개, 최신순)
  각 항목: 종목명 / 티커 / X 버튼 (개별 삭제)
  "전체 삭제" 버튼 → 확인 없이 즉시 삭제 (search_history DELETE)
  탭 → 해당 종목 뉴스 즉시 표시

[검색어 2글자 이상 입력 시 — 자동완성]
  300ms 디바운스
  get-news action: "search" 호출
  내 종목: ★ + "[내 종목]" 배지 상단 고정
  나머지: 일반 검색 결과
  탭 → 검색 결과 화면

[검색 결과 화면]
  ← 뒤로가기 + 종목명·티커 헤더
  내 종목 여부:
    내 종목: ★ 배지 + 보유 현황 한 줄
      예: "10주 보유 · 평균 $850 · +8.2%"
    내 종목 아님: "+ 종목 추가" 버튼 (홈 탭 종목 추가로 이동)
  어닝콜 정보 (event_cache에 있을 경우):
    "📅 다음 실적 발표 D-2 · 6월 4일 수"
    예상 EPS / 전분기 EPS
  관련 뉴스 목록 (get-news action: "my_news" 단일 티커)

  검색 완료 시 → search_history INSERT
    (중복 티커: searched_at만 업데이트)

== UI 상태 4가지 — 전체 서브탭 공통 ==

서브탭 A:
  로딩: 뉴스 카드 스켈레톤 3개
  빈 화면: 종목 0개 → "첫 종목 등록하기" CTA
  에러: "뉴스를 불러오지 못했어요." + 재시도 버튼 + 캐시 데이터 흐리게 유지
  정상: 카드 리스트

서브탭 B:
  로딩: 스켈레톤
  빈 화면: Finnhub 키 없음 → 키 설정 안내
  에러: "뉴스를 불러오지 못했어요." + 재시도
  정상: 카테고리 필터 + 카드 리스트

검색:
  입력 전: 보유 종목 미리보기 + 최근 검색
  입력 중: 자동완성 드롭다운
  결과: 어닝콜 + 뉴스 카드
  결과 없음: "검색 결과가 없어요." + 직접 티커 입력 안내

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- get-prices·get-market-widget Edge Function 수정 금지
- AI 요약 기능 실제 구현 금지 (UI 비활성화 상태만)
- 서브탭 C 리서치·규제 구현 금지 (v1.x 예정)
- 포트폴리오·위젯 기존 코드 수정 금지
- news_cache·search_history 외 테이블 스키마 변경 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
각 단계별 확인 방법도 알려주세요.
```

**완료 조건:**
```
[1단계 — Edge Function]
□ Supabase 대시보드에서 get-news 배포 확인
□ action: "my_news" 호출 시 뉴스 반환됨
□ Finnhub 키 없을 때 NO_FINNHUB_KEY 반환됨

[2단계 — 서브탭 A]
□ 보유 종목 기반 뉴스 자동 표시됨
□ 종목 필터 칩 탭 시 해당 종목 뉴스만 필터됨
□ 공지 배너: 미읽은 공지 있을 때만 표시됨
□ 공지 X 버튼 탭 시 배너 사라짐 + announcement_reads 저장됨
  (Supabase Table Editor → announcement_reads 확인)
□ 어닝콜 배너: D-7 이내 종목 있을 때만 표시됨
□ 대형 카드 1개 + 소형 카드 2열 레이아웃 정상
□ AI 요약 버튼 비활성화 (🔒) + 탭 시 토스트 표시됨
□ AI 요약 버튼 텍스트가 페르소나 모드에 따라 분기됨
□ 뉴스 카드 탭 → 외부 링크 열림
□ 종목 0개일 때 빈 화면 + CTA 표시됨
□ Finnhub 키 없는 미국 종목: 키 연결 안내 표시됨
□ "N분 전 갱신" 표시됨

[3단계 — 서브탭 B]
□ 카테고리 필터 탭 전환 시 해당 카테고리 뉴스 표시됨
□ Finnhub 키 없을 때 안내 화면 표시됨
□ 뉴스 카드 탭 → 외부 링크 열림

[4단계 — 검색]
□ 검색바 탭 시 검색 화면 전환됨
□ 보유 종목 미리보기 최대 5개 표시됨
□ 최근 검색 기록 표시됨 (최대 8개)
□ X 버튼 탭 시 개별 삭제됨
□ 전체 삭제 탭 시 전부 사라짐
□ 2글자 입력 시 자동완성 드롭다운 표시됨
□ 내 종목 ★ 배지 + 상단 고정 확인됨
□ 검색 완료 후 search_history 테이블에 저장됨
  (Supabase Table Editor → search_history 확인)
□ 검색 결과: 내 종목이면 보유 현황 표시됨
□ 어닝콜 있는 종목 검색 시 어닝콜 정보 표시됨

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 포트폴리오 수익률·주가 연동 정상
□ 시장 지표 위젯 정상
□ 계좌·종목 CRUD 정상
□ 탭 5개 전환 정상
□ F12 콘솔에 에러 없음

✅ PHASE 5 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 5 complete - news feed"
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 6 프롬프트로 이동
```

---

## 10. PHASE 6 — 투자 일지

> 목표: 일지 CRUD + 계명 체크 + 예약 알림 + 아카이브 + 자동생성 일지
> 산출물: 매수 근거 기록 → 계명 체크 → 예약 알림까지 동작하는 투자 일지
> 예상 소요: 2일
> 참고 PRD: PRD_04_journal.md 전체

---

### PHASE 6-1. 일지 CRUD + 계명 체크

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD + 주가 연동
- 시장 지표 위젯
- 뉴스 피드 + 검색

== 이번 Phase 목표 ==
투자 일지 전체 구현:
  일지 메인 (피드 + 필터 + 넛지 배너 + 일정 섹션)
  일지 작성 (유형별 폼 + 계명 체크 + 중요 표시)
  일지 상세·수정·삭제
  아카이브
  예약 알림 (앱 내 알림 — 웹 푸시는 PHASE 6-2에서)
  자동생성 일지 (어닝콜·FOMC 표시)

== 작업 순서 ==
1단계: 일지 메인 화면 (피드 + 필터 + 넛지 배너 + 일정 섹션)
2단계: 일지 작성 화면 (유형별 폼 + 계명 체크 + 중요 표시)
3단계: 일지 상세·수정·삭제 + 아카이브
4단계: 예약 알림 (앱 내 알림 + send-alerts Edge Function)
5단계: 자동생성 일지 (event_cache 연동)
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: 일지 메인 화면 ==

레이아웃 (위→아래):

[1] 습관 넛지 배너
  조건: 오늘 작성한 일지 0건일 때만 표시
  내용: "📝 오늘 매수·매도가 있었나요?
         기록해두면 나중에 복기할 수 있어요. [+ 바로 작성]"
  스트릭 표시: 연속 작성일 1일 이상이면
    "🔥 N일 연속 기록 중" 넛지 배너 위에 표시
  계산: journal_entries에서 user_id별 연속 날짜 카운트
  오늘 일지 1건 이상 → 배너 즉시 숨김

[2] 상단 탭: 활성 | 아카이브

[3] 필터 탭 (가로 스크롤, 활성 탭일 때만):
  전체 | 📈매수 | 📉매도 | 🌍매크로 | 🔄복기 | 💡아이디어 | 📝일반 | 📅일정 | 🔴중요

[4] 일정 섹션 (event_cache 연동, 접기/펼치기)
  D-7 이내 어닝콜·FOMC 보유 종목 기준 조회
  D-day 순 정렬
  자동생성 일지: 🤖 배지 + "메모 추가 →" 버튼
  예시:
    "D-2  🏢 NVDA 실적발표  🤖자동  메모 추가 →"
    "D-5  🏦 FOMC 금리결정  🤖자동  메모 추가 →"

[5] 일지 피드 (최신순)
  일지 카드 구성:
    중요 ON: 카드 좌측 빨간 세로선 + 🔴 아이콘
    중요 OFF: 기본 스타일
    카드 우측 상단 🔴 탭 → 저장 없이 즉시 중요 토글
              (journal_entries.is_important UPDATE)
    유형 아이콘 + 날짜
    종목 태그 배지
    내용 미리보기 (2줄 truncate)
    알림 예약됨 표시 (alert_at 있을 때): "🔔 YYYY.MM.DD HH:MM 알림 예약됨"

[6] FAB 버튼 (우하단 고정)
  페르소나 텍스트:
    대표님: "+ 일지 작성"
    사령관: "+ 작전 기록"
  탭 → 유형 선택 바텀시트:
    [📈 매수] [📉 매도] [🌍 매크로] [🔄 복기] [💡 아이디어] [📝 일반]
  유형 선택 → 작성 화면으로 전환

UI 상태:
  로딩: 카드 스켈레톤 3개
  빈 화면: "아직 일지가 없어요. 첫 일지를 작성해보세요." + FAB 강조
  에러: "일지를 불러오지 못했어요." + 재시도
  정상: 피드 표시

무료 플랜 20개 제한:
  app_config free_journal_limit 값 확인
  20개 초과 시 FAB 탭 → "프리미엄 플랜에서 일지를 무제한으로 기록하세요." 안내
  (app_config subscription_enabled=false면 제한 미적용)

== 2단계: 일지 작성 화면 ==

헤더: ← 뒤로가기 + "일지 작성" + [저장] 버튼

[1] 유형 선택 (이미 선택된 상태로 진입, 변경 가능)
  [📈매수] [📉매도] [🌍매크로] [🔄복기] [💡아이디어] [📝일반]
  유형 탭 시 아래 폼 즉시 전환

[2] 유형별 추가 입력 항목 자동 전환:
  매수: 목표가 입력란 추가
  매도: 결과 평가 + 아카이브 토글 추가
  복기: "당시 판단" / "지금 돌아보면" 2단 입력
  매크로: 시장 방향 선택 (📈상승 / ➡️중립 / 📉하락)
  아이디어: 기본 + 관심 종목 태그
  일반: 자유 텍스트만

[3] 종목 태그 (선택)
  [+ 종목 추가] 탭 → 보유 종목 목록 팝업 (holdings 테이블 조회)
  선택된 종목: "[종목명] ×" 칩으로 표시
  ※ 숨김 종목도 태그 가능

[4] 중요 표시
  [🔴 중요 표시] 토글 버튼 ON/OFF

[5] 내용 입력 (textarea, 필수)
  placeholder: 유형별 다르게
    매수: "매수 이유, 목표 수익률, 손절가를 기록해보세요"
    매도: "매도 이유와 이번 거래를 돌아보는 생각을 기록해보세요"
    매크로: "오늘의 시장 흐름과 내 판단을 기록해보세요"
    기타: "자유롭게 기록해보세요"

[6] 예약 알림 (선택, 기본 OFF)
  ON 토글 시 날짜·시간 피커 노출
  날짜: 네이티브 date input
  시간: 네이티브 time input
  알림 방식: [📱 앱 푸시] [🔔 앱 내 알림] (복수 선택 가능)
  ※ 앱 내 알림: MVP에서 구현
  ※ 앱 푸시: PHASE 6-2에서 추가

[7] 투자 계명 체크 (매수·매도 유형만 자동 표시)
  investment_commandments 테이블에서 사용자 계명 조회
  계명 없으면: "아직 투자 계명이 없어요. [계명 설정하기]" 링크
  계명 있으면: 체크리스트 표시 (기본 전체 미체크)
  각 계명 탭 → 체크/언체크 토글

저장 처리:
  내용 비어있으면 저장 버튼 비활성화
  저장 탭 → Supabase journal_entries INSERT
  commandment_checks: 체크 상태 JSONB로 저장
    [{"id":"uuid","content":"손절가...","checked":true}, ...]
  알림 설정 있으면 alert_at·alert_type 저장
  매도 + 아카이브 ON → is_archived=true
  저장 성공 → 화면 닫기 + 피드 즉시 업데이트

== 3단계: 일지 상세·수정·삭제 + 아카이브 ==

[일지 상세 화면]
  카드 탭 → 상세 화면
  표시: 유형 / 날짜 / 종목 태그 / 내용 전체 / 계명 체크 상태
  자동생성 일지:
    🤖 자동생성 배지 표시
    어닝콜 정보: 예상 EPS / 전분기 EPS / 내 보유 현황
    발표 후: 실제 EPS 표시 (event_cache 또는 Finnhub earnings API)
    내 메모 입력란 추가 표시
  하단 버튼: [수정] [아카이브] [삭제]

[일지 수정]
  작성 화면과 동일 폼 (기존값 채워진 상태)
  수정 후 저장 → Supabase journal_entries UPDATE
  상단에 "작성일: / 마지막 수정:" 표시

[일지 삭제]
  확인 다이얼로그: "일지를 삭제할까요? 되돌릴 수 없어요."
  확인 → journal_entries DELETE
  자동생성 일지 삭제 시: 추가 안내 없음 (일반 삭제와 동일)

[아카이브]
  수동: 상세 화면 "아카이브" 버튼 → is_archived=true
  자동: 매도 유형 저장 시 아카이브 토글 ON 상태이면 즉시
  아카이브 탭 → is_archived=true 일지만 표시
  필터: 전체 / 매수 / 매도 / 일정
  정렬: 최신순 / 오래된순

== 4단계: 예약 알림 (앱 내 알림) ==

[send-alerts Edge Function]
  함수명: send-alerts
  배포: Supabase 대시보드에서 직접 작성·배포
  실행: Supabase Cron 1분마다 자동 실행
  설정 방법 비전공자용으로 안내

  처리 흐름:
  1. journal_entries WHERE alert_at <= NOW() AND alert_sent=false 조회
  2. alert_type에 'in_app' 포함 → notifications 테이블 INSERT:
     title: 유형별 포맷
       매수: "📈 [종목명] 매수 예약 메모"
       매도: "📉 [종목명] 매도 예약 메모"
       기타: "📝 일지 예약 알림"
     body: 내용 앞 50자
  3. alert_type에 'push' 포함 → 로그만 기록 (PHASE 6-2에서 FCM 연결 예정)
  4. alert_sent=true UPDATE

[앱 내 알림 배지]
  index.html 마이 탭 또는 헤더 영역에 알림 종 아이콘
  notifications 테이블에서 is_read=false 개수 뱃지 표시
  알림 탭 → 알림 목록 화면 (notifications 테이블 조회)
  각 알림 탭 → 해당 일지 상세로 이동 + is_read=true UPDATE

== 5단계: 자동생성 일지 ==

일지 탭 진입 시:
  event_cache에서 보유 종목 기준 D-7 이내 이벤트 조회
  해당 이벤트에 journal_entries 연결 기록 없으면:
    is_auto_generated=true 일지 자동 생성:
      entry_type: 'event'
      title: "[종목명] 실적 발표" or "FOMC 금리결정"
      event_id: event_cache.id
      is_archived: false
    중복 생성 방지: event_id 기준으로 중복 체크

발표일 경과 (D+1):
  is_auto_generated=true + event 종료 → is_archived=true 자동 전환
  (Supabase Cron 1일 1회 실행)

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 기존 Edge Function 수정 금지
- 포트폴리오·뉴스·위젯 기존 코드 수정 금지
- 일지 통계 구현 금지 (v1.x 프리미엄 예정)
- 공개 일지 구현 금지 (v2.0 커뮤니티 예정)
- FCM 푸시 구현 금지 (PHASE 6-2에서 추가)

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
[1단계 — 일지 메인]
□ 오늘 일지 0건일 때 넛지 배너 표시됨
□ 오늘 일지 1건 이상 시 넛지 배너 숨김
□ 연속 작성일 스트릭 "🔥 N일 연속 기록 중" 표시됨
□ 필터 탭 전환 시 해당 유형만 표시됨
□ 🔴 중요 필터 탭 → 중요 일지만 표시됨
□ 일정 섹션에 D-7 이내 어닝콜 표시됨
□ 카드 🔴 탭 시 저장 없이 즉시 중요 표시 토글됨
□ FAB 텍스트가 페르소나 모드에 따라 분기됨
□ 무료 20개 초과 시 프리미엄 안내 표시됨
  (subscription_enabled=false이면 제한 없음 확인)

[2단계 — 작성]
□ 유형 선택 시 해당 폼으로 즉시 전환됨
□ 매수 유형: 목표가 입력란 표시됨
□ 매도 유형: 결과 평가 + 아카이브 토글 표시됨
□ 복기 유형: 2단 입력 표시됨
□ 매크로 유형: 방향 선택 버튼 표시됨
□ 종목 태그: 보유 종목 목록에서 선택 가능
□ 매수·매도 유형에서 계명 체크 섹션 표시됨
□ 계명 없을 때 "계명 설정하기" 링크 표시됨
□ 저장 후 journal_entries 테이블에 데이터 확인됨
  (Supabase Table Editor → journal_entries)
□ commandment_checks JSONB 저장 확인됨

[3단계 — 상세·수정·삭제·아카이브]
□ 카드 탭 시 상세 화면 표시됨
□ 수정 후 피드에 즉시 반영됨
□ 삭제 후 피드에서 제거됨
□ 아카이브 탭 후 아카이브 탭에서 확인됨

[4단계 — 예약 알림]
□ send-alerts Edge Function 배포 확인
  (Supabase 대시보드 → Edge Functions → send-alerts 확인)
□ Supabase Cron 1분마다 실행 설정 확인:
  Supabase 대시보드 → Database → Extensions → pg_cron 활성화 확인
  SQL Editor에서 Cron 등록 확인:
    SELECT * FROM cron.job;
  send-alerts 항목이 "*/1 * * * *" 스케줄로 등록됨 확인
□ 알림 시각 도달 시 notifications 테이블에 데이터 생성됨
  (Supabase Table Editor → notifications 확인)
□ 마이 탭 알림 뱃지 숫자 표시됨
□ 알림 탭 시 해당 일지로 이동됨
□ 알림 읽음 처리 후 뱃지 숫자 감소됨

[5단계 — 자동생성 일지]
□ 일지 탭 진입 시 D-7 이내 어닝콜 자동생성 일지 표시됨
□ 일정 섹션에 🤖 자동 배지 표시됨
□ 중복 생성 없음 확인 (탭 이동 후 재진입해도 동일 1개만)
□ 발표일 경과 후 아카이브 자동 이동됨

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 포트폴리오·주가 연동 정상
□ 뉴스 피드·검색 정상
□ 시장 지표 위젯 정상
□ 탭 5개 전환 정상
□ F12 콘솔에 에러 없음

✅ PHASE 6 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 6 complete - investment journal"
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 7 프롬프트로 이동
```

---

## 11. PHASE 7 — 마이페이지

> 목표: 마이페이지 전체 구현 (프로필·API 키·알림·계좌·구독·공지·탈퇴)
> 산출물: Finnhub API 키 등록 → 포트폴리오·뉴스 기능 정상 동작하는 상태
> 예상 소요: 2일
> 참고 PRD: PRD_06_mypage.md 전체

---

### PHASE 7-1. 마이페이지 메인 + 프로필 + API 키

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD + 주가·환율 연동
- 시장 지표 위젯 / 뉴스 피드 / 투자 일지

== 이번 Phase 목표 ==
마이페이지 전체 구현:
  마이페이지 메인 (섹션 1~5)
  프로필 수정 (닉네임·조직명)
  API 키 관리 (Finnhub — 보안 핵심)
  알림 설정
  계좌 관리 (기존 계좌 CRUD 재사용)
  구독 관리 (현황 표시만)
  공지사항 목록·상세
  앱 정보
  회원 탈퇴

== 작업 순서 ==
1단계: 마이페이지 메인 화면 (섹션 1~5 레이아웃)
2단계: 프로필 수정
3단계: API 키 관리 (save-api-key Edge Function 포함)
4단계: 알림 설정 + 공지사항 + 앱 정보
5단계: 회원 탈퇴
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: 마이페이지 메인 화면 ==

진입: 하단 탭5 (마이 탭)

[프로필 헤더]
  이니셜 아바타:
    조직명 첫 글자 (예: "강남에셋" → "강")
    배경색: 조직명 해시값 기반 고정 색상
    (매 렌더링마다 바뀌지 않도록 고정)
  조직명 + 페르소나 모드 호칭
  등급 (예: 스타트업)
  Y&R 화폐 잔고:
    "💰 N,NNN YR" 표시 (users.ynr_balance 조회)
    숫자 천 단위 콤마 적용
    탭 시 토스트: "Y&R 모의투자 기능은 곧 제공 예정이에요 🔒"
    (Y&R 모의투자 활성화 후: 홈 탭 Y&R 탭으로 이동 예정 — 지금은 잠금)
  랭킹 섹션: 커뮤니티 오픈 후 표시
    (app_config community_enabled=false → 미표시)
  업그레이드 배너:
    프리미엄 구독자면 숨김
    무료 플랜이면 "🚀 프리미엄으로 업그레이드" 표시
    MVP: subscription_enabled=false → 배너 숨김

[섹션 1 — 내 투자 현황]
  💳 구독 플랜    → 현재 플랜 표시 (MVP: "베타 무료")
  🟢 계좌 인증    → 인증 상태에 따라 4가지 표시:
    미신청:  "인증 요청하기 →"
    검토 중: "확인 중 🕐 최대 3일"
    완료:    "인증됨 ✅"
    만료:    "재인증 필요 ⚠️"
  📋 투자 계명    → "N개 중 M개 설정 →"
    (investment_commandments 테이블 조회)

[섹션 2 — 앱 설정]
  🏦 계좌 관리                → 계좌 관리 화면 (PHASE 3-1 기존 기능 재사용)
  🔑 API 키 관리  연결됨 ● / 미연결 ○ → API 키 관리 화면
  🔔 알림 설정    일부 켜짐 → 알림 설정 화면

[섹션 3 — 페르소나]
  🏢 모드 변경    대표님 🔒  (v1.x 유료, 현재 잠금)
  ✏️ 조직명 변경  ○○ 에셋 🔒 (v1.x 유료, 현재 잠금)
  탭 시 "추후 제공 예정이에요 🔒" 토스트

[섹션 4 — 공지사항]
  📢 공지사항  N건 미읽음 뱃지 표시 (N>0일 때)
  탭 → 공지 목록 화면

[섹션 5 — 계정]
  ℹ️ 앱 정보 (버전 + 이용약관 + 개인정보처리방침)
  로그아웃 (탭 → 확인 다이얼로그 → supabase.auth.signOut)
  회원 탈퇴 (빨간색)

UI 상태:
  로딩: 프로필 영역 스켈레톤
  에러: "정보를 불러오지 못했어요." + 재시도

== 2단계: 프로필 수정 ==

진입: 프로필 헤더 탭
헤더: ← 뒤로가기 + "프로필 수정" + [저장] 버튼

입력 필드:
  닉네임 (현재값 표시, 최대 20자)
    디바운스 500ms → 중복 체크
    중복 시: "이미 사용 중인 닉네임이에요." 인라인 에러
  조직명 (현재값 표시, 최대 15자)
    금지어: 욕설·비속어 (기본 필터만)
  현재 모드·호칭은 읽기 전용으로 표시
    "변경은 내 회사 정보에서 가능해요" 안내

저장:
  닉네임·조직명 동시 UPDATE
  닉네임 중복 시 저장 버튼 비활성화
  저장 성공 → 프로필 헤더 즉시 업데이트

== 3단계: API 키 관리 (⚠️ 보안 핵심) ==

진입: 마이페이지 → API 키 관리

[Finnhub API 키]
  미등록 상태:
    설명: "미국 주식 주가·뉴스 조회에 필요합니다."
    발급 링크: finnhub.io (외부 링크)
    입력 필드: password 타입 (보안)
    [연결] 버튼

  등록 상태:
    마스킹 표시: "••••••••••••[마지막 4자리]"
    "✅ 연결됨 · 마지막 확인 HH:MM"
    [연결 테스트] [수정] [삭제] 버튼

  오류 상태:
    "❌ 키를 확인해주세요" + [수정] 버튼

[Gemini API 키]
  비활성화 상태:
    "AI 요약 기능 준비 중입니다."
    app_config gemini_key_enabled=true 시 활성화 예정
    탭 불가 (잠금 UI)

[save-api-key Edge Function]
  함수명: save-api-key
  배포: Supabase 대시보드에서 직접 작성·배포

  처리 흐름:
  1. JWT 검증
  2. 형식 검증:
     Finnhub 키: 영숫자 20자 (정규식 /^[a-zA-Z0-9]{20}$/)
     형식 불일치: { error: "INVALID_FORMAT" }
  3. 실제 Finnhub API 호출로 유효성 검증:
     GET https://finnhub.io/api/v1/quote?symbol=AAPL&token={키}
     실패: { error: "INVALID_KEY" }
  4. AES-256-GCM 암호화:
     iv = 랜덤 12바이트
     암호화값 = AES-256-GCM(키, ENCRYPTION_KEY)
     저장값 = base64(iv) + ":" + base64(암호화값)
  5. users 테이블 UPDATE:
     finnhub_api_key_encrypted = 암호화값
     finnhub_key_last_verified = now()
  6. api_key_usage_logs INSERT (키 원문 절대 포함 금지)
  7. 성공 응답 반환

  이상 감지:
    1분 내 동일 user_id 100회 초과 → 차단 + security_logs INSERT
    응답: { error: "RATE_LIMITED" }

  클라이언트 처리:
    INVALID_FORMAT → "키 형식이 올바르지 않아요. Finnhub 키는 20자리 영숫자입니다."
    INVALID_KEY → "키가 유효하지 않아요. Finnhub에서 키를 다시 확인해주세요."
    RATE_LIMITED → "요청이 너무 많아요. 잠시 후 다시 시도해주세요."

키 삭제:
  "삭제 시 미국 주가·뉴스 조회가 비활성화됩니다." 경고
  확인 → finnhub_api_key_encrypted = NULL UPDATE

연결 테스트:
  저장된 키로 AAPL 조회 → 성공/실패 결과 토스트

== 4단계: 알림 설정 + 공지사항 + 앱 정보 ==

[알림 설정 화면]
  투자 알림 섹션:
    일정 알림 (어닝콜·FOMC 등)  [ON/OFF 토글]
    예약 매수·매도 알림          [ON/OFF 토글]
    뉴스 알림                   [ON/OFF 토글]
  알림 방식 섹션:
    앱 푸시 알림                [ON/OFF 토글]
    앱 내 알림                  [ON/OFF 토글]
  마케팅 섹션:
    이벤트·업데이트 소식        [ON/OFF 토글]
  각 토글 변경 → users.notification_settings JSONB UPDATE 즉시

  notification_settings 구조:
  {
    "earnings_alert": true,
    "scheduled_alert": true,
    "news_alert": false,
    "push_enabled": true,
    "in_app_enabled": true,
    "marketing_push": false
  }

[공지사항 목록 화면]
  announcements 테이블 조회 조건:
    is_active = true
    target_tier IS NULL OR target_tier = 현재 사용자 플랜
  announcement_reads 테이블로 읽음 여부 표시
  미읽음: ● 파란 점
  탭 → 공지 상세 (전체 내용 표시)
  상세 진입 시 → announcement_reads INSERT (읽음 처리)
  빈 화면: "아직 공지사항이 없어요."

[앱 정보 화면]
  버전: v1.0.0
  이용약관 → 외부 링크 (미정: "#" 임시 처리)
  개인정보처리방침 → 외부 링크 (미정: "#" 임시 처리)

== 5단계: 회원 탈퇴 ==

진입: 마이페이지 → 회원 탈퇴 (빨간색)

[1단계 안내 화면]
  "탈퇴 시 아래 데이터가 처리됩니다."
  즉시 삭제:
    - 계좌·종목 정보
    - API 키
    - 검색 기록
  30일 후 완전 삭제:
    - 투자 일지 (복구 불가)
    - 계정 정보
  유지:
    - 커뮤니티 공개 게시글 (익명 처리, v2.0)
  [취소] [다음 →]

[2단계 최종 확인]
  "정말 탈퇴하시겠어요?"
  닉네임 직접 입력으로 최종 확인:
    placeholder: "닉네임을 입력하면 탈퇴가 진행됩니다"
    입력값 = 실제 닉네임일 때만 [탈퇴하기] 활성화
  [취소] [탈퇴하기 (빨간색)]

탈퇴 처리 (Edge Function: delete-account):
  1. JWT 검증
  2. 소프트 삭제:
     users UPDATE → status='deleted', deleted_at=now(),
       email='anonymized_{id}@deleted', nickname='탈퇴한 사용자'
  3. 즉시 삭제:
     accounts DELETE (CASCADE로 holdings 자동 삭제)
     search_history DELETE
     finnhub_api_key_encrypted = NULL
  4. supabase.auth.signOut()
  5. 스플래시 화면으로 이동
  (30일 후 하드 삭제: Supabase Cron에서 처리 — 지금은 Cron만 설명 안내)

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 기존 Edge Function 수정 금지
- 포트폴리오·뉴스·일지·위젯 기존 코드 수정 금지
- 페르소나·조직명 유료 변경 구현 금지 (v1.x 예정)
- 배지·등급 시스템 구현 금지 (v2.0 예정)
- 프로필 이미지 업로드 구현 금지 (v1.x 예정)
- 계좌 인증 AI 분석 구현 금지 (Claude API 연동 별도 Phase)

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
[1단계 — 마이페이지 메인]
□ 이니셜 아바타 표시됨 (조직명 첫 글자 + 고정 배경색)
□ 조직명·페르소나 모드·등급 표시됨
□ Y&R 화폐 잔고 "💰 2,000 YR" 표시됨
□ Y&R 잔고 탭 시 🔒 토스트 표시됨
□ 계좌 인증 상태 4가지에 따라 분기 표시됨
□ 투자 계명 "N개 중 M개 설정" 표시됨
□ API 키 연결 상태 미리보기 (연결됨 ● / 미연결 ○) 표시됨
□ 모드·조직명 변경 탭 시 🔒 토스트 표시됨
□ 공지 미읽음 뱃지 표시됨
□ 로그아웃 탭 → 확인 다이얼로그 → 스플래시 이동됨

[2단계 — 프로필 수정]
□ 닉네임 중복 시 실시간 에러 표시됨
□ 조직명 저장 후 프로필 헤더 즉시 업데이트됨
□ Supabase users 테이블에 변경값 저장됨

[3단계 — API 키 관리]
□ save-api-key Edge Function 배포 확인
□ 잘못된 형식 키 입력 시 에러 메시지 표시됨
□ 유효하지 않은 키 입력 시 에러 메시지 표시됨
□ 유효한 키 입력 시 "✅ 연결됨" 상태 표시됨
□ users 테이블 finnhub_api_key_encrypted 저장됨
  (키 원문이 아닌 암호화된 값으로 저장됨 확인)
□ api_key_usage_logs에 로그 기록됨
□ 키 삭제 후 포트폴리오 미국 주가 "🔑 API 키 필요" 안내 표시됨
□ 키 등록 후 포트폴리오 미국 주가 실시간 표시됨 ← 핵심 확인

[4단계 — 알림·공지·앱 정보]
□ 알림 토글 변경 즉시 users.notification_settings 저장됨
□ 공지 목록 표시됨 (더미 공지 1건 Supabase에 직접 INSERT 후 확인)
□ 공지 탭 → 읽음 처리 → 뱃지 감소됨
□ 앱 정보 버전 표시됨

[5단계 — 회원 탈퇴]
□ 1단계 안내 화면 데이터 처리 항목 표시됨
□ 2단계 닉네임 불일치 시 탈퇴 버튼 비활성화됨
□ 탈퇴 처리 후 users.status='deleted' 확인됨
□ 탈퇴 후 스플래시 화면으로 이동됨

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 포트폴리오·주가 연동 정상
□ 뉴스 피드·검색 정상 (API 키 등록 후)
□ 투자 일지 정상
□ 시장 지표 위젯 정상
□ 탭 5개 전환 정상
□ F12 콘솔에 에러 없음

✅ PHASE 7 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 7 complete - mypage"
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 8 프롬프트로 이동
```

---

## 12. PHASE 8 — 구독 UI + 접근 제어

> 목표: 구독 플랜 비교 화면 + 프리미엄 기능 접근 제어 로직 구현
> 산출물: subscription_enabled 플래그 하나로 유료 전환 가능한 상태
> 예상 소요: 1일
> 참고 PRD: PRD_07_subscription.md 전체
> 주의: MVP는 결제 비활성화 — UI와 접근 제어 로직만 구현

---

### PHASE 8-1. 구독 UI + 접근 제어

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
현재 파일 구조:
richbuild/
├── index.html
├── persona-text.js    ← 읽기만 허용, 수정 금지
└── supabase-client.js ← 읽기만 허용, 수정 금지

완료된 기능 (건드리지 말 것):
- 계좌·종목 CRUD + 주가·환율 연동
- 시장 지표 위젯 / 뉴스 피드 / 투자 일지 / 마이페이지

== 이번 Phase 목표 ==
1. 구독 플랜 비교 화면 구현
2. 프리미엄 기능 접근 제어 로직 (checkPremiumAccess 유틸)
3. 결제 비활성화 상태 UI 완성
4. UT 후 결제 활성화 시 코드 재배포 없이 전환 가능한 구조

핵심 원칙:
  app_config subscription_enabled = false (현재) → true (UT 후)
  이 값 하나로 전체 구독 로직이 전환되어야 함
  결제 코드는 작성하되 비활성화 상태로 구현

== 작업 순서 ==
1단계: checkPremiumAccess 유틸 함수 구현
2단계: 구독 플랜 비교 화면
3단계: 기존 기능에 접근 제어 적용
4단계: 마이페이지 구독 관리 화면 연결
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: checkPremiumAccess 유틸 ==

index.html 상단 공통 유틸 영역에 추가:

// 프리미엄 접근 체크 유틸
// 모든 프리미엄 기능 진입 전 반드시 이 함수로 체크
function checkPremiumAccess() {
  // app_config subscription_enabled = false → MVP 전체 무료 개방
  const subscriptionEnabled = window.APP_CONFIG?.subscription_enabled === 'true';
  if (!subscriptionEnabled) return true;

  // UT 후: 실제 구독 상태 확인
  const user = window.CURRENT_USER;
  return user?.account_tier === 'premium';
}

// 프리미엄 잠금 모달 표시
function showPremiumModal(featureName) {
  const enabled = window.APP_CONFIG?.subscription_enabled === 'true';
  if (!enabled) {
    // MVP: 베타 무료 토스트
    showToast("베타 기간 동안 모든 기능을 무료로 이용할 수 있어요 🎉");
    return;
  }
  // UT 후: 구독 유도 모달
  showScreen('screen-premium-modal');
  document.getElementById('premium-modal-feature').textContent = featureName;
}

APP_CONFIG 로드:
  앱 시작 시 app_config 테이블 전체 조회 → window.APP_CONFIG에 저장
  (기존 supabase-client.js의 연결 확인 코드 다음에 추가)
  매 화면 전환마다 재조회 불필요 — 앱 시작 시 1회 로드

== 2단계: 구독 플랜 비교 화면 ==

진입 경로:
  마이페이지 → 구독 관리 탭
  프리미엄 잠금 모달 → "프리미엄 시작하기" 버튼
  마이페이지 헤더 업그레이드 배너 탭

[MVP 상태 — subscription_enabled = false]

베타 무료 배너:
  "🎉 베타 기간 동안 무료로 이용하세요!
   정식 출시 후 구독 플랜이 적용됩니다."

플랜 비교 표:
  | 항목 | 무료 | 프리미엄 |
  | 계좌 등록 | 무제한 | 무제한 |
  | 뉴스 조회 | 무제한 | 무제한 |
  | AI 번역·요약 | ❌ | ✅ |
  | 투자 일지 | 20개 | 무제한 |
  | 일지 통계 | ❌ | ✅ |
  | 광고 | 있음 | 없음 |
  | 모드 변경 | 유료 | 월 1회 무료 |
  | 가격 | 0원 | 월 4,900원 / 연 39,000원 |

구독하기 버튼:
  MVP: 회색 비활성화
  탭 시: showPremiumModal 대신 베타 토스트
  "베타 기간 동안 모든 기능을 무료로 이용할 수 있어요 🎉"

결제 내역:
  MVP: "🎉 베타 무료 이용 중" + "정식 출시 후 구독 플랜이 적용됩니다."
  결제 내역 없음 표시

[UT 후 활성화 — subscription_enabled = true 시]
  구독하기 버튼 활성화
  포트원 결제 모듈 연결 (코드 작성해두되 조건부 실행)
  프리미엄 잠금 모달 활성화

== 3단계: 기존 기능에 접근 제어 적용 ==

아래 기능에 checkPremiumAccess() 체크 추가:
  (subscription_enabled=false이면 모두 통과 — 실제 차단 없음)

[1] 투자 일지 21번째 작성 시도:
  checkPremiumAccess() → false 시
  "프리미엄 플랜에서 일지를 무제한으로 기록하세요." 모달 표시

[2] 뉴스 AI 요약 버튼 탭:
  (현재 비활성화 UI 유지 — ai_summary_enabled 플래그 별도 체크)
  탭 시: showPremiumModal("AI 번역·요약")

[3] 프리미엄 잠금 모달 (screen-premium-modal):
  "🔒 프리미엄 기능"
  "[featureName]은 프리미엄 플랜에서 이용 가능해요."
  [프리미엄 시작하기 — 월 4,900원] → 구독 화면으로 이동
  [나중에] → 모달 닫기
  MVP: 모달 자체가 표시되지 않음 (베타 토스트로 대체)

== 4단계: 마이페이지 구독 관리 화면 ==

마이페이지 → 💳 구독 플랜 탭 → 구독 관리 화면:

MVP 상태:
  "현재 플랜: 베타 무료"
  "정식 출시 후 구독 플랜이 적용됩니다."
  [플랜 비교 보기] → 플랜 비교 화면으로 이동

UT 후 활성화 상태:
  현재 플랜 / 다음 결제일 / [구독 취소] 버튼
  결제 내역 목록

구독 취소 플로우 (설계만, UT 후 활성화):
  1단계: 취소 이유 선택
    가격이 비싸요 / 기능이 기대와 달라요 / 자주 사용하지 않아요 / 기타
  2단계: "구독을 취소해도 만료일까지 프리미엄 유지" 안내
  [취소 유지] [구독 취소]

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 기존 Edge Function 수정 금지
- 포트원 실제 결제 연동 금지 (UT 후 활성화 예정)
- 기존 포트폴리오·뉴스·일지·마이페이지 코드 수정 금지
  (접근 제어 체크 추가만 허용)

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
[1단계 — checkPremiumAccess 유틸]
□ window.APP_CONFIG 앱 시작 시 로드됨
  (F12 콘솔에서 window.APP_CONFIG 입력 시 값 표시됨)
□ window.APP_CONFIG.subscription_enabled = 'false' 확인됨

[2단계 — 구독 플랜 비교 화면]
□ 마이페이지 → 구독 플랜 탭 시 구독 화면 표시됨
□ 베타 무료 배너 표시됨
□ 플랜 비교표 정상 표시됨
□ 구독하기 버튼 회색 비활성화 상태 확인됨
□ 비활성화 버튼 탭 시 베타 토스트 표시됨
□ 결제 내역: "베타 무료 이용 중" 표시됨

[3단계 — 접근 제어 적용]
□ subscription_enabled=false 상태에서
  일지 21번째 작성 시도 시 제한 없이 저장됨 ← 핵심 확인
□ 뉴스 AI 요약 버튼 탭 시 기존 토스트 "곧 제공 예정이에요 🔒" 표시됨
□ 프리미엄 잠금 모달 화면 존재 확인 (UT 후 동작 예정)

[4단계 — 마이페이지 구독 관리]
□ 마이페이지 → 구독 관리 화면 표시됨
□ "베타 무료 이용 중" 상태 표시됨
□ [플랜 비교 보기] 탭 시 플랜 비교 화면으로 이동됨

[UT 후 전환 검증 — 개발자 테스트]
□ Supabase Table Editor에서
  app_config subscription_enabled 값을 'true'로 변경 후:
  구독하기 버튼 활성화됨
  일지 21번째 작성 시도 시 프리미엄 모달 표시됨
  테스트 완료 후 다시 'false'로 복원

[회귀 테스트] 이전 기능 영향 없음 확인:
□ 마이페이지 전체 기능 정상 (API 키·알림·프로필)
□ 투자 일지 CRUD 정상 (제한 없음)
□ 뉴스 AI 요약 버튼 기존 상태 그대로
□ 포트폴리오·주가 연동 정상
□ F12 콘솔에 에러 없음

✅ PHASE 8 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 8 complete - subscription ui"
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 9 프롬프트로 이동
```

---

## 13. PHASE 9 — 디자인 폴리싱

> 목표: designsystem_richbuild.md 토큰 전체 적용 + 컴포넌트 통일
> 산출물: 브랜드 디자인 시스템이 일관되게 적용된 완성도 높은 UI
> 예상 소요: 2일
> 참고 파일: designsystem_richbuild.md, bx_richbuild.md

⚠️ 핵심 원칙 — 코드 안 꼬이게 하는 규칙:
  1. CSS 변수 정의 → 스타일 교체 → 로직 절대 미수정 순서 엄수
  2. JavaScript 로직 코드는 이 Phase에서 한 줄도 수정 금지
  3. HTML 구조(태그·id·class 이름) 변경 최소화
     (변경 시 반드시 전·후 보고 후 승인받을 것)
  4. 화면별로 하나씩 완료 후 보고 → 승인 → 다음 화면

---

### PHASE 9-1. CSS 토큰 정의 + 공통 컴포넌트

> 실행 위치: Claude Code CLI (터미널)
> 주의: 이 단계가 전체 디자인의 기반 — 가장 신중하게 진행

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + CSS 변수
참고 파일: designsystem_richbuild.md

== 핵심 원칙 (반드시 준수) ==
이 Phase에서 JavaScript 로직 코드 수정 절대 금지.
HTML 구조(태그·id) 변경 최소화 — 변경 필요 시 반드시 먼저 보고.
CSS와 스타일만 수정.
단계별로 작업 후 반드시 보고 → 승인 → 다음 단계 진행.

== 이번 Phase 목표 ==
1단계: CSS 변수 토큰 정의 (index.html <style> :root 섹션)
2단계: 공통 컴포넌트 스타일 통일
3단계: 하단 네비게이션 + 앱바 스타일 적용
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: CSS 변수 토큰 정의 ==

index.html <style> 태그 최상단 :root 섹션에 아래 변수 추가.
기존 하드코딩된 색상값은 이 단계에서 변수로 교체하지 말 것
(교체는 2단계 이후 각 컴포넌트별로 순서대로 진행)

:root {
  /* === Brand Colors === */
  --color-primary-50:  #E1F5EE;
  --color-primary-100: #9FE1CB;
  --color-primary-200: #5DCAA5;
  --color-primary-500: #1D9E75;
  --color-primary-700: #0F6E56;
  --color-primary-800: #085041;
  --color-primary-900: #04342C;

  --color-accent-50:  #FAEEDA;
  --color-accent-100: #FAC775;
  --color-accent-400: #EF9F27;
  --color-accent-600: #BA7517;
  --color-accent-800: #633806;
  --color-accent-900: #412402;

  /* === Semantic Colors === */
  --color-profit:  #E53935;
  --color-loss:    #1565C0;
  --color-success: #1D9E75;
  --color-warning: #EF9F27;
  --color-error:   #E53935;
  --color-info:    #1565C0;

  /* === Gray Scale === */
  --color-gray-50:  #F8F8F6;
  --color-gray-100: #F0F0ED;
  --color-gray-200: #E2E2DE;
  --color-gray-300: #C8C8C3;
  --color-gray-400: #A8A8A2;
  --color-gray-500: #888882;
  --color-gray-600: #5A5A56;
  --color-gray-700: #3A3A37;
  --color-gray-900: #1E1E1C;

  /* === Surface Tokens === */
  --color-bg-primary:    #F8F8F6;
  --color-bg-secondary:  #F0F0ED;
  --color-bg-elevated:   #FFFFFF;
  --color-text-primary:   #1E1E1C;
  --color-text-secondary: #5A5A56;
  --color-text-tertiary:  #A8A8A2;
  --color-border-default: #E2E2DE;
  --color-border-strong:  #C8C8C3;

  /* === Typography === */
  --font-display: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
  --font-body:    'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;

  --font-size-display-xl: 36px;
  --font-size-display-lg: 30px;
  --font-size-h1: 24px;
  --font-size-h2: 20px;
  --font-size-h3: 18px;
  --font-size-body:    16px;
  --font-size-body-sm: 14px;
  --font-size-caption: 12px;

  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-bold:     700;

  --line-height-tight:   1.2;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.7;

  /* === Spacing === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* === Border Radius === */
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* === Shadow === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
}

Noto Sans KR Google Fonts 로드 (head 태그 최상단):
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">

body 기본 스타일:
  font-family: var(--font-body);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;

== 2단계: 공통 컴포넌트 스타일 ==

아래 컴포넌트 CSS 클래스 정의.
JavaScript 코드는 건드리지 말 것.
기존 인라인 스타일 → CSS 클래스로 교체 시 반드시 보고 후 진행.

[버튼 클래스]
.btn-primary {
  background: var(--color-primary-500);
  color: #FFFFFF;
  height: 52px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  border: none;
  width: 100%;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
}
.btn-primary:active { transform: scale(0.97); }

.btn-secondary {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  height: 52px; border-radius: var(--radius-sm);
  font-size: var(--font-size-body); font-weight: var(--font-weight-medium);
}

.btn-destructive {
  background: transparent;
  color: var(--color-error);
  border: 1px solid var(--color-error);
  height: 52px; border-radius: var(--radius-sm);
}

.btn-disabled, button:disabled {
  background: var(--color-gray-200);
  color: var(--color-gray-400);
  opacity: 0.6;
  cursor: not-allowed;
}

[카드 클래스]
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
.card-elevated {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4);
}
.card-interactive {
  cursor: pointer;
  transition: transform 0.15s;
}
.card-interactive:active { transform: scale(0.98); }

[인풋 클래스]
.input-field {
  height: 52px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: 0 var(--space-4);
  font-size: var(--font-size-body);
  font-family: var(--font-body);
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  width: 100%;
  box-sizing: border-box;
}
.input-field:focus {
  outline: none;
  border: 1.5px solid var(--color-primary-500);
}
.input-field.error { border: 1.5px solid var(--color-error); }
.input-error-msg {
  font-size: var(--font-size-caption);
  color: var(--color-error);
  margin-top: var(--space-1);
}

[수익·손실 배지]
.badge-profit {
  background: #FEE2E2; color: var(--color-profit);
  padding: 2px 8px; border-radius: var(--radius-full);
  font-size: var(--font-size-caption); font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;
}
.badge-loss {
  background: #DBEAFE; color: var(--color-loss);
  padding: 2px 8px; border-radius: var(--radius-full);
  font-size: var(--font-size-caption); font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;
}

[스켈레톤]
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-xs);
}

[빈 화면 Empty State]
.empty-state {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: var(--space-16) var(--space-4);
  text-align: center;
  gap: var(--space-3);
}
.empty-state-icon { font-size: 48px; color: var(--color-primary-500); }
.empty-state-title {
  font-size: var(--font-size-body); font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
.empty-state-desc {
  font-size: var(--font-size-body-sm); color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

[금융 숫자 공통]
.number-financial {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.3px;
}

[토스트]
.toast {
  position: fixed; bottom: calc(56px + var(--space-4));
  left: 50%; transform: translateX(-50%);
  background: var(--color-gray-900); color: #FFFFFF;
  padding: 14px var(--space-4);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-body);
  white-space: nowrap;
  z-index: 9999;
  animation: slideUp 0.2s ease;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateX(-50%) translateY(8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

== 3단계: 하단 네비게이션 + 앱바 스타일 ==

하단 네비게이션:
  높이: 56px + env(safe-area-inset-bottom)
  배경: var(--color-bg-elevated)
  상단 구분선: 1px solid var(--color-border-default)
  탭 아이콘: 24px
  탭 라벨: 10px Regular
  활성: var(--color-primary-500)
  비활성: var(--color-gray-400)
  커뮤니티 탭 🔒 아이콘: var(--color-gray-300)

앱바:
  높이: 56px
  배경: var(--color-bg-elevated)
  하단 구분선: 1px solid var(--color-border-default)
  타이틀: 18px Medium var(--color-text-primary)
  좌우 패딩: var(--space-4)

화면 전체 레이아웃:
  상단: 앱바 56px (화면별로 존재 시)
  콘텐츠: flex-1, overflow-y: auto
  하단: 네비게이션 56px + safe area
  전체 배경: var(--color-bg-primary)

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- JavaScript 로직 코드 수정 금지
- HTML id 속성 변경 금지 (showScreen 함수가 id로 화면 전환)
- 기존 기능 동작 방식 변경 금지
- 한 번에 전체 화면 스타일 교체 금지 (단계별로 진행)

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
□ CSS 변수 토큰 정의됨
  (F12 → Elements → :root에서 변수 목록 확인)
□ Noto Sans KR 폰트 로드됨
  (화면 텍스트가 기존보다 선명하게 표시됨)
□ body 배경색이 --color-bg-primary(#F8F8F6) 적용됨
□ 공통 컴포넌트 클래스 정의됨 (.btn-primary, .card 등)
□ 하단 네비게이션 스타일 통일됨
□ 기존 기능 전부 정상 동작 확인:
  □ 탭 전환 정상
  □ 로그인 정상
  □ 계좌 추가 정상
  □ F12 콘솔에 에러 없음
[회귀 테스트]:
□ showScreen() 화면 전환 정상 (id 변경 없음 확인)
→ 전부 OK → PHASE 9-2로 이동
```

---

### PHASE 9-2. 화면별 디자인 적용

> 실행 위치: Claude Code CLI (터미널)
> 전제: PHASE 9-1 완료 후 진행

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
PHASE 9-1 완료 상태 — CSS 변수 토큰 및 공통 컴포넌트 클래스 정의됨

== 핵심 원칙 (반드시 준수) ==
JavaScript 로직 코드 수정 절대 금지.
HTML id 변경 금지.
화면 하나씩 완료 후 보고 → 승인 → 다음 화면.
CSS 클래스 추가·교체만 허용.

== 작업 순서 ==
화면 1: 스플래시·온보딩·로그인
화면 2: 홈 (포트폴리오 — 계좌 탭, 종목 리스트, 요약 카드)
화면 3: 뉴스 피드 (서브탭 A·B, 검색)
화면 4: 투자 일지 (피드, 작성, 상세)
화면 5: 마이페이지 (메인, 설정 화면들)
화면 6: 모달·바텀시트·토스트 공통
각 화면 완료 후 보고 → 확답 → 다음 화면 진행

== 각 화면 공통 적용 항목 ==

[컬러]
- 모든 하드코딩 색상값 → CSS 변수로 교체
- 수익/손실 숫자: var(--color-profit) / var(--color-loss)
- 배경: var(--color-bg-primary) or var(--color-bg-secondary)
- 카드 배경: var(--color-bg-elevated)
- 텍스트: var(--color-text-primary) / var(--color-text-secondary)
- 구분선: var(--color-border-default)

[타이포그래피]
- 주요 숫자 (평가금액·수익률·잔고): var(--font-size-display-xl) + tabular-nums
- 섹션 헤딩: var(--font-size-h2) Bold
- 카드 타이틀: var(--font-size-h3) Medium
- 본문: var(--font-size-body) Regular
- 보조 텍스트·시간·출처: var(--font-size-body-sm) Regular
- 캡션·라벨: var(--font-size-caption) Regular

[스페이싱]
- 화면 좌우 패딩: var(--space-4) 통일
- 카드 내부 패딩: var(--space-4)
- 리스트 아이템 간격: var(--space-2)
- 섹션 간 여백: var(--space-6)
- 카드 간 여백: var(--space-3)

[컴포넌트]
- 버튼: .btn-primary / .btn-secondary / .btn-destructive
- 카드: .card / .card-elevated / .card-interactive
- 인풋: .input-field (에러 시 .error 클래스 추가)
- 배지: .badge-profit / .badge-loss
- 빈 화면: .empty-state 구조 통일
- 스켈레톤: .skeleton 클래스 통일
- 금융 숫자: .number-financial

[UI 상태 4가지 — 모든 화면 점검]
로딩: .skeleton 클래스로 통일
빈 화면: .empty-state 구조로 통일
에러: --color-error 텍스트 + 재시도 버튼
정상: 위 토큰 적용

[페르소나 모드 UI 점검]
대표님 모드 / 사령관 모드 전환 시
  - 텍스트만 변경, 레이아웃·스타일 동일 확인
  - persona-text.js 참조 텍스트 누락 없음 확인

[터치 영역]
- 모든 버튼·탭 영역: 최소 44x44px
- 아이콘만 있는 버튼: padding으로 터치 영역 확보

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- JavaScript 로직 수정 금지
- HTML id 변경 금지
- 한 번에 모든 화면 변경 금지 (화면별 순서 준수)
- 기존 기능 동작 방식 변경 금지

== 완료 후 ==
비전공자용 QA 체크리스트 주세요.
```

**완료 조건:**
```
[화면별 체크]
□ 스플래시·온보딩: 브랜드 컬러 통일됨
□ 홈 포트폴리오:
  □ 요약 카드 총 평가금액 display-xl 사이즈 적용됨
  □ 수익 빨강 / 손실 파랑 색상 정확히 적용됨
  □ 금융 숫자 tabular-nums 적용됨 (숫자 정렬 균일)
  □ 종목 0개 시 .empty-state 통일됨
  □ 로딩 시 .skeleton 통일됨
□ 뉴스:
  □ 서브탭 인디케이터 primary 색상 적용됨
  □ 뉴스 카드 스타일 통일됨
□ 투자 일지:
  □ 중요 일지 빨간 세로선 --color-profit 적용됨
  □ FAB 버튼 primary 색상 + 그림자 적용됨
  □ 유형 칩 스타일 통일됨
□ 마이페이지:
  □ 이니셜 아바타 primary 색상 계열로 통일됨
  □ 설정 리스트 아이템 52px 높이 통일됨
  □ Y&R 잔고 accent 금색으로 강조됨

[페르소나 모드 전환 점검]
□ 대표님 → 사령관 전환 시 레이아웃 깨짐 없음
□ 모든 화면 페르소나 텍스트 정상 표시됨

[전체 회귀 테스트]
□ 모든 탭 전환 정상
□ 로그인·로그아웃 정상
□ 계좌·종목 CRUD 정상
□ 주가·환율 연동 정상
□ 뉴스 피드·검색 정상
□ 투자 일지 CRUD 정상
□ 마이페이지 API 키 등록 정상
□ 구독 UI 정상
□ F12 콘솔에 에러 없음
□ 모바일 뷰포트(360px) 가로 스크롤 없음

✅ PHASE 9 완료!
→ GitHub Desktop commit
   메시지: "feat: phase 9 complete - design polish"
→ CLAUDE_CODE.md § 3 진행 상태 업데이트
→ PHASE 10 프롬프트로 이동
```

---


## 14. PHASE 10 — 통합 QA + 베타 출시

> 목표: API 키 전 구간 QA + 실시간 데이터 7초 이내 + 전체 기능 통합 테스트 + 베타 배포
> 산출물: 실제 사용자에게 배포 가능한 베타 버전
> 예상 소요: 2일
> 참고: PRD_00 § 11 비기능 요구사항

---

### PHASE 10-1. API 키 QA + 실시간 데이터 성능 최적화

> 실행 위치: Claude Code CLI (터미널) + Supabase 대시보드
> 우선순위 최상 — 베타 출시 전 반드시 통과해야 하는 항목

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 작업 전 구현 계획을 먼저 보고해줘. 승인 후 작업 시작.

== 프로젝트 컨텍스트 ==
서비스명: 리치빌드 (RichBuild)
스택: HTML 단일 파일 + Vanilla JS + Supabase JS SDK (CDN)
PHASE 9까지 완료 — 전체 기능 + 디자인 적용 상태

== 이번 Phase 목표 ==
1. API 키 등록·연동 전 구간 QA (가장 중요)
2. 실시간 데이터 응답 7초 이내 달성
3. 속도 최적화 (캐시 활용 + 병렬 호출 + 오프라인 fallback)
4. 전체 기능 통합 QA

== 작업 순서 ==
1단계: API 키 전 구간 QA 체크 + 수정
2단계: 실시간 데이터 성능 측정 + 7초 이내 최적화
3단계: 전체 기능 통합 QA
각 단계 완료 후 보고 → 확답 → 다음 단계 진행

== 1단계: API 키 전 구간 QA ==

아래 시나리오를 순서대로 전부 테스트.
문제 발견 시 즉시 [오류 보고] 후 확답 받고 수정.

[시나리오 1] Finnhub 키 미등록 상태
  □ 홈 탭 미국 종목: "🔑 API 키 필요" 배지 표시됨
  □ 뉴스 탭 미국 종목 뉴스: 키 연결 안내 표시됨
  □ 시장 전체 뉴스 탭: 키 설정 안내 표시됨
  □ 마이페이지 API 키 관리: 미등록 UI 표시됨
  □ 국내 종목 기능은 키 없어도 정상 동작 확인

[시나리오 2] 잘못된 형식 키 입력
  □ 5자리 입력 → "키 형식이 올바르지 않아요. 20자리 영숫자입니다." 표시됨
  □ 특수문자 포함 입력 → 동일 에러 표시됨
  □ save-api-key Edge Function INVALID_FORMAT 에러 반환 확인
  □ DB에 저장되지 않음 확인
    (Supabase Table Editor → users → finnhub_api_key_encrypted NULL 유지)

[시나리오 3] 형식은 맞지만 무효한 키 입력
  (예: "aaaaaaaaaaaaaaaaaaaa" 20자리 아무 문자)
  □ "키가 유효하지 않아요. Finnhub에서 키를 다시 확인해주세요." 표시됨
  □ save-api-key INVALID_KEY 에러 반환 확인
  □ DB에 저장되지 않음 확인
  □ api_key_usage_logs에 실패 로그 기록 확인

[시나리오 4] 유효한 Finnhub 키 등록 ← 핵심
  (실제 발급받은 테스트 키 사용)
  □ "✅ 연결됨 · 마지막 확인 HH:MM" 표시됨
  □ users.finnhub_api_key_encrypted에 암호화된 값 저장됨
    (키 원문이 아닌 암호화값 확인)
  □ api_key_usage_logs에 성공 로그 기록됨
  □ 홈 탭 미국 종목 현재가 즉시 표시됨 ← 최우선 확인
  □ 뉴스 탭 미국 종목 뉴스 즉시 표시됨
  □ 시장 전체 뉴스 탭 뉴스 즉시 표시됨

[시나리오 5] 키 삭제 후 재등록
  □ 삭제 경고 표시됨
  □ 삭제 후 미국 기능 즉시 비활성화됨
  □ users.finnhub_api_key_encrypted = NULL 확인
  □ 재등록 후 다시 정상 동작 확인

[시나리오 6] 연결 테스트 버튼
  □ [연결 테스트] 탭 시 AAPL 조회 후 결과 토스트 표시됨
  □ 성공: "✅ API 키가 정상 작동해요." 토스트
  □ 만료된 키: "❌ 키를 확인해주세요." 표시됨

== 2단계: 실시간 데이터 성능 측정 + 최적화 ==

목표: 홈 탭 진입 후 전체 데이터 로드 7초 이내

[측정 방법]
F12 → Network 탭 → 홈 탭 진입 시 전체 요청 타임라인 확인
측정 항목:
  T0: 홈 탭 탭 시각
  T1: 계좌·종목 목록 표시 시각
  T2: 국내 주가 표시 시각
  T3: 미국 주가 표시 시각
  T4: 환율 표시 시각
  T5: 시장 지표 위젯 표시 시각
목표: T5 - T0 ≤ 7초

[병목 진단 → 보고 → 최적화 순서]

① 병렬 호출 (가장 효과 큼)
  현재 순차 호출 가능성:
    국내 주가 → 완료 후 → 미국 주가 → 완료 후 → 환율
  수정: Promise.all로 병렬 동시 호출
  ⚠️ JS 로직 수정 → 반드시 보고 → 승인 후 진행

② 캐시 우선 표시 (체감 속도 향상)
  1. market_cache 캐시 즉시 로드 → 흐리게 표시
  2. Edge Function 백그라운드 호출
  3. 응답 완료 시 선명하게 교체
  ⚠️ 로직 수정 → 보고 → 승인 후 진행

③ Edge Function Cold Start 최소화
  앱 시작 시 워밍업 호출:
    supabase.functions.invoke('get-prices', { body: { warmup: true } })
  get-prices 함수에 warmup 처리:
    if (body.warmup) return new Response(JSON.stringify({ ok: true }))
  ⚠️ Edge Function 코드 수정 → 보고 → 승인 후 진행

[성능 목표 기준]
| 항목 | 목표 |
| 홈 탭 전체 로드 | 7초 이내 |
| Edge Function 응답 | 3초 이내 (캐시 히트 시 0.5초 이내) |
| 캐시 있는 재진입 | 2초 이내 |
| 앱 첫 로딩 | 3초 이내 |

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 절대 금지 ==
- persona-text.js 수정 금지
- supabase-client.js 수정 금지
- 성능 최적화 명목으로 기능 제거 금지
- 병렬 호출·캐시 로직 수정은 반드시 보고 후 진행

== 완료 후 ==
항목별 측정 결과 수치로 보고해줘.
(예: "홈 탭 전체 로드 4.2초, Edge Function 응답 1.8초")
```

**완료 조건:**
```
[API 키 QA — 6개 시나리오 전부 통과 필수]
□ 시나리오 1: 키 미등록 → 각 화면 안내 정상
□ 시나리오 2: 잘못된 형식 → 에러 메시지 정확
□ 시나리오 3: 무효 키 → 에러 메시지 정확
□ 시나리오 4: 유효 키 등록 → 미국 주가·뉴스 전체 연동 정상 ← 핵심
□ 시나리오 5: 키 삭제 → 재등록 정상
□ 시나리오 6: 연결 테스트 버튼 정상

[성능 기준 — 수치로 보고 필수]
□ 홈 탭 전체 로드 7초 이내 달성 (측정값: N.N초)
□ Edge Function 응답 3초 이내 (측정값: N.N초)
□ 캐시 재진입 2초 이내 (측정값: N.N초)
□ 앱 첫 로딩 3초 이내 (측정값: N.N초)
→ 전부 OK → PHASE 10-2로 이동
```

---

### PHASE 10-2. 전체 기능 통합 QA + 베타 출시

> 실행 위치: Claude Code CLI (터미널)

**CLI에 붙여넣을 프롬프트:**
```
아래 내용을 읽고 전체 통합 QA를 진행해줘.
문제 발견 시 즉시 [오류 보고] 후 확답 받고 수정.

== 통합 QA 시나리오 ==

[시나리오 1] 신규 사용자 전체 플로우
  1. 앱 첫 진입 → 스플래시 → 온보딩 3장
  2. 구글 로그인 → 닉네임 → 페르소나 선택 → 조직명
  3. 메인 화면 진입
  4. 마이페이지 → Finnhub API 키 등록 (실제 키)
  5. 계좌 추가 (키움 KRW)
  6. 국내 종목 추가 (삼성전자 005930, 10주, 매수가 70,000)
  7. 미국 계좌 추가 (토스 USD)
  8. 미국 종목 추가 (NVDA, 5주, 매수가 850)
  9. 홈 탭 → 국내·미국 주가 표시 확인
  10. 원화/달러 토글 전환 확인
  11. 뉴스 탭 → 내 종목 뉴스 표시 확인
  12. 뉴스 검색 → "삼성전자" → 자동완성 → 뉴스 표시
  13. 투자 일지 → 매수 일지 작성 (종목 태그 + 계명 체크)
  14. 시장 지표 위젯 → ⚙ 설정 저장 후 유지 확인
  15. 로그아웃 → 재로그인 → 데이터 유지 확인

[시나리오 2] 에러 복구 플로우
  1. 네트워크 끊기 → 홈 탭 → 캐시 데이터 흐리게 표시됨
  2. 네트워크 복구 → 새로고침 → 정상 표시됨
  3. Finnhub 키 삭제 → 미국 기능 비활성 → 국내는 정상

[시나리오 3] 페르소나 모드 전체 화면 점검
  대표님 모드로 전체 화면 순회 → 텍스트 누락 없음 확인

[시나리오 4] 앱 재시작 데이터 유지
  계좌·종목·위젯 설정·일지·원화달러 모드 전부 유지 확인

[시나리오 5] 구독 UI + subscription_enabled 전환 테스트
  1. 베타 무료 배너 표시됨
  2. Supabase에서 subscription_enabled = 'true'로 변경
  3. 일지 21번째 → 프리미엄 모달 표시됨
  4. 테스트 완료 후 'false'로 복원

== 출시 전 체크리스트 ==

[GitHub Pages 배포 확인]
□ https://[아이디].github.io/richbuild 접속 정상
□ 구글 로그인 배포 환경 정상 동작

[보안 점검]
□ finnhub_api_key_encrypted에 암호화값 저장됨 (키 원문 아님)
□ F12 Network 탭에서 키 원문 노출 없음
□ F12 Console에 API 키·시크릿 로그 없음
□ Supabase RLS 전 테이블 활성화 확인

[접근성·UX 기본 점검]
□ 모든 버튼 터치 영역 44px 이상
□ 360px 뷰포트 가로 스크롤 없음
□ 네트워크 오프라인 시 안내 메시지 표시됨

[최종 배포]
git commit -m "release: v1.0.0-beta"
git push origin main

== 오류 발생 시 ==
즉시 작업 멈추고 아래 형식으로 보고. 확답 받기 전 수정 절대 금지.
[오류 보고] 발생 위치 / 오류 메시지 전문 / 원인 추정 / 해결 옵션 A·B

== 완료 후 ==
통합 QA 결과 요약 보고해줘.
(통과 항목 / 발견 이슈 / 수정 완료 항목)
```

**완료 조건:**
```
[통합 QA]
□ 시나리오 1~5 전부 통과
□ Critical 이슈 0건
□ High 이슈 전부 수정 완료

[성능]
□ 홈 탭 전체 로드 7초 이내
□ 앱 첫 로딩 3초 이내

[보안]
□ API 키 원문 미노출 확인
□ RLS 전 테이블 활성화 확인

[배포]
□ GitHub Pages 정상 접속
□ 구글 로그인 배포 환경 정상

✅ PHASE 10 완료 = 베타 출시!
→ GitHub commit: "release: v1.0.0-beta"
→ 베타 사용자 초대 시작
→ CLAUDE_CODE.md § 3 전체 완료로 업데이트
→ 사용자 피드백 수집 → v1.x 기능 우선순위 결정
```