/**
 * 히트맵 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 12:00:33
 */

'use client';

import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { MapContext } from '@gis-dev/script/context/map';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Heatmap from 'ol/layer/Heatmap';
import { ReactNode, useCallback, useContext } from 'react';

/**
 * 히트맵 패널 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMapPanel(): ReactNode
{
	const { map } = useContext(MapContext);

	const handleBlurChange = useCallback((e: Event, value: number | number[]) =>
	{
		// 맵이 유효하고, 값이 배열이 아닐 경우
		if (map && !Array.isArray(value))
		{
			const layer = map.getAllLayers().find((i) => i.get('name') === 'wfs') as Heatmap | undefined;
			layer?.setBlur(value);
		}
	}, [ map ]);

	const handleRadiusChange = useCallback((e: Event, value: number | number[]) =>
	{
		// 맵이 유효하고, 값이 배열이 아닐 경우
		if (map && !Array.isArray(value))
		{
			const layer = map.getAllLayers().find((i) => i.get('name') === 'wfs') as Heatmap | undefined;
			layer?.setRadius(value);
		}
	}, [ map ]);

	return (
		<MapPanel>
			<Stack>
				<Typography variant='caption'>블러</Typography>

				<Slider
					aria-label='블러'
					defaultValue={20}
					max={200}
					min={0}
					size='small'
					valueLabelDisplay='auto'
					onChange={handleBlurChange}
				/>
			</Stack>

			<Box padding={0.5}>
				<Divider />
			</Box>

			<Stack>
				<Typography variant='caption'>반지름</Typography>

				<Slider
					aria-label='반지름'
					defaultValue={20}
					max={200}
					min={0}
					size='small'
					valueLabelDisplay='auto'
					onChange={handleRadiusChange}
				/>
			</Stack>

			<Box padding={0.5}>
				<Divider />
			</Box>
		</MapPanel>
	);
}