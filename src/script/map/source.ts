/**
 * 소스 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 01:24:02
 */

import { API_BASE_URL } from '@gis-dev/script/common/env';
import { urlBuilder } from '@gis-dev/script/common/util';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';

export const sejongBuildingSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent): string => urlBuilder(`${API_BASE_URL}/wfs`, {
		bbox: `${extent.join(',')},EPSG:3857`,
		exceptions: 'application/json',
		outputFormat: 'application/json',
		request: 'GetFeature',
		service: 'WFS',
		srsName: 'EPSG:3857',
		typename: 'TEST:buld_sejong',
		version: '2.0.0'
	})
});