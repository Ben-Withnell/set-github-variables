'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.setEnvironment = setEnvironment;
const node_process_1 = __importDefault(require('node:process'));
function setEnvironment({ core }) {
    const parsedContext = JSON.parse(
        node_process_1.default.env.DEPLOY_CONTEXT ?? '{}'
    );
    if (!isObject(parsedContext)) {
        return;
    }
    for (const [key, value] of Object.entries(parsedContext)) {
        core.exportVariable(key, value);
    }
}
function isObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        [null, Object.prototype].includes(Object.getPrototypeOf(value))
    );
}
