/**
 * 클러스터 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:46:00
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { selects } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { views } from '@gis-dev/script/map/view';
import { PropsWithChildren, ReactNode } from 'react';

/**
 * 클러스터 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ClusterMap({ children }: PropsWithChildren): ReactNode
{
	return (
		<MapProvider
			interactions={[ selects.getClusterClickSelect('name'), selects.getClusterHoverSelect('name') ]}
			layers={[ wfsLayer.wfsStarbucksClusterLayer ]}
			view={views.seoulMiddleView}
			hasCursor
		>
			{children}
		</MapProvider>
	);
}