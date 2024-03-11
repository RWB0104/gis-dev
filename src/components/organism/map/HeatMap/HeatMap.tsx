/**
 * 히트맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:51:08
 */

'use client';

import MapProvider, { MapProviderInitHandler } from '@gis-dev/components/organism/global/MapProvider';
import { wfsSource } from '@gis-dev/script/map/source';
import { views } from '@gis-dev/script/map/view';

import Heatmap from 'ol/layer/Heatmap';
import { PropsWithChildren, ReactNode, useCallback } from 'react';

/**
 * 히트맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMap({ children }: PropsWithChildren): ReactNode
{
	const handleInit: MapProviderInitHandler = useCallback((map) =>
	{
		const heatmap = new Heatmap({
			blur: 20,
			properties: { name: 'wfs' },
			radius: 20,
			source: wfsSource.starbucksSource,
			zIndex: 5
		});

		map.addLayer(heatmap);
	}, []);

	return (
		<MapProvider
			view={views.seoulMiddleView}
			hasCursor
			onInit={handleInit}
		>
			{children}
		</MapProvider>
	);
}