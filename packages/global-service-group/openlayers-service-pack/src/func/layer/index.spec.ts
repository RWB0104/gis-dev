/**
 * 레이어 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { baseLayer, transactionLayer, wfsLayer, wmsLayer } from '.';

describe('[@gis-dev/openlayers-service-pack] layer', () => {
	describe('baseLayer 테스트', () => {
		it('OSM과 Google 베이스 레이어 6종을 묶는다', () => {
			expect(Object.keys(baseLayer)).toEqual(
				expect.arrayContaining([
					'osmLayer',
					'googleAlterLayer',
					'googleHybridyLayer',
					'googleSatelliteLayer',
					'googleTerrainLayer'
				])
			);
		});
	});

	describe('wfsLayer 테스트', () => {
		it('WFS 레이어 4종을 묶는다', () => {
			expect(Object.keys(wfsLayer)).toEqual(
				expect.arrayContaining([
					'sejongWfsLayer',
					'wfsCityVectorLayer',
					'wfsStarbucksClusterLayer',
					'wfsTransactionLayer'
				])
			);
		});
	});

	describe('wmsLayer 테스트', () => {
		it('WMS 레이어 2종을 묶는다', () => {
			expect(Object.keys(wmsLayer)).toEqual(expect.arrayContaining(['sejongImageWmsLayer', 'sejongTileWmsLayer']));
		});
	});

	describe('transactionLayer 테스트', () => {
		it('드로우 레이어를 묶는다', () => {
			expect(transactionLayer.drawLayer).toBeDefined();
		});
	});
});
