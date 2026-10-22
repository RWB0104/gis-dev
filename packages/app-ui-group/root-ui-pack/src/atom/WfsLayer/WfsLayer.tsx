/**
 * WFS 레이어 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 18:05:25
 */

'use client';

import { use, useEffect } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';

/**
 * WFS 레이어 atom 컴포넌트 반환 메서드
 */
export default function WfsLayer(): null {
	const { map } = use(MapContext);

	useEffect(() => {
		map?.addLayer(wfsLayer.sejongWfsLayer);
	}, [map]);

	return null;
}
