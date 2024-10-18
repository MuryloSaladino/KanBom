export default {
    coverageProvider: 'v8',
    preset: 'ts-jest',
    testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
    setupFilesAfterEnv: ["./src/__tests__/jest.setup.ts"]
};