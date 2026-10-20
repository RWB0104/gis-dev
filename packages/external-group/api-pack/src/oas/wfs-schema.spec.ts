/**
 * WFS 스키마 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:47:14
 */

import './setup';

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { registWfsSchema, wfsGetFeatureV1RequestSchema, wfsGetFeatureV2RequestSchema } from './wfs-schema';

describe('[@gis-dev/api-pack] wfs-schema', () => {
	describe('wfsGetFeatureV1RequestSchema 테스트', () => {
		it('typename과 1.x 버전을 가진 요청을 통과시킨다', () => {
			const req = {
				request: 'GetFeature',
				service: 'WFS',
				typename: 'buld_test',
				version: '1.1.0'
			};

			expect(wfsGetFeatureV1RequestSchema.safeParse(req).success).toBe(true);
		});

		it('version이 2.0.0이면 거부한다', () => {
			const req = {
				request: 'GetFeature',
				service: 'WFS',
				typename: 'buld_test',
				version: '2.0.0'
			};

			expect(wfsGetFeatureV1RequestSchema.safeParse(req).success).toBe(false);
		});

		it('typename이 없으면 거부한다', () => {
			const req = { request: 'GetFeature', service: 'WFS', version: '1.1.0' };

			expect(wfsGetFeatureV1RequestSchema.safeParse(req).success).toBe(false);
		});
	});

	describe('wfsGetFeatureV2RequestSchema 테스트', () => {
		it('typenames와 2.0.0 버전을 가진 요청을 통과시킨다', () => {
			const req = {
				request: 'GetFeature',
				service: 'WFS',
				typenames: 'buld_test',
				version: '2.0.0'
			};

			expect(wfsGetFeatureV2RequestSchema.safeParse(req).success).toBe(true);
		});

		it('version이 1.1.0이면 거부한다', () => {
			const req = {
				request: 'GetFeature',
				service: 'WFS',
				typenames: 'buld_test',
				version: '1.1.0'
			};

			expect(wfsGetFeatureV2RequestSchema.safeParse(req).success).toBe(false);
		});
	});

	describe('registWfsSchema 테스트', () => {
		it('/wfs GET 2개와 POST 1개 경로를 registry에 등록한다', () => {
			const registry = new OpenAPIRegistry();

			registWfsSchema(registry);

			const paths = registry.definitions
				.filter((d) => d.type === 'route')
				.map((d) => {
					const { method, path } = (d as { route: { method: string; path: string } }).route;

					return { method, path };
				});

			expect(paths).toContainEqual({ method: 'get', path: '/wfs?_v=getFeatureV1' });
			expect(paths).toContainEqual({ method: 'get', path: '/wfs?_v=getFeatureV2' });
			expect(paths.some((p) => p.method === 'post' && p.path === '/wfs')).toBe(true);
		});
	});
});
