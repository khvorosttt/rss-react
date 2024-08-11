/// <reference types="vitest" />
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [remix()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/__tests__/setup.ts'],
        coverage: {
            include: ['src'],
            exclude: ['**/main.tsx', '**/__tests__'],
        },
    },
});
