/**
 * 레이어 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 19:47:41
 */

import {
	googleAlterLayer,
	googleHybridyLayer,
	googleRoadLayer,
	googleSatelliteLayer,
	googleTerrainLayer
} from '#/func/layer/google';
import { osmLayer } from '#/func/layer/osm';
import {
	drawLayer,
	getWfsHeatmapLayer,
	sejongWfsLayer,
	wfsCityVectorLayer,
	wfsCityWebglLayer,
	wfsFeatureVectorLayer,
	wfsStarbucksClusterLayer,
	wfsTransactionLayer
} from '#/func/layer/wfs';
import { sejongImageWmsLayer, sejongTileWmsLayer } from '#/func/layer/wms';

export const osmTileLayer = { osmLayer };

export const googleTileLayer = {
	googleAlterLayer,
	googleHybridyLayer,
	googleRoadLayer,
	googleSatelliteLayer,
	googleTerrainLayer
};

export const baseLayer = {
	...osmTileLayer,
	...googleTileLayer
};

export const wfsLayer = {
	getWfsHeatmapLayer,
	sejongWfsLayer,
	wfsCityVectorLayer,
	wfsCityWebglLayer,
	wfsStarbucksClusterLayer,
	wfsTransactionLayer
};

export const wmsLayer = {
	sejongImageWmsLayer,
	sejongTileWmsLayer
};

export const transactionLayer = {
	drawLayer,
	wfsFeatureVectorLayer
};
