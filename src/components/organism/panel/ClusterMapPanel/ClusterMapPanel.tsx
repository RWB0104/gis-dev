/**
 * 클러스터 맵 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 02:35:55
 */

'use client';

import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { MapContext } from '@gis-dev/script/context/map';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cluster } from 'ol/source';
import { ReactNode, useCallback, useContext } from 'react';

/**
 * 클러스터 맵 패널 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ClusterMapPanel(): ReactNode
{
	const { map } = useContext(MapContext);

	const handleChange = useCallback((e: Event, value: number | number[]) =>
	{
		// 맵이 유효하고, 값이 배열이 아닐 경우
		if (map && !Array.isArray(value))
		{
			const layer = map.getAllLayers().find((i) => i.get('name') === 'wfs');

			if (layer)
			{
				const source = layer.getSource() as Cluster | null;
				source?.setDistance(value);
			}
		}
	}, [ map ]);

	return (
		<MapPanel>
			<Stack>
				<Typography variant='caption'>클러스터 거리</Typography>

				<Slider
					aria-label='Small'
					defaultValue={100}
					max={200}
					min={0}
					size='small'
					valueLabelDisplay='auto'
					onChange={handleChange}
				/>
			</Stack>

			<Box padding={0.5}>
				<Divider />
			</Box>
		</MapPanel>
	);
}