/**
 * 상수 인덱스 스펙 모듈
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:44:16
 */

import { describe, expect, it } from 'vitest';

import { API_URL, EPSG, LOCALES, SERVICE_TITLE, SERVICE_TITLE_TEMPLATE } from '#/const';

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

	describe('LOCALES 테스트', () => {
		it('지원 로케일은 ko, en이다', () => {
			expect(LOCALES).toEqual(['ko', 'en']);
		});
	});

	describe('SERVICE_TITLE 테스트', () => {
		it('서비스 이름이다', () => {
			expect(SERVICE_TITLE).toBe('OpenLayers Playground');
		});

		it('타이틀 템플릿은 서비스 이름으로 끝난다', () => {
			expect(SERVICE_TITLE_TEMPLATE).toBe(`%s | ${SERVICE_TITLE}`);
		});
	});
});
