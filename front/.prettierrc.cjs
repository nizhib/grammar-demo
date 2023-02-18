/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  printWidth: 100,
  useTabs: false,
  semi: true,
  singleQuote: true,

  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^flowbite', '^[./]', '<TYPES>'],
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
