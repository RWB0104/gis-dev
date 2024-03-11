/**
 * 지도 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 03:42:14
 */

'use client';

import PaperPanel from '@gis-dev/components/molecule/PaperPanel';
import { MapContext } from '@gis-dev/script/context/map';
import { baseLayer } from '@gis-dev/script/map/layers';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ChangeEvent, PropsWithChildren, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import styles from './MapPanel.module.scss';

const cn = classNames.bind(styles);

export type MapPanelProps = PropsWithChildren;

interface MapConfigProps
{
	/**
	 * 레이어명
	 */
	layer: string;

	/**
	 * 확장 여부
	 */
	extend: boolean;
}

/**
 * 지도 패널 organism 컴포넌트 반환 메서드
 *
 * @param {MapPanelProps} param0: MapPanelProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function MapPanel({ children }: MapPanelProps): ReactNode
{
	const { map } = useContext(MapContext);

	const [ mapConfigState, setMapConfigState ] = useState<MapConfigProps>({
		extend: false,
		layer: 'base-google-road'
	});

	const handleChange = useCallback((e: SelectChangeEvent<string>) =>
	{
		setMapConfigState((state) => ({
			...state,
			layer: e.target.value
		}));
	}, [ setMapConfigState ]);

	const handleChecked = useCallback((e: ChangeEvent<HTMLInputElement>, checked: boolean) =>
	{
		setMapConfigState((state) => ({
			...state,
			extend: checked
		}));
	}, [ setMapConfigState ]);

	const setZoom = useCallback(() =>
	{
		if (map)
		{
			const zoomTag = document.querySelector<HTMLInputElement>('input[name=zoom]');

			if (zoomTag)
			{
				zoomTag.value = map.getView().getZoom() ? `${map.getView().getZoom()}` : '';
			}
		}
	}, [ map ]);

	const setExtent = useCallback(() =>
	{
		if (map)
		{
			const [ minX, minY, maxX, maxY ] = map.getView().calculateExtent();

			const minxTag = document.querySelector<HTMLInputElement>('input[name=minx]');
			const minyTag = document.querySelector<HTMLInputElement>('input[name=miny]');
			const maxxTag = document.querySelector<HTMLInputElement>('input[name=maxx]');
			const maxyTag = document.querySelector<HTMLInputElement>('input[name=maxy]');

			if (minxTag)
			{
				minxTag.value = `${minX}`;
			}

			if (minyTag)
			{
				minyTag.value = `${minY}`;
			}

			if (maxxTag)
			{
				maxxTag.value = `${maxX}`;
			}

			if (maxyTag)
			{
				maxyTag.value = `${maxY}`;
			}
		}
	}, [ map ]);

	const setCenter = useCallback(() =>
	{
		if (map)
		{
			const [ minX, minY, maxX, maxY ] = map.getView().calculateExtent();
			const [ x, y ] = [ (minX + maxX) / 2, (minY + maxY) / 2 ];

			const centerxTag = document.querySelector<HTMLInputElement>('input[name=centerx]');
			const centeryTag = document.querySelector<HTMLInputElement>('input[name=centery]');

			if (centerxTag)
			{
				centerxTag.value = `${x}`;
			}

			if (centeryTag)
			{
				centeryTag.value = `${y}`;
			}
		}
	}, [ map ]);

	const setCursor = useCallback((coord: Coordinate) =>
	{
		const pointerxTag = document.querySelector<HTMLInputElement>('input[name=pointerx]');
		const pointeryTag = document.querySelector<HTMLInputElement>('input[name=pointery]');

		if (pointerxTag)
		{
			pointerxTag.value = `${coord[0]}`;
		}

		if (pointeryTag)
		{
			pointeryTag.value = `${coord[1]}`;
		}
	}, []);

	map?.once('postrender', () =>
	{
		const [ minX, minY, maxX, maxY ] = map.getView().calculateExtent();
		const [ x, y ] = [ (minX + maxX) / 2, (minY + maxY) / 2 ];

		const epsgTag = document.querySelector<HTMLInputElement>('input[name=epsg]');

		if (epsgTag)
		{
			epsgTag.value = map.getView().getProjection().getCode();
		}

		setZoom();
		setExtent();
		setCenter();
		setCursor([ x, y ]);
	});

	useEffect(() =>
	{
		const handle = (): void =>
		{
			setExtent();
			setCenter();
		};

		map?.on('postrender', handle);

		return () =>
		{
			map?.un('postrender', handle);
		};
	}, [ map, setExtent, setCenter ]);

	useEffect(() =>
	{
		const handle = (e: MapBrowserEvent<UIEvent>): void =>
		{
			setCursor(e.coordinate);
		};

		map?.on('pointermove', handle);

		return () =>
		{
			map?.un('pointermove', handle);
		};
	}, [ map, setCursor ]);

	useEffect(() =>
	{
		map?.on('moveend', setZoom);

		return () =>
		{
			map?.un('moveend', setZoom);
		};
	}, [ map, setZoom ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const { layer } = mapConfigState;

			map.getAllLayers()
				.filter((i) => (i.get('name') as string).startsWith('base'))
				.forEach((i) => map.removeLayer(i));

			switch (layer)
			{
				case 'base-osm':
					map.addLayer(baseLayer.osmLayer);
					break;

				case 'base-google-terrain':
					map.addLayer(baseLayer.googleTerrainLayer);
					break;

				case 'base-google-alter':
					map.addLayer(baseLayer.googleAlterLayer);
					break;

				case 'base-google-satellite':
					map.addLayer(baseLayer.googleSatelliteLayer);
					break;

				case 'base-google-only-terrain':
					map.addLayer(baseLayer.googleOnlyTerrainLayer);
					break;

				case 'base-google-hybrid':
					map.addLayer(baseLayer.googleHybridyLayer);
					break;

				case 'base-vworld-base':
					map.addLayer(baseLayer.vworldBaseLayer);
					break;

				case 'base-vworld-white':
					map.addLayer(baseLayer.vworldWhiteLayer);
					break;

				case 'base-vworld-midnight':
					map.addLayer(baseLayer.vworldMidnightLayer);
					break;

				case 'base-vworld-satellite':
					map.addLayer(baseLayer.googleSatelliteLayer);
					break;

				default:
					map.addLayer(baseLayer.googleRoadLayer);
					break;
			}

			const isVworld = layer.startsWith('base-vworld');

			if (!isVworld)
			{
				setMapConfigState((state) => ({
					...state,
					extend: false
				}));
			}
		}
	}, [ map, mapConfigState.layer, setMapConfigState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const { extend } = mapConfigState;

			// 확장 레이어를 추가할 경우
			if (extend)
			{
				map.addLayer(baseLayer.vworldHybridLayer);
			}

			// 확장 레이어를 삭제할 경우
			else
			{
				map.getAllLayers()
					.filter((layer) => (layer.get('name') as string).startsWith('ext'))
					.forEach((layer) => map.removeLayer(layer));
			}
		}
	}, [ map, mapConfigState.extend ]);

	return (
		<PaperPanel>
			<Stack gap={1} padding={2} width={250}>
				{children}

				<FormControl size='small' fullWidth>
					<InputLabel>레이어</InputLabel>

					<Select<string>
						defaultValue='base-google-road'
						label='레이어'
						value={mapConfigState.layer}
						onChange={handleChange}
					>
						<MenuItem value='base-osm'>
							<Typography variant='caption'>OSM</Typography>
						</MenuItem>

						<MenuItem value='base-google-road'>
							<Typography variant='caption'>Google 기본</Typography>
						</MenuItem>

						<MenuItem value='base-google-terrain'>
							<Typography variant='caption'>Google 지형도</Typography>
						</MenuItem>

						<MenuItem value='base-google-alter'>
							<Typography variant='caption'>Google 변경 로드맵</Typography>
						</MenuItem>

						<MenuItem value='base-google-satellite'>
							<Typography variant='caption'>Google 위성</Typography>
						</MenuItem>

						<MenuItem value='base-google-only-terrain'>
							<Typography variant='caption'>Google 지형 단독</Typography>
						</MenuItem>

						<MenuItem value='base-google-hybrid'>
							<Typography variant='caption'>Google 하이브리드</Typography>
						</MenuItem>

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
					label={<Typography variant='caption'>VWorld 확장</Typography>}
					control={(
						<Switch
							checked={mapConfigState.extend}
							disabled={!mapConfigState.layer.startsWith('base-vworld')}
							size='small'
							value='1'
							onChange={handleChecked}
						/>
					)}
				/>

				<Box padding={0.5}>
					<Divider />
				</Box>

				<Stack>
					<Stack flexDirection='row' gap={1}>
						<TextField
							InputLabelProps={{ shrink: true }}
							InputProps={{ classes: { input: cn('input') }, readOnly: true }}
							label='좌표계'
							name='epsg'
							size='small'
						/>

						<TextField
							InputLabelProps={{ shrink: true }}
							InputProps={{ classes: { input: cn('input') }, readOnly: true }}
							label='줌'
							name='zoom'
							size='small'
						/>
					</Stack>

					<Link href={`https://epsg.io/${map?.getView().getProjection().getCode().replace('EPSG:', '')}`} target='_blank'>
						<Typography color='primary' fontSize={10}>좌표계 자세히 알아보기</Typography>
					</Link>
				</Stack>

				<Box padding={0.5} paddingTop={0}>
					<Divider />
				</Box>

				<Stack flexDirection='row' gap={1}>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='minX'
						name='minx'
						size='small'
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='minY'
						name='miny'
						size='small'
					/>
				</Stack>

				<Stack flexDirection='row' gap={1}>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='maxX'
						name='maxx'
						size='small'
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='maxY'
						name='maxy'
						size='small'
					/>
				</Stack>

				<Box padding={0.5}>
					<Divider />
				</Box>

				<Stack flexDirection='row' gap={1}>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='중앙(x)'
						name='centerx'
						size='small'
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='중앙(y)'
						name='centery'
						size='small'
					/>
				</Stack>

				<Box padding={0.5}>
					<Divider />
				</Box>

				<Stack flexDirection='row' gap={1}>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='커서(x)'
						name='pointerx'
						size='small'
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						InputProps={{ classes: { input: cn('input') }, readOnly: true }}
						label='커서(y)'
						name='pointery'
						size='small'
					/>
				</Stack>
			</Stack>
		</PaperPanel>
	);
}