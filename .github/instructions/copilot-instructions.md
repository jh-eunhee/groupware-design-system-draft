# Copilot Instructions for React Vite TypeScript Project

## 📋 프로젝트 개요

이 프로젝트는 **Figma 디자인 시스템**을 기반으로 구축된 React + Vite + TypeScript 프로젝트입니다.
모든 컴포넌트는 **CVA(class-variance-authority)** 패턴을 사용해 Tailwind CSS와 함께 관리됩니다.

---

## 🎨 컴포넌트 개발 규칙

### 1. CVA 패턴 사용 의무

모든 UI 컴포넌트는 **class-variance-authority(CVA)** 패턴으로 구현해야 합니다.

#### 🔧 CVA 패턴 구조

```typescript
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * 컴포넌트명 스타일 정의 (CVA)
 * Figma 디자인 시스템: 노드 ID [NODE_ID]
 */
const componentName = cva("기본 클래스들 (베이스 스타일)", {
  variants: {
    // Variant 1: 색상/상태 등
    color: {
      primary: ["클래스1", "클래스2", "클래스3"],
      secondary: ["클래스1", "클래스2"],
      // ...
    },
    // Variant 2: 크기
    size: {
      sm: ["클래스1", "클래스2"],
      md: ["클래스1", "클래스2"],
      lg: ["클래스1", "클래스2"],
    },
    // Variant 3: 상태/비활성화
    disabled: {
      false: ["hover:bg-color"],
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  compoundVariants: [
    // 여러 variant 조합시에만 적용되는 스타일
    {
      color: "primary",
      size: "lg",
      class: "font-bold uppercase",
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    disabled: false,
  },
});

// Props 타입 정의
export interface ComponentNameProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "disabled">,
    VariantProps<typeof componentName> {
  // 추가 커스텀 props
  label?: string;
}

// 컴포넌트 구현
export const ComponentName: React.FC<ComponentNameProps> = ({
  className,
  color,
  size,
  disabled,
  label,
  ...props
}) => (
  <div
    className={componentName({ color, size, disabled, className })}
    {...props}
  >
    {label}
  </div>
);

export default ComponentName;
```

#### 📝 CVA 사용 예시: Tag 컴포넌트

```typescript
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const tag = cva('inline-flex items-center justify-center rounded-full whitespace-nowrap font-medium transition-all duration-200 cursor-pointer', {
  variants: {
    color: {
      gray: ['bg-gray-100', 'text-gray-700', 'hover:bg-gray-200'],
      blue: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
      green: ['bg-green-100', 'text-green-700', 'hover:bg-green-200'],
    },
    size: {
      sm: ['px-2', 'py-1', 'text-xs', 'h-6'],
      md: ['px-3', 'py-1.5', 'text-sm', 'h-7'],
      lg: ['px-4', 'py-2', 'text-base', 'h-8'],
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
})

export interface TagProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'label'>,
    VariantProps<typeof tag> {
  label: string
}

export const Tag: React.FC<TagProps> = ({ label, color, size, className, ...props }) => (
  <button className={tag({ color, size, className })} type="button" {...props}>
    {label}
  </button>
)

export default Tag
```

---

### 2. CVA 패턴 장점

| 장점 | 설명 |
|------|------|
| **타입 안전성** | `VariantProps<typeof cva>`로 자동 타입 추론 |
| **가독성** | variant 정의가 명확하고 구조화됨 |
| **유지보수성** | 스타일과 로직이 분리되어 관리 용이 |
| **조합 유연성** | `compoundVariants`로 복잡한 스타일 조합 지원 |
| **재사용성** | 공통 스타일을 한곳에서 관리 |

---

### 3. Tailwind CSS 클래스 작성 규칙

#### ✅ 권장 사항

```typescript
// ✅ Good: 배열로 클래스 분리
primary: ['bg-blue-500', 'text-white', 'border-transparent', 'hover:bg-blue-600']

// ✅ Good: 한 줄씩 정렬
const styles = [
  'inline-flex',
  'items-center',
  'justify-center',
  'rounded-full',
  'font-medium',
]
```

#### ❌ 피해야 할 방법

```typescript
// ❌ Bad: 한 줄로 작성된 문자열
primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600'

// ❌ Bad: 동적 클래스 생성
color: `bg-${color}-500 text-${color}-700`
```

---

### 4. 컴포넌트 Props 정의 규칙

```typescript
// Props 인터페이스 작성 규칙
export interface ComponentProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof componentCva> {
  
  // ✅ JSDoc 주석 추가
  /** 설명 텍스트 */
  label?: string;
  
  // ✅ 필수/선택 명확히
  required: string;      // 필수
  optional?: string;     // 선택
}
```

---

### 5. Storybook Story 작성 규칙

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from '../components/ComponentName';

const meta = {
  title: '카테고리/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 컴포넌트 설명',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'variant 설명',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '크기',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// 각 variant별로 Story 작성
export const Primary: Story = {
  args: { color: 'primary', size: 'md' },
};

export const Secondary: Story = {
  args: { color: 'secondary', size: 'md' },
};

// 모든 variant 조합 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {/* 각 조합을 렌더링 */}
    </div>
  ),
};
```

---

### 6. 파일 구조

```
src/
├── components/
│   ├── Button.tsx           ← CVA 패턴 사용
│   ├── Tag.tsx              ← CVA 패턴 사용
│   └── index.ts             ← export 정의
├── stories/
│   ├── Button.stories.tsx   ← Storybook story
│   ├── Tag.stories.tsx      ← Storybook story
│   └── Overview.stories.tsx ← 전체 컴포넌트 보기
└── lib/
    └── utils.ts             ← 유틸리티 함수
```

---

### 7. TypeScript 설정 요구사항

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 📦 의존성

### 필수 라이브러리

```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "tailwindcss": "^4.1.18",
    "@tailwindcss/vite": "^4.1.18",
    "@storybook/react": "^10.1.11",
    "@storybook/react-vite": "^10.1.11"
  }
}
```

---

## 🚀 개발 시작

### 1. 새 컴포넌트 생성

```bash
# 컴포넌트 파일 생성
touch src/components/NewComponent.tsx

# 스토리 파일 생성
touch src/stories/NewComponent.stories.tsx

# 인덱스 export 추가
# src/components/index.ts에 다음 추가:
# export { default as NewComponent, type NewComponentProps } from './NewComponent'
```

### 2. CVA 패턴으로 구현

위의 "CVA 패턴 구조" 섹션을 참고하여 구현

### 3. Storybook에서 테스트

```bash
pnpm storybook
```

브라우저에서 http://localhost:6006 접속 후 컴포넌트 확인

---

## ✨ 모범 사례

### ✅ 권장되는 패턴

```typescript
// 1. 명확한 CVA 정의
const button = cva('기본 스타일', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
});

// 2. 타입 안전 Props
export interface ButtonProps extends VariantProps<typeof button> {
  children: React.ReactNode;
}

// 3. 깔끔한 컴포넌트 구현
export const Button: React.FC<ButtonProps> = ({ color, size, className, ...props }) => (
  <button className={button({ color, size, className })} {...props} />
);
```

### ❌ 피해야 할 패턴

```typescript
// ❌ 인라인 스타일 생성
const MyComponent = () => {
  const bgColor = isActive ? 'bg-blue-500' : 'bg-gray-500';
  return <div className={`${bgColor} p-4`} />;
};

// ❌ 조건부 클래스 (CVA로 대체)
const styles = `
  p-4 rounded
  ${isActive ? 'bg-blue-500' : 'bg-gray-500'}
  ${size === 'lg' ? 'text-lg' : 'text-sm'}
`;

// ❌ object 스타일 (Tailwind만 사용)
const style = { backgroundColor: 'blue', padding: '16px' };
```

---

## 🔗 참고 자료

- [class-variance-authority 문서](https://cva.style/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Storybook 문서](https://storybook.js.org/)
- [Figma 디자인 파일](https://www.figma.com/design/rRI5RbFDfeZV9X8wMdTcz9/)

---

## 📝 체크리스트

새로운 컴포넌트 생성 시 확인 사항:

- [ ] CVA 패턴으로 스타일 정의
- [ ] `VariantProps<typeof cva>`로 Props 확장
- [ ] JSDoc 주석 추가
- [ ] 기본값(`defaultVariants`) 설정
- [ ] Storybook Story 작성 (각 variant별)
- [ ] `src/components/index.ts` export 추가
- [ ] TypeScript 타입 체크 통과 (`tsc --noEmit`)
- [ ] Storybook에서 시각적 테스트 완료
