# 그룹웨어 디자인 시스템 (작업 및 테스트중)

그룹웨어 디자인 시스템은 회사의 모든 제품과 서비스에서 일관된 사용자 경험을 제공하기 위한 중앙집중식 디자인 시스템입니다. Figma 기반의 디자인 토큰과 React 컴포넌트 라이브러리로 구성되어 있습니다.

---

## 📋 목차

- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [빠른 시작](#빠른-시작)
- [개발 환경 설정](#개발-환경-설정)
- [참고 문서](#참고-문서)

---

## 🏗️ 프로젝트 구조

### 모노레포 아키텍처

이 프로젝트는 **Turborepo**를 기반으로 한 모노레포 구조를 채택하고 있습니다.  
이는 디자인 시스템을 향후 npm 라이브러리로 배포 가능하도록 구성하기 위해 설계되었습니다.

```
groupware-design-system/
├── packages/
│   ├── design-tokens/       # Figma 디자인 토큰 관리
│   ├── design-system/       # React 컴포넌트 라이브러리
│   ├── eslint-config/       # 공유 ESLint 설정
│   └── tsconfig/            # 공유 TypeScript 설정
├── apps/
│   └── web/                 # 스토리북 및 테스트 애플리케이션
└── docs/                    # 아키텍처 및 개발 가이드 문서
```

---

## ✨ 주요 기능

### 1. Figma 연계 디자인 토큰 관리
- Figma의 그룹웨어 디자인 시스템 파일에서 정의된 디자인 토큰을 자동으로 동기화합니다
- **Style Dictionary**를 사용하여 CSS 변수로 변환하여 제공합니다
- `packages/design-tokens` 서브모듈을 통해 관리됩니다

### 2. 컴포넌트 라이브러리
- CVA(Class-Variance-Authority) 패턴을 사용하여 일관성 있는 컴포넌트를 구현합니다
- Tailwind CSS를 기반으로 스타일링됩니다
- TypeScript로 완벽한 타입 안정성을 제공합니다
- `packages/design-system`에서 개발 및 관리됩니다

### 3. Storybook 통합
- 모든 컴포넌트의 시각적 테스트 및 문서화를 제공합니다
- 인터랙티브한 컴포넌트 프리뷰를 지원합니다
- 개발 팀 전체가 쉽게 접근할 수 있습니다

---

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.0 이상
- pnpm 8.0 이상

### 설치 및 실행

```shell
# 1. 의존성 설치
$ pnpm install

# 2. 디자인 시스템 빌드
$ pnpm build:design-system

# 3. Storybook 실행
$ pnpm storybook:design-system
```

Storybook은 `http://localhost:6006`에서 실행됩니다.

---

## 🛠️ 개발 환경 설정

### 전체 프로젝트 빌드
```shell
$ pnpm build
```

### 특정 패키지만 빌드
```shell
$ pnpm build --filter=@repo/design-system
```

### 개발 모드 실행
```shell
$ pnpm dev
```

---

## 📚 참고 문서

프로젝트 개발 및 운영에 필요한 상세 가이드는 다음 문서를 참고하십시오:

| 문서 | 설명 |
|------|------|
| [FSD 아키텍처](docs/FSD-아키텍처.md) | 프로젝트의 폴더 구조 및 아키텍처 가이드 |
| [FSD 구현 가이드](docs/FSD-구현-가이드.md) | Feature-Sliced Design 패턴 구현 방법 |
| [모노레포 개요](docs/guides/MONOREPO_OVERVIEW.md) | Turbo 레포 및 패키지 구조 설명 |
| [Storybook 설정 가이드](docs/guides/STORYBOOK_SETUP.md) | Storybook 환경 설정 및 운영 방법 |
| [Tailwind 테마 가이드](docs/guides/TAILWIND_THEME_GUIDE.md) | 디자인 토큰 및 Tailwind 테마 커스터마이징 |
| [컴포넌트 추출 보고서](docs/reports/COMPONENT_EXTRACTION_SUMMARY.md) | Figma에서 추출된 컴포넌트 목록 및 현황 |

---

## 💡 핵심 원칙

1. **Figma 중심 설계**: 모든 디자인 결정은 Figma 디자인 시스템에서 출발합니다
2. **일관성**: 전사 전체에서 동일한 UI/UX 경험을 제공합니다
3. **재사용성**: 컴포넌트는 최대한 범용적으로 설계되어 여러 프로젝트에서 재사용 가능합니다
4. **유지보수성**: 명확한 구조와 문서화를 통해 장기적 유지보수를 용이하게 합니다

---

## ❓ 문의 및 기여

디자인 시스템 개선 사항이나 문의 사항이 있으시면 담당 팀에 연락주시기 바랍니다.