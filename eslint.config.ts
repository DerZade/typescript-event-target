import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    eslintPluginPrettierRecommended,
    {
        name: 'app/excluded-files',
        ignores: ['dist/**/*']
    },
    {
        name: 'app/rules',
        rules: {
            '@typescript-eslint/no-unsafe-declaration-merging': 'off'
        }
    }
);
