/**
 * WebGL 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 14:34:23
 */

import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { MapContext } from '@gis-dev/script/context/map';
import { wfsLayer } from '@gis-dev/script/map/layers';
import BlurOn from '@mui/icons-material/BlurOn';
import Grain from '@mui/icons-material/Grain';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { MouseEvent, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export type LayerType = 'webgl' | 'vector';

/**
 * WebGL 패널 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WebGLPanel(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ typeState, setTypeState ] = useState<LayerType>('webgl');

	const handleChange = useCallback((event: MouseEvent<HTMLElement>, value: LayerType) =>
	{
		setTypeState(value);
	}, [ setTypeState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const { wfsCityWebGLLayer, wfsCityVectorLayer } = wfsLayer;

			// WebGL일 경우
			if (typeState === 'webgl')
			{
				wfsCityWebGLLayer.setVisible(true);
				wfsCityVectorLayer.setVisible(false);
			}

			// Vector일 경우
			else
			{
				wfsCityVectorLayer.setVisible(true);
				wfsCityWebGLLayer.setVisible(false);
			}
		}
	}, [ map, typeState ]);

	useEffect(() =>
	{
		if (map)
		{
			const { wfsCityWebGLLayer, wfsCityVectorLayer } = wfsLayer;
			wfsCityVectorLayer.setVisible(false);

			map.addLayer(wfsCityWebGLLayer);
			map.addLayer(wfsCityVectorLayer);
		}
	}, [ map ]);

	return (
		<MapPanel>
			<ToggleButtonGroup
				size='small'
				value={typeState}
				exclusive
				fullWidth
				onChange={handleChange}
			>
				<ToggleButton color={typeState === 'webgl' ? 'primary' : undefined} disabled={typeState === 'webgl'} value='webgl'>
					<Stack alignItems='center' direction='row' gap={1}>
						<BlurOn fontSize='inherit' />
						<Typography variant='caption'>WebGL</Typography>
					</Stack>
				</ToggleButton>

				<ToggleButton color={typeState === 'vector' ? 'primary' : undefined} disabled={typeState === 'vector'} value='vector'>
					<Stack alignItems='center' direction='row' gap={1}>
						<Grain fontSize='inherit' />
						<Typography variant='caption'>Vector</Typography>
					</Stack>
				</ToggleButton>
			</ToggleButtonGroup>

			<Box padding={0.5}>
				<Divider />
			</Box>
		</MapPanel>
	);
}