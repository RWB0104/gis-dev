/**
 * 상수 인덱스 스펙 모듈
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:44:16
 */

import { describe, expect, it } from 'vitest';

import { API_URL, EPSG, PAGE_LINK_GROUPS } from '#/const';

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

	describe('링크 그룹 테스트', () => {
		it('모든 그룹은 한 개 이상의 페이지를 가진다', () => {
			expect(PAGE_LINK_GROUPS.every(({ pages }) => pages.length > 0)).toBe(true);
		});

		it('모든 경로는 /로 시작하며 중복되지 않는다', () => {
			const hrefs = PAGE_LINK_GROUPS.flatMap(({ pages }) => pages.map(({ href }) => href));

			expect(hrefs.every((href) => href.startsWith('/'))).toBe(true);
			expect(new Set(hrefs).size).toBe(hrefs.length);
		});
	});
});
