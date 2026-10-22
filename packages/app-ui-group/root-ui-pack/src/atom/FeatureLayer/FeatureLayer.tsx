/**
 * 피쳐 레이어 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 15:14:46
 */

'use client';

import { use, useEffect } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';

/**
 * 피쳐 레이어 atom 컴포넌트 반환 메서드
 */
export default function FeatureLayer(): null {
	const { map } = use(MapContext);

	useEffect(() => {
		map?.addLayer(transactionLayer.wfsFeatureVectorLayer);
	}, [map]);

	return null;
}
