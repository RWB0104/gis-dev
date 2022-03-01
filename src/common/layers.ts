/**
 * 레이어 모듈
 *
 * @author RWB
 * @since 2022.03.01 Tue 16:39:43
 */

import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';

export const osmLayer = new TileLayer({
	source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
	properties: { name: 'base-osm' }
});

export const vworldBaseLayer = new TileLayer({
	source: new XYZ({ url: 'http://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-base' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2
});

export const vworldGrayLayer = new TileLayer({
	source: new XYZ({ url: 'http://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/gray/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-gray' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2
});

export const vworldMidnightLayer = new TileLayer({
	source: new XYZ({ url: 'http://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/midnight/{z}/{y}/{x}.png' }),
	properties: { name: 'base-vworld-midnight' },
	minZoom: 5,
	maxZoom: 18,
	zIndex: 2
});

export const vworldHybridLayer = new TileLayer({
	source: new XYZ({ url: 'http://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png' }),
	properties: { name: 'ext-vworld-hybrid' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 3
});

export const vworldSatelliteLayer = new TileLayer({
	source: new XYZ({ url: 'http://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg' }),
	properties: { name: 'base-vworld-satellite' },
	minZoom: 5,
	maxZoom: 19,
	zIndex: 2
});