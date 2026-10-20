/**
 * vitest 설정 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 12:58:05
 */

import { getVitestConfig } from '@gis-dev/test-pack/vitest/config';

import { name } from '#/package';

export default getVitestConfig({
	test: {
		name
	}
});
