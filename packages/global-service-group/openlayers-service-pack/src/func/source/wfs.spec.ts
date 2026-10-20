/**
 * WFS source 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { sejongBuildingSource, starbucksSource, transactionSource, wfsCitySource } from './wfs';

function resolveUrl(source: { getUrl: () => unknown }, extent: number[]): string {
	const url = source.getUrl();

	return (url as (e: number[]) => string)(extent);
}

describe('[@gis-dev/openlayers-service-pack] source/wfs', () => {
	describe('sejongBuildingSource 테스트', () => {
		it('extent로 WFS GetFeature URL을 만든다', () => {
			const url = resolveUrl(sejongBuildingSource, [1, 2, 3, 4]);

			expect(url).toContain('/wfs?');
			expect(url).toContain('service=WFS');
			expect(url).toContain('request=GetFeature');
			expect(url).toContain('version=2.0.0');
			expect(url).toContain('typenames=TEST%3Abuld_sejong');
			expect(url).toContain('bbox=1%2C2%2C3%2C4%2CEPSG%3A3857');
		});
	});

	describe('transactionSource 테스트', () => {
		it('typenames가 buld_test인 URL을 만든다', () => {
			expect(resolveUrl(transactionSource, [1, 2, 3, 4])).toContain('typenames=TEST%3Abuld_test');
		});
	});

	describe('starbucksSource 테스트', () => {
		it('typenames가 point_starbucks인 URL을 만든다', () => {
			expect(resolveUrl(starbucksSource, [1, 2, 3, 4])).toContain('typenames=TEST%3Apoint_starbucks');
		});
	});

	describe('wfsCitySource 테스트', () => {
		it('정적 world-cities geojson URL을 보유한다', () => {
			expect(wfsCitySource.getUrl()).toBe('https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson');
		});
	});
});
