/**
 * 히트맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:51:08
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { position3857 } from '@gis-dev/script/map/positions';
import { wfsSource } from '@gis-dev/script/map/source';
import { View } from 'ol';
import { Point } from 'ol/geom';
import Heatmap from 'ol/layer/Heatmap';
import { MapOptions } from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { PropsWithChildren, ReactNode } from 'react';

/**
 * 히트맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMap({ children }: PropsWithChildren): ReactNode
{
	const options: MapOptions = {
		layers: [
			new Heatmap({
				blur: 20,
				properties: { name: 'wfs' },
				radius: 20,
				source: wfsSource.starbucksSource as VectorSource<Point>,
				zIndex: 5
			})
		],
		view: new View({
			center: position3857.seoulPosition,
			projection: 'EPSG:3857',
			zoom: 13
		})
	};

	return (
		<MapProvider options={options} hasCursor>
			{children}
		</MapProvider>
	);
}