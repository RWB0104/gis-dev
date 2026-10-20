/**
 * WMS 레이어 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 19:47:34
 */

import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';

import { wmsSource } from '#/func/source';

// 세종시 건물 타일 WMS(WMTS) 레이어
export const sejongTileWmsLayer = new TileLayer({
	minZoom: 15,
	properties: { name: 'wms' },
	source: wmsSource.sejongTileSource,
	zIndex: 5
});

// 세종시 건물 이미지 WMS 레이어
export const sejongImageWmsLayer = new ImageLayer({
	minZoom: 15,
	properties: { name: 'wms' },
	source: wmsSource.sejongImageSource,
	zIndex: 5
});
