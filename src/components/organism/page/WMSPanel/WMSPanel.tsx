/**
 * WMS 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 02:36:45
 */

import MapPanel from '@gis-dev/components/organism/page/MapPanel';
import { MapContext } from '@gis-dev/script/context/map';
import { sejongImageWmsLayer, sejongTileWmsLayer } from '@gis-dev/script/map/layers';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
				map.addLayer(sejongTileWmsLayer);
			}

			// ImageWMS일 경우
			else
			{
				map.addLayer(sejongImageWmsLayer);
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
				<ToggleButton color={typeState === 'tile' ? 'primary' : undefined} value='tile'>
					sdf
				</ToggleButton>

				<ToggleButton color={typeState === 'image' ? 'primary' : undefined} value='image'>
					11
				</ToggleButton>
			</ToggleButtonGroup>

			<Box padding={0.5}>
				<Divider />
			</Box>
		</MapPanel>
	);
}