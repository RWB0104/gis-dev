/**
 * 레이어 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 19:47:41
 */

import {
	googleAlterLayer,
	googleHybridyLayer,
	googleOnlyTerrainLayer,
	googleSatelliteLayer,
	googleTerrainLayer
} from '#/layer/google';
import { osmLayer } from '#/layer/osm';
import { drawLayer, sejongWfsLayer, wfsCityVectorLayer, wfsStarbucksClusterLayer, wfsTransactionLayer } from '#/layer/wfs';
import { sejongImageWmsLayer, sejongTileWmsLayer } from '#/layer/wms';

const osmTileLayer = { osmLayer };

const googleTileLayer = {
	googleAlterLayer,
	googleHybridyLayer,
	googleOnlyTerrainLayer,
	googleSatelliteLayer,
	googleTerrainLayer
};

export const baseLayer = {
	...osmTileLayer,
	...googleTileLayer
};

export const wfsLayer = {
	sejongWfsLayer,
	wfsCityVectorLayer,
	wfsStarbucksClusterLayer,
	wfsTransactionLayer
};

export const wmsLayer = {
	sejongImageWmsLayer,
	sejongTileWmsLayer
};

export const transactionLayer = {
	drawLayer
};
