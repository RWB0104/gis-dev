/**
 * URL 인덱스 스펙 모듈
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:44:16
 */

import { describe, expect, it } from 'vitest';

import { urlBuilder } from '#/url';

describe('[@gis-dev/util-pack] url', () => {
	describe('urlBuilder 테스트', () => {
		it('query가 없으면 basePath를 그대로 반환한다', () => {
			expect(urlBuilder('/wfs')).toBe('/wfs');
		});

		it('query가 undefined면 basePath를 그대로 반환한다', () => {
			expect(urlBuilder('/wfs', undefined)).toBe('/wfs');
		});

		it('빈 query 객체면 물음표만 붙인다', () => {
			expect(urlBuilder('/wfs', {})).toBe('/wfs?');
		});

		it('string 쿼리를 직렬화한다', () => {
			expect(urlBuilder('/wfs', { service: 'WFS' })).toBe('/wfs?service=WFS');
		});

		it('number 쿼리를 문자열로 직렬화한다', () => {
			expect(urlBuilder('/wfs', { count: 10 })).toBe('/wfs?count=10');
		});

		it('boolean 쿼리를 문자열로 직렬화한다', () => {
			expect(urlBuilder('/wfs', { transparent: true })).toBe('/wfs?transparent=true');
		});

		it('여러 쿼리를 & 로 이어 붙인다', () => {
			expect(urlBuilder('/wfs', { request: 'GetFeature', service: 'WFS' })).toBe('/wfs?request=GetFeature&service=WFS');
		});

		it('특수문자가 포함된 값을 URL 인코딩한다', () => {
			expect(urlBuilder('/wfs', { bbox: '1,2,3,4' })).toBe('/wfs?bbox=1%2C2%2C3%2C4');
		});

		it('공백이 포함된 값을 인코딩한다', () => {
			expect(urlBuilder('/wfs', { cql: 'a = b' })).toBe('/wfs?cql=a+%3D+b');
		});
	});
});
