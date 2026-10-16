/**
 * orval 설정 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.16 금 16:07:13
 */

import type { Options, OutputClient } from 'orval';

/**
 * 설정 반환 메서드
 *
 * @param {OutputClient} client OutputClient
 *
 * @returns {Options} Options
 */
export function getOrvalConfig(client: OutputClient): Options {
	const path = `./src/generated/${client}`;

	return {
		input: './oas.yaml',
		output: {
			baseUrl: 'https://api.itcode.dev/geoserver',
			clean: true,
			client,
			formatter: 'biome',
			headers: true,
			httpClient: 'axios',
			indexFiles: false,
			mode: 'tags-split',
			override: {
				query: { version: 5 }
			},
			schemas: {
				path: `${path}/models`,
				splitByTags: true,
				type: 'zod'
			},
			target: `${path}/api/index.ts`
		}
	};
}
