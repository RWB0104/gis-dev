/**
 * OSM 레이어 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 Tue 16:28:21
 */

'use client';

import { use, useEffect } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';

/**
 * OSM 레이어 atom 컴포넌트 반환 메서드
 */
export default function OsmLayer(): null {
	const { map } = use(MapContext);

	useEffect(() => {
		map?.addLayer(baseLayer.osmLayer);
	}, [map]);

	return null;
}
