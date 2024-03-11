/**
 * OSM 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 16:01:38
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { baseLayer } from '@gis-dev/script/map/layers';
import { views } from '@gis-dev/script/map/view';

import { PropsWithChildren, ReactNode } from 'react';

/**
 * OSM 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function OSMMap({ children }: PropsWithChildren): ReactNode
{
	return (
		<MapProvider
			layers={[ baseLayer.osmLayer ]}
			view={views.seoulView}
			hasCursor
		>
			{children}
		</MapProvider>
	);
}