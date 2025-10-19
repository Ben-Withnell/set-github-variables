import process from 'node:process';

export function setEnvironment({ core }) {
    const parsedContext = JSON.parse(process.env.DEPLOY_CONTEXT ?? '{}');

    core.info('This will appear in the GitHub Actions log:');
    core.info(parsedContext);
    core.info(core);

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
