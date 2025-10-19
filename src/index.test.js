import process from 'node:process';
import { describe, it, expect, vi } from 'vitest';
import { setEnvironment } from './index.js';

describe('setEnvironment', () => {
    it(
        'should parse deploy context and set environment variables for each key',
        withDeployContext({ hello: 'world' }, () => {
            const core = {
                exportVariable: vi.fn(),
            };

            setEnvironment({ core });

            expect(core.exportVariable).toHaveBeenLastCalledWith(
                'hello',
                'world'
            );
        })
    );

    it(
        'should do nothing if deploy context is an unexpected type',
        withDeployContext('hello world', () => {
            const core = {
                exportVariable: vi.fn(),
            };

            setEnvironment({ core });

            expect(core.exportVariable).not.toHaveBeenCalled();
        })
    );
});

function withDeployContext(context, handler) {
    return () => {
        process.env.DEPLOY_CONTEXT = JSON.stringify(context);

        handler();

        delete process.env.DEPLOY_CONTEXT;
    };
}
