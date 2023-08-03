/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const isProduction = process.env.NODE_ENV === 'production';

/** @type {{plugins?: import('postcss').AcceptedPlugin[]}} */
const config = {
  plugins: [tailwindcss, autoprefixer, ...(isProduction ? [cssnano] : [])],
};

module.exports = config;
