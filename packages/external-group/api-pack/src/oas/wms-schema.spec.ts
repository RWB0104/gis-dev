/**
 * WMS 스키마 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:47:14
 */

import './setup';

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { registWmsSchema, wmsGetMapV1xRequestSchema, wmsGetMapV13RequestSchema } from './wms-schema';

const baseReq = {
	bbox: '0,0,1,1',
	format: 'image/png',
	height: 256,
	layers: 'buld_test',
	request: 'GetMap',
	service: 'WMS',
	srs: 'EPSG:3857',
	styles: '',
	width: 256
};

describe('[@gis-dev/api-pack] wms-schema', () => {
	describe('wmsGetMapV1xRequestSchema 테스트', () => {
		it('1.1.1 버전 GetMap 요청을 통과시킨다', () => {
			expect(wmsGetMapV1xRequestSchema.safeParse({ ...baseReq, version: '1.1.1' }).success).toBe(true);
		});

		it('version이 1.3.0이면 거부한다', () => {
			expect(wmsGetMapV1xRequestSchema.safeParse({ ...baseReq, version: '1.3.0' }).success).toBe(false);
		});

		it('허용되지 않은 format은 거부한다', () => {
			expect(wmsGetMapV1xRequestSchema.safeParse({ ...baseReq, format: 'image/bmp', version: '1.1.1' }).success).toBe(
				false
			);
		});

		it('width가 누락되면 거부한다', () => {
			const { width, ...rest } = baseReq;

			expect(wmsGetMapV1xRequestSchema.safeParse({ ...rest, version: '1.1.1' }).success).toBe(false);
		});
	});

	describe('wmsGetMapV13RequestSchema 테스트', () => {
		it('1.3.0 버전 GetMap 요청을 통과시킨다', () => {
			expect(wmsGetMapV13RequestSchema.safeParse({ ...baseReq, version: '1.3.0' }).success).toBe(true);
		});

		it('version이 1.1.1이면 거부한다', () => {
			expect(wmsGetMapV13RequestSchema.safeParse({ ...baseReq, version: '1.1.1' }).success).toBe(false);
		});
	});

	describe('registWmsSchema 테스트', () => {
		it('/wms GET 2개(V1x/V13) 경로를 registry에 등록한다', () => {
			const registry = new OpenAPIRegistry();

			registWmsSchema(registry);

			const paths = registry.definitions
				.filter((d) => d.type === 'route')
				.map((d) => {
					const { method, path } = (d as { route: { method: string; path: string } }).route;

					return { method, path };
				});

			expect(paths).toContainEqual({ method: 'get', path: '/wms?_v=getMapV1x' });
			expect(paths).toContainEqual({ method: 'get', path: '/wms?_v=getMapV13' });
		});
	});
});
