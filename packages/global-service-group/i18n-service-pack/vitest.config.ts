/**
 * vitest 설정 모듈
 *
 * @author RWB
 * @since 2026.11.10 화 14:09:52
 */

import { getVitestConfig } from '@gis-dev/test-pack/vitest/config';

import { name } from '#/package';

export default getVitestConfig({
	test: {
		name
	}
});
