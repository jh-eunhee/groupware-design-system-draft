# 📚 문서 구조

이 폴더에는 프로젝트 관련 모든 문서가 정리되어 있습니다.

## 📁 폴더 구조

### `/guides` - 설정 및 사용 가이드

- **MONOREPO_OVERVIEW.md** - 모노레포 구조 개요
- **MONOREPO_SETUP_GUIDE.md** - Turborepo + pnpm + tsup 상세 설정 가이드
- **MONOREPO_SETUP_CHECKLIST.md** - 설정 완료 체크리스트 및 다음 단계
- **STORYBOOK_SETUP.md** - Storybook 설정 및 사용 방법
- **TAILWIND_SETUP.md** - Tailwind CSS 구현 가이드

### `/reports` - 분석 및 추출 리포트

- **FIGMA_EXTRACTION_OVERVIEW.md** - Figma 추출 요약
- **EXTRACTION_SUMMARY.md** - 컴포넌트 추출 상세 리포트
- **FIGMA_EXTRACTION_FINAL_REPORT.md** - Figma 최종 보고서
- **FIGMA_DASHBOARD_EXTRACTION.md** - 대시보드 추출 데이터
- **FIGMA_COMPONENTS_INTEGRATION_REPORT.md** - 컴포넌트 통합 리포트
- **COMPONENT_EXTRACTION_SUMMARY.md** - 추출된 컴포넌트 요약
- **TAILWIND_IMPLEMENTATION_REPORT.md** - Tailwind 구현 리포트

### `/setup` - 초기 설정 문서 (예약)

프로젝트 초기화 및 환경 설정 관련 문서

## 🚀 시작하기

### 1. 모노레포 이해하기
→ [MONOREPO_OVERVIEW.md](./guides/MONOREPO_OVERVIEW.md)

### 2. 설정 확인하기
→ [MONOREPO_SETUP_CHECKLIST.md](./guides/MONOREPO_SETUP_CHECKLIST.md)

### 3. Design System 개발
→ [STORYBOOK_SETUP.md](./guides/STORYBOOK_SETUP.md)

### 4. 스타일링
→ [TAILWIND_SETUP.md](./guides/TAILWIND_SETUP.md)

## 📋 빠른 참고

```bash
# 개발 시작
pnpm dev

# Design System 빌드
pnpm build:design-system

# 전체 빌드
pnpm build

# Storybook 실행
pnpm storybook
```

## 📞 추가 정보

- Figma 설계 리포트: [docs/reports/](./reports/)
- 프로젝트 루트: [../../README.md](../../README.md)
