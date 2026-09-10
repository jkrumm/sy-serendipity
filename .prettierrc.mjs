/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
