const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, './index.html'),
    path.resolve(__dirname, './src/**/*.{vue,js,ts,jsx,tsx,css}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        desktop: '1024px',
      },
      width: {
        page: '1440px',
        central: '800px',
        dialog: '400px',
      },
      minWidth: {
        page: '1440px',
        central: '800px',
        dialog: '400px',
      },
      maxWidth: {
        page: '1440px',
        central: '800px',
        dialog: '400px',
      },
      colors: {},
    },
  },
  plugins: [],
};
