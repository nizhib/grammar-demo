/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const flowbite = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
      },
    },
    fontFamily: {
      body: ['Inter', ...fontFamily.sans],
      sans: ['Inter', ...fontFamily.sans],
    },
  },
  plugins: [flowbite],
};

module.exports = config;
