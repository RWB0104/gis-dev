/**
 * 레이어 모듈
 *
 * @author RWB
 * @since 2023.11.11 Sat 03:09:30
 */

import { VWORLD_KEY } from '@gis-dev/script/common/env';
import { sejongBuildingSource, sejongImageSource, sejongTileSource } from '@gis-dev/script/map/source';
import { basicStyle } from '@gis-dev/script/map/style';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM, XYZ } from 'ol/source';
import Style from 'ol/style/Style';

// OSM 레이어
export const osmLayer = new TileLayer({
	properties: { name: 'base-osm' },
	source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
	zIndex: 1
});

// VWorld 기본 지도 레이어
export const vworldBaseLayer = new TileLayer({
	maxZoom: 19,
	minZoom: 5,
	preload: Infinity,
	properties: { name: 'base-vworld-base' },
	source: new XYZ({ url: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Base/{z}/{y}/{x}.png` }),
	zIndex: 2
});

// VWorld 백지도 레이어
export const vworldWhiteLayer = new TileLayer({
	maxZoom: 18,
	minZoom: 5,
	preload: Infinity,
	properties: { name: 'base-vworld-white' },
	source: new XYZ({ url: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/white/{z}/{y}/{x}.png` }),
	zIndex: 2
});

// VWorld 야간 지도 레이어
export const vworldMidnightLayer = new TileLayer({
	maxZoom: 18,
	minZoom: 5,
	preload: Infinity,
	properties: { name: 'base-vworld-midnight' },
	source: new XYZ({ url: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/midnight/{z}/{y}/{x}.png` }),
	zIndex: 2
});

// VWorld 확장 지도 레이어
export const vworldHybridLayer = new TileLayer({
	maxZoom: 19,
	minZoom: 5,
	preload: Infinity,
	properties: { name: 'ext-vworld-hybrid' },
	source: new XYZ({ url: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Hybrid/{z}/{y}/{x}.png` }),
	zIndex: 3
});

// VWorld 위성 지도 레이어
export const vworldSatelliteLayer = new TileLayer({
	maxZoom: 19,
	minZoom: 5,
	preload: Infinity,
	properties: { name: 'base-vworld-satellite' },
	source: new XYZ({ url: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Satellite/{z}/{y}/{x}.jpeg` }),
	zIndex: 2
});

// Google 로드맵 레이어
export const googleRoadLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-road' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 지형도 레이어
export const googleTerrainLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-terrain' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 변경 로드맵 레이어
export const googleAlterLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-alter' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 위성지도 레이어
export const googleSatelliteLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-satellite' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 지형 단독 지도 레이어
export const googleOnlyTerrainLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-only-terrain' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

// Google 하이브리드 맵 레이어
export const googleHybridyLayer = new TileLayer({
	preload: Infinity,
	properties: { name: 'base-google-hybrid' },
	source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
	zIndex: 2
});

export const sejongLayer = new VectorLayer({
	minZoom: 15,
	properties: { name: 'wfs' },
	source: sejongBuildingSource,
	style: (feature): Style => basicStyle(feature, 'buld_nm'),
	zIndex: 5
});

export const sejongTileWmsLayer = new TileLayer({
	minZoom: 15,
	properties: { name: 'wms' },
	source: sejongTileSource,
	zIndex: 5
});

export const sejongImageWmsLayer = new ImageLayer({
	minZoom: 15,
	properties: { name: 'wms' },
	source: sejongImageSource,
	zIndex: 5
});