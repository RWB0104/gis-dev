/**
 * VWorld 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 03:18:01
 */

import PaperPanel from '@gis-dev/components/molecule/PaperPanel';
import { MapContext } from '@gis-dev/script/context/map';
import { vworldBaseLayer, vworldHybridLayer, vworldMidnightLayer, vworldSatelliteLayer, vworldWhiteLayer } from '@gis-dev/script/map/layers';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { ChangeEvent, ReactNode, useCallback, useContext } from 'react';

/**
 * VWorld 패널 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function VWorldPanel(): ReactNode
{
	const { map } = useContext(MapContext);

	const handleChange = useCallback((e: SelectChangeEvent<string>) =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const { value } = e.target;

			map.getAllLayers()
				.filter((layer) => (layer.get('name') as string).startsWith('base-vworld'))
				.forEach((layer) => map.removeLayer(layer));

			switch (value)
			{
				case 'base-vworld-white':
					map.addLayer(vworldWhiteLayer);
					break;

				case 'base-vworld-midnight':
					map.addLayer(vworldMidnightLayer);
					break;

				case 'base-vworld-satellite':
					map.addLayer(vworldSatelliteLayer);
					break;

				default:
					map.addLayer(vworldBaseLayer);
					break;
			}
		}
	}, [ map ]);

	const handleChecked = useCallback((e: ChangeEvent<HTMLInputElement>, checked: boolean) =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			// 확장 레이어를 추가할 경우
			if (checked)
			{
				map.addLayer(vworldHybridLayer);
			}

			// 확장 레이어를 삭제할 경우
			else
			{
				map.getAllLayers()
					.filter((layer) => (layer.get('name') as string).startsWith('ext'))
					.forEach((layer) => map.removeLayer(layer));
			}
		}
	}, [ map ]);

	return (
		<PaperPanel>
			<Stack minWidth={200} padding={2} spacing={1}>
				<FormControl size='small' fullWidth>
					<InputLabel>레이어</InputLabel>

					<Select<string> defaultValue='base-vworld-base' label='레이어' onChange={handleChange}>
						<MenuItem value='base-vworld-base'>
							<Typography variant='caption'>VWorld 기본</Typography>
						</MenuItem>

						<MenuItem value='base-vworld-white'>
							<Typography variant='caption'>VWorld 백지도</Typography>
						</MenuItem>

						<MenuItem value='base-vworld-midnight'>
							<Typography variant='caption'>VWorld 야간</Typography>
						</MenuItem>

						<MenuItem value='base-vworld-satellite'>
							<Typography variant='caption'>VWorld 위성</Typography>
						</MenuItem>
					</Select>
				</FormControl>

				<FormControlLabel
					control={<Switch size='small' onChange={handleChecked} />}
					label={<Typography variant='caption'>VWorld 확장</Typography>}
				/>
			</Stack>
		</PaperPanel>
	);
}