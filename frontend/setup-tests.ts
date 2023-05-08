import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import createMocker from 'vitest-fetch-mock';

// create fetch mock for components that using 'fetch'
const fetchMocker = createMocker(vi);
fetchMocker.enableMocks();

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});