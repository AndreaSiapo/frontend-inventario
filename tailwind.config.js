// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          softer:  colors.blue[100],
          subtle:  colors.blue[200],
          default: colors.blue[600],
          strong:  colors.blue[900],
        },
        neutral: {
          primary:   colors.gray[900],
          secondary: colors.gray[600],
          secondary: {
            medium: colors.gray[100],
          },
          tertiary: colors.gray[400],
          disabled: colors.gray[300],
          divider:  colors.gray[200],
          background: colors.gray[50],
        },
        fg: {
          brand: {
            strong: '#1E40AF',
          },
        },
        success: {
          50: colors.green[50],
          100: colors.green[100],
          500: colors.green[500],
          700: colors.green[700],
          default: colors.green[600],
        },
        warning: {
          50: colors.yellow[50],
          100: colors.yellow[100],
          500: colors.yellow[500],
          700: colors.yellow[700],
          default: colors.yellow[500],
        },
        danger: {
          50: colors.red[50],
          100: colors.red[100],
          500: colors.red[500],
          700: colors.red[700],
          default: colors.red[600],
        },
        info: {
          50: colors.blue[50],
          100: colors.blue[100],
          500: colors.blue[500],
          700: colors.blue[700],
          default: colors.blue[600],
        },
        border: {
          default: colors.gray[200],
          subtle: colors.gray[100],
          strong: colors.gray[300],

          brand: {
            subtle: colors.indigo[200],
            default: colors.indigo[600],
          },
        },
      },
      borderRadius: {
        base: '0.5rem',
      },
      fontSize: {
        body: ['0.875rem', { lineHeight: '1.25rem' }],
      },
      screens: {
        xs: '480px', // Define 'xs' para pantallas de 480px o más
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      ringWidth: ['hover', 'active'],},
  },
  variants: {
    scrollbar: ['rounded', 'dark'],
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/container-queries'),
      require('tailwindcss-bg-patterns'),
      require('tailwind-scrollbar')({ nocompatible: true }),
      // plugin(require("tailwind-scrollbar")({ nocompatible: true })) // Probado antes pero no funciona,
  ],
};
