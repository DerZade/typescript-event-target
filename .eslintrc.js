module.exports = {
    extends: 'standard-with-typescript',
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        indent: 'off',
        semi: 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ]
    }
};
