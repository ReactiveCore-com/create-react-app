module.exports = {
    root: true,
    extends: ['airbnb-typescript', 'airbnb/hooks', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react/prop-types': 0,
        'no-console': 0,
        'react/jsx-props-no-spreading': 0,
        'no-useless-catch': 0,
        'default-case': 0,
        'react/destructuring-assignment': 0,
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enum',
                format: ['UPPER_CASE'],
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
        ],
    },
    ignorePatterns: ['node_modules/', 'public/', 'server.js', 'coverage/', 'build/'],
};
