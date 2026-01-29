import React from 'react'

/**
 * Arrow Right Icon (화살표 우)
 * Figma 노드: 1:1065, 1:1041, 1:1017, 1:1133
 */
export const ArrowRightIcon = React.forwardRef<
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
      href="https://www.figma.com/api/mcp/asset/d96d286e-1afe-4792-a8e5-c0c5875e9864"
      width={width}
      height={height}
    />
  </svg>
))

ArrowRightIcon.displayName = 'ArrowRightIcon'

export default ArrowRightIcon
