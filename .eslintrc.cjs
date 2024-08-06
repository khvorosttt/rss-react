module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
        'next',
        'next/core-web-vitals',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    plugins: ['react', 'react-compiler', 'prettier', 'import', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'react-compiler/react-compiler': 'error',
        'prettier/prettier': 'error',
    },
};
