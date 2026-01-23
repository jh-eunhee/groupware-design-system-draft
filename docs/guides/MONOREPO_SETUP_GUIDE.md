# 🚀 Turborepo + pnpm + tsup 모노레포 설정 완료

## ✅ 설정 완료 현황

본 프로젝트는 **Turborepo + pnpm + tsup** 기반의 최신 모노레포 구조로 성공적으로 전환되었습니다.

---

## 📁 프로젝트 구조

```
react-vite-test/
├── apps/
│   └── web/                          # React Vite 애플리케이션
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── packages/
│   ├── design-system/                # 📦 핵심: UI 컴포넌트 라이브러리
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx       # CVA 기반 Button
│   │   │   │   ├── Badge.tsx        # CVA 기반 Badge
│   │   │   │   ├── Card.tsx         # CVA 기반 Card
│   │   │   │   └── ...
│   │   │   ├── utils/
│   │   │   │   └── cn.ts            # clsx + tailwind-merge 유틸
│   │   │   └── index.ts             # 공개 API
│   │   ├── dist/                    # tsup 빌드 결과물
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   │
│   ├── tsconfig/                     # 공유 TypeScript 설정
│   │   ├── base.json                # 기본 설정
│   │   ├── react.json               # React용 설정
│   │   ├── node.json                # Node.js용 설정
│   │   └── package.json
│   │
│   └── eslint-config/               # 공유 ESLint 설정
│       ├── index.js
│       └── package.json
│
├── turbo.json                        # Turborepo 파이프라인 설정
├── pnpm-workspace.yaml              # pnpm 워크스페이스 정의
├── package.json                     # 루트 package.json
└── .gitignore
```

---

## 🛠 핵심 구성요소

### 1️⃣ **Design System 패키지** (`@repo/design-system`)

**역할**: 모든 UI 컴포넌트를 한곳에서 관리하고 배포

**특징**:
- ✅ **CVA (class-variance-authority)** 패턴 사용
- ✅ **Tailwind CSS** 기반 스타일링
- ✅ **tsup**으로 자동 번들링 (CJS, ESM, 타입 정의)
- ✅ **workspace 의존성**으로 모든 앱에서 사용 가능

**빌드 결과물** (`dist/` 폴더):
```
dist/
├── index.js         # CommonJS 포맷
├── index.mjs        # ES Module 포맷
├── index.d.ts       # TypeScript 타입 정의
├── index.cjs        # CJS 엔트리 포인트
└── *.map            # 소스맵
```

### 2️⃣ **Web App** (`apps/web`)

**역할**: 실제 동작하는 React + Vite 애플리케이션

**특징**:
- ✅ Design System을 `workspace:*`로 의존성 추가
- ✅ Storybook으로 컴포넌트 문서화
- ✅ Vite로 빠른 개발 환경 제공

### 3️⃣ **공유 설정 패키지들**

#### `@repo/tsconfig`
- React, Node.js용 TypeScript 설정
- 모든 패키지에서 `extends: "@repo/tsconfig/react.json"` 사용

#### `@repo/eslint-config`
- ESLint 규칙 중앙 관리
- 모든 프로젝트에서 일관된 코드 스타일 유지

---

## 📦 빌드 및 배포 워크플로우

### tsup이 자동으로 하는 일들

```bash
pnpm build:design-system
```

실행 시 tsup이:
1. ✅ TypeScript 컴파일
2. ✅ CommonJS (CJS) 형식 생성 → `dist/index.js`
3. ✅ ES Module (ESM) 형식 생성 → `dist/index.mjs`
4. ✅ TypeScript 타입 정의 생성 → `dist/index.d.ts`
5. ✅ 소스맵 생성 → `dist/*.map`

### Turbo 캐싱

```bash
turbo run build
```

Turbo는:
- 🚀 각 패키지의 빌드 결과를 캐시
- 🚀 변경된 패키지만 빌드
- 🚀 병렬 처리로 속도 최적화

---

## 🚀 주요 명령어

### 개발 환경

```bash
# 모든 앱 개발 모드 실행 (병렬)
pnpm dev

# Web 앱만 개발
pnpm dev:web

# Design System 감시 모드 (코드 변경 시 자동 재빌드)
cd packages/design-system && pnpm dev
```

### 빌드

```bash
# 모든 패키지 빌드
pnpm build

# Design System만 빌드
pnpm build:design-system

# Web 앱 프로덕션 빌드
cd apps/web && pnpm build
```

### 코드 품질

```bash
# 전체 워크스페이스 린트
pnpm lint

# 특정 패키지 린트
turbo run lint --filter=web-app
```

### 정리

```bash
# 모든 dist 폴더 및 node_modules 삭제
pnpm clean
```

---

## 💻 Design System 사용 방법

### 1️⃣ Web 앱에서 컴포넌트 임포트

```typescript
// apps/web/src/App.tsx
import { Button, Badge, Card, CardBody, CardHeader } from '@repo/design-system'

export function App() {
  return (
    <div className="p-8">
      <Card variant="elevated">
        <CardHeader>
          <h1>My Component</h1>
        </CardHeader>
        <CardBody>
          <Button variant="default" size="lg">
            Click me
          </Button>
          <Badge variant="success">Active</Badge>
        </CardBody>
      </Card>
    </div>
  )
}
```

### 2️⃣ 새로운 컴포넌트 추가

Design System에 새 컴포넌트를 추가하는 방법:

**Step 1**: 컴포넌트 파일 생성

```typescript
// packages/design-system/src/components/Input.tsx
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, ...props }, ref) => (
    <input
      className={cn(inputVariants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
)

Input.displayName = 'Input'
```

**Step 2**: index.ts에 내보내기

```typescript
// packages/design-system/src/index.ts
export type { InputProps } from './components/Input'
export { Input } from './components/Input'
```

**Step 3**: 빌드 및 사용

```bash
cd packages/design-system && pnpm build
# 또는
pnpm build:design-system
```

그러면 자동으로 모든 형식으로 번들링되어 web 앱에서 사용 가능!

---

## 🔄 워크스페이스 의존성 해석

### `workspace:*` vs 일반 버전

```json
// packages/design-system/package.json
{
  "dependencies": {
    "@repo/tsconfig": "workspace:*",  // ← 모노레포 내부 의존성
    "class-variance-authority": "^0.7.1"  // ← 외부 npm 패키지
  }
}
```

**`workspace:*` 의미**:
- 🔗 같은 모노레포 내의 다른 패키지를 참조
- 📦 자동으로 로컬 경로로 해석됨
- 🚀 설치 시간 단축 + 개발 속도 향상

---

## 📋 다음 단계

### 1. 기존 컴포넌트 마이그레이션

현재 `src/components/`의 기존 컴포넌트들을 `packages/design-system/src/components/`로 이동:

```bash
# 기존 컴포넌트 복사 (예시)
cp src/components/Tag.tsx packages/design-system/src/components/
cp src/components/DataCard.tsx packages/design-system/src/components/
cp src/components/StatusBadge.tsx packages/design-system/src/components/
cp src/components/WeatherCard.tsx packages/design-system/src/components/
cp src/components/Heatmap.tsx packages/design-system/src/components/
```

그 후 `packages/design-system/src/index.ts`에 추가:

```typescript
export { Tag } from './components/Tag'
export { DataCard } from './components/DataCard'
export { StatusBadge } from './components/StatusBadge'
export { WeatherCard } from './components/WeatherCard'
export { Heatmap } from './components/Heatmap'
```

### 2. NPM 배포 (선택사항)

Design System을 npm에 배포하려면:

```bash
# .npmrc 설정 (GitHub Packages 예시)
npm config set @repo:registry=https://npm.pkg.github.com

# 배포
cd packages/design-system && npm publish
```

### 3. 여러 앱 추가

`apps/` 폴더에 새로운 앱 추가 (admin, dashboard 등):

```bash
mkdir -p apps/admin
# vite 프로젝트 생성 또는 기존 프로젝트 복사
```

그러면 Turbo가 자동으로 인식하고 관리!

### 4. Storybook 설정

Design System 컴포넌트를 Storybook에서 문서화:

```bash
cd packages/design-system
pnpm add -D @storybook/react @storybook/react-vite
```

---

## ✨ 모노레포의 주요 이점

| 이점 | 설명 |
|------|------|
| 🎯 **코드 재사용** | 모든 앱에서 동일한 컴포넌트 라이브러리 사용 |
| 📚 **DRY 원칙** | 설정(tsconfig, eslint) 중앙 관리 |
| ⚡ **빠른 개발** | 로컬 의존성으로 npm 레지스트리 호출 없음 |
| 🔄 **버전 관리** | workspace 프로토콜로 버전 충돌 방지 |
| 🚀 **배포** | Design System을 독립적으로 npm 배포 가능 |
| 🔍 **타입 안정성** | TypeScript 타입 정의 자동 생성 |

---

## 🐛 트러블슈팅

### 문제 1: `Cannot find module '@repo/design-system'`

**해결책**:
```bash
# 의존성 재설치
pnpm install

# Design System 빌드
pnpm build:design-system
```

### 문제 2: TypeScript 에러

**해결책**:
```bash
# TypeScript 재컴파일
pnpm build

# 캐시 삭제 후 재시도
pnpm clean && pnpm install && pnpm build
```

### 문제 3: Turbo 캐시 문제

**해결책**:
```bash
# Turbo 캐시 삭제
turbo prune --docker

# 또는 직접 빌드 (캐시 무시)
turbo run build --no-cache
```

---

## 📚 참고 자료

- 🔗 [Turborepo 공식 문서](https://turbo.build)
- 🔗 [pnpm 워크스페이스](https://pnpm.io/workspaces)
- 🔗 [tsup 문서](https://tsup.egoist.dev/)
- 🔗 [CVA 패턴](https://cva.style)
- 🔗 [class-variance-authority](https://github.com/joe-bell/cva)

---

**설정 완료 일시**: 2026년 1월 20일  
**상태**: ✅ 완전히 구성 및 작동 가능  
**다음 작업**: 기존 컴포넌트 마이그레이션
