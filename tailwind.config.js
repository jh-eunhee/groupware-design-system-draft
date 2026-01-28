/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS Variables from design tokens
        'text': {
          'primary': 'var(--color-text-primary)',
          'secondary': 'var(--color-text-secondary)',
          'tertiary': 'var(--color-text-tertiary)',
          'quaternary': 'var(--color-text-quaternary)',
          'primary-inverse': 'var(--color-text-primary-inverse)',
          'identity': 'var(--color-text-identity)',
          'identity-strong': 'var(--color-text-identity-strong)',
        },
        'bg': {
          'primary': 'var(--color-background-primary)',
          'secondary': 'var(--color-background-secondary)',
          'tertiary': 'var(--color-background-tertiary)',
          'identity': 'var(--color-background-identity)',
          'identity-subtle': 'var(--color-background-identity-subtle)',
        },
        'border': {
          'primary': 'var(--color-border-primary)',
          'secondary': 'var(--color-border-secondary)',
          'tertiary': 'var(--color-border-tertiary)',
          'identity': 'var(--color-border-identity)',
        },
        'button': {
          'primary': 'var(--color-button-primary)',
          'primary-hover': 'var(--color-button-primary-hover)',
          'secondary': 'var(--color-button-secondary)',
          'secondary-hover': 'var(--color-button-secondary-hover)',
          'tertiary': 'var(--color-button-tertiary)',
          'tertiary-hover': 'var(--color-button-tertiary-hover)',
          'white': 'var(--color-button-white)',
          'white-hover': 'var(--color-button-white-hover)',
        },
        'support': {
          'success': 'var(--color-support-success)',
          'success-subtle': 'var(--color-support-success-subtle)',
          'error': 'var(--color-support-error)',
          'error-subtle': 'var(--color-support-error-subtle)',
          'info': 'var(--color-support-info)',
          'info-subtle': 'var(--color-support-info-subtle)',
          'brown': 'var(--color-support-brown)',
          'yellow': 'var(--color-support-yellow)',
        },
        // Light gray palette
        'light-gray': {
          '5': 'var(--light-gray-5)',
          '10': 'var(--light-gray-10)',
          '20': 'var(--light-gray-20)',
          '30': 'var(--light-gray-30)',
          '40': 'var(--light-gray-40)',
          '50': 'var(--light-gray-50)',
          '60': 'var(--light-gray-60)',
          '70': 'var(--light-gray-70)',
          '80': 'var(--light-gray-80)',
          '90': 'var(--light-gray-90)',
          '95': 'var(--light-gray-95)',
          '0': 'var(--light-gray-0)',
        },
        // Light primary palette
        'light-primary': {
          '5': 'var(--light-primary-5)',
          '10': 'var(--light-primary-10)',
          '20': 'var(--light-primary-20)',
          '30': 'var(--light-primary-30)',
          '40': 'var(--light-primary-40)',
          '50': 'var(--light-primary-50)',
          '60': 'var(--light-primary-60)',
          '70': 'var(--light-primary-70)',
          '80': 'var(--light-primary-80)',
          '90': 'var(--light-primary-90)',
          '95': 'var(--light-primary-95)',
        },
        // Light secondary palette
        'light-secondary': {
          '5': 'var(--light-secondary-5)',
          '10': 'var(--light-secondary-10)',
          '20': 'var(--light-secondary-20)',
          '30': 'var(--light-secondary-30)',
          '40': 'var(--light-secondary-40)',
          '50': 'var(--light-secondary-50)',
          '60': 'var(--light-secondary-60)',
          '70': 'var(--light-secondary-70)',
          '80': 'var(--light-secondary-80)',
          '90': 'var(--light-secondary-90)',
          '95': 'var(--light-secondary-95)',
        },
        // ===== PRIMITIVE COLORS (Legacy) =====
        // Primary color palette (11 levels - from light to dark)
        'primary': {
          '5': '#f2f9ff',
          '10': '#e5f3ff',
          '20': '#d9edff',
          '30': '#bbdeff',
          '40': '#95ccff',
          '50': '#67b6ff',
          '60': '#2a98ff',
          '70': '#007bee',      // main primary color
          '80': '#0056b7',
          '90': '#004594',      // primary-dark
          '95': '#00336d',
          '100': '#00234c'
        },
        // Gray color palette (13 levels)
        'gray': {
          '0': '#ffffff',
          '5': '#f4f5f6',
          '10': '#e0e5ea',
          '20': '#ced5db',
          '30': '#aeb9c2',
          '40': '#8a949e',
          '50': '#6d7882',
          '60': '#58616a',
          '70': '#464c53',
          '80': '#33363d',
          '90': '#1e2124',
          '95': '#131416',      // text-primary
          '100': '#000000'
        },
        // Secondary/Cyan color palette (11 levels)
        'secondary': {
          '5': '#f1fbfd',
          '10': '#e0f7fa',
          '20': '#c8f0f6',
          '30': '#aae8f1',
          '40': '#84deea',      // chart-secondary
          '50': '#58d3e3',
          '60': '#26c6da',
          '70': '#15a6b8',
          '80': '#088696',
          '90': '#006774',
          '95': '#004952',
          '100': '#07272c'
        },
        // Success color palette (6 levels)
        'success': {
          '5': '#edfff0',
          '10': '#c5ffcf',
          '20': '#9dffaf',
          '30': '#74ff8e',
          '40': '#52f06f',
          '50': '#28cf47'       // status-success
        },
        // Danger/Error color palette (6 levels)
        'danger': {
          '5': '#feeae5',
          '10': '#ffbdbb',
          '20': '#ff8f8c',
          '30': '#ff625c',
          '40': '#f0312b',
          '50': '#ce1f19'       // status-error
        },
        // Warning/Caution color palette (6 levels)
        'warning': {
          '5': '#fffae5',
          '10': '#fef4cb',
          '20': '#fde598',
          '30': '#fbd265',
          '40': '#f7be3e',
          '50': '#f4ab1e'
        },
        // ===== MODE COLORS (Component-level) =====
        // Text colors
        'text-primary': '#131416',    // gray.95
        'text-secondary': '#464c53',  // gray.70
        'text-unselected': '#6d7882', // gray.50
        'text-disabled': '#aeb9c2',   // gray.30
        'text-action': '#007bee',     // primary.70
        'text-white': '#ffffff',      // gray.0
        
        // Background colors
        'bg-primary': '#ffffff',           // gray.0
        'bg-secondary': '#f4f5f6',         // gray.5
        'bg-tertiary': '#e0e5ea',         // gray.10
        'bg-gray-subtle': '#e0e5ea',      // gray.10
        'bg-gray-subtlest': '#f4f5f6',    // gray.5
        
        // Border colors
        'border-default': '#ced5db',   // gray.20
        'border-focused': '#8a949e',   // gray.40
        'border-error': '#f0312b',     // danger.40
        'border-disabled': '#e0e5ea',  // gray.10
        
        // Link colors
        'link-default': '#007bee',     // primary.70
        'link-disabled': '#aeb9c2',    // gray.30
        
        // Icon colors
        'icon-50': '#58616a',          // gray.60
        'icon-30': '#aeb9c2',          // gray.30
        'icon-0': '#ffffff',           // gray.0
        
        // Input colors
        'input-surface-default': '#ffffffcc',  // alpha.white80
        'input-surface-disabled': '#0000000d', // alpha.black5
        
        // Shadow colors
        'shadow-1': '#00336d14',   // 20% opacity
        'shadow-2': '#00336d1f',   // 30% opacity
        'shadow-3': '#00336d33',   // 50% opacity
        
        // Surface colors
        'surface-80': '#ffffffcc', // alpha.white80
        
        // Button element colors
        'button-element-default': '#007bee1a',      // primary + 10% opacity
        'button-element-light-default': '#26c6da1a', // secondary + 10% opacity
        
        // ===== SEMANTIC COLORS =====
        // Status indicators
        'status-success': '#28cf47',
        'status-warning': '#f39c12',
        'status-error': '#b11e24',
        'status-info': '#007bee',
        
        // Chart colors
        'chart-primary': '#007bee',
        'chart-secondary': '#84deea',
        'chart-accent1': '#f39c12',
        'chart-accent2': '#e74c3c',
        'chart-neutral': '#95a5a6',
        
        // Pressure heatmap colors (8 levels)
        'pressure-critical-low': '#223e92',   // coldest
        'pressure-high-low': '#364b95',
        'pressure-medium-low': '#565d87',
        'pressure-neutral-zone': '#2bb469',
        'pressure-neutral-white': '#ffffff',
        'pressure-medium-high': '#8a5561',
        'pressure-high': '#984558',
        'pressure-critical-high': '#b11e24',  // hottest
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['28px', { lineHeight: '36px' }],
        '4xl': ['32px', { lineHeight: '40px' }],
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
        'spoqa': ['Spoqa Han Sans Neo', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      gap: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      borderRadius: {
        'none': '0',
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
