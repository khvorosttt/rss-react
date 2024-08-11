/// <reference types="vitest" />
import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [[process.env.VITEST ? react() : remix()]],
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
