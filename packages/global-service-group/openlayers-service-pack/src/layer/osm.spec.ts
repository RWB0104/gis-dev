/**
 * OSM 레이어 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import TileLayer from 'ol/layer/Tile';

import { osmLayer } from './osm';

describe('[@gis-dev/openlayers-service-pack] layer/osm', () => {
	describe('osmLayer 테스트', () => {
		it('name base-osm, zIndex 1인 TileLayer다', () => {
			expect(osmLayer).toBeInstanceOf(TileLayer);
			expect(osmLayer.get('name')).toBe('base-osm');
			expect(osmLayer.getZIndex()).toBe(1);
		});
	});
});
