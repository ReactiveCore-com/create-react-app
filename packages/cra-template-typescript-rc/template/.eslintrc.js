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
    },
    ignorePatterns: ['node_modules/', 'public/', 'server.js', 'coverage/', 'build/'],
};
