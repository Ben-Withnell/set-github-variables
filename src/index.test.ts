import { describe, it, expect } from 'vitest';
import { helloWorld } from './index.js';

describe('helloWorld', () => {
    it('should return "Hello, World!"', () => {
        const result = helloWorld();
        expect(result).toBe('Hello, World!');
    });
});
