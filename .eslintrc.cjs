module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'airbnb-typescript',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
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
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
    },
    plugins: ['react', 'react-compiler', 'prettier', 'import', '@typescript-eslint'],
    rules: {
        'no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'react-compiler/react-compiler': 'error',
        'prettier/prettier': 'error',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
};
