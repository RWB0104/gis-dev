/**
 * WFS source 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 17:05:34
 */

import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';

import type { GetFeatureV2Params } from '@gis-dev/api-pack/generated/axios-functions/models/wfs/getFeatureV2Params.zod';
import { API_URL, EPSG } from '@gis-dev/util-pack/const';
import { urlBuilder } from '@gis-dev/util-pack/url';

export const sejongBuildingSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent) =>
		urlBuilder(`${API_URL}/wfs`, {
			bbox: `${extent.join(',')},${EPSG[3857]}`,
			exceptions: 'application/json',
			outputformat: 'application/json',
			request: 'GetFeature',
			service: 'WFS',
			srsname: EPSG[3857],
			typenames: 'TEST:buld_sejong',
			version: '2.0.0'
		} satisfies GetFeatureV2Params)
});

export const transactionSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent) =>
		urlBuilder(`${API_URL}/wfs`, {
			bbox: `${extent.join(',')},${EPSG[3857]}`,
			exceptions: 'application/json',
			outputformat: 'application/json',
			request: 'GetFeature',
			service: 'WFS',
			srsname: EPSG[3857],
			typenames: 'TEST:buld_test',
			version: '2.0.0'
		} satisfies GetFeatureV2Params)
});

export const starbucksSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent) =>
		urlBuilder(`${API_URL}/wfs`, {
			bbox: `${extent.join(',')},${EPSG[3857]}`,
			exceptions: 'application/json',
			outputformat: 'application/json',
			request: 'GetFeature',
			service: 'WFS',
			srsname: EPSG[3857],
			typenames: 'TEST:point_starbucks',
			version: '2.0.0'
		} satisfies GetFeatureV2Params)
});

export const wfsCitySource = new VectorSource({
	format: new GeoJSON(),
	url: 'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson'
});
