# Design System: 리치빌드 (RichBuild)
> 버전: v1.0 | 작성일: 2026-06-05
> 기반: bx_richbuild.md 확정 내용
> 1단계 적용: HTML + CSS 변수 (index.html <style> 태그 내 :root에 직접 정의)
> 2단계 적용: React 18 + Tailwind CSS (MAU 500 초과 후 전환 시)

---

## 1. Color Tokens

### 1-1. Brand Colors

```css
/* Primary — Teal (성장·신뢰·데이터) */
--color-primary-50:  #E1F5EE;
--color-primary-100: #9FE1CB;
--color-primary-200: #5DCAA5;
--color-primary-500: #1D9E75;   /* ← 메인 CTA, 액티브 탭, 링크 */
--color-primary-700: #0F6E56;
--color-primary-800: #085041;   /* Secondary — 앱바, 헤더, 강조 텍스트 */
--color-primary-900: #04342C;

/* Accent — Gold (프리미엄·자산·배지·등급·Y&R) */
--color-accent-50:  #FAEEDA;
--color-accent-100: #FAC775;
--color-accent-400: #EF9F27;    /* ← 배경 전용 (텍스트 단독 사용 금지) */
--color-accent-600: #BA7517;
--color-accent-800: #633806;    /* ← Gold 배경 위 텍스트 전용 */
--color-accent-900: #412402;
```

### 1-2. Semantic Colors

```css
/* 수익·손실 (국내 관례) */
--color-profit:      #E53935;   /* 수익 양수 — 빨강 */
--color-loss:        #1565C0;   /* 수익 음수 — 파랑 */

/* 상태 */
--color-success:     #1D9E75;   /* Primary와 공유 */
--color-warning:     #EF9F27;   /* Accent와 공유 */
--color-error:       #E53935;   /* Profit과 공유 */
--color-info:        #1565C0;   /* Loss와 공유 */
```

### 1-3. Gray Scale (9단계)

```css
--color-gray-50:  #F8F8F6;   /* 앱 배경 */
--color-gray-100: #F0F0ED;   /* 카드 배경 */
--color-gray-200: #E2E2DE;   /* 구분선·테두리 */
--color-gray-300: #C8C8C3;   /* 비활성 아이콘 */
--color-gray-400: #A8A8A2;   /* Placeholder (텍스트 사용 금지) */
--color-gray-500: #888882;   /* 슬로건·캡션 보조 */
--color-gray-600: #5A5A56;   /* 보조 텍스트 */
--color-gray-700: #3A3A37;   /* 서브 타이틀 */
--color-gray-900: #1E1E1C;   /* 주요 텍스트 */
```

### 1-4. Surface Tokens (라이트/다크 대응)

```css
/* Light Mode (MVP) */
--color-bg-primary:    #F8F8F6;   /* 앱 전체 배경 */
--color-bg-secondary:  #F0F0ED;   /* 카드·시트 배경 */
--color-bg-elevated:   #FFFFFF;   /* 모달·바텀시트 */

--color-text-primary:   #1E1E1C;  /* 주요 텍스트 */
--color-text-secondary: #5A5A56;  /* 보조 텍스트 */
--color-text-tertiary:  #A8A8A2;  /* Placeholder */

--color-border-default: #E2E2DE;  /* 기본 구분선 */
--color-border-strong:  #C8C8C3;  /* 강조 구분선 */

/* Dark Mode (v1.x — 미리 정의, MVP에서 미사용) */
--color-bg-primary-dark:    #1E1E1C;
--color-bg-secondary-dark:  #2A2A28;
--color-bg-elevated-dark:   #333330;

--color-text-primary-dark:   #F8F8F6;
--color-text-secondary-dark: #A8A8A2;
--color-text-tertiary-dark:  #5A5A56;

--color-border-default-dark: #3A3A37;
--color-border-strong-dark:  #5A5A56;
```

---

## 2. Typography Tokens

### 2-1. Font Family

```css
--font-display: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
--font-body:    'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
--font-number:  'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
/* 숫자는 font-variant-numeric: tabular-nums 속성으로 고정폭 처리 */
```

### 2-2. Type Scale

```css
/* Display */
--font-size-display-xl: 36px;   /* 총 평가금액 등 핵심 숫자 */
--font-size-display-lg: 30px;   /* 대형 헤딩 */

/* Heading */
--font-size-h1: 24px;           /* 섹션 헤딩 */
--font-size-h2: 20px;           /* 서브 헤딩 */
--font-size-h3: 18px;           /* 카드 타이틀 */

/* Body */
--font-size-body:    16px;      /* 본문 기본 */
--font-size-body-sm: 14px;      /* 보조 텍스트·출처·시간 */
--font-size-caption: 12px;      /* 가격 기준 고지·라벨 */
```

### 2-3. Font Weight

```css
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-bold:     700;
```

### 2-4. Line Height

```css
--line-height-tight:   1.2;   /* 헤딩·숫자 */
--line-height-normal:  1.5;   /* 본문 */
--line-height-relaxed: 1.7;   /* 일지 본문 등 긴 텍스트 */
```

### 2-5. 숫자 표기 규칙

```css
/* 평가금액·수익률·잔고 등 모든 금융 숫자에 적용 */
font-variant-numeric: tabular-nums;
letter-spacing: -0.3px;   /* 숫자 밀집도 개선 */
```

---

## 3. Spacing Tokens (8pt grid)

```css
--space-1:  4px;    /* 보조 (4pt) — 아이콘 내부, 뱃지 패딩 */
--space-2:  8px;    /* 기본 최소 간격 */
--space-3:  12px;   /* 컴포넌트 내부 보조 */
--space-4:  16px;   /* 화면 좌우 패딩, 카드 내부 패딩 */
--space-5:  20px;   /* — */
--space-6:  24px;   /* 섹션 간 여백 */
--space-8:  32px;   /* 대형 섹션 간격 */
--space-10: 40px;   /* — */
--space-12: 48px;   /* 하단 네비게이션 높이 기준 */
--space-16: 64px;   /* 페이지 상단 여백 */
```

**여백 사용 원칙:**
```
화면 좌우 패딩:     16px (--space-4)
컴포넌트 내부:      16px (--space-4)
리스트 아이템 간격: 8px  (--space-2)
섹션 간 여백:       24px (--space-6)
카드 간 여백:       12px (--space-3)
```

---

## 4. Border Radius Tokens

```css
--radius-xs:   4px;      /* 인풋 내 소형 요소, 뱃지 */
--radius-sm:   8px;      /* 버튼, 인풋, 소형 카드 */
--radius-md:   12px;     /* 카드, 바텀시트 */
--radius-lg:   16px;     /* 대형 카드, 모달 */
--radius-xl:   24px;     /* 앱 아이콘, 프로필 이미지 */
--radius-full: 9999px;   /* 뱃지 필, 아바타 */
```

---

## 5. Shadow / Elevation Tokens

```css
/* MVP는 라이트모드 전용 — 그림자 최소화 (토스 스타일) */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);    /* 카드 기본 */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);   /* 바텀시트, 드롭다운 */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.10);   /* 모달 */
```

---

## 6. Components — Tier 1 (MVP 필수)

### 6-1. Button

```
Primary Button
  배경: --color-primary-500 (#1D9E75)
  텍스트: #FFFFFF
  높이: 52px
  반경: --radius-sm (8px)
  폰트: 16px Bold
  터치 피드백: scale(0.97) 200ms + Ripple

Secondary Button
  배경: --color-bg-secondary
  테두리: 1px solid --color-border-default
  텍스트: --color-text-primary
  높이: 52px
  반경: --radius-sm

Accent Button (프리미엄 CTA)
  배경: --color-accent-400 (#EF9F27)
  텍스트: --color-accent-800 (#633806)
  높이: 52px

Destructive Button (탈퇴·삭제)
  배경: 투명
  텍스트: --color-error (#E53935)
  테두리: 1px solid --color-error

Disabled 상태 (공통)
  배경: --color-gray-200
  텍스트: --color-gray-400
  opacity: 0.6
```

### 6-2. Input

```
Default
  높이: 52px
  테두리: 1px solid --color-border-default
  반경: --radius-sm (8px)
  패딩: 0 16px
  폰트: 16px Regular

Focused
  테두리: 1.5px solid --color-primary-500
  배경: #FFFFFF

Error
  테두리: 1.5px solid --color-error
  하단 에러 메시지: 12px --color-error

Disabled
  배경: --color-gray-100
  텍스트: --color-gray-400
```

### 6-3. Card

```
Default Card
  배경: #FFFFFF
  테두리: 1px solid --color-border-default
  반경: --radius-md (12px)
  패딩: 16px

Elevated Card (포트폴리오 요약 등)
  배경: #FFFFFF
  그림자: --shadow-sm
  반경: --radius-md

Interactive Card (탭 가능)
  + 터치 피드백: scale(0.98) 150ms
  + hover: 배경 --color-gray-50
```

### 6-4. List Item

```
높이: 52px (기본) / 64px (서브텍스트 있을 때)
좌우 패딩: 16px
구분선: 1px solid --color-border-default (하단)
  → 마지막 아이템 구분선 없음

구성:
  [선행 아이콘 24px] [텍스트 영역 flex-1] [후행 요소 or 화살표]

텍스트 영역:
  타이틀: 16px Regular --color-text-primary
  서브텍스트: 14px Regular --color-text-secondary

Apple 설정앱 스타일 — 우측 상태값 미리보기:
  상태값: 14px Regular --color-text-secondary
  화살표: Tabler ti-chevron-right 16px --color-gray-400
```

### 6-5. Bottom Navigation

```
높이: 56px + Safe Area (하단 홈 인디케이터 영역)
배경: #FFFFFF
상단 구분선: 1px solid --color-border-default
탭 수: 5개

탭 아이템:
  아이콘: 24px
  라벨: 10px Regular (활성) / 10px Regular --color-gray-400 (비활성)
  활성 색상: --color-primary-500
  비활성 색상: --color-gray-400

탭 라벨 (페르소나 모드 무관, 고정):
  홈 / 뉴스 / 커뮤니티 / 일지 / 마이
```

### 6-6. App Bar

```
높이: 56px
배경: #FFFFFF
하단 구분선: 1px solid --color-border-default
좌우 패딩: 16px

구성:
  좌측: 뒤로가기 버튼 or 로고
  중앙: 타이틀 (18px Medium --color-text-primary)
  우측: 액션 버튼 (선택)
```

### 6-7. Badge

```
수익 배지
  배경: #FEE2E2 (연한 빨강)
  텍스트: --color-profit (#E53935)
  패딩: 2px 8px
  반경: --radius-full

손실 배지
  배경: #DBEAFE (연한 파랑)
  텍스트: --color-loss (#1565C0)

프리미엄 배지
  배경: --color-accent-50 (#FAEEDA)
  텍스트: --color-accent-800 (#633806)

등급 배지 (대표님·사령관)
  배경: --color-primary-50
  텍스트: --color-primary-800
```

### 6-8. Toast

```
배경: --color-gray-900 (#1E1E1C)
텍스트: #FFFFFF (16px Regular)
반경: --radius-sm (8px)
패딩: 14px 16px
위치: 화면 하단 중앙, Bottom Nav 위 16px
지속시간: 2초 후 자동 사라짐
애니메이션: slide-up 200ms + fade-out 200ms
```

---

## 7. Components — Tier 2 (MVP 내 추가)

### 7-1. Bottom Sheet

```
배경: #FFFFFF
상단 반경: --radius-lg (16px)
상단 핸들: 4x36px 라운드, --color-gray-300
그림자: --shadow-lg
패딩: 24px 16px

용도:
  - 일지 작성 유형 선택 (6종)
  - 투자 계명 체크
  - 종목 상세 모달
```

### 7-2. Skeleton Loading

```
배경: --color-gray-200
애니메이션: shimmer (좌→우 반짝임) 1.5s infinite
반경: 요소에 맞게 동일 적용

카드 스켈레톤:
  타이틀 바: 60% 너비, 16px 높이
  서브텍스트 바: 40% 너비, 12px 높이
  간격: 8px

종목 리스트 스켈레톤:
  좌측 원형: 40x40px
  우측 바 2개: 너비 50%·30%, 높이 14px·12px
```

### 7-3. Empty State

```
구조 (토스 스타일 — 아이콘 + 텍스트):
  [Tabler 아이콘 48px — --color-primary-500]
  [타이틀 16px Bold --color-text-primary]
  [설명 14px Regular --color-text-secondary]
  [CTA 버튼 — Secondary or Primary]

정렬: 수직 중앙
간격: 아이콘↔타이틀 12px, 타이틀↔설명 8px, 설명↔버튼 24px

화면별 아이콘:
  포트폴리오 빈 화면:  ti-chart-bar
  뉴스 빈 화면:       ti-news
  일지 빈 화면:       ti-notebook
  검색 결과 없음:     ti-search-off
```

### 7-4. Tab (수평 필터 탭)

```
높이: 40px
패딩: 0 16px
하단 인디케이터: 2px solid --color-primary-500

활성 탭:
  텍스트: 14px Medium --color-primary-500
  인디케이터 표시

비활성 탭:
  텍스트: 14px Regular --color-text-secondary
  인디케이터 없음

가로 스크롤: overflow-x: auto (항목 많을 때)
```

---

## 8. Components — Tier 3 (v1.x 이후)

```
Chart (수익 그래프)
  라이브러리: recharts (웹) / Victory Native (앱)
  수익 라인: --color-profit (#E53935)
  손실 라인: --color-loss (#1565C0)
  기준선: --color-gray-300 점선
  배경: 투명

Date Picker
  Material Design 3 네이티브 컴포넌트 커스터마이징
  선택 날짜: --color-primary-500

FAB (일지 작성)
  배경: --color-primary-500
  아이콘: ti-plus 24px #FFFFFF
  크기: 56x56px
  반경: --radius-full
  위치: 우하단, Bottom Nav 위 16px
  그림자: --shadow-md
```

---

## 9. 측정 이벤트 표준

> PostHog 기준. 모든 화면 진입 시 `screen_view` 이벤트 발화.
> 상세 이벤트 목록은 PRD_MASTER § 5 참조.

```
네이밍 규칙: [화면명]_[동작]
예) portfolio_view, news_click, journal_create

공통 파라미터 (모든 이벤트):
  persona_mode: 'ceo' | 'commander'
  account_tier: 'free' | 'premium'
  app_version: string

※ 1단계: persona-text.js (Vanilla JS)
  2단계: persona-text.ts (TypeScript, React 전환 시)
```

---

## 10. Claude 디자인 첫 프롬프트

> 이 섹션을 Claude Artifacts 새 대화에 그대로 붙여넣으면 첫 화면 디자인을 뽑을 수 있다.

```
리치빌드(RichBuild) 투자 관리 앱의 포트폴리오 홈 화면 디자인을 만들어줘.
안드로이드 모바일 360x800 기준.

== 브랜드 컨셉 ==
"내 투자의 모든 기록이 쌓이는 곳 — 스마트 개인투자자의 투자 아카이브"
슬로건: 기록이 자산이 되다
톤 키워드: Archival, Focused, Growth, Calm, Witty

레퍼런스: 토스증권의 정보 밀도 + 로빈후드의 요약 카드 강조
(화려함보다 신뢰감, 데이터 중심, 여백 충분)

== 색상 토큰 ==
Primary:   #1D9E75 (틸 — CTA, 액티브)
Secondary: #085041 (딥틸 — 헤더, 강조)
Accent:    #EF9F27 (골드 — 배지, 프리미엄)
수익:      #E53935 (빨강)
손실:      #1565C0 (파랑)
배경:      #F8F8F6
카드:      #FFFFFF
주요텍스트: #1E1E1C
보조텍스트: #5A5A56
구분선:    #E2E2DE

== 타이포그래피 ==
폰트: Noto Sans KR
Display XL: 36px Bold (총 평가금액)
H1: 24px Bold / H2: 20px Medium / H3: 18px Medium
Body: 16px Regular / Body SM: 14px Regular / Caption: 12px Regular
숫자: font-variant-numeric: tabular-nums

== Spacing & Radius ==
8pt grid: 8 / 16 / 24 / 32 / 48 / 64px
Radius: 8px(버튼·인풋) / 12px(카드) / 16px(모달) / 9999px(뱃지)

== 만들 화면 ==
포트폴리오 홈 탭 — 사용자가 앱을 열었을 때 가장 먼저 보는 화면

핵심 요소:
1. 요약 카드 (상단)
   - 조직명 + 호칭 (대표님 모드: "강남 에셋 대표님의 포트폴리오")
   - 총 평가금액 36px Bold (₩ 28,473,200)
   - 수익률 +12.8% 빨강 표시
   - 원화/달러 토글 버튼
   - 카드 탭 시 수익 그래프 펼치기 (기본 접힘)
   - 하단 가격 기준 고지 Caption 회색

2. 시장 지표 위젯 (접기/펼치기)
   - 코스피·나스닥·S&P500·VIX·USD/KRW·BTC 세로 리스트
   - 등락 빨강(양수)/파랑(음수)

3. 계좌별 종목 리스트
   - 계좌 탭 (키움·토스·NH)
   - 종목 카드: 종목명 + 수익률 배지 + 평가금액

4. Y&R 탭 (실제 포트폴리오 탭과 전환)
   - 총 Y&R 자산 + 수익률
   - 골드 배지

상태 4종:
- 로딩: 스켈레톤
- 빈 화면: ti-chart-bar 아이콘 + "첫 자산을 편입해볼까요?" + CTA
- 에러: 안내 + 재시도 버튼
- 정상: 위 레이아웃 그대로

상호작용:
- 요약 카드 탭 → 그래프 펼치기/접기
- 시장 위젯 접기/펼치기 토글
- 종목 탭 → 종목 상세 모달

제약:
- Material Design 3 베이스, 위 토큰으로 커스터마이징
- 마이크로 인터랙션은 CTA 버튼에만
- 라이트모드만 (다크모드 없음)
- 페르소나 텍스트는 persona-text.ts 상수 사용 표시

원하는 산출물:
- React + Tailwind 기반 단일 파일
- 4가지 상태를 토글로 전환 가능하게
- 디자인 의도 주석 포함
```

---

## 11. 다음 단계

```
[완료] bx_richbuild.md + designsystem_richbuild.md
[다음] prompts_richbuild_design.md — 화면별 Claude 디자인 프롬프트
[이후] prompts_richbuild_skeleton.md 외 Claude Code 개발 프롬프트 4종
```
