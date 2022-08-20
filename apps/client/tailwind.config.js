const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, './index.html'),
    path.resolve(__dirname, './src/**/*.{vue,js,ts,jsx,tsx,css}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
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
      colors: {
        primary: {
          black: '#1d1d1d',
          blue: {
            DEFAULT: '#00aeff',
            light: '#adebff',
            dark: '#0085ff',
          },
          gray: {
            DEFAULT: '#525c63',
            light: '#c0c0c0',
            dark: '#222222',
          },
          green: {
            DEFAULT: '#00c896',
            light: '#c8fcea',
            dark: '#518071',
          },
          red: {
            DEFAULT: '#d47e6c',
            light: '#ffe5da',
            dark: '#bd6c7d',
          },
          white: '#f2ecff',
        },
      },
    },
  },
  plugins: [],
};
