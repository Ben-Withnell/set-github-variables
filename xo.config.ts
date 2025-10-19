import { type FlatXoConfig } from 'xo';

const xoConfig: FlatXoConfig = [
    {
        files: '**/*.{cjs,js,ts,mts,mjs}',
        space: true,
        prettier: true,
        rules: {
            // Turned off as we would otherwise have to define a lot of exceptions
            // for interacting with third party modules
            '@typescript-eslint/naming-convention': 'off',
        },
        ignores: ['**/*.config.{cjs,js,mts,mjs,ts}'],
    },
];

export default xoConfig;
