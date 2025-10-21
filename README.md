# Next.js 스타포스 시뮬레이터 프로젝트

이 프로젝트는 **Next.js 15**를 기반으로 생성된 메이플스토리 스타포스 시뮬레이터 애플리케이션입니다.  
사용자는 실제 스타포스 시스템과 동일한 확률로 장비 강화를 시뮬레이션할 수 있으며,  
많은 시도 횟수에 최적화된 빠른 시뮬레이션, 강화 히스토리 조회, 통계 분석 및 시각화 기능을 통해  
효율적인 강화 전략을 수립할 수 있습니다.

---

## 🛠 사용된 기술 스택

- **Next.js**: 15.4.6 - React 기반 풀스택 프레임워크
- **React**: 19.1.0 - UI 라이브러리
- **TypeScript**: ^5 - 정적 타입을 지원하는 JavaScript
- **React Query**: ^5.89.0 - 서버 상태 관리 및 데이터 패칭 라이브러리
- **Jotai**: ^2.13.1 - 원자적 상태 관리 라이브러리
- **Recharts**: ^3.1.2 - React 기반 차트 라이브러리
- **Tailwind CSS**: ^4 - 유틸리티 기반 CSS 프레임워크
- **Cypress**: ^15.5.0 - E2E(End-to-End) 테스트 도구

---

## ✨ 주요 기능

1. **스타포스 강화 시뮬레이터** - 실제 게임과 동일한 확률로 장비 강화를 시뮬레이션할 수 있습니다.
2. **강화 시뮬레이션** - 많은 시도 횟수에 최적화된 빠른 대량 시뮬레이션을 지원합니다.
3. **강화 히스토리** - API를 통해 과거 강화 기록을 조회하고 분석할 수 있습니다.
4. **통계 분석** - 강화 성공률, 평균 비용, 예상 소요 메소 등 다양한 통계를 제공합니다.
5. **데이터 시각화** - Recharts를 활용한 직관적인 차트로 강화 데이터를 시각화합니다.
6. **반응형 디자인** - 모바일과 데스크톱 환경에서 모두 최적화된 UI를 제공합니다.

---

## 🚀 설치 및 실행 방법

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd nextjs-starforce-simulator
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```
애플리케이션은 http://localhost:3000 에서 확인할 수 있습니다.

### 4. E2E 테스트 실행 (Cypress)

GUI 실행
```bash
npm run cypress:open
```

CLI 실행
```bash
npm run cypress:run
```

---

## 📁 디렉토리 구조

```
nextjs-starforce-simulator/
├── cypress/                          # Cypress 테스트 관련 파일
│   ├── e2e/                          # E2E 테스트 파일
│   │   ├── history.cy.ts             # 히스토리 페이지 테스트
│   │   ├── navigation.cy.ts          # 네비게이션 테스트
│   │   ├── simulator.cy.ts           # 시뮬레이터 페이지 테스트
│   │   └── validation.cy.ts          # 유효성 검증 테스트
│   └── support/                      # 공통 설정 및 커스텀 명령어
│       ├── commands.ts               # Cypress 커스텀 명령어
│       └── e2e.ts                    # Cypress 설정 파일
├── src/                              # 소스 코드
│   ├── app/                          # Next.js App Router 페이지
│   │   ├── api/                      # API 라우트
│   │   │   └── history/              # 히스토리 API
│   │   │       └── route.ts          # 히스토리 API 엔드포인트
│   │   ├── history/                  # 히스토리 페이지
│   │   │   └── page.tsx              # 히스토리 페이지
│   │   ├── layout.tsx                # 전역 레이아웃
│   │   ├── page.tsx                  # 메인 페이지 (시뮬레이터)
│   │   ├── globals.css               # 전역 CSS
│   │   └── favicon.ico               # 파비콘
│   ├── components/                   # UI 컴포넌트
│   │   ├── common/                   # 공통 컴포넌트
│   │   │   ├── Header.tsx            # 헤더 컴포넌트
│   │   │   └── TabHeader.tsx         # 탭 헤더 컴포넌트
│   │   ├── enhance/                  # 강화 관련 컴포넌트
│   │   │   ├── EnhanceBenefit.tsx    # 강화 혜택 컴포넌트
│   │   │   ├── EnhanceChance.tsx     # 강화 확률 컴포넌트
│   │   │   ├── EnhanceControl.tsx    # 강화 제어 컴포넌트
│   │   │   ├── EnhanceCost.tsx       # 강화 비용 컴포넌트
│   │   │   ├── EnhanceEvent.tsx      # 강화 이벤트 컴포넌트
│   │   │   ├── EnhanceItem.tsx       # 강화 아이템 컴포넌트
│   │   │   └── EnhanceStarLevel.tsx  # 강화 성급 컴포넌트
│   │   ├── history/                  # 히스토리 관련 컴포넌트
│   │   │   ├── HistoryControl.tsx    # 히스토리 제어 컴포넌트
│   │   │   └── HistoryTable.tsx      # 히스토리 테이블 컴포넌트
│   │   ├── simulation/               # 시뮬레이션 관련 컴포넌트
│   │   │   ├── SimulationChart.tsx   # 시뮬레이션 차트 컴포넌트
│   │   │   ├── SimulationControl.tsx # 시뮬레이션 제어 컴포넌트
│   │   │   ├── SimulationSetting.tsx # 시뮬레이션 설정 컴포넌트
│   │   │   ├── SimulationStats.tsx   # 시뮬레이션 통계 컴포넌트
│   │   │   └── SimulationTable.tsx   # 시뮬레이션 테이블 컴포넌트
│   │   ├── providers/                # 프로바이더 컴포넌트
│   │   │   └── QueryProvider.tsx     # React Query 프로바이더
│   │   ├── EnhanceSimulator.tsx      # 강화 시뮬레이터 메인 컴포넌트
│   │   └── StarforceHistory.tsx      # 스타포스 히스토리 메인 컴포넌트
│   ├── constants/                    # 상수 정의
│   │   └── starData.ts               # 스타포스 데이터 상수
│   ├── hooks/                        # 커스텀 훅
│   │   ├── useCost.ts                # 비용 계산 훅
│   │   ├── useEnhance.ts             # 강화 로직 훅
│   │   ├── useEvent.ts               # 이벤트 관련 훅
│   │   └── useHistory.ts             # 히스토리 관련 훅
│   ├── store/                        # 상태 관리
│   │   └── atoms.ts                  # Jotai atoms 정의
│   └── types/                        # TypeScript 타입 정의
│       ├── benefit.ts                # 혜택 관련 타입
│       ├── chart.ts                  # 차트 관련 타입
│       ├── enhance.ts                # 강화 관련 타입
│       ├── event.ts                  # 이벤트 관련 타입
│       ├── history.ts                # 히스토리 관련 타입
│       ├── starData.ts               # 스타포스 데이터 타입
│       ├── stats.ts                  # 통계 관련 타입
│       └── index.ts                  # 타입 export
├── public/                           # 정적 파일
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── cypress.config.ts                 # Cypress 설정 파일
├── next.config.ts                    # Next.js 설정 파일
├── tsconfig.json                     # TypeScript 설정 파일
├── eslint.config.mjs                 # ESLint 설정 파일
├── postcss.config.mjs                # PostCSS 설정 파일
├── package.json                      # 프로젝트 설정 파일
├── package-lock.json                 # 의존성 잠금 파일
└── README.md                         # 프로젝트 설명 파일
```

---

## 🎯 주요 특징

### 실제 게임과 동일한 확률 시스템
- 메이플스토리의 실제 스타포스 강화 확률을 정확히 구현
- 찬스 타임, 파괴 방지, 올스탯 등 다양한 시스템 적용

### 효율적인 상태 관리
- Jotai를 통한 원자적 상태 관리로 불필요한 리렌더링 최소화
- React Query를 통한 서버 상태 관리 및 캐싱

### 대량 시뮬레이션 최적화
- 수천~수만 번의 시뮬레이션을 빠르게 수행
- Web Worker를 활용한 비동기 처리 (필요시)

### 데이터 시각화
- Recharts를 활용한 직관적인 차트
- 강화 성공률, 비용 분포, 누적 확률 등 다양한 통계 시각화

---

## 🧪 테스트

프로젝트는 Cypress를 통한 E2E 테스트를 포함하고 있습니다:

- **시뮬레이터 테스트**: 강화 시뮬레이션 기능 확인
- **히스토리 테스트**: 강화 기록 조회 기능 확인
- **네비게이션 테스트**: 페이지 간 이동 확인
- **유효성 검증 테스트**: 입력 값 검증 확인

---

감사합니다 :)
