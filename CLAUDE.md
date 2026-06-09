# CLAUDE.md — 리치빌드 (RichBuild) 프로젝트 컨텍스트
> Claude Code 모든 세션에서 이 파일을 첫 번째로 읽는다.
> 이 파일과 함께 해당 기능의 PRD 파일을 반드시 함께 첨부한다.

---

## 1. 프로젝트 한 줄 정의

> "내 투자의 모든 기록이 쌓이는 곳 —
> 계좌·뉴스·일지를 연결한 스마트 개인투자자의 투자 아카이브"

서비스명: **리치빌드 (RichBuild)**
슬로건: **기록이 자산이 되다**
1인 창업 프로젝트 (기획·개발·배포·수익화 전담)
개발자 배경: 비전공자 — Claude와 함께 단계별로 구현 (바이브코딩)

---

## 2. 기술 스택 (단계별)

```
[1단계 — HTML 단일 파일 MVP (지금)]
  HTML + CSS + Vanilla JS (단일 파일, 빌드 도구 없음)
  Supabase JS SDK (CDN <script> import)
  배포: GitHub Pages (index.html + 분리 js 파일로 배포)
  로컬 실행: 브라우저에서 파일 더블클릭
  전환 기준: MAU 500명 초과 시 → 2단계로 이동

[2단계 — React 웹앱 (MAU 500명 초과 후)]
  React 18 + Vite
  Tailwind CSS
  Zustand (상태관리)
  배포: Vercel (GitHub Pages에서 이전)

[3단계 — React Native 앱 (MAU 확보 후)]
  React Native + Expo (SDK 51+)
  배포: Expo EAS → Google Play

[백엔드 / 인프라 — 전 단계 공통]
  DB:        Supabase (PostgreSQL)
  인증:      Supabase Auth (구글 OAuth)
  스토리지:  Supabase Storage
  서버리스:  Supabase Edge Functions

[외부 API]
  국내 주가:  Yahoo Finance (전날 종가)
  미국 주가:  Finnhub (실시간, 사용자 키)
  국내 뉴스:  네이버 금융 RSS (CORS 프록시 경유)
  미국 뉴스:  Finnhub News API
  AI 요약:   Google Gemini Flash (비활성화 상태)
  환율:      FreeExchangeRateApi (1시간 갱신)
  가상화폐:  CoinGecko

[결제]
  포트원 v2 (비활성화 상태 — UT 후 활성화)

[분석]
  PostHog (사용자 행동) — v1.x 착수 시 연동
  Sentry (에러 추적) — v1.x 착수 시 연동
```

---

## 3. 개발 환경

```
OS:            Windows
에디터:        VS Code (code.visualstudio.com)
버전 관리:     GitHub Desktop (desktop.github.com)
브라우저:      Chrome (개발자 도구 사용)
GitHub:        계정 있음
배포:          GitHub Pages (무료) → MAU 500 이후 Vercel 이전
Supabase:      계정 생성 예정 (supabase.com, 무료)
```

---

## 4. 폴더 구조

```
[1단계 — 단일 파일]
richbuild/
├── index.html          메인 파일 (HTML + CSS + JS 통합)
├── persona-text.js     페르소나 모드 텍스트 상수
├── supabase-client.js  Supabase 클라이언트 초기화  ← supabase.js 아님
└── .env                환경변수 (gitignore 필수)

※ 1단계에서 파일은 이 4개가 전부. 더 추가하지 않는다.

[2단계 — React 앱 (MAU 500명 초과 후 전환)]
richbuild/
├── src/
│    ├── features/
│    │    ├── auth/          PRD_01
│    │    ├── portfolio/     PRD_02
│    │    ├── news/          PRD_03
│    │    ├── journal/       PRD_04
│    │    ├── market/        PRD_05
│    │    ├── mypage/        PRD_06
│    │    ├── subscription/  PRD_07
│    │    ├── community/     PRD_08 (v2.0)
│    │    ├── badge/         PRD_09
│    │    └── admin/         PRD_10
│    ├── shared/
│    │    ├── components/
│    │    ├── hooks/
│    │    ├── lib/
│    │    ├── types/
│    │    └── persona-text.ts
│    └── app/
├── supabase/
│    ├── migrations/
│    └── functions/
└── docs/               PRD 파일들
```

---

## 5. 전체 개발 로드맵

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1단계: HTML 단일 파일 MVP (4~6주)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0   환경 세팅
           VS Code + GitHub Desktop + Supabase 계정
           GitHub 레포 + Pages 설정
           index.html 뼈대 + Supabase 연결 테스트
           디자인 시스템 CSS 변수 등록
           persona-text.js 상수 파일 생성

PHASE 1   Supabase 스키마 생성
           테이블 23개 순차 실행 (SQL 붙여넣기)
           app_config 초기값 INSERT

PHASE 2   인증 + 온보딩
           구글 OAuth + 온보딩 플로우

PHASE 3   다중 계좌 관리 ← 1차 완벽 구현 목표
           3-1. 계좌 CRUD
           3-2. 종목 CRUD + 수익률 계산
           3-3. 국내 주가 연동 (Yahoo Finance)
           3-4. 미국 주가 연동 (Finnhub)
           3-5. 환율 + 원화/달러 토글
           3-6. 포트폴리오 수익률 계산
           3-7. Y&R 모의투자 기본
           ★ PHASE 3 통합 QA

PHASE 4   시장 지표 위젯
PHASE 5   뉴스 피드 + 공지 배너
PHASE 6   투자 일지
PHASE 7   마이페이지 + 공지사항 목록
PHASE 8   구독 UI + 접근 제어
PHASE 9   MVP 디자인 폴리싱
PHASE 10  MVP 통합 QA + 베타 출시 (100명)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2단계: v1.x 고도화 (MVP 검증 후)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 11  결제 활성화 (포트원 v2)
PHASE 12  FCM 알림 예약 + 계좌 인증
PHASE 13  수익 그래프 (30일 데이터 적재 후)
PHASE 14  PostHog + Sentry 연동
PHASE 15  관리자 대시보드
PHASE 16  섹터 필터 + 페르소나 변경 유료화

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3단계: v2.0 게이미피케이션 + 커뮤니티
       (MAU 5,000 달성 후)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 17  AI 번역·요약 활성화
PHASE 18  배지 시스템 전체
PHASE 19  커뮤니티 오픈
PHASE 20  광고 관리

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4단계: v2.x BM 고도화 (MAU 3만 후)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 21  모의투자 대회 이벤트 시스템
PHASE 22  리그 랭킹 + 시즌제
PHASE 23  React Native 앱 전환 + Play Store
```

---

## 6. 개발 원칙 (각 Phase 공통)

```
① 한 Phase = 한 기능 완결
   기능 하나를 완전히 끝내고 QA 통과 후에만 다음으로 이동

② 기존 코드 절대 수정 금지
   새 기능은 반드시 새 파일·새 함수로 분리
   기존 파일 수정 필요 시 사전 보고 필수

③ Phase마다 Git commit 필수
   QA 통과 = commit
   다음 Phase 착수 전 반드시 커밋

④ 다음 Phase 프롬프트는 현재 Phase 완료 후 작성
   미리 만들지 않음
```

---

## 7. 핵심 서비스 특징

### 하단 탭 구성 (1단계 고정)
```
탭1: 홈 (포트폴리오)    → PHASE 3 구현
탭2: 뉴스              → PHASE 5 구현
탭3: 커뮤니티          → 🔒 잠금 표시 (v2.0 예정, 탭은 표시)
탭4: 일지              → PHASE 6 구현
탭5: 마이              → PHASE 7 구현
```

### 페르소나 모드 시스템
```
🏢 대표님 모드: 투자 회사 경영 세계관
  - 호칭: 대표님
  - 등급: 스타트업 → 중소기업 → 중견기업 → 대기업
  - 조직명 자동생성: [닉네임] 에셋/캐피탈/인베스트먼트

⚔️ 사령관 모드: 투자 부대 지휘 세계관
  - 호칭: 사령관님
  - 등급: 준장 → 소장 → 중장 → 대장 → 원수
  - 조직명 자동생성: [닉네임] 사단/부대/전략사령부

모든 UI 텍스트는 persona-text.js(1단계) / persona-text.ts(2단계) 참조
컴포넌트에 텍스트 하드코딩 금지
```

### Y&R 모의투자 시스템
```
가입 시 $2,000 자동 지급 (앱 내 가상 화폐)
실제 Finnhub·Yahoo Finance 시세 기반 모의투자
실제 포트폴리오와 완전 분리 (합산 집계 제외)
```

### app_config 플래그 시스템
```
코드 재배포 없이 DB 값으로 기능 ON/OFF
주요 플래그 (MVP 전부 false):
  subscription_enabled: false
  community_enabled:    false
  ai_summary_enabled:   false
  league_enabled:       false
  profile_image_enabled: false
  gemini_key_enabled:   false
  use_owner_api:        false
  marketing_push_enabled: false
```

---

## 8. 데이터베이스 테이블 목록 (23개)

```sql
-- MVP 착수 시 순서대로 생성
1.  app_config              서비스 설정 플래그
2.  users                   사용자 (persona_mode, org_name, ynr_balance 등)
3.  accounts                증권사 계좌
4.  holdings                보유 종목
5.  ynr_portfolios          Y&R 모의투자
6.  market_cache            시장 지표 캐시 (PRD_02·PRD_05 공유)
7.  event_cache             어닝콜·FOMC 캐시
8.  journal_entries         투자 일지
9.  investment_commandments 투자 계명 (최대 7개)
10. notifications           앱 내 알림
11. news_cache              뉴스 캐시
12. regulation_news         규제기관 뉴스
13. search_history          뉴스 검색 기록
14. subscriptions           구독 상태
15. account_verifications   계좌 인증 요청
16. api_key_usage_logs      API 키 사용 이력
17. badges                  배지 발급 내역
18. security_logs           보안 이상 감지 로그
19. admin_action_logs       관리자 액션 로그
20. config_change_logs      app_config 변경 이력
21. ynr_token_logs          Y&R 토큰 지급 이력
22. announcements           공지사항
23. announcement_reads      공지 읽음 처리

-- v1.x 착수 시 추가
24. holdings_price_history  보유 종목 일별 종가 스냅샷

-- v2.0 착수 시 추가
25. community_comments / community_polls / community_poll_votes
26. community_likes / reports / league_rankings / events
27. ad_campaigns / ad_impressions
```

---

## 9. 보안 원칙

```
1. 모든 API: Supabase Auth JWT 검증 필수
2. RLS: 모든 테이블 활성화 (예외 없음)
3. API 키: AES-256-GCM 암호화 후 DB 저장
4. 클라이언트: API 키 원문 절대 노출 금지
5. 관리자 페이지: role='admin' + 미인증 시 404 반환
6. 이상 계정 자동 감지:
   - 1분 내 API 100회 초과
   - 5분 내 로그인 실패 10회
   - 24시간 내 동일 IP 계정 3개+
7. .env 파일: .gitignore 필수 포함
8. service_role key: Edge Function에서만 사용
```

---

## 10. Claude Code 작업 규칙 (필수 준수)

### 규칙 1 — 코드 안전성
- 새 기능 추가 시 기존 코드 수정 금지
- 신규 기능은 새 파일·새 함수로 분리해서 추가
- DB 마이그레이션: 컬럼 추가(ADD COLUMN)만 허용
  컬럼 삭제·수정 금지. 변경 필요 시 먼저 보고

### 규칙 2 — 범위 제한
- 지시한 기능 외 파일·함수 수정 절대 금지
- 다른 파일 수정이 필요하면 즉시 멈추고 보고:
  "[파일명] 수정이 필요합니다. 이유: [이유]. 수정해도 될까요?"
- 리팩토링·코드 정리·변수명 변경도 지시 없으면 금지

### 규칙 3 — 오류 발생 시
```
[오류 보고 형식]
발생 위치: (파일명, 함수명)
오류 메시지: (전문 그대로)
원인 분석: (추정)
영향 범위: (다른 기능 영향 여부)
해결 방안: (옵션 A / 옵션 B)
```
보고 후 확인 받은 뒤에만 수정 진행

### 규칙 4 — 개발 전 확인
코드 작성 전 반드시 구현 계획 먼저 보고:
```
[구현 계획]
수정/생성할 파일 목록:
각 파일 작업 요약:
기존 기능 영향 여부:
```
확인 받은 뒤에만 코드 작성

### 규칙 4-1 — 기능 제안 (할루시네이션 방지)
임의로 기능 추가하거나 PRD 수정 금지
제안 시 반드시 아래 형식으로 먼저 보고:
```
[기능 제안]
제안 기능:
제안 이유:
근거: (추측이면 "추정"으로 명시)
영향 범위:
구현 복잡도: (낮음/중간/높음)
```
확인 받은 뒤에만 PRD 반영 + 개발 착수

### 규칙 5 — 절대 금지
- Non-Goals 항목 구현
- 하드코딩 (환경변수 사용)
  ※ 예외: Supabase anon key는 클라이언트 코드에 직접 입력 가능 (공개 키, 노출돼도 무방)
  ※ 절대 금지: service_role key는 Edge Function 환경변수에만 — 클라이언트 코드 포함 절대 금지
- console.log 미제거 배포
- 확인 없이 패키지 추가
- 확인 없이 Supabase 스키마 변경
- API 키 클라이언트 코드에 포함
- persona-text.js 외 UI 텍스트 하드코딩

### 규칙 6 — 보안 코딩
- 모든 사용자 ID: UUID (순번 금지)
- RLS 정책: 배포 전 매번 확인
- API 키: Edge Function 환경변수에만 저장
- service_role key: 클라이언트 노출 절대 금지

### 규칙 7 — 이상 계정 감지
자동 감지 기준 (Edge Function):
- 1분 내 100회 API 초과 → suspicious 처리
- 5분 내 로그인 실패 10회 → 잠금
- 24시간 내 동일 IP 계정 3개+ → 감지
감지 시 자동 차단 금지 — 관리자 확인 후 처리

### 규칙 8 — 비전공자 친화 설명
코드 설명 시 반드시:
- 전문 용어는 비유로 풀어서 설명
- 각 파일이 무엇을 하는지 한 줄로 설명
- 에러 발생 시 원인을 일반인이 이해할 수 있게 설명
- 다음에 할 일을 체크리스트로 제시

---

## 11. PRD 파일 목록

| 파일 | 내용 | 개발 단계 |
|---|---|---|
| PRD_MASTER.md | 전체 통합 문서 (항상 포함 권장) | — |
| PRD_00_overview.md | 전체 개요·규칙 | — |
| PRD_01_auth.md | 인증·온보딩 | MVP |
| PRD_02_portfolio.md | 포트폴리오·Y&R 모의투자 | Phase 3 |
| PRD_03_news.md | 뉴스·공지 배너 | Phase 5 |
| PRD_04_journal.md | 투자 일지·계명 | Phase 6 |
| PRD_05_market.md | 시장 지표 위젯 | Phase 4 |
| PRD_06_mypage.md | 마이페이지·공지사항 목록 | Phase 7 |
| PRD_07_subscription.md | 구독 결제 (비활성화) | Phase 8 |
| PRD_08_community.md | 커뮤니티·청백전 | v2.0 |
| PRD_09_badge.md | 배지 시스템 | v2.0 |
| PRD_10_admin.md | 관리자 대시보드 | Phase 15 |
| bx_richbuild.md | BX·브랜드 컨셉·로고 | 디자인 참조 |
| designsystem_richbuild.md | 디자인 시스템 토큰 | 디자인 참조 |

---

## 12. 세션 시작 템플릿

새 Claude Code 세션 시작 시 이 파일과 해당 PRD를 첨부하고 아래를 붙여넣는다.

```
이 프로젝트는 리치빌드(RichBuild) 투자 관리 서비스입니다.
개발자는 비전공자이며 Claude와 함께 단계별로 구현합니다.

== 첨부 파일 ==
- CLAUDE.md (이 파일)
- PRD_0X_[기능명].md (이번 Phase 구현 기능)

== 현재 개발 단계 ==
PHASE [N] — [기능명]

== 현재 상태 ==
[직전 Phase에서 완료된 내용 요약]
[현재 파일 구조 간단히]

== 이번 Phase 목표 ==
[구현할 기능 명시]

규칙 준수 사항:
- CLAUDE.md 규칙 1~8 전체 준수
- 코드 작성 전 구현 계획 먼저 보고
- 기존 코드 수정 금지
- 비전공자가 이해할 수 있는 언어로 설명
- QA 체크리스트 제시 후 확인 받기
- 완료 후 commit 메시지 제안
```

---

## 13. QA 체크리스트 (Phase별 공통)

각 Phase 완료 시 아래를 전부 확인 후 commit:

```
□ 정상 케이스 동작?
  → 일반적인 사용 시나리오로 끝까지 따라가서 결과 정상 확인

□ 빈 입력 케이스?
  → 아무것도 안 넣고 버튼 누르면 에러 메시지 표시

□ 에러 케이스?
  → 인터넷 끄거나 잘못된 입력 시 안내 메시지 표시

□ 로딩 상태 보임?
  → 결과 기다리는 동안 스켈레톤 or 스피너 표시

□ 데이터 저장됨?
  → 새로고침 후에도 입력한 데이터 유지

□ 기존 기능 깨짐 없음?
  → 이전 Phase 기능들 정상 동작 확인

□ GitHub Pages 배포 확인?
  → 실제 URL에서 동작 확인
```

---

## 14. 환경변수 목록

```bash
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=        # 클라이언트 코드에 직접 입력 가능 (공개 키 — 노출돼도 무방)
SUPABASE_SERVICE_ROLE_KEY= # Edge Function에서만 — 절대 클라이언트 노출 금지

# 암호화
API_KEY_ENCRYPTION_SECRET=  # AES-256 키

# 외부 API (Edge Function 환경변수)
FINNHUB_API_KEY=            # 창업자 키 (UT 후 전환)
GEMINI_API_KEY=             # 비활성화 상태
PORTONE_SECRET=             # 비활성화 상태
FCM_SERVER_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

모든 키는 로컬 .env 파일에만 저장
GitHub 커밋 절대 금지 (.gitignore 확인)

---

## 15. 주요 설계 결정 요약

| 항목 | 결정 |
|---|---|
| 개발 방식 | 비전공자 + Claude 바이브코딩, 단계별 구현 |
| 1단계 배포 | GitHub Pages (HTML 단일 파일) |
| 2단계 전환 기준 | MAU 500명 초과 시 React + Vercel 전환 |
| 커뮤니티 탭 | 🔒 잠금 표시 (v2.0까지 탭은 유지, 진입 불가) |
| 국내 주가 | Yahoo Finance 전날 종가 |
| 미국 주가 | Finnhub 실시간 (사용자 키) |
| 환율 | FreeExchangeRateApi 1시간 갱신 |
| AI API | Gemini Flash (비활성화), Claude/GPT 보조 |
| 결제 | 포트원 v2 (비활성화 — UT 후 활성화) |
| 커뮤니티 | v2.0 (MAU 5,000 달성 후) |
| 광고 | 직접 판매 방식 (AdMob 미사용) |
| 계좌 인증 | 스크린샷 + AI 추출 + 관리자 승인 |
| 닉네임 중복 | 허용 + 자동 #숫자 부여 |
| 관리자 접근 | /admin + role=admin + 미인증 404 |
| 공지사항 | 뉴스 탭 상단 배너 + 마이페이지 목록 |
| Supabase 파일명 | supabase-client.js (통일) |

---

*마지막 업데이트: 2026-06-06*
*현재 단계: PHASE 0 프롬프트 작성 준비 중*
