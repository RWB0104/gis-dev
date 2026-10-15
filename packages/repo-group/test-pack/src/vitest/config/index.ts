/**
 * vitest 설정 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.15 목 19:50:19
 */

import { defineConfig, mergeConfig, type ViteUserConfigExport } from 'vitest/config';

/**
 * vitest 설정 반환 메서드
 *
 * @param {Partial<ViteUserConfigExport>} overrides 설정 오버라이딩
 *
 * @returns {ViteUserConfigExport} ViteUserConfigExport
 */
export function getVitestConfig(overrides: Partial<ViteUserConfigExport> = {}): ViteUserConfigExport {
	return defineConfig(
		mergeConfig<ViteUserConfigExport, Partial<ViteUserConfigExport>>(
			{
				test: {
					coverage: {
						clean: true,
						cleanOnRerun: true,
						provider: 'v8',
						thresholds: {
							'100': true
						}
					},
					environment: 'jsdom',
					globals: true,
					setupFiles: '@gis-dev/test-pack/vitest/setup'
				}
			},
			overrides
		)
	);
}
