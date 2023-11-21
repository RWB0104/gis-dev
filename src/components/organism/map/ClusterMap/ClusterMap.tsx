/**
 * 클러스터 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:46:00
 */

'use client';

import MapProvider, { MapProviderInitHandler } from '@gis-dev/components/organism/global/MapProvider';
import { selects } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position3857 } from '@gis-dev/script/map/positions';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import { PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';

/**
 * 클러스터 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ClusterMap({ children }: PropsWithChildren): ReactNode
{
	const handleInit: MapProviderInitHandler = useCallback((map) =>
	{
		map.addInteraction(selects.getClusterClickSelect('name'));
		map.addInteraction(selects.getClusterHoverSelect('name'));
	}, []);

	const options: MapOptions = useMemo(() => ({
		layers: [ wfsLayer.wfsStarbucksClusterLayer ],
		view: new View({
			center: position3857.seoulPosition,
			projection: 'EPSG:3857',
			zoom: 13
		})
	}), [ children ]);

	return (
		<MapProvider options={options} hasCursor onInit={handleInit}>
			{children}
		</MapProvider>
	);
}