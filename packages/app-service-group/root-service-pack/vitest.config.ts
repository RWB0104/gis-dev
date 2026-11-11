/**
 * vitest 설정 모듈
 *
 * @author RWB
 * @since 2026.11.11 수 11:46:48
 */

import { getVitestConfig } from '@gis-dev/test-pack/vitest/config';

import { name } from '#/package';

export default getVitestConfig({
	test: {
		name
	}
});
