/**
 * orval 설정 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.09.30 Wed 16:02:38
 */

import type { OutputOptions } from 'orval';

import { getOrvalConfig } from '.';

describe('[@jader/api-pack] config', () => {
	describe('getOrvalConfig 테스트', () => {
		it('전달된 client 값을 output.client에 그대로 사용한다', () => {
			const config = getOrvalConfig('axios-functions');
			const output = config.output as OutputOptions;

			expect(output.client).toBe('axios-functions');
		});

		it('client에 따라 target/models 경로를 다르게 생성한다', () => {
			const config = getOrvalConfig('axios');
			const output = config.output as OutputOptions;

			expect(output.target).toBe('./src/generated/axios/api/index.ts');
			expect(output.schemas).toMatchObject({
				path: './src/generated/axios/models'
			});
		});
	});
});
