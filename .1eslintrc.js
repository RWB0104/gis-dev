module.exports = {
	env: {
		browser: true,
		node: true
	},
	extends: [ 'airbnb', 'airbnb/hooks', 'eslint:recommended', 'plugin:react/recommended', 'plugin:import/recommended' ],
	ignorePatterns: [ '*.d.ts', 'node_modules', 'lib', 'build', 'dist', '**/env/*.js' ],
	overrides: [
		{
			files: [ '*.ts', '*.tsx' ],
			rules: { 'no-undef': 'off' }
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { warnOnUnsupportedTypeScriptVersion: false },
	plugins: [ '@typescript-eslint', 'sort-keys-fix' ],
	root: true,
	rules: {
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{ 'ts-ignore': 'allow-with-description' }
		],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-unused-vars': 'error',
		'array-bracket-spacing': [
			'error',
			'always',
			{
				arraysInArrays: false,
				objectsInArrays: false
			}
		],
		'brace-style': [ 'error', 'allman' ],
		'comma-dangle': [ 'error', 'never' ],
		'eol-last': [ 'error', 'never' ],
		'import/extensions': 'off',
		'import/named': 'off',
		'import/no-anonymous-default-export': 'off',
		'import/no-cycle': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-named-as-default': 'off',
		'import/no-unresolved': 'off',
		'import/order': [
			'error',
			{
				alphabetize: {
					caseInsensitive: true,
					order: 'asc'
				},
				groups: [ 'external', 'builtin', 'internal', 'sibling', 'parent', 'index' ],
				'newlines-between': 'always'
			}
		],
		'import/prefer-default-export': 'off',
		indent: [ 'error', 'tab', { SwitchCase: 1 }],
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/control-has-associated-label': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-quotes': [ 'error', 'prefer-single' ],
		'linebreak-style': 'off',
		'max-len': 'off',
		'no-alert': 'off',
		'no-await-in-loop': 'off',
		'no-console': 'off',
		'no-lonely-if': 'off',
		'no-new': 'off',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'no-restricted-exports': 'off',
		'no-return-assign': 'off',
		'no-shadow': 'off',
		'no-tabs': [ 'error', { allowIndentationTabs: true }],
		'no-unused-vars': 'off',
		'no-use-before-define': 'off',
		'object-curly-newline': [ 'error', {
			ExportDeclaration: 'never',
			ImportDeclaration: 'never',
			ObjectExpression: {
				minProperties: 3,
				multiline: true
			},
			ObjectPattern: 'never'
		}],
		radix: 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react-hooks/rules-of-hooks': 'off',
		'react/button-has-type': 'off',
		'react/destructuring-assignment': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-curly-brace-presence': [
			'error',
			{
				children: 'never',
				props: 'never'
			}
		],
		'react/jsx-filename-extension': 'off',
		'react/jsx-indent': [ 'error', 'tab' ],
		'react/jsx-indent-props': [ 2, 'tab' ],
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-sort-props': [
			2,
			{
				callbacksLast: true,
				ignoreCase: true,
				noSortAlphabetically: false,
				shorthandFirst: false,
				shorthandLast: true
			}
		],
		'react/no-array-index-key': 'off',
		'react/no-danger': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'require-jsdoc': 'off',
		'sort-keys-fix/sort-keys-fix': 'error'
	},
	settings: {
		'import/parsers': { '@typescript-eslint/parser': [ '.ts', '.tsx', '.js' ] },
		react: { version: 'detect' }
	}
};