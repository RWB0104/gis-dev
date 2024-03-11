/**
 * 세종 피쳐 WFS 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:45:30
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { selects } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { views } from '@gis-dev/script/map/view';

import { PropsWithChildren, ReactNode } from 'react';

/**
 * 세종 피쳐 WFS 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function SejongFeatureWFSMap({ children }: PropsWithChildren): ReactNode
{
	return (
		<MapProvider
			interactions={[ selects.getWfsHoverSelect('buld_nm'), selects.getWfsClickSelect('buld_nm') ]}
			layers={[ wfsLayer.sejongWfsLayer ]}
			view={views.sejongView}
			hasCursor
		>
			{children}
		</MapProvider>
	);
}