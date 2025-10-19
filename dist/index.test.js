'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const node_process_1 = __importDefault(require('node:process'));
const vitest_1 = require('vitest');
const index_js_1 = require('./index.js');
(0, vitest_1.describe)('setEnvironment', () => {
    (0, vitest_1.it)(
        'should parse deploy context and set environment variables for each key',
        withDeployContext({ hello: 'world' }, () => {
            const core = {
                exportVariable: vitest_1.vi.fn(),
            };
            (0, index_js_1.setEnvironment)({ core });
            (0, vitest_1.expect)(core.exportVariable).toHaveBeenLastCalledWith(
                'hello',
                'world'
            );
        })
    );
    (0, vitest_1.it)(
        'should do nothing if deploy context is an unexpected type',
        withDeployContext('hello world', () => {
            const core = {
                exportVariable: vitest_1.vi.fn(),
            };
            (0, index_js_1.setEnvironment)({ core });
            (0, vitest_1.expect)(core.exportVariable).not.toHaveBeenCalled();
        })
    );
});
function withDeployContext(context, handler) {
    return () => {
        node_process_1.default.env.DEPLOY_CONTEXT = JSON.stringify(context);
        handler();
        delete node_process_1.default.env.DEPLOY_CONTEXT;
    };
}
