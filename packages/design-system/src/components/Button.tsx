import React, { CSSProperties } from 'react'

/**
 * Button 컴포넌트
 * Figma 디자인 시스템: 노드 ID 1:1013
 * 
 * 구조:
 * - Container (outer button): 크기, 배경색, 테두리, 상태 관리
 * - Content (flex container): 아이콘 + 텍스트 배치
 * - Text (span): 텍스트 스타일 (typography)
 * - Icons (optional): 좌우 아이콘
 */

// Typography 스타일 (Figma heading-05: 16px, SemiBold, -0.5px letter-spacing)
const typographyStyles: CSSProperties = {
  fontSize: 'var(--heading-05-fontsize, 16px)',
  fontWeight: 'var(--heading-05-fontweight, 600)',
  lineHeight: 'var(--heading-05-lineheight, 140%)',
  letterSpacing: 'var(--heading-05-letterspacing, -0.5px)',
  fontFamily: '"Pretendard", sans-serif',
}

// 크기별 스타일
const sizeStyles = {
  xsm: {
    height: 'var(--button-xsm-height, 29px)',
    paddingX: 'var(--button-xsm-padding-x, 10px)',
    paddingY: 'var(--button-xsm-padding-y, 4px)',
  },
  sm: {
    height: 'var(--button-sm-height, 36px)',
    paddingX: 'var(--button-sm-padding-x, 12px)',
    paddingY: 'var(--button-sm-padding-y, 6px)',
  },
  md: {
    height: 'var(--button-md-height, 48px)',
    paddingX: 'var(--button-md-padding-x, 12px)',
    paddingY: 'var(--button-md-padding-y, 8px)',
  },
  lg: {
    height: 'var(--button-lg-height, 56px)',
    paddingX: 'var(--button-lg-padding-x, 16px)',
    paddingY: 'var(--button-lg-padding-y, 12px)',
  },
}

// 타입별 배경색 (Default 상태)
const typeBackgroundColors = {
  primary: 'var(--color-button-primary, #1ba74e)',
  secondary: 'var(--color-button-secondary, #2e3236)',
  tertiary: 'var(--color-button-tertiary, #e9edf0)',
}

// 타입별 텍스트색 (Default 상태)
const typeTextColors = {
  primary: 'var(--color-text-primary-inverse, #fdfdfd)',
  secondary: 'var(--color-text-primary-inverse, #fdfdfd)',
  tertiary: 'var(--color-text-secondary, #4a4f55)',
}

// Outline 타입 - 배경색과 테두리색
const outlineBackgroundColor = 'var(--color-button-white, #fdfdfd)'
const outlineBorderColors = {
  primary: 'var(--color-border-identity, #1ba74e)',
  secondary: 'var(--color-border-secondary, #2e3236)',
  tertiary: 'var(--color-border-tertiary, #e9edf0)',
}

export type ButtonType = 'primary' | 'secondary' | 'tertiary'
export type ButtonVariant = 'solid' | 'outline'
export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 버튼 타입 */
  buttonType?: ButtonType
  /** 버튼 스타일 */
  variant?: ButtonVariant
  /** 버튼 크기 */
  size?: ButtonSize
  /** 버튼 텍스트 */
  children: React.ReactNode
  /** 좌측 아이콘 */
  leftIcon?: React.ReactNode
  /** 우측 아이콘 */
  rightIcon?: React.ReactNode
  /** 비활성화 상태 */
  disabled?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = 'primary',
      variant = 'solid',
      size = 'md',
      children,
      leftIcon,
      rightIcon,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeStyles[size]
    const backgroundColor =
      variant === 'solid'
        ? typeBackgroundColors[buttonType]
        : outlineBackgroundColor
    const textColor = typeTextColors[buttonType]
    const borderColor =
      variant === 'outline' ? outlineBorderColors[buttonType] : 'transparent'

    const containerStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      height: sizeStyle.height,
      paddingLeft: sizeStyle.paddingX,
      paddingRight: sizeStyle.paddingX,
      paddingTop: sizeStyle.paddingY,
      paddingBottom: sizeStyle.paddingY,
      backgroundColor,
      border: variant === 'outline' ? `1px solid ${borderColor}` : 'none',
      borderRadius: 'var(--button-border-radius, 6px)',
      boxSizing: 'border-box' as const,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease-in-out',
      ...style,
    }

    const textStyle: CSSProperties = {
      ...typographyStyles,
      color: textColor,
      whiteSpace: 'nowrap',
    }

    const iconStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      flexShrink: 0,
    }

    return (
      <button
        ref={ref}
        style={containerStyle}
        disabled={disabled}
        {...props}
      >
        {leftIcon && <div style={iconStyle}>{leftIcon}</div>}
        <span style={textStyle}>{children}</span>
        {rightIcon && <div style={iconStyle}>{rightIcon}</div>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
