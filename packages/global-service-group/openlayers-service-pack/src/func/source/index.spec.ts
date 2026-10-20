/**
 * source 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { clusterSource, wfsSource, wmsSource } from '.';

describe('[@gis-dev/openlayers-service-pack] source', () => {
	describe('wfsSource 테스트', () => {
		it('WFS source 4종을 묶어 export한다', () => {
			expect(Object.keys(wfsSource)).toEqual(
				expect.arrayContaining(['sejongBuildingSource', 'starbucksSource', 'transactionSource', 'wfsCitySource'])
			);
		});
	});

	describe('wmsSource 테스트', () => {
		it('WMS source 2종을 묶어 export한다', () => {
			expect(Object.keys(wmsSource)).toEqual(expect.arrayContaining(['sejongImageSource', 'sejongTileSource']));
		});
	});

	describe('clusterSource 테스트', () => {
		it('클러스터 source를 묶어 export한다', () => {
			expect(clusterSource.starbucksClusterSource).toBeDefined();
		});
	});
});
