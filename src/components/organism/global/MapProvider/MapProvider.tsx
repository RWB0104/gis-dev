/**
 * 맵 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 12:11:27
 */

'use client';

import BasicMap, { BasicMapProps } from '@gis-dev/components/molecule/BasicMap';
import { MapContext } from '@gis-dev/script/context/map';
import Box from '@mui/material/Box';
import { Map } from 'ol';
import { ReactNode, useEffect, useMemo, useState } from 'react';

export type MapProviderInitHandler = (map: Map) => void;

export interface MapProviderProps extends Pick<BasicMapProps, 'options' | 'hasCursor' | 'children'>
{
	/**
	 * 초기 설정 메서드
	 */
	onInit?: MapProviderInitHandler;
}

/**
 * 맵 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {MapProviderProps} param0: MapProviderProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MapProvider({ options, hasCursor, onInit, children }: MapProviderProps): ReactNode
{
	const [ mapState, setMapState ] = useState<Map>();

	const context = useMemo(() => ({
		map: mapState,
		setMap: setMapState
	}), [ mapState, setMapState ]);

	useEffect(() =>
	{
		// 맵이 초기화된 경우
		if (context.map)
		{
			onInit?.(context.map);
		}
	}, [ context.map, onInit ]);

	return (
		<MapContext.Provider value={context}>
			<Box data-component='MapProvider' height='100%' position='relative' width='100%'>
				<BasicMap hasCursor={hasCursor} options={options} />

				{children}
			</Box>
		</MapContext.Provider>
	);
}