import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Square corners everywhere: every radius token resolves to 0.
    borderRadius: {
      none: '0px',
      sm: '0px',
      DEFAULT: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '0px',
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        // Night blue: backgrounds, panels, borders, muted text.
        night: {
          50: '#EAF1FB',
          100: '#D3E1F5',
          200: '#B0C8EA',
          300: '#8CA9D1',
          400: '#6A88B5',
          500: '#3E5C8C',
          600: '#25406B',
          700: '#173057',
          800: '#0F2244',
          900: '#0A1832',
          950: '#060F22',
        },
        // Light blue: accents, buttons, highlights.
        ice: {
          50: '#F2F9FF',
          100: '#DDEFFF',
          200: '#BDE0FF',
          300: '#97CDFF',
          400: '#72B8FA',
          500: '#4C9DEB',
          600: '#2F80D1',
        },
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
