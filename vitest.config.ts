/**
 * vitest 루트 설정 모듈
 *
 * @author RWB
 * @since 2026.10.16 금 16:09:11
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			exclude: [
				'packages/repo-group/test-pack/src/**/*.ts',
				'packages/external-group/api-pack/src/generated/**/*.ts',
				'packages/global-ui-group/shadcn-ui-pack/src/**/*.{tsx,ts}'
			],
			include: ['packages/*/*/src/**/*.{tsx,ts}']
		},
		projects: ['packages/*/*']
	}
});
