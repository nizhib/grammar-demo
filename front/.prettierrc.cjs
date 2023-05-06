/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  useTabs: false,
  semi: true,
  singleQuote: true,

  importOrder: ['^solid-js', '<THIRD_PARTY_MODULES>', '^./lib/', '^./ui/', '^[./]', '<TYPES>'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderMergeDuplicateImports: true,

  tailwindConfig: './tailwind.config.cjs',

  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'), // 'require.' fixes pnpm
    require('prettier-plugin-tailwindcss'), // MUST come last
  ],
  pluginSearchDirs: false,
};

module.exports = config;
