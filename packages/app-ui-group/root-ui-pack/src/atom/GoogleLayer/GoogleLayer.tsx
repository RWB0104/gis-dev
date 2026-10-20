/**
 * 구글 레이어 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 18:08:48
 */

'use client';

import { use, useEffect } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { googleTileLayer } from '@gis-dev/openlayers-service-pack/func/layer';

/**
 * 구글 레이어 atom 컴포넌트 반환 메서드
 */
export default function GoogleLayer(): null {
	const { map } = use(MapContext);

	useEffect(() => {
		Object.entries(googleTileLayer).forEach(([_, v]) => {
			map?.addLayer(v);
		});
	}, [map]);

	return null;
}
