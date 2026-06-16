# PRD_02: 포트폴리오 (Portfolio)
> 버전: v1.0 | 작성일: 2026-06-01
> 의존 파일: PRD_00_overview.md (전제 조건·규칙 전체 적용)
> 개발 시작 단계: 프로토타입부터

---

## 0. 한 줄 정의

> "여러 증권사 계좌와 보유 종목을 한 화면에서 통합 조회하고,
> 원화/달러 모드 전환과 함께 전체 수익률을 실시간으로 파악할 수 있는
> 투자 관리 허브의 핵심 화면"

> 베타 서비스(https://jinhoo111.github.io/news-letter-service/)의
> 모든 기능을 계승하고 단계별로 고도화한다.

---

## 1. 개발 단계별 구현 범위

| 단계 | 데이터 | 주요 구현 |
|---|---|---|
| **프로토타입** | 하드코딩 더미 데이터 | UI 레이아웃, 필터, 원화/달러 모드, 가격 고지 표시, 상태 4종 확인 |
| **MVP v1.0** | Supabase 실제 저장 | 계좌·종목 CRUD, 가격 API 연동, 실시간 시세, Y&R 모의투자 탭, **Y&R 수익 그래프 (일간·월간·연간)** |
| **v1.x** | — | 성과 리포트, **실제 포트폴리오 수익률 그래프** (holdings_price_history 배치 준비 후), 리서치·규제 탭 고도화 |
| **v2.0** | — | 포트폴리오 공개 옵션, 배지 연동 |

---

## 2. 사용자 스토리

```
ST-01  투자자로서, 모든 계좌의 총 평가금액과 수익률을
       앱을 열자마자 한눈에 보고 싶다.

ST-02  투자자로서, 국내주식과 미국주식을 같은 화면에서
       원화 환산 기준으로 비교하고 싶다.

ST-03  투자자로서, 어떤 계좌에 어떤 종목이 있는지
       계좌별로 구분해서 보고 싶다.

ST-04  투자자로서, 새로운 종목을 매수했을 때
       간편하게 포트폴리오에 추가하고 싶다.

ST-05  투자자로서, 종목을 탭하면
       관련 뉴스와 투자 일지를 바로 볼 수 있으면 좋겠다.

ST-06  투자자로서, 보유/관심/매도완료 종목을
       상태별로 구분해서 관리하고 싶다.

ST-06-1 종목 상태 정의:
       - 보유: 현재 매수 완료 후 보유 중인 종목
       - 매수: 매수 예정 / 진입 타이밍 검토 중인 종목
       - 관심: 단순 관심 종목 (매수 계획 없음)
       - 숨김: 포트폴리오에서 숨기고 싶은 종목 (집계에서도 제외)

ST-07  투자자로서, 원화 기준과 달러 기준 중 하나를 선택해서
       평가금액과 수익률을 내가 원하는 통화로 확인하고 싶다.

ST-08  투자자로서, 월가 애널리스트의 Buy/Hold/Sell 컨센서스와
       평균 목표가를 종목별로 조회하고 싶다.

ST-09  투자자로서, 국내·미국 지수, VIX, 선물, 환율, 코인, 원자재를
       내가 원하는 항목만 골라서 한 화면에서 보고 싶다.
```

---

## 3. 화면 목록

| # | 화면명 | 진입 경로 | 핵심 액션 |
|---|---|---|---|
| 3-1 | 홈 (포트폴리오 대시보드) | 앱 실행 / 탭1 | 전체 수익률 확인 |
| 3-2 | 계좌 추가 | 설정 → 계좌 관리 → + | 계좌 등록 |
| 3-3 | 종목 추가 | 홈 → + 버튼 | 종목 등록 |
| 3-4 | 종목 상세 | 홈 → 종목 탭 | 뉴스·일지 연결 확인 |
| 3-5 | 종목 수정 | 종목 상세 → 수정 | 종목 정보 수정 |

---

## 4. 기능 명세

### 4-1. 홈 화면 (포트폴리오 대시보드)

#### P0 — 반드시 구현 (프로토타입부터)

**가격 기준 정의 (전체 앱 공통)**

```
┌─────────────────────────────────────────────────────────┐
│  자산     │ 소스               │ 업데이트    │ 기준      │
├─────────────────────────────────────────────────────────┤
│ 미국주식  │ Finnhub WebSocket  │ 실시간      │ 현재가    │
│ 국내주식  │ Yahoo Finance      │ 하루 1회    │ 전날 종가 │
│ USD/KRW   │ FreeExchangeRate   │ 1시간 1회   │ 중간값    │
└─────────────────────────────────────────────────────────┘
```

**원화/달러 모드 계산식**

```
[KRW 모드]
  미국주식 평가금 = 실시간 현재가(USD) × 수량 × 환율(1시간 갱신)
  국내주식 평가금 = 전날 종가(KRW) × 수량
  총 평가금액    = 전부 원화 합산 (₩)

[USD 모드]
  미국주식 평가금 = 실시간 현재가(USD) × 수량
  국내주식 평가금 = 전날 종가(KRW) × 수량 ÷ 환율(1시간 갱신)
  총 평가금액    = 전부 달러 합산 ($)
```

> 모드 토글 시 모든 종목의 평가금액이 즉시 재계산된다.
> 환율 기준 시간은 항상 화면에 표시한다 (예: "환율 14:00 기준").

**홈 화면 레이아웃 순서 (위→아래)**

> 벤치마킹 근거: 로빈후드(요약 숫자 최상단 강조) + 토스증권(보유 종목 중심 + 연결 뉴스) +
> 삼성증권 mPOP(모듈 접기/펼치기) 조합. 정보 밀도는 유지하되 기본 화면은 간결하게.

```
① 요약 카드          총 평가금액·손익·수익률 + 원화/달러 토글
                     └─ 카드 탭 → 수익률 그래프 펼치기 (기본값: 접힘, v1.x)
                           일간 / 월간 / 연간 탭 전환 후 닫기로 접기
② 주요 일정          가로 스크롤 카드 (D-day 순)
③ 시장 지표 위젯     접기/펼치기 토글
④ 보유 종목 뉴스     최신 3~5건 + "더보기" → 탭2 이동
⑤ 종목 리스트        계좌 탭 + 종목 테이블
```

**요약 카드 (화면 상단)**
- 조직명 + 호칭 표시 (페르소나 모드 연동)
  - 🏢 대표님 모드: "○○ 에셋  대표님의 포트폴리오"
  - ⚔️ 사령관 모드: "○○ 사단  사령관님의 전략 배치"
- 총 평가금액 표시 (선택 통화 기준)
  - KRW 모드: 미국주식 USD → 원화 환산 합산
  - USD 모드: 국내주식 KRW → 달러 역환산 합산
  - 표시 형식: KRW모드 `₩ 12,345,678` / USD모드 `$ 9,145`
- 총 손익 표시
  - 총 손익 = 총 평가금액 - 총 매수금액 (선택 통화 기준)
  - 표시 형식: `+₩ 1,234,567 (+11.2%)`
  - 색상: 수익 → 빨강(국내 관례), 손실 → 파랑
- 수익률 표시
- 총 보유 종목 수

**가격 기준 고지 (요약 카드 하단 — 항상 표시)**
```
🏢 국내 전날 종가  |  🇺🇸 미국 실시간  |  💱 환율 14:00 기준
```
- 세 가지 기준을 한 줄로 표시 (작은 회색 텍스트)
- 탭 시 → 설명 모달:
  "국내 주식은 전날 종가 기준으로 표시됩니다.
   미국 주식은 실시간 현재가입니다.
   환율은 1시간마다 자동 갱신됩니다.
   장 중 실시간 국내 시세는 각 증권사 앱을 이용해주세요."
- 환율 시간은 마지막 갱신 시각으로 자동 업데이트

**계좌 탭 (가로 스크롤)**
- 등록된 계좌를 탭으로 표시
- "전체" 탭 기본 선택 → 모든 계좌 합산
- 계좌 탭 선택 시 → 해당 계좌 종목만 필터
- **"Y&R 모의투자" 탭** → 별도 모의투자 포트폴리오 표시
  - 초기 자본: 2,000 YR (가입 시 자동 지급)
  - 실제 Finnhub·Yahoo Finance 시세 기반
  - 실제 계좌와 완전 분리 (합산 집계 제외)

**종목 리스트**
- 컬럼: 종목명 / 현재가 / 수익률 / 평가금액 / 비중
- 국내 종목 현재가 옆: "종가" 배지 (작은 회색 태그) 표시
- 미국 종목 현재가 옆: "실시간" 배지 (작은 초록 태그) 표시
- 정렬: 기본값 평가금액 내림차순
- 수익률 색상: 수익(빨강) / 손실(파랑) / 보합(회색)
- 각 종목 탭 → 종목 상세 화면으로 이동

**필터 바**
- 시장: 전체 / 국장 / 미장
- 상태: 전체 / 보유 / 매수 / 관심 / 숨김
- 유형: 전체 / 단타 / 장타

**현금 자산**
- 원화 현금: 수동 입력
- 달러 현금: 수동 입력 → 원화 환산 표시

**원화/달러 모드 전환 (토글)**
- 화면 우상단 토글: ₩ KRW ↔ $ USD
- KRW 모드: 모든 평가금액·손익을 원화로 표시 (달러 종목은 실시간 환율 환산)
- USD 모드: 모든 평가금액·손익을 달러로 표시 (원화 종목은 역환산)
- 선택 모드는 localStorage에 저장 (앱 재시작 후에도 유지)
- 요약 카드 + 종목 리스트 + 현금 자산 모두 선택 통화 기준으로 표시

**현금 자산**
- 원화 현금: 수동 입력 + 편집/저장/취소 인라인 편집
- 달러 현금: 수동 입력 + 편집/저장/취소 인라인 편집
- 선택한 통화 모드 기준으로 합산 표시

**주요 일정 섹션 (홈 화면 ②번)**

표시 일정 4종:
- 🏢 실적 발표 (어닝콜): 등록된 모든 종목 기준 (보유/매수/관심/숨김)
- 🏦 FOMC·연준 회의: 시장 전체 공통
- 📊 미국 경제 지표: CPI·NFP·PPI 등
- 🇰🇷 국내 경제 지표: GDP·CPI 등 (한국은행 ECOS API)

표시 방식:
- 가로 스크롤 카드 (D-day 오름차순, 오늘 기준)
- D-0(오늘): 빨간 강조
- D-1~3: 주황 강조
- 지난 일정: 자동 숨김
- 카드 탭 → 일정 상세 (예상 EPS, 예상치 등)
- "전체보기" → 월간 캘린더 뷰

어닝콜 × 투자 일지 자동 연동:
- 종목 등록 시 → Finnhub 어닝 캘린더 자동 조회
- 투자 일지에 "어닝콜 일지" 자동 생성 (entry_type: 'event', is_auto_generated: true)
- FOMC·CPI 등 시장 일정도 자동 일지 생성
- 실적 발표일 경과 → 자동 아카이브 이동
- 종목 삭제 → 연결된 어닝콜 일지 자동 삭제 (CASCADE)
- 메모 추가된 일지 삭제 시 → "메모가 있는 일지가 삭제됩니다" 경고

보유 종목 뉴스 섹션 (홈 화면 ④번):
- 등록 종목 기반 자동 필터 (국내: 네이버 RSS / 미국: Finnhub)
- 최신 3~5건 표시
- "더보기" 탭 → 탭2 뉴스로 이동
- 종목 없을 때: "종목을 등록하면 관련 뉴스가 자동으로 모여요"

**+ 버튼 (FAB)**
- 종목 추가 화면으로 이동
- 버튼 텍스트 모드별 분기:
  - 🏢 대표님: "+ 자산 편입"
  - ⚔️ 사령관: "+ 전력 배치"

**모드별 UI 텍스트 분기 원칙**
- 모든 액션 텍스트는 persona_mode 값에 따라 분기 처리
- 텍스트 상수는 별도 i18n 파일로 관리 (src/shared/persona-text.ts)
  ```
  // persona-text.ts 구조 예시
  {
    ceo: {
      holding_add: "자산 편입",
      holding_sell: "자산 청산",
      portfolio: "운용 포트폴리오",
      journal: "운용 일지",
      news: "시장 리포트",
    },
    commander: {
      holding_add: "전력 배치",
      holding_sell: "병력 철수",
      portfolio: "전략 배치 현황",
      journal: "작전 일지",
      news: "정보 브리핑",
    }
  }
  ```
- UI 컴포넌트에서 직접 텍스트 하드코딩 금지
  → 반드시 persona-text.ts 상수 참조

#### P1 — MVP v1.0에서 구현

**시장 지표 위젯 (화면 하단 or 상단 토글)**
- 코스피 / 코스닥 / 나스닥 / S&P500 / 달러원 환율
- 각 지수 현재값 + 전일 대비 등락
- PRD_05(시장 지표)와 공유 컴포넌트 사용
- 위젯 접기/펼치기 토글

**갱신 버튼**
- 수동 갱신: 버튼 탭 → 가격 API 재호출
- 마지막 갱신 시간 표시: "5분 전 갱신"

**포트폴리오 비중 차트**
- 종목별 비중을 도넛 차트로 표시
- 탭하면 해당 종목 하이라이트

**시장 지표 위젯 상세 설정**
- ⚙ 설정 버튼 → 표시 항목 ON/OFF 개별 선택
- 항목 목록 (베타 서비스 동일):
  - 국내 지수: 코스피/코스닥 (Yahoo Finance · 15분 딜레이)
  - 미국 지수: 나스닥/S&P500/다우 (Yahoo Finance · 15분 딜레이)
  - 공포지수 VIX (Yahoo Finance · 실시간)
  - 선물: S&P500 선물/나스닥 선물 (Yahoo Finance · 실시간)
  - 가상화폐: BTC/ETH/기타 (CoinGecko · 실시간)
  - 환율: USD/KRW 및 주요 통화 (exchangerate-api · 실시간)
  - 원자재: 금/은/원유/천연가스 (Yahoo Finance · 실시간)
- 설정 저장: Supabase users 테이블 widget_settings 컬럼 (MVP v1.0)
  프로토타입: localStorage

### 4-1-1. Y&R 모의투자 탭 (MVP v1.0)

**Y&R 탭 선택 시 화면:**

```
[Y&R 모의투자]
─────────────────────────────────────────
총 Y&R 자산   2,847 YR    (+42.3%)
초기 자본     2,000 YR    잔여 화폐: 450 YR

종목     수량  매수가    현재가    수익률   평가금
NVDA      5주   $850    $1,020   +20.0%  $5,100
AAPL     10주   $175     $192    +9.7%   $1,920
삼성전자 100주 72,000   78,000   +8.3%  ₩7,800,000
─────────────────────────────────────────
[+ Y&R 모의 매수]
```

**Y&R 모의 매수 플로우:**
```
종목 검색 (티커 자동완성)
    ↓
수량 입력
    ↓
현재 시세로 자동 계산
  매수 금액 = 수량 × 현재가
    ↓
YY&R 잔여 현금R 잔여 화폐 확인
  부족 시 → "Y&R 화폐가 부족해요" 안내
    ↓
매수 확정 → ynr_portfolios INSERT
            users.ynr_balance 차감 (단위: YR)
```

**Y&R 모의 매도 플로우:**
```
보유 종목 탭 → [Y&R 매도]
    ↓
수량 입력
    ↓
현재 시세로 매도금액 계산
    ↓
매도 확정 → ynr_portfolios.status = 'sold'
            users.ynr_balance 증가 (단위: YR)
            users.ynr_roi 업데이트
```

**Y&R 주의 사항 표시:**
```
"Y&R 모의투자는 실제 투자가 아닙니다.
 실제 시세를 기반으로 하지만 실제 수익/손실이 발생하지 않아요.
 Y&R 화폐(YR)는 앱 내 가상 화폐이며 현금으로 전환되지 않아요.
 모의투자 수익률은 커뮤니티 배지 획득에 활용됩니다."
```

**Y&R 특징:**
- 실제 계좌 포트폴리오 합산에서 완전 제외
- 원화/달러 모드 토글 동일 적용
- 가격 기준: 실제 포트폴리오와 동일 (국내 전날 종가, 미국 실시간)
- 초기 자본 2,000 YR은 1회만 지급 (재충전 없음 — 신중한 투자 유도)

#### Out of Scope (이번 PRD 제외)

```
❌ 자동 계좌 연동 (마이데이터 — Phase 3)
❌ 실제 포트폴리오 수익률 히스토리 차트 (v1.x — 6-6 참조)
❌ 포트폴리오 공개 기능 (v2.0)
❌ 목표 수익률 설정 알림 (v1.x)
❌ 세금 계산 (양도세, 환차익 — Phase 3)
❌ 배당 캘린더 (v1.x)
❌ 리서치 사이트 모음 → PRD_03 뉴스에서 처리
❌ 규제 모니터링 (SEC/FTC/DOJ/연준 뉴스) → PRD_03 뉴스에서 처리
```

---

### 4-1-2. Y&R 수익 그래프 (MVP v1.0)

> **배경:** Y&R 모의투자는 게이미피케이션의 핵심 루프다.
> 매수/매도 이벤트가 DB에 기록되므로 잔고 변화를 시계열로 재구성할 수 있다.
> 실제 포트폴리오와 달리 **과거 데이터가 존재**하기 때문에 MVP에서 구현 가능.

**위치:** Y&R 탭 상단 — 총 자산 요약 카드 바로 아래

**화면 구조:**

```
[Y&R 모의투자]
─────────────────────────────────────────
총 Y&R 자산   2,847 YR    (+42.3%)
초기 자본     2,000 YR    잔여 화폐: 450 YR

[ 일간 ]  [ 월간 ]  [ 연간 ]      ← 탭 전환

     3,200 YR ┤                    ╭─
     2,800 YR ┤           ╭────────╯
     2,400 YR ┤     ╭─────╯
     2,000 YR ┼─────╯
            └──────────────────────
            6/1  6/8  6/15 6/22 6/29

  ● 현재 2,847 YR  ▲ +847 YR (+42.3%) since 시작
─────────────────────────────────────────
종목 리스트...
```

**탭별 데이터 범위:**

| 탭 | 기간 | X축 단위 | 데이터 포인트 |
|---|---|---|---|
| 일간 | 최근 30일 | 1일 | 매 거래일 종가 기준 잔고 |
| 월간 | 최근 12개월 | 1개월 | 월말 잔고 |
| 연간 | 전체 기간 | 1개월 | 월말 잔고 |

**그래프 상세 동작:**

```
[데이터 계산 방식]
거래 없는 날 → 전일 잔고 그대로 유지 (플랫 라인)
매수 발생 → ynr_balance 차감 시점 반영
매도 발생 → ynr_balance 증가 + roi 반영 시점 반영
초기값     → 가입일의 2,000 YR

[그래프 색상]
현재 잔고 > 2,000 YR (초기자본) → 라인 색상: 수익 컬러 (Primary)
현재 잔고 < 2,000 YR            → 라인 색상: 손실 컬러 (Semantic Error)
초기자본 기준선 (2,000 YR) → 점선으로 항상 표시

[인터랙션]
그래프 포인트 탭 → 해당 시점 잔고 + 수익률 툴팁 표시
탭 전환 시 → fade 애니메이션 (200ms)
```

**빈 상태 처리:**

```
일간 탭: 거래 이력 0건 → "2,000 YR로 첫 모의투자를 시작해보세요"
월간·연간: 데이터 30일 미만 → "데이터가 쌓이고 있어요. 조금만 기다려주세요 📈"
```

**기술 구현 메모:**

```
라이브러리: recharts (웹) / Victory Native (앱)
데이터 소스: ynr_portfolios 테이블의 bought_at, sell_at, buy_price, sell_price
잔고 재구성: Edge Function에서 날짜별 ynr_balance 스냅샷 계산
캐싱: sessionStorage (웹) — 탭 전환 시 재계산 방지, 5분 TTL
```

**페르소나 모드 텍스트 (persona-text.ts):**

```
ceo:       "운용 성과 추이"
commander: "작전 수익 현황"
```

---

### 4-1-3. 실제 포트폴리오 수익률 그래프 (v1.x 후보)

> **현재 상태: Out of Scope (MVP)**
> 구현 전제 조건(6-6 price_history 배치)이 먼저 완료되어야 한다.
> 데이터 축적 기간 최소 30일 필요.

**MVP에서 하지 않는 이유:**
리치빌드는 수동 입력 기반으로, 종목 등록 이전의 주가 히스토리가 존재하지 않는다.
과거 평가금액을 역산하려면 종목별 일별 종가를 매일 수집·저장하는 배치 작업이 필요하며,
이는 별도 Edge Function 크론잡 + `holdings_price_history` 테이블 추가를 전제로 한다.

**v1.x 구현 계획 (데이터 준비 완료 후):**

```
위치: 홈 탭 — 총 평가금액 요약 카드 바로 아래 (Y&R 그래프와 동일한 UX 패턴)

탭: [ 일간 ]  [ 월간 ]  [ 연간 ]
- 일간: 종목 등록 후 수집된 일별 종가 기반 총 평가금액 추이
- 월간: 월별 평가금액 추이
- 연간: 전체 기간 추이

데이터 소스: holdings_price_history 테이블 (6-6 참조)
표시 기준: 종목 등록 시점 이후부터만 표시 (과거 역산 미지원)
통화 모드: 원화/달러 토글 연동
```

**선행 조건 (v1.x 착수 전 완료 필요):**

```
1. holdings_price_history 테이블 생성 (6-6 참조)
2. Edge Function 크론잡 — 매일 장 마감 후 보유 종목 종가 수집
   - 국내: KST 16:00 이후 실행 (Yahoo Finance)
   - 미국: EST 16:30 이후 실행 (Finnhub)
3. 최소 30일 데이터 축적 확인
```

---

### 4-2. 계좌 추가 화면

#### P0

**입력 필드**
- 증권사 선택 (드롭다운):
  토스증권 / 카카오페이증권 / 키움증권 / 미래에셋 / 삼성증권 /
  NH투자증권 / KB증권 / 신한투자증권 / 한화투자증권 / 대신증권 /
  하나증권 / 유안타증권 / 한국투자증권 / 기타
- 계좌 별명 (텍스트, 최대 20자)
  예: "키움 주식", "토스 ETF", "NH 공모주"
- 통화: KRW / USD (선택)

**유효성 검사**
- 증권사 미선택 시 저장 버튼 비활성화
- 같은 증권사 + 같은 통화 계좌 중복 등록 시 경고 (막지는 않음)

**저장 후**
- 홈 화면 계좌 탭에 즉시 반영
- 빈 계좌 상태로 시작 (종목 0개)

---

### 4-3. 종목 추가 화면

#### P0

**입력 필드**
- 계좌 선택 (등록된 계좌 목록, 필수)
- 종목명 (텍스트, 필수, 최대 50자)
- 종목명 또는 티커 입력 (실시간 자동완성)
  - 2글자 이상 입력 시 드롭다운 자동완성 실행
  - 드롭다운 항목: 종목명 + 티커 + 시장 표시
    예) 삼성전자  005930  🏢 국내
        NVDA      NVDA    🇺🇸 미국
  - 항목 선택 시: 종목명·티커·시장 자동 입력
  - 선택 즉시 현재가 자동 조회 및 표시
  - 소스: Finnhub Symbol Search API (디바운스 300ms)
  - 내 보유 종목은 ★ 표시로 상단 고정
  - 수동 입력도 가능 (자동완성 무시하고 직접 입력)
- 시장: 국장 / 미장 (선택)
- 수량 (숫자, 필수, 0 초과)
- 평균 매수가 (숫자, 필수, 0 초과)
  - 국내: 원화 입력
  - 미국: 달러 입력
- 투자 유형: 단타 / 장타 (선택, 기본값 장타)
- 상태: 보유 / 매수 / 관심 / 숨김 (선택, 기본값 보유)
- MTS 연결: 증권사 MTS 앱으로 바로가기 링크 (선택)

**계산 자동 표시 (입력 중 실시간)**
- 매수금액 = 수량 × 평균 매수가
- 현재 평가금액 = 수량 × 현재가 (API 조회)
  - 국내: 전날 종가 기준 / 미국: 실시간
- 예상 수익률 = (현재가 - 평균 매수가) / 평균 매수가 × 100

**유효성 검사**
- 필수 필드 미입력 시 저장 버튼 비활성화
- 수량, 매수가: 음수 입력 불가
- 티커 입력 시 형식 검사 (국내: 숫자 6자리, 미국: 알파벳 1~5자)

**저장 후**
- 홈 화면에 즉시 반영
- 첫 종목 추가 시 → 온보딩 완료 이벤트 발생 (`onboarding_complete`)

---

### 4-4. 종목 상세 화면 (모달)

#### P0

**상단 정보**
- 종목명 + 티커
- 📅 다음 실적 발표 배지 (있을 경우): "D-2 실적 발표 · 6/4"
- 현재가 (실시간 or 15분 딜레이)
- 평균 매수가
- 수량
- 평가금액
- 수익금 / 수익률 (색상 표시)
- 비중 (전체 포트폴리오 대비 %)

**하단 탭 3개**
- 뉴스 탭: 해당 종목 연결 뉴스 목록 (PRD_03에서 구현)
- 일지 탭: 해당 종목 연결 일지 목록 (PRD_04에서 구현)
- 정보 탭: 매수 계좌, 투자 유형, 상태, 등록일

**액션 버튼**
- 수정: 종목 수정 화면으로 이동
- 아카이브: 별도 버튼 → 상태를 '숨김'으로 변경하거나 일지 탭으로 이동
- 삭제: 확인 다이얼로그 후 완전 삭제

#### P1 (MVP v1.0)

**월가 레이팅 탭 (미국주식 전용)**
- Finnhub API: 수십 개 IB의 Buy/Hold/Sell 집계
- 표시 항목: 강력매수/매수/보유/매도/강력매도 비율 바 차트
- 평균 목표가 표시 (현재가 대비 괴리율 함께 표시)
- 티커 직접 검색도 가능 (보유 종목 외 조회)
- 주의 문구: "리포트 원문은 유료입니다"

**실시간 시세 탭 (미국주식 전용)**
- Finnhub API: 실시간 호가 + 거래량
- 표시: 현재가 / 고가 / 저가 / 시가 / 거래량
- "미국 주식 실시간 · 국내(KS) 15분 딜레이" 안내 표시

- 커뮤니티 탭 (v2.0): 해당 종목 의견 서베이 + 보유자 토론

---

### 4-5. 종목 수정 화면

#### P0

- 종목 추가 화면과 동일한 폼
- 기존 값이 채워진 상태로 시작
- 저장 시 → Supabase UPDATE

---

## 5. UI 상태 (4가지 필수)

모든 화면은 아래 4가지 상태를 반드시 처리한다.

### 홈 화면

| 상태 | 조건 | UI |
|---|---|---|
| **로딩** | 가격 API 호출 중 | 스켈레톤 카드 (요약 카드 + 종목 리스트) |
| **빈 화면** | 등록된 종목 0개 | "아직 종목이 없어요" + "첫 종목 추가하기" CTA 버튼 |
| **에러** | API 호출 실패 | "가격 정보를 불러오지 못했어요" + 마지막 캐시 데이터 표시 + 재시도 버튼 |
| **정상** | 데이터 있음 | 요약 카드 + 종목 리스트 |

### 종목 추가/수정 화면

| 상태 | 조건 | UI |
|---|---|---|
| **로딩** | 저장 처리 중 | 저장 버튼 로딩 스피너 + 입력 비활성화 |
| **빈 화면** | 초기 진입 | 빈 폼 |
| **에러** | 저장 실패 | 인라인 에러 메시지 (필드 하단) |
| **정상** | 저장 성공 | 화면 닫기 + 홈 업데이트 |

### 종목 상세 화면

| 상태 | 조건 | UI |
|---|---|---|
| **로딩** | 현재가 조회 중 | 가격 영역 스켈레톤 |
| **빈 화면** | 뉴스 0건 / 일지 0건 | 각 탭에 "아직 없어요" + 링크 |
| **에러** | 가격 조회 실패 | "현재가 조회 실패" + 마지막 조회 시간 표시 |
| **정상** | 데이터 있음 | 정상 표시 |

---

## 6. 데이터 모델

### 6-1. accounts 테이블

```sql
CREATE TABLE accounts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  broker_name TEXT NOT NULL,             -- '키움증권', '토스증권' 등
  label       TEXT NOT NULL,             -- 사용자 지정 계좌 별명
  currency    TEXT NOT NULL DEFAULT 'KRW', -- 'KRW' | 'USD'
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own accounts"
  ON accounts FOR ALL
  USING (auth.uid() = user_id);
```

### 6-2. holdings 테이블

```sql
CREATE TABLE holdings (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  ticker          TEXT,                  -- 종목 코드 (국내: '005930', 미국: 'NVDA')
  name            TEXT NOT NULL,         -- 종목명
  market          TEXT NOT NULL,         -- 'KR' | 'US'
  quantity        NUMERIC NOT NULL CHECK (quantity > 0),
  avg_price       NUMERIC NOT NULL CHECK (avg_price > 0),
  currency        TEXT NOT NULL,         -- 'KRW' | 'USD'
  trade_type      TEXT DEFAULT 'long',   -- 'short' | 'long'
  status          TEXT DEFAULT 'holding', -- 'holding'(보유) | 'buying'(매수) | 'watching'(관심) | 'hidden'(숨김)
  mts_link          TEXT,                  -- MTS 앱 딥링크 (선택)
  next_earnings_at  TIMESTAMPTZ,           -- 다음 실적 발표일 (Finnhub 캐시)
  earnings_eps_est  NUMERIC,              -- 예상 EPS
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 (조회 성능)
CREATE INDEX idx_holdings_user_id ON holdings(user_id);
CREATE INDEX idx_holdings_account_id ON holdings(account_id);
CREATE INDEX idx_holdings_ticker ON holdings(ticker);

-- RLS
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own holdings"
  ON holdings FOR ALL
  USING (auth.uid() = user_id);
```

### 6-3. users 테이블 확장 (cash 자산)

```sql
-- Y&R 모의투자 테이블
CREATE TABLE ynr_portfolios (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ticker       TEXT NOT NULL,
  name         TEXT NOT NULL,
  market       TEXT NOT NULL,          -- 'KR' | 'US'
  quantity     NUMERIC NOT NULL CHECK (quantity > 0),
  buy_price    NUMERIC NOT NULL,       -- 매수 시점 실제 시세
  buy_currency TEXT NOT NULL,          -- 'KRW' | 'USD'
  status       TEXT DEFAULT 'holding', -- 'holding' | 'sold'
  sell_price   NUMERIC,
  sell_at      TIMESTAMPTZ,
  bought_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ynr_portfolios_user_id ON ynr_portfolios(user_id);

ALTER TABLE ynr_portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can manage own ynr"
  ON ynr_portfolios FOR ALL
  USING (auth.uid() = user_id);

-- users 테이블 Y&R 컬럼 추가
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS ynr_balance  NUMERIC DEFAULT 2000.00  -- 단위: YR (Y&R 화폐),
  ADD COLUMN IF NOT EXISTS ynr_roi      NUMERIC DEFAULT 0;
  -- ynr_roi: 누적 수익률 (%) — 매도 완료 시 자동 계산

-- users 테이블 확장 (MVP v1.0)
-- persona_mode, org_name 컬럼은 PRD_00 섹션 14.7 참조
-- 포트폴리오 화면에서 users.persona_mode, users.org_name 조회 필수
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS cash_krw         NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cash_usd         NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS display_currency TEXT DEFAULT 'KRW',
  ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{
    "earnings_alert": true,
    "market_event_alert": true,
    "alert_days_before": 1,
    "marketing_push": false
  }'::jsonb, -- 'KRW' | 'USD'
  ADD COLUMN IF NOT EXISTS widget_settings  JSONB DEFAULT '{
    "kospi": true,
    "kosdaq": true,
    "nasdaq": true,
    "sp500": true,
    "vix": true,
    "futures": false,
    "crypto": true,
    "forex": true,
    "commodities": false
  }'::jsonb;
```

### 6-4. 가격 캐시 (market_cache)

```sql
-- 앱 전체 설정 테이블 (관리자가 DB에서 직접 제어)
CREATE TABLE app_config (
  key         TEXT PRIMARY KEY,   -- 'ai_summary_enabled', 'use_owner_api' 등
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 초기값 삽입
INSERT INTO app_config (key, value) VALUES
  ('ai_summary_enabled', 'false'),   -- AI 요약 비활성화 (검증 후 true로)
  ('use_owner_api', 'false'),         -- 창업자 키 전환 (검증 후 true로)
  ('marketing_push_enabled', 'false'); -- 마케팅 푸시 (Phase 2)

-- 이벤트 일정 캐시 테이블
CREATE TABLE event_cache (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type    TEXT NOT NULL,    -- 'earnings' | 'fomc' | 'macro_us' | 'macro_kr'
  ticker        TEXT,             -- 종목 코드 (실적 발표만, 나머지는 NULL)
  title         TEXT NOT NULL,    -- "NVDA 실적 발표" / "FOMC 금리 결정"
  event_at      TIMESTAMPTZ NOT NULL,  -- 일정 일시
  eps_estimate  NUMERIC,          -- 예상 EPS (실적만)
  eps_actual    NUMERIC,          -- 실제 EPS (발표 후)
  description   TEXT,             -- 지표 설명
  source        TEXT,             -- 'finnhub' | 'ecos' | 'manual'
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_cache_event_at ON event_cache(event_at);
CREATE INDEX idx_event_cache_ticker ON event_cache(ticker);

CREATE TABLE market_cache (
  ticker      TEXT PRIMARY KEY,          -- 종목 코드 또는 지수 코드
  price       NUMERIC,                   -- 현재가
  currency    TEXT,                      -- 'KRW' | 'USD'
  change_pct  NUMERIC,                   -- 전일 대비 등락률
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
-- RLS 없음 (캐시 테이블은 공개 읽기 허용)
-- 쓰기는 Edge Function(service_role)에서만
```

---

### 6-6. holdings_price_history 테이블 (v1.x — 실제 포트폴리오 그래프용)

> **MVP에서 생성하지 않는다.** v1.x 착수 시점에 마이그레이션 추가.
> 이 테이블이 준비되어야 4-1-3 실제 포트폴리오 수익률 그래프 구현 가능.

```sql
-- 보유 종목 일별 종가 스냅샷 (v1.x)
-- Edge Function 크론잡이 매일 장 마감 후 INSERT
CREATE TABLE holdings_price_history (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  holding_id  UUID NOT NULL REFERENCES holdings(id) ON DELETE CASCADE,
  ticker      TEXT NOT NULL,
  market      TEXT NOT NULL,              -- 'KR' | 'US'
  price       NUMERIC NOT NULL,           -- 해당일 종가
  currency    TEXT NOT NULL,              -- 'KRW' | 'USD'
  recorded_at DATE NOT NULL,             -- 수집 날짜 (시간 제외)
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_price_history_unique
  ON holdings_price_history(holding_id, recorded_at);
CREATE INDEX idx_price_history_user_date
  ON holdings_price_history(user_id, recorded_at DESC);

-- RLS
ALTER TABLE holdings_price_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can read own price history"
  ON holdings_price_history FOR SELECT
  USING (auth.uid() = user_id);
-- INSERT/UPDATE: Edge Function(service_role)에서만 허용
```

**크론잡 Edge Function 동작:**

```
함수명: collect-price-history
실행 주기:
  - 국내 종목: 매일 KST 16:30 (장 마감 30분 후)
  - 미국 종목: 매일 EST 17:00 (장 마감 30분 후)

처리 흐름:
  1. holdings 테이블에서 status='holding' 종목 전체 조회
  2. market_cache에서 현재가 조회 (API 재호출 최소화)
  3. holdings_price_history에 (holding_id, 오늘날짜, 종가) INSERT
     → UNIQUE 제약으로 중복 수집 자동 방지 (ON CONFLICT DO NOTHING)
  4. 30일 이상 지난 레코드 중 status='sold' holding 데이터 정리
     (보관 기간: 종목 보유 중 + 매도 후 1년)
```

### MVP — 사용자 직접 입력 방식

```
[대상 API]  Finnhub (주가·뉴스 실시간)
[방식]      사용자가 본인 Finnhub API 키를 앱 내에서 직접 입력
[저장 위치] Supabase users 테이블 api_keys 컬럼 (암호화 저장)
[이유]      서비스 검증 전 창업자 API 비용 리스크 0으로 유지
```

**저장 방식 상세:**
```sql
-- users 테이블에 API 키 저장 컬럼 추가
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS finnhub_api_key_encrypted TEXT;
  -- 저장 전 Supabase Edge Function에서 AES-256 암호화
  -- 복호화도 Edge Function에서만 수행 (클라이언트 복호화 금지)
```

**저장 흐름:**
```
사용자 입력 → Edge Function → AES-256 암호화 → Supabase DB 저장
                                                        ↓
API 호출 시 → Edge Function → DB에서 암호화 키 조회 → 복호화 → Finnhub 호출
```

**영구 저장 보장 (일회성 저장 방지):**
- DB 저장 방식이라 앱 재시작·새로고침·기기 변경 후에도 유지
- localStorage/쿠키 의존 없음 → 브라우저 캐시 삭제해도 사라지지 않음
- 로그인 상태라면 어느 기기에서든 동일한 키 사용
- 키 저장 시 "저장 완료" 토스트 메시지 표시
- 마이페이지 → 설정 → API 키 관리에서 언제든 수정·삭제 가능

**Gemini API 키:**
- MVP에서는 비활성화 상태로 UI만 존재
- 입력 필드는 있지만 "서비스 준비 중" 잠금 상태
- 검증 완료 후 창업자 키로 전환 시 활성화

### 검증 완료 후 — 창업자 키 전환

```
[전환 방법]  Edge Function 환경변수에 창업자 Finnhub 키 등록
             코드 내 조건 플래그 1개 변경:
             USE_USER_API_KEY = false → 창업자 키로 자동 전환
[사용자 영향] 키 입력 UI 자동 숨김
             기존 저장된 사용자 키는 DB에 유지 (추후 재활용 가능)
```

---

---

## 7. API / 외부 연동

### 7-1. 국내 주가 조회 (전날 종가 기준)

```
소스: Yahoo Finance API
엔드포인트: https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}.KS
기준: 전날 종가 (previousClose)
업데이트: 장 마감 후 1회 (KST 기준 당일 오후 4시 이후)

요청 예시: GET /v8/finance/chart/005930.KS
응답 필드:
  - chart.result[0].meta.previousClose  ← 전날 종가 (사용)
  - chart.result[0].meta.regularMarketPrice ← 현재가 (딜레이 있음, 미사용)

주의사항:
- 클라이언트에서 직접 호출 금지 (CORS 이슈)
- Edge Function에서 호출 후 market_cache에 저장
- 캐시 유효시간: 24시간 (다음 날 장 마감 전까지 동일값)
- UI에 "종가" 배지 표시 필수
```

### 7-2. 미국 주가 조회 (실시간)

```
소스: Finnhub API (사용자 키)
방식 1 — REST (기본):
  엔드포인트: https://finnhub.io/api/v1/quote?symbol={TICKER}&token={KEY}
  응답: { c: 현재가, pc: 전일 종가, d: 변동, dp: 변동률 }
  캐시: market_cache, 1분 유효 (REST 폴링)

방식 2 — WebSocket (선택, v1.x):
  wss://ws.finnhub.io?token={KEY}
  구독: {"type":"subscribe","symbol":"NVDA"}
  장점: 초당 업데이트 가능
  단점: 연결 유지 비용, 복잡도 증가

MVP: REST 방식으로 시작 (1분 캐시)
     → 사용자 피드백 후 WebSocket 전환 여부 결정

Rate Limit 처리:
- Edge Function에서 캐시 우선 확인
- 캐시 만료 시에만 API 호출
- 429 응답 시: 캐시 데이터 반환 + "잠시 후 갱신됩니다" 표시
```

### 7-3. 환율 조회 (1시간 갱신)

```
소스: FreeExchangeRateApi (GitHub: haxqer/FreeExchangeRateApi)
엔드포인트: https://api.fxratesapi.com/latest?base=USD&currencies=KRW
업데이트: 1시간마다
비용: 완전 무료, 호출 제한 없음
캐시 유효시간: 1시간

응답 예시: { "rates": { "KRW": 1350.5 } }

백업 소스 (메인 실패 시):
  exchangerate-api.com 무료 플랜 (24시간, 월 1500회)
  → Supabase Edge Function에서 자동 폴백

UI 표시: "환율 14:00 기준" (마지막 갱신 시각 자동 표시)

용도:
  KRW 모드: USD 자산 → 원화 환산
  USD 모드: KRW 자산 → 달러 역환산
```

### 7-4. Edge Function 구조

```
supabase/functions/
└── get-prices/
    └── index.ts

역할:
1. 클라이언트로부터 티커 목록 + 통화 모드(KRW/USD) 수신
2. market_cache 확인 → 유효한 캐시 있으면 즉시 반환
3. 캐시 만료된 티커만 외부 API 호출
   - 국내 티커(*.KS): Yahoo Finance → previousClose 추출
   - 미국 티커: Finnhub REST → 현재가 추출
4. 환율 캐시 확인 → 만료 시 FreeExchangeRateApi 호출
5. 통화 모드에 따라 평가금액 서버 계산 후 반환
   (클라이언트에서 계산해도 되지만 서버 계산이 일관성 유지에 유리)
6. 응답에 각 가격의 기준 시각 포함
   { ticker, price, basis: "close"|"realtime", price_at: "2026-06-01T15:30:00" }

보안:
- Supabase Auth JWT 검증 필수
- 사용자 Finnhub 키 AES-256 복호화 후 사용
- 요청당 티커 최대 50개 제한 (과도한 API 호출 방지)
```

---

## 8. 측정 이벤트

| 이벤트명 | 트리거 | 파라미터 | 분석 목적 |
|---|---|---|---|
| `portfolio_view` | 홈 탭 진입 | — | NSM 측정 기반 |
| `portfolio_refresh` | 갱신 버튼 탭 | — | 수동 갱신 빈도 |
| `holding_add` | 종목 추가 완료 | market, ticker, persona_mode | 활성화 깊이 + 모드별 행동 분석 |
| `holding_edit` | 종목 수정 완료 | — | 데이터 관리 행동 |
| `holding_archive` | 종목 아카이브 | — | 매도 완료 사이클 |
| `holding_delete` | 종목 삭제 완료 | — | 데이터 관리 행동 |
| `holding_detail_view` | 종목 상세 진입 | ticker | 상세 조회 빈도 |
| `account_add` | 계좌 추가 완료 | broker_name | 계좌 다양성 파악 |
| `onboarding_complete` | 첫 종목 추가 완료 | persona_mode, org_name | 온보딩 퍼널 + 모드 분포 |
| `filter_apply` | 필터 변경 | filter_type, value | UX 사용 패턴 |
| `ynr_buy` | Y&R 모의 매수 완료 | ticker, amount | 모의투자 활성도 |
| `ynr_sell` | Y&R 모의 매도 완료 | ticker, roi | 수익률 분포 |
| `ynr_tab_view` | Y&R 탭 진입 | — | 모의투자 관심도 |
| `ynr_chart_view` | Y&R 수익 그래프 탭 전환 | period(daily/monthly/yearly) | 기간별 관심도 |
| `portfolio_chart_view` | 실제 포트폴리오 그래프 탭 전환 (v1.x) | period(daily/monthly/yearly) | 기간별 관심도 |

---

## 9. 의존성 & 선행 조건

```
선행 조건:
  - PRD_00 전체 규칙 숙지
  - 프로토타입: 없음 (더미 데이터로 독립 실행 가능)
  - MVP v1.0: Supabase 프로젝트 생성 완료

이 PRD가 완료되어야 시작 가능한 PRD:
  - PRD_03 뉴스: holdings 테이블의 ticker 사용
  - PRD_04 일지: holdings 테이블의 id(FK) 사용
  - PRD_05 시장 지표: market_cache 테이블 공유
  - PRD_08 커뮤니티: holdings의 ticker + status 사용

공유 컴포넌트 (shared/에 위치):
  - PriceTag: 가격 + 색상 표시 컴포넌트
  - ChangeIndicator: 등락률 표시 컴포넌트
  - SkeletonCard: 로딩 스켈레톤
  - EmptyState: 빈 화면 컴포넌트
  - ErrorBanner: 에러 + 재시도 컴포넌트
```

---

## 10. 클로드 코드용 개발 지시

새 개발 세션에서 이 블록을 PRD_00 + PRD_02와 함께 붙여넣는다.

### 프로토타입 세션

```
== 이번 세션 목표 ==
PRD_02 포트폴리오 — 프로토타입 구현

== 구현 범위 ==
- 홈 화면 UI (하드코딩 더미 데이터)
- 계좌 탭 + 종목 리스트
- 필터 바 (시장/상태/유형)
- 종목 추가 폼 (localStorage 임시 저장)
- 종목 상세 모달
- 4가지 UI 상태 (로딩/빈화면/에러/정상) 모두 토글로 확인 가능

== 더미 데이터 구조 ==
계좌 2개:
  - 키움증권 / KRW / 종목 3개
  - 토스증권 / USD / 종목 2개
종목 예시:
  - 삼성전자 (005930) / 100주 / 매수가 72,000 / 현재가 75,500
  - SK하이닉스 (000660) / 50주 / 매수가 130,000 / 현재가 128,000
  - NVDA / 10주 / 매수가 850 / 현재가 920 (USD)
  - AAPL / 20주 / 매수가 180 / 현재가 175 (USD)
  달러환율: 1,350원

== 확인 후 작업 ==
코드 작성 전 구현 계획 먼저 보고할 것
PRD_00 규칙 1~7 전체 준수
```

### MVP v1.0 세션

```
== 이번 세션 목표 ==
PRD_02 포트폴리오 — MVP v1.0 Supabase 연동

== 선행 완료 조건 ==
- Supabase 프로젝트 생성 완료
- PRD_01 Auth (구글 로그인) 구현 완료

== 구현 범위 ==
1. Supabase 마이그레이션
   - accounts 테이블 생성 + RLS 정책
   - holdings 테이블 생성 + RLS 정책
   - market_cache 테이블 생성
2. Edge Function: get-prices
   - 국내: Yahoo Finance
   - 미국: Finnhub (FINNHUB_API_KEY 환경변수)
   - 환율: exchangerate-api
   - 캐시 로직 포함
3. 계좌 CRUD (Supabase 연동)
4. 종목 CRUD (Supabase 연동)
5. 실시간 가격 표시 (Edge Function 호출)
6. 프로토타입 더미 데이터 → 실제 데이터로 교체

== 환경변수 ==
FINNHUB_API_KEY: [발급 후 Supabase Secrets에 저장]
EXCHANGERATE_API_KEY: [발급 후 저장, 없으면 무료 엔드포인트 사용]

== 확인 후 작업 ==
코드 작성 전 구현 계획 먼저 보고할 것
PRD_00 규칙 1~7 전체 준수
DB 마이그레이션 실행 전 스키마 보고 후 확인 받을 것
```

---

*다음 파일: PRD_03_news.md*

---

## 11. 베타 서비스 기능 → PRD 매핑

> 베타(https://jinhoo111.github.io/news-letter-service/)의 모든 기능을
> 어느 PRD에서 언제 구현하는지 전체 매핑한다.
> 기능이 누락되지 않도록 이 표를 기준으로 관리한다.

| 베타 기능 | 담당 PRD | 구현 단계 | 상태 |
|---|---|---|---|
| **[투자 종목 관리 탭]** | | | |
| 총 평가금액·손익·수익률·보유종목 수 요약 카드 | PRD_02 | 프로토타입 | 🔲 |
| 현금 (원화/달러) 인라인 편집 | PRD_02 | 프로토타입 | 🔲 |
| 보유/매수/관심/숨김 상태 필터 | PRD_02 | 프로토타입 | 🔲 |
| 미장/국장 시장 필터 | PRD_02 | 프로토타입 | 🔲 |
| 단타/장타 유형 필터 | PRD_02 | 프로토타입 | 🔲 |
| 종목 테이블 (종목명·티커·매수가·현재가·수량·평가금액·수익률·비중·상태·유형·MTS) | PRD_02 | 프로토타입 | 🔲 |
| 증권사 선택 (13개사 + 기타) | PRD_02 | 프로토타입 | 🔲 |
| 종목 추가 폼 | PRD_02 | 프로토타입 | 🔲 |
| 보유 종목 최신 소식 (종목별 뉴스 연결) | PRD_02 + PRD_03 | MVP v1.0 | 🔲 |
| AI 요약 버튼 (Gemini) | PRD_03 | MVP v1.0 | 🔲 |
| **원화/달러 모드 전환** | PRD_02 | 프로토타입 | 🔲 |
| **[지수·환율 탭]** | | | |
| 국내 지수 (코스피/코스닥, 15분 딜레이) | PRD_05 | 프로토타입 | 🔲 |
| 미국 지수 (나스닥/S&P500 등, 15분 딜레이) | PRD_05 | 프로토타입 | 🔲 |
| 공포지수 VIX (실시간) | PRD_05 | 프로토타입 | 🔲 |
| 선물 (실시간) | PRD_05 | 프로토타입 | 🔲 |
| 가상화폐 (CoinGecko 실시간) | PRD_05 | 프로토타입 | 🔲 |
| 환율 (exchangerate-api 실시간) | PRD_05 | 프로토타입 | 🔲 |
| 원자재 (실시간) | PRD_05 | 프로토타입 | 🔲 |
| 표시 항목 ON/OFF 설정 | PRD_02 + PRD_05 | MVP v1.0 | 🔲 |
| **[뉴스 탭]** | | | |
| 시장 전체 뉴스 (Finnhub · 외환/코인/M&A 필터) | PRD_03 | MVP v1.0 | 🔲 |
| 종목별 뉴스 (티커 검색) | PRD_03 | MVP v1.0 | 🔲 |
| 월가 레이팅 (Finnhub · Buy/Hold/Sell 집계 + 목표가) | PRD_02 | MVP v1.0 | 🔲 |
| 실시간 시세 (Finnhub · 미국주식) | PRD_02 | MVP v1.0 | 🔲 |
| Finnhub API 키 연결 UI | PRD_02 + PRD_03 | MVP v1.0 | 🔲 |
| **[리서치·규제 탭]** | | | |
| IB 리서치 사이트 모음 | PRD_03 | v1.x | 🔲 |
| 규제 기관 뉴스 (SEC/FTC/DOJ/연준) | PRD_03 | v1.x | 🔲 |
| **[Y&R 모의투자]** | | | |
| Y&R 초기 자본 2,000 YR 지급 | PRD_01 | MVP v1.0 | 🔲 |
| Y&R 모의 매수·매도 | PRD_02 | MVP v1.0 | 🔲 |
| Y&R 수익률 실시간 계산 | PRD_02 | MVP v1.0 | 🔲 |
| Y&R 수익률 배지 연동 | PRD_09 | MVP v1.0 | 🔲 |
| Y&R 리그 (모의투자 별도 리그) | PRD_08 | v2.0 | 🔲 |
| **[투자 일지 탭]** | | | |
| 활성 일지 목록 | PRD_04 | 프로토타입 | 🔲 |
| 아카이브 목록 | PRD_04 | 프로토타입 | 🔲 |
| 알림 ON/OFF | PRD_04 | MVP v1.0 | 🔲 |
| 일지 유형 (일반/매수/매도/매크로/복기/아이디어) | PRD_04 | 프로토타입 | 🔲 |
| 종목 선택 연결 | PRD_04 | 프로토타입 | 🔲 |
| 일지 작성·저장·삭제 | PRD_04 | 프로토타입 | 🔲 |

> 상태 범례: 🔲 미구현 / 🔄 진행중 / ✅ 완료
> 구현 완료 시 상태를 업데이트한다.


---

## 12. QA 체크리스트 (개발 완료 후 점검)

> 각 기능 개발 완료 후 아래 항목을 순서대로 점검한다.
> 모든 항목 ✅ 통과 후에만 다음 PRD 개발 착수.

### 기능 동작 점검

```
포트폴리오 기본
□ 계좌 추가 → 홈 화면에 즉시 반영되는가
□ 종목 추가 → 리스트에 즉시 표시되는가
□ 종목 수정 → 변경값이 저장되고 즉시 반영되는가

티커 자동완성 (B안)
□ 2글자 이상 입력 시 자동완성 드롭다운이 표시되는가
□ 내 보유 종목이 드롭다운 상단에 ★ 표시로 고정되는가
□ 항목 선택 시 종목명·티커·시장이 자동 입력되는가
□ 항목 선택 즉시 현재가가 자동 조회되어 표시되는가
□ 300ms 디바운스가 적용되는가 (타이핑마다 API 호출 방지)
□ 수동 입력(자동완성 무시)도 동작하는가
□ 종목 삭제 → 확인 다이얼로그 후 완전 삭제되는가
□ 현금(원화/달러) 인라인 편집 → 저장/취소 동작하는가

계산 정확성
□ 국내 종목 현재가가 전날 종가로 표시되는가
□ 미국 종목 현재가가 실시간(1분 이내)으로 표시되는가
□ 총 평가금액 = 각 종목 (현재가 × 수량) 합산이 맞는가
□ 총 손익 = 총 평가금액 - 총 매수금액이 맞는가
□ 수익률 = 총 손익 / 총 매수금액 × 100이 맞는가
□ KRW 모드: 달러 종목 원화 환산 = 실시간가 × 수량 × 환율이 맞는가
□ USD 모드: 원화 종목 달러 역환산 = 종가 × 수량 ÷ 환율이 맞는가

가격 기준 고지
□ 국내 종목 현재가 옆에 "종가" 배지가 표시되는가
□ 미국 종목 현재가 옆에 "실시간" 배지가 표시되는가
□ 요약 카드 하단에 "🏢 국내 전날 종가 | 🇺🇸 미국 실시간 | 💱 환율 HH:MM 기준" 표시되는가
□ 고지 탭 시 설명 모달이 표시되는가
□ 환율 갱신 시각이 정확하게 업데이트되는가

원화/달러 모드
□ KRW ↔ USD 토글 시 모든 금액이 즉시 전환되는가
□ 달러 모드에서 원화 종목 역환산이 맞는가
□ 모드 선택이 새로고침 후에도 유지되는가
□ 로그아웃 후 재로그인 시에도 유지되는가

필터
□ 상태 필터: 보유/매수/관심/숨김 각각 정확히 필터되는가
□ 시장 필터: 국장/미장 각각 정확히 필터되는가
□ 유형 필터: 단타/장타 각각 정확히 필터되는가
□ 복합 필터: 상태 + 시장 조합 시 정확히 필터되는가
□ 숨김 상태 종목: 전체 합산(총 평가금액)에서 제외되는가

API 키 저장
□ Finnhub 키 입력 → DB에 암호화 저장되는가
□ 앱 새로고침 후에도 키가 유지되는가 (재입력 불필요)
□ 로그아웃 → 재로그인 후에도 키가 유지되는가
□ 다른 기기에서 로그인 시에도 동일한 키가 적용되는가
□ 키 수정 → 새 키로 즉시 교체되는가
□ 키 삭제 → API 기능이 비활성화되는가
□ 잘못된 키 입력 시 에러 메시지가 표시되는가

가격 API
□ Finnhub 키 연결 후 미국 주식 현재가 표시되는가
□ 국내 주식 현재가 표시되는가 (15분 딜레이)
□ 환율이 정상 표시되는가
□ API 오류 시 캐시 데이터 + 에러 배너가 표시되는가
□ 갱신 버튼 탭 시 최신 가격으로 업데이트되는가
□ 마지막 갱신 시간이 표시되는가
```

### 페이지 유지 점검 (새로고침 시)

```
□ 홈 탭에서 새로고침 → 홈 탭 유지되는가
□ 종목 상세 모달 열린 상태에서 새로고침 → 홈으로 돌아오는가 (모달은 닫혀도 됨)
□ 계좌 탭 선택 상태에서 새로고침 → 선택된 계좌 탭 유지되는가
□ 필터 선택 상태에서 새로고침 → 필터 상태 유지되는가
□ 원화/달러 모드에서 새로고침 → 모드 유지되는가
```

### UI 상태 점검

```
□ 로딩: 가격 API 호출 중 스켈레톤 카드 표시되는가
□ 빈 화면: 종목 0개일 때 "첫 종목 추가하기" CTA 표시되는가
□ 에러: 네트워크 끊고 접속 시 에러 배너 + 캐시 데이터 표시되는가
□ 정상: 모든 데이터 정상 표시되는가
```

### 데이터 무결성 점검

```
□ 계좌 삭제 시 해당 계좌의 종목도 함께 삭제되는가 (CASCADE)
□ 숨김 종목이 합산 계산에서 제외되는가
□ 다른 사용자의 데이터가 보이지 않는가 (RLS 확인)
□ 로그아웃 후 데이터 접근이 차단되는가

Y&R 모의투자
□ 가입 시 2,000 YR 초기 자본이 지급되는가
□ Y&R 탭이 계좌 탭 목록에 표시되는가
□ Y&R 포트폴리오가 실제 포트폴리오 합산에서 제외되는가
□ Y&R 매수 시 잔여 현금이 차감되는가
□ 잔고 부족 시 매수 불가 안내가 표시되는가
□ Y&R 매도 시 수익률이 정확히 계산되는가
□ users.ynr_roi가 매도 완료 시 자동 업데이트되는가
□ 초기 자본 2,000 YR이 중복 지급되지 않는가

Y&R 수익 그래프
□ 일간·월간·연간 탭 전환이 정상 동작하는가
□ 거래 이력 0건일 때 빈 상태 메시지가 표시되는가
□ 초기자본 2,000 YR 기준선(점선)이 항상 표시되는가
□ 잔고 > 2,000 YR일 때 수익 컬러, < 2,000 YR일 때 손실 컬러로 표시되는가
□ 그래프 포인트 탭 시 툴팁(잔고 + 수익률)이 표시되는가
□ 페르소나 모드에 따라 그래프 제목 텍스트가 변경되는가

페르소나 모드 점검
□ 대표님 모드: 요약 카드에 "○○ 에셋 대표님의 포트폴리오" 표시되는가
□ 사령관 모드: 요약 카드에 "○○ 사단 사령관님의 전략 배치" 표시되는가
□ FAB 버튼 텍스트가 모드에 따라 변경되는가 (자산 편입 / 전력 배치)
□ 모드 변경 후 전체 텍스트가 즉시 반영되는가
□ 조직명 미설정 시 자동 생성값이 표시되는가
□ onboarding_complete 이벤트에 persona_mode 파라미터가 포함되는가
```