/**
 * 세종 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:39:29
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { position3857 } from '@gis-dev/script/map/positions';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

/**
 * 세종 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function SejongMap({ children }: PropsWithChildren): ReactNode
{
	const options: MapOptions = useMemo(() => ({
		view: new View({
			center: position3857.sejongPosition,
			projection: 'EPSG:3857',
			zoom: 17
		})
	}), [ children ]);

	return (
		<MapProvider options={options} hasCursor>
			{children}
		</MapProvider>
	);
}