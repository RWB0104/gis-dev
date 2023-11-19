/**
 * WMS 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 02:36:45
 */

import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { MapContext } from '@gis-dev/script/context/map';
import { wmsLayer } from '@gis-dev/script/map/layers';
import Apps from '@mui/icons-material/Apps';
import Image from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { MouseEvent, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export type WMSType = 'tile' | 'image';

/**
 * WMS 패널 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMSPanel(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ typeState, setTypeState ] = useState<WMSType>('tile');

	const handleChange = useCallback((event: MouseEvent<HTMLElement>, value: WMSType) =>
	{
		setTypeState(value);
	}, [ setTypeState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			map.getAllLayers()
				.filter((i) => i.get('name') === 'wms')
				.forEach((i) => map.removeLayer(i));

			// TileWMS일 경우
			if (typeState === 'tile')
			{
				map.addLayer(wmsLayer.sejongTileWmsLayer);
			}

			// ImageWMS일 경우
			else
			{
				map.addLayer(wmsLayer.sejongImageWmsLayer);
			}
		}
	}, [ map, typeState ]);

	return (
		<MapPanel>
			<ToggleButtonGroup
				size='small'
				value={typeState}
				exclusive
				fullWidth
				onChange={handleChange}
			>
				<ToggleButton color={typeState === 'tile' ? 'primary' : undefined} disabled={typeState === 'tile'} value='tile'>
					<Stack alignItems='center' direction='row' gap={1}>
						<Apps fontSize='inherit' />
						<Typography variant='caption'>Tile</Typography>
					</Stack>
				</ToggleButton>

				<ToggleButton color={typeState === 'image' ? 'primary' : undefined} disabled={typeState === 'image'} value='image'>
					<Stack alignItems='center' direction='row' gap={1}>
						<Image fontSize='inherit' />
						<Typography variant='caption'>Image</Typography>
					</Stack>
				</ToggleButton>
			</ToggleButtonGroup>

			<Box padding={0.5}>
				<Divider />
			</Box>
		</MapPanel>
	);
}