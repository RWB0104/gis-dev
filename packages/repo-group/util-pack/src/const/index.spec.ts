/**
 * 상수 인덱스 스펙 모듈
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:44:16
 */

import { describe, expect, it } from 'vitest';

import { API_URL, EPSG } from '#/const';

describe('[@gis-dev/util-pack] const', () => {
	describe('API_URL 테스트', () => {
		it('GeoServer API URL이다', () => {
			expect(API_URL).toBe('https://api.itcode.dev/geoserver');
		});
	});

	describe('EPSG 테스트', () => {
		it('3857은 EPSG:3857 식별자다', () => {
			expect(EPSG[3857]).toBe('EPSG:3857');
		});

		it('4326은 EPSG:4326 식별자다', () => {
			expect(EPSG[4326]).toBe('EPSG:4326');
		});
	});
});
