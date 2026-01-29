import React from 'react'
import { cn } from '../utils/cn'

/**
 * Badge component with CVA pattern
 * Figma Design System: 그룹웨어 Badge
 * https://www.figma.com/design/OP6zTrlLC8m6DEJ6t5VSKK?node-id=81-1292
 * 
 * Pixel-Perfect Sizes (±1px accuracy):
 * - sm: height 24px, padding 0 10px, text-xs
 * - md: height 28px, padding 0 10px, text-sm
 * - lg: height 30px, padding 0 12px, text-base
 */

// Background colors using CSS variables
const backgroundColors: Record<string, string> = {
  gray: 'var(--Color-Background-color-background-tertiary)',
  green: 'var(--Color-Support-color-support-success-subtle)',
  blue: 'var(--Color-Support-color-support-info-subtle)',
  red: 'var(--Color-Support-color-support-error-subtle)',
  yellow: 'var(--Color-Support-color-support-yellow)',
  black: 'var(--Color-Button-color-button-secondary)',
}

// Text colors using CSS variables
const textColors: Record<string, string> = {
  gray: 'var(--Color-Text-color-text-tertiary)',
  green: 'var(--Color-Text-color-text-identity)',
  blue: 'var(--Color-Support-color-support-info)',
  red: 'var(--Color-Support-color-support-error)',
  yellow: 'var(--Color-Support-color-support-brown)',
  black: 'var(--Color-Text-color-text-primary-inverse)',
}

// CSS 변수 기반 Typography 스타일 (Figma 디자인 토큰)
const typographyStyles: Record<string, React.CSSProperties> = {
  sm: {
    fontSize: 'var(--caption-01-fontsize, 12px)',
    fontWeight: 'var(--caption-01-fontweight, 600)',
    lineHeight: 'var(--caption-01-lineheight, 140%)',
    letterSpacing: 'var(--caption-01-letterspacing, -0.5px)',
  },
  md: {
    fontSize: 'var(--body-02-fontsize, 14px)',
    fontWeight: 'var(--body-02-fontweight, 600)',
    lineHeight: 'var(--body-02-lineheight, 140%)',
    letterSpacing: 'var(--body-02-letterspacing, -0.5px)',
  },
  lg: {
    fontSize: 'var(--heading-05-fontsize, 16px)',
    fontWeight: 'var(--heading-05-fontweight, 600)',
    lineHeight: 'var(--heading-05-lineheight, 140%)',
    letterSpacing: 'var(--heading-05-letterspacing, -0.5px)',
  },
}

// CSS 변수 기반 Size 스타일 (Figma 디자인 토큰)
const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { 
    height: 'var(--badge-sm-height, 24px)',
    paddingLeft: 'var(--badge-sm-padding-x, 10px)',
    paddingRight: 'var(--badge-sm-padding-x, 10px)',
    paddingTop: 'var(--badge-padding-y, 4px)',
    paddingBottom: 'var(--badge-padding-y, 4px)',
    borderRadius: 'var(--badge-border-radius, 4px)'
  },
  md: { 
    height: 'var(--badge-md-height, 28px)',
    paddingLeft: 'var(--badge-md-padding-x, 10px)',
    paddingRight: 'var(--badge-md-padding-x, 10px)',
    paddingTop: 'var(--badge-padding-y, 4px)',
    paddingBottom: 'var(--badge-padding-y, 4px)',
    borderRadius: 'var(--badge-border-radius, 4px)'
  },
  lg: { 
    height: 'var(--badge-lg-height, 30px)',
    paddingLeft: 'var(--badge-lg-padding-x, 12px)',
    paddingRight: 'var(--badge-lg-padding-x, 12px)',
    paddingTop: 'var(--badge-padding-y, 4px)',
    paddingBottom: 'var(--badge-padding-y, 4px)',
    borderRadius: 'var(--badge-border-radius, 4px)'
  },
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The color variant of the badge
   * @default "gray"
   */
  color?: 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'black'
  /**
   * The size of the badge
   * @default "sm"
   */
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, color = 'gray', size = 'sm', style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColors[color],
        boxSizing: 'border-box',
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      <span
        style={{
          color: textColors[color],
          ...typographyStyles[size],
        }}
      >
        {props.children}
      </span>
    </div>
    
  )
)

Badge.displayName = 'Badge'
