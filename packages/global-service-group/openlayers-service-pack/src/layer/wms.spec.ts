/**
 * WMS 레이어 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';

import { sejongImageWmsLayer, sejongTileWmsLayer } from './wms';

describe('[@gis-dev/openlayers-service-pack] layer/wms', () => {
	describe('sejongTileWmsLayer 테스트', () => {
		it('name wms, minZoom 15인 TileLayer다', () => {
			expect(sejongTileWmsLayer).toBeInstanceOf(TileLayer);
			expect(sejongTileWmsLayer.get('name')).toBe('wms');
			expect(sejongTileWmsLayer.getMinZoom()).toBe(15);
		});
	});

	describe('sejongImageWmsLayer 테스트', () => {
		it('name wms인 ImageLayer다', () => {
			expect(sejongImageWmsLayer).toBeInstanceOf(ImageLayer);
			expect(sejongImageWmsLayer.get('name')).toBe('wms');
		});
	});
});
