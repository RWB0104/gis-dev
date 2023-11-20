/**
 * WebGL 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 14:34:23
 */

'use client';

import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { MapContext } from '@gis-dev/script/context/map';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { wfsSource } from '@gis-dev/script/map/source';
import { getWebGLStyle } from '@gis-dev/script/map/style';
import BlurOn from '@mui/icons-material/BlurOn';
import Grain from '@mui/icons-material/Grain';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
import { MouseEvent, ReactNode, useCallback, useContext, useEffect, useState, useMemo } from 'react';

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

	const wfsCityWebGLLayer = useMemo(() => new WebGLPointsLayer({
		properties: { name: 'wfs-webgl' },
		source: wfsSource.wfsCitySource,
		style: getWebGLStyle(),
		zIndex: 5
	}), []);

	const handleChange = useCallback((event: MouseEvent<HTMLElement>, value: LayerType) =>
	{
		setTypeState(value);
	}, [ setTypeState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const webgl = map.getAllLayers().find((i) => i.get('name') === 'wfs-webgl');
			const vector = map.getAllLayers().find((i) => i.get('name') === 'wfs');

			// WebGL일 경우
			if (typeState === 'webgl')
			{
				webgl?.setVisible(true);
				vector?.setVisible(false);
			}

			// Vector일 경우
			else
			{
				vector?.setVisible(true);
				webgl?.setVisible(false);
			}
		}
	}, [ map, typeState, wfsCityWebGLLayer ]);

	useEffect(() =>
	{
		if (map)
		{
			const { wfsCityVectorLayer } = wfsLayer;
			wfsCityVectorLayer.setVisible(false);

			map.addLayer(wfsCityWebGLLayer);
			map.addLayer(wfsCityVectorLayer);
		}
	}, [ map, wfsCityWebGLLayer ]);

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