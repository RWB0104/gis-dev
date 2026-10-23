/**
 * WMS 레이어 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 09:49:44
 */

'use client';

import { use, useEffect } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wmsLayer } from '@gis-dev/openlayers-service-pack/func/layer';

/**
 * WMS 레이어 atom 컴포넌트 반환 메서드
 */
export default function WmsLayer(): null {
	const { map } = use(MapContext);

	useEffect(() => {
		map?.addLayer(wmsLayer.sejongTileWmsLayer);
	}, [map]);

	return null;
}
