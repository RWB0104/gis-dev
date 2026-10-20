/**
 * WMS source 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { ImageWMS, TileWMS } from 'ol/source';

import { sejongImageSource, sejongTileSource } from './wms';

describe('[@gis-dev/openlayers-service-pack] source/wms', () => {
	describe('sejongTileSource 테스트', () => {
		it('geoserver serverType를 가진 TileWMS 인스턴스다', () => {
			expect(sejongTileSource).toBeInstanceOf(TileWMS);
			expect(sejongTileSource.getParams().layers).toBe('buld_sejong');
		});
	});

	describe('sejongImageSource 테스트', () => {
		it('geoserver serverType를 가진 ImageWMS 인스턴스다', () => {
			expect(sejongImageSource).toBeInstanceOf(ImageWMS);
			expect(sejongImageSource.getParams().layers).toBe('buld_sejong');
		});
	});
});
