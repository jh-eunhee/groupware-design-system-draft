import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Tag 컴포넌트 스타일 정의 (CVA)
 * Figma 디자인 시스템: 노드 ID 175:4325
 */
const tag = cva('inline-flex items-center justify-center rounded-full whitespace-nowrap font-medium transition-all duration-200 cursor-pointer', {
  variants: {
    color: {
      gray: ['bg-gray-100', 'text-gray-700', 'hover:bg-gray-200'],
      blue: ['bg-blue-500', 'text-white', 'hover:bg-blue-600'],
      'light-blue': ['bg-cyan-100', 'text-cyan-700', 'hover:bg-cyan-200'],
      red: ['bg-red-100', 'text-red-700', 'hover:bg-red-200'],
      orange: ['bg-orange-100', 'text-orange-700', 'hover:bg-orange-200'],
      yellow: ['bg-yellow-100', 'text-yellow-700', 'hover:bg-yellow-200'],
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
  /** 태그에 표시할 텍스트 */
  label: string
}

/**
 * Tag 컴포넌트
 * Figma 디자인 시스템을 기반으로 다양한 색상과 크기를 지원합니다.
 * 상태나 카테고리를 시각적으로 표현합니다.
 * 
 * @example
 * // 기본 파란색 태그
 * <Tag label="온도" color="blue" size="md" />
 * 
 * // 초록색 태그
 * <Tag label="정상" color="green" />
 * 
 * // 작은 회색 태그
 * <Tag label="라벨" color="gray" size="sm" />
 */
export const Tag: React.FC<TagProps> = ({
  label,
  color,
  size,
  className,
  ...props
}) => {
  return (
    <button
      className={tag({ color, size, className })}
      role="status"
      aria-label={label}
      data-color={color}
      type="button"
      {...props}
    >
      {label}
    </button>
  )
}

export default Tag
