# 모노레포 설정 가이드 - Turborepo + pnpm + tsup

지침 파일을 먼저 확인하고 현재 프로젝트 상태를 분석하겠습니다.

## 프로젝트 구조

```
react-vite-test/
├── apps/
│   └── web/                        # React Vite 애플리케이션
├── packages/
│   ├── design-system/              # UI 컴포넌트 라이브러리
│   ├── tsconfig/                   # 공유 TypeScript 설정
│   └── eslint-config/              # 공유 ESLint 설정
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 주요 커맨드

- `pnpm build:design-system` - Design System 빌드
- `pnpm build` - 모든 패키지 빌드
- `pnpm dev` - 개발 모드

더 자세한 내용은 [docs/guides/MONOREPO_SETUP_GUIDE.md](./MONOREPO_SETUP_GUIDE.md)를 참고하세요.
