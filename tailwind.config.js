/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== GROUPWARE SEMANTIC COLORS (Primary) - from CSS Variables =====
        // Text colors
        'text': {
          'primary': 'var(--Color-Text-color-text-primary)',
          'secondary': 'var(--Color-Text-color-text-secondary)',
          'tertiary': 'var(--Color-Text-color-text-tertiary)',
          'quaternary': 'var(--Color-Text-color-text-quaternary)',
          'primary-inverse': 'var(--Color-Text-color-text-primary-inverse)',
          'identity': 'var(--Color-Text-color-text-identity)',
          'identity-strong': 'var(--Color-Text-color-text-identity-strong)',
        },
        // Background colors
        'bg': {
          'primary': 'var(--Color-Background-color-background-primary)',
          'secondary': 'var(--Color-Background-color-background-secondary)',
          'tertiary': 'var(--Color-Background-color-background-tertiary)',
          'identity': 'var(--Color-Background-color-background-identity)',
          'identity-subtle': 'var(--Color-Background-color-background-identity-subtle)',
        },
        // Border colors
        'border': {
          'primary': 'var(--Color-Border-color-border-primary)',
          'secondary': 'var(--Color-Border-color-border-secondary)',
          'tertiary': 'var(--Color-Border-color-border-tertiary)',
          'identity': 'var(--Color-Border-color-border-identity)',
        },
        // Button colors
        'button': {
          'primary': 'var(--Color-Border-color-border-identity)',
          'primary-hover': 'var(--Color-Button-color-button-primary-hover)',
          'secondary': 'var(--Color-Button-color-button-secondary)',
          'secondary-hover': 'var(--Color-Button-color-button-secondary-hover)',
          'tertiary': 'var(--Color-Button-color-button-tertiary)',
          'tertiary-hover': 'var(--Color-Button-color-button-tertiary-hover)',
          'white': 'var(--Color-Button-color-button-white)',
          'white-hover': 'var(--Color-Button-color-button-white-hover)',
        },
        // Support/Status colors
        'support': {
          'success': 'var(--Color-Support-color-support-success)',
          'success-subtle': 'var(--Color-Support-color-support-success-subtle)',
          'error': 'var(--Color-Support-color-support-error)',
          'error-subtle': 'var(--Color-Support-color-support-error-subtle)',
          'info': 'var(--Color-Support-color-support-info)',
          'info-subtle': 'var(--Color-Support-color-support-info-subtle)',
          'brown': 'var(--Color-Support-color-support-brown)',
          'yellow': 'var(--Color-Support-color-support-yellow)',
        },

        // ===== BADGE COLORS (Component-specific) =====
        'badge-gray-bg': 'var(--Color-Background-color-background-tertiary)',
        'badge-gray-text': 'var(--Color-Text-color-text-tertiary)',
        'badge-green-bg': 'var(--Color-Support-color-support-success-subtle)',
        'badge-green-text': 'var(--Color-Text-color-text-identity)',
        'badge-blue-bg': 'var(--Color-Support-color-support-info-subtle)',
        'badge-blue-text': 'var(--Color-Support-color-support-info)',
        'badge-red-bg': 'var(--Color-Support-color-support-error-subtle)',
        'badge-red-text': 'var(--Color-Support-color-support-error)',
        'badge-yellow-bg': 'var(--Color-Support-color-support-yellow)',
        'badge-yellow-text': 'var(--Color-Support-color-support-brown)',
        'badge-black-bg': 'var(--Color-Button-color-button-secondary)',
        'badge-black-text': 'var(--Color-Text-color-text-primary-inverse)',

        // ===== PRIMITIVE COLORS (Light Mode) - from CSS Variables =====
        // Gray palette (12 levels)
        'gray': {
          '0': 'var(--light-gray-0)',
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
        },
        // Primary palette (green - 11 levels)
        'primary': {
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
        // Secondary palette (blue - 11 levels)
        'secondary': {
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

        // ===== ALPHA COLORS (Transparency) =====
        'alpha': {
          'white-100': 'var(--light-alpha-white100)',
          'white-80': 'var(--light-alpha-white80)',
          'white-60': 'var(--light-alpha-white60)',
          'white-40': 'var(--light-alpha-white40)',
          'white-20': 'var(--light-alpha-white20)',
          'white-10': 'var(--light-alpha-white10)',
          'white-5': 'var(--light-alpha-white5)',
          'white-0': 'var(--light-alpha-white0)',
          'black-100': 'var(--light-alpha-black100)',
          'black-80': 'var(--light-alpha-black80)',
          'black-60': 'var(--light-alpha-black60)',
          'black-40': 'var(--light-alpha-black40)',
          'black-20': 'var(--light-alpha-black20)',
          'black-10': 'var(--light-alpha-black10)',
          'black-5': 'var(--light-alpha-black5)',
          'black-0': 'var(--light-alpha-black0)',
        },

        // ===== BACKWARD COMPATIBILITY ALIASES =====
        'light-gray': {
          '0': 'var(--light-gray-0)',
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
        },
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

        // ===== SEMANTIC SHORTCUTS =====
        'status-success': 'var(--Color-Support-color-support-success)',
        'status-error': 'var(--Color-Support-color-support-error)',
        'status-info': 'var(--Color-Support-color-support-info)',
        
        'text-primary': 'var(--Color-Text-color-text-primary)',
        'text-secondary': 'var(--Color-Text-color-text-secondary)',
        'text-disabled': 'var(--Color-Text-color-text-quaternary)',
        'bg-primary': 'var(--Color-Background-color-background-primary)',
        'bg-secondary': 'var(--Color-Background-color-background-secondary)',
        'border-default': 'var(--Color-Border-color-border-tertiary)',
        'link-default': 'var(--Color-Border-color-border-identity)',
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

        // Typography tokens from Figma Design System
        // Heading
        'heading-00': [
          'var(--heading-00-fontsize, 24px)',
          {
            fontWeight: 'var(--heading-00-fontweight, 700)',
            lineHeight: 'var(--heading-00-lineheight, 140%)',
            letterSpacing: 'var(--heading-00-letterspacing, -0.5px)',
          }
        ],
        'heading-01': [
          'var(--heading-01-fontsize, 20px)',
          {
            fontWeight: 'var(--heading-01-fontweight, 600)',
            lineHeight: 'var(--heading-01-lineheight, 140%)',
            letterSpacing: 'var(--heading-01-letterspacing, -0.5px)',
          }
        ],
        'heading-02': [
          'var(--heading-02-fontsize, 18px)',
          {
            fontWeight: 'var(--heading-02-fontweight, 700)',
            lineHeight: 'var(--heading-02-lineheight, 140%)',
            letterSpacing: 'var(--heading-02-letterspacing, -0.5px)',
          }
        ],
        'heading-03': [
          'var(--heading-03-fontsize, 18px)',
          {
            fontWeight: 'var(--heading-03-fontweight, 600)',
            lineHeight: 'var(--heading-03-lineheight, 140%)',
            letterSpacing: 'var(--heading-03-letterspacing, -0.5px)',
          }
        ],
        'heading-04': [
          'var(--heading-04-fontsize, 16px)',
          {
            fontWeight: 'var(--heading-04-fontweight, 700)',
            lineHeight: 'var(--heading-04-lineheight, 140%)',
            letterSpacing: 'var(--heading-04-letterspacing, -0.5px)',
          }
        ],
        'heading-05': [
          'var(--heading-05-fontsize, 16px)',
          {
            fontWeight: 'var(--heading-05-fontweight, 600)',
            lineHeight: 'var(--heading-05-lineheight, 140%)',
            letterSpacing: 'var(--heading-05-letterspacing, -0.5px)',
          }
        ],

        // Body
        'body-01': [
          'var(--body-01-fontsize, 14px)',
          {
            fontWeight: 'var(--body-01-fontweight, 700)',
            lineHeight: 'var(--body-01-lineheight, 140%)',
          }
        ],
        'body-02': [
          'var(--body-02-fontsize, 14px)',
          {
            fontWeight: 'var(--body-02-fontweight, 600)',
            lineHeight: 'var(--body-02-lineheight, 140%)',
          }
        ],
        'body-03': [
          'var(--body-03-fontsize, 14px)',
          {
            fontWeight: 'var(--body-03-fontweight, 500)',
            lineHeight: 'var(--body-03-lineheight, 140%)',
          }
        ],
        'body-04': [
          'var(--body-04-fontsize, 14px)',
          {
            fontWeight: 'var(--body-04-fontweight, 400)',
            lineHeight: 'var(--body-04-lineheight, 140%)',
          }
        ],

        // Caption
        'caption-01': [
          'var(--caption-01-fontsize, 12px)',
          {
            fontWeight: 'var(--caption-01-fontweight, 600)',
            lineHeight: 'var(--caption-01-lineheight, 140%)',
          }
        ],
        'caption-02': [
          'var(--caption-02-fontsize, 12px)',
          {
            fontWeight: 'var(--caption-02-fontweight, 500)',
            lineHeight: 'var(--caption-02-lineheight, 140%)',
          }
        ],
        'caption-03': [
          'var(--caption-03-fontsize, 12px)',
          {
            fontWeight: 'var(--caption-03-fontweight, 400)',
            lineHeight: 'var(--caption-03-lineheight, 140%)',
          }
        ],
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
