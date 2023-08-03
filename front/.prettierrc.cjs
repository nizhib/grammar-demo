/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @type {(PrettierConfig | TailwindConfig)} */
const config = {
  printWidth: 100,
  useTabs: false,
  semi: true,
  singleQuote: true,

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // MUST come last
  ],

  importOrder: [
    '^solid-js',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^./lib/',
    '',
    '^./ui/',
    '',
    '^[./]',
    '',
    '<TYPES>',
  ],

  tailwindConfig: './tailwind.config.cjs',
};

module.exports = config;
