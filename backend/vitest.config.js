import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        env: {
            NODE_ENV: 'test',
            JWT_KEY: 'test-secret',
            SALTROUNDS: '4',
        },
        fileParallelism: false,
        hookTimeout: 180000,
        testTimeout: 30000,
    },
});
