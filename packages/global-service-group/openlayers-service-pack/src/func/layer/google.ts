/**
 * Google 레이어 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 17:09:20
 */

import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

// Google 로드맵 레이어
export const googleRoadLayer = new TileLayer({
	preload: Number.POSITIVE_INFINITY,
	properties: { name: 'base-google-road' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 지형도 레이어
export const googleTerrainLayer = new TileLayer({
	preload: Number.POSITIVE_INFINITY,
	properties: { name: 'base-google-terrain' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 변경 로드맵 레이어
export const googleAlterLayer = new TileLayer({
	preload: Number.POSITIVE_INFINITY,
	properties: { name: 'base-google-alter' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 위성지도 레이어
export const googleSatelliteLayer = new TileLayer({
	preload: Number.POSITIVE_INFINITY,
	properties: { name: 'base-google-satellite' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 지형 단독 지도 레이어
export const googleOnlyTerrainLayer = new TileLayer({
	preload: Number.POSITIVE_INFINITY,
	properties: { name: 'base-google-only-terrain' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
	zIndex: 3
});

// Google 하이브리드 맵 레이어
export const googleHybridyLayer = new TileLayer({
	preload: Number.POSITIVE_INFINITY,
	properties: { name: 'base-google-hybrid' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
	zIndex: 2
});
