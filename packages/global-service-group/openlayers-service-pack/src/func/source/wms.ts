/**
 * WMS source 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 17:05:50
 */

import { ImageWMS, TileWMS } from 'ol/source';

import type { GetMapV13Params } from '@gis-dev/api-pack/generated/axios-functions/models/wms/getMapV13Params.zod';
import { API_URL } from '@gis-dev/util-pack/const';

export const sejongTileSource = new TileWMS({
	params: {
		exceptions: 'application/json',
		layers: 'buld_sejong'
	} satisfies Pick<GetMapV13Params, 'exceptions' | 'layers'>,
	serverType: 'geoserver',
	transition: 0.3,
	url: `${API_URL}/wms`
});

export const sejongImageSource = new ImageWMS({
	params: {
		exceptions: 'application/json',
		layers: 'buld_sejong'
	} satisfies Pick<GetMapV13Params, 'exceptions' | 'layers'>,
	serverType: 'geoserver',
	url: `${API_URL}/wms`
});
