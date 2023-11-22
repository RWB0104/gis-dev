/**
 * 세종 WFS 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:14:20
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { views } from '@gis-dev/script/map/view';
import { PropsWithChildren, ReactNode } from 'react';

/**
 * 세종 WFS 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function SejongWFSMap({ children }: PropsWithChildren): ReactNode
{
	return (
		<MapProvider
			layers={[ wfsLayer.sejongWfsLayer ]}
			view={views.sejongView}
			hasCursor
		>
			{children}
		</MapProvider>
	);
}