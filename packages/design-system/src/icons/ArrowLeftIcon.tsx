import React from 'react'

/**
 * Arrow Left Icon (화살표 좌)
 * Figma 노드: 1:1063, 1:1039, 1:1015, 1:1131
 */
export const ArrowLeftIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ width = 20, height = 20, ...props }, ref) => (
  <svg
    ref={ref}
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <image
      href="https://www.figma.com/api/mcp/asset/c209f64b-ec15-411e-9b42-236087c997f4"
      width={width}
      height={height}
    />
  </svg>
))

ArrowLeftIcon.displayName = 'ArrowLeftIcon'

export default ArrowLeftIcon
