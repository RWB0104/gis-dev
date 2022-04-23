/**
 * 레이어 모듈
 *
 * @author RWB
 * @since 2022.03.01 Tue 16:39:43
 */

import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';

export const osmLayer = new TileLayer({
	source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>', cacheSize: 0 }),
	properties: { name: 'base-osm' },
	zIndex: 1,
	preload: Infinity
});

export const vworldBaseLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-base' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

export const vworldGrayLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/gray/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-gray' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

export const vworldMidnightLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/midnight/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-midnight' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2,
	preload: Infinity
});

export const vworldHybridLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png' }),
	properties: { name: 'ext-vworld-hybrid' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 3,
	preload: Infinity
});

export const vworldSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg' }),
	properties: { name: 'base-vworld-satellite' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2,
	preload: Infinity
});

export const googleRoadLayer = new TileLayer({
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
	properties: { name: 'base-google-road' },
	zIndex: 2,
	preload: Infinity
});

export const googleTerrainLayer = new TileLayer({
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
	properties: { name: 'base-google-terrain' },
	zIndex: 2,
	preload: Infinity
});

export const googleAlterLayer = new TileLayer({
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
	properties: { name: 'base-google-alter' },
	zIndex: 2,
	preload: Infinity
});

export const googleSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' }),
	properties: { name: 'base-google-satellite' },
	zIndex: 2,
	preload: Infinity
});

export const googleOnlyTerrainLayer = new TileLayer({
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
	properties: { name: 'base-google-only-terrain' },
	zIndex: 2,
	preload: Infinity
});

export const googleHybridyLayer = new TileLayer({
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
	properties: { name: 'base-google-hybrid' },
	zIndex: 2,
	preload: Infinity
});