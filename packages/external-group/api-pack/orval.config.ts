/**
 * orval 설정 모듈
 *
 * @author RWB
 * @since 2026.10.16 금 16:01:33
 */

import { defineConfig } from 'orval';

import { getOrvalConfig } from '#/config';

export default defineConfig({
	'axios-functions': getOrvalConfig('axios-functions'),
	'react-query': getOrvalConfig('react-query')
});
