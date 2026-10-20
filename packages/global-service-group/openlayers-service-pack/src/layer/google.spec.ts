/**
 * Google 레이어 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import TileLayer from 'ol/layer/Tile';

import {
	googleAlterLayer,
	googleHybridyLayer,
	googleOnlyTerrainLayer,
	googleSatelliteLayer,
	googleTerrainLayer
} from './google';

describe('[@gis-dev/openlayers-service-pack] layer/google', () => {
	describe('googleTerrainLayer 테스트', () => {
		it('name base-google-terrain인 TileLayer다', () => {
			expect(googleTerrainLayer).toBeInstanceOf(TileLayer);
			expect(googleTerrainLayer.get('name')).toBe('base-google-terrain');
			expect(googleTerrainLayer.getZIndex()).toBe(2);
		});
	});

	describe('googleAlterLayer 테스트', () => {
		it('name base-google-alter인 TileLayer다', () => {
			expect(googleAlterLayer.get('name')).toBe('base-google-alter');
		});
	});

	describe('googleSatelliteLayer 테스트', () => {
		it('name base-google-satellite인 TileLayer다', () => {
			expect(googleSatelliteLayer.get('name')).toBe('base-google-satellite');
		});
	});

	describe('googleOnlyTerrainLayer 테스트', () => {
		it('name base-google-only-terrain인 TileLayer다', () => {
			expect(googleOnlyTerrainLayer.get('name')).toBe('base-google-only-terrain');
		});
	});

	describe('googleHybridyLayer 테스트', () => {
		it('name base-google-hybrid인 TileLayer다', () => {
			expect(googleHybridyLayer.get('name')).toBe('base-google-hybrid');
		});
	});
});
