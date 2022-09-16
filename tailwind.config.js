const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      letterSpacing: {
        sm: '-0.4px',
        md: '-0.8px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.settingsInput': {
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gridGap: '1px',
          maxWidth: '824px',
          width: '100%',
          paddingBlock: '1.5rem',
          '@media (min-width: 640px)': {
            paddingBottom: '2rem',
          },
        },
      });
    }),
  ],
};
