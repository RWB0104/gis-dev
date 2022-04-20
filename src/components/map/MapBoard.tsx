/**
 * 맵 보드 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 00:09:24
 */

import { Map } from 'ol';
import { useEffect, useState } from 'react';
import { FaRegCopy, FaRegWindowMinimize } from 'react-icons/fa';
import { FiMaximize } from 'react-icons/fi';
import { osmLayer, vworldBaseLayer, vworldGrayLayer, vworldHybridLayer, vworldMidnightLayer, vworldSatelliteLayer, googleRoadLayer, googleTerrainLayer, googleAlterLayer, googleSatelliteLayer, googleOnlyTerrainLayer, googleHybridyLayer } from '../../common/layers';
import './MapBoard.scss';

interface Props
{
	map?: Map
}

/**
 * 맵 보드 JSX 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export default function MapBoard({ map }: Props)
{
	// 맵이 유효할 경우
	if (map)
	{
		const [ show, setShow ] = useState(true);
		const [ epsg, setEpsg ] = useState('');

		const [ layerState, setLayerState ] = useState('base-vworld-base');
		const [ extState, setExtState ] = useState(true);

		const showZoom = () =>
		{
			const meta = document.querySelector('.map-board > [data-name=meta]');

			// 메타 태그가 유효할 경우
			if (meta)
			{
				const tag = meta.querySelector('input[name=zoom]') as HTMLInputElement;
				tag.value = map.getView().getZoom()?.toString() || '';
			}
		};

		useEffect(() =>
		{
			showZoom();

			setEpsg(map.getView().getProjection().getCode());
		}, [ map ]);

		useEffect(() =>
		{
			map.getAllLayers().filter(layer => (layer.get('name') as string).startsWith('base')).forEach(layer => map.removeLayer(layer));

			switch (layerState)
			{
				case 'base-vworld-base':
					map.addLayer(vworldBaseLayer);
					break;

				case 'base-vworld-gray':
					map.addLayer(vworldGrayLayer);
					break;

				case 'base-vworld-midnight':
					map.addLayer(vworldMidnightLayer);
					break;

				case 'base-vworld-satellite':
					map.addLayer(vworldSatelliteLayer);
					break;

				case 'base-google-road':
					map.addLayer(googleRoadLayer);
					break;

				case 'base-google-terrain':
					map.addLayer(googleTerrainLayer);
					break;

				case 'base-google-alter':
					map.addLayer(googleAlterLayer);
					break;

				case 'base-google-satellite':
					map.addLayer(googleSatelliteLayer);
					break;

				case 'base-google-only-terrain':
					map.addLayer(googleOnlyTerrainLayer);
					break;

				case 'base-google-hybrid':
					map.addLayer(googleHybridyLayer);
					break;

				default:
					map.addLayer(osmLayer);
					setExtState(false);
					break;
			}

			!layerState.startsWith('base-vworld') && setExtState(false);
		}, [ layerState ]);

		useEffect(() =>
		{
			// 확장 레이어를 추가할 경우
			if (extState)
			{
				map.addLayer(vworldHybridLayer);
			}

			// 확장 레이어를 삭제할 경우
			else
			{
				map.getAllLayers().filter(layer => (layer.get('name') as string).startsWith('ext')).forEach(layer => map.removeLayer(layer));
			}
		}, [ extState ]);

		map.on('pointermove', (e) =>
		{
			const boundary = document.querySelector('.map-board > [data-name=boundary]');
			const position = document.querySelector('.map-board > [data-name=position]');

			// 영역 보드 태그가 유효할 경우
			if (boundary)
			{
				const [ minX, minY, maxX, maxY ] = e.map.getView().calculateExtent();

				const tag1 = boundary.querySelector('input[name=minX]') as HTMLInputElement;
				const tag2 = boundary.querySelector('input[name=minY]') as HTMLInputElement;
				const tag3 = boundary.querySelector('input[name=maxX]') as HTMLInputElement;
				const tag4 = boundary.querySelector('input[name=maxY]') as HTMLInputElement;

				tag1.value = minX.toString();
				tag2.value = minY.toString();
				tag3.value = maxX.toString();
				tag4.value = maxY.toString();
			}

			// 위치 보드 태그가 유효할 경우
			if (position)
			{
				const [ x, y ] = e.coordinate;

				const tag1 = position.querySelector('input[name=x]') as HTMLInputElement;
				const tag2 = position.querySelector('input[name=y]') as HTMLInputElement;

				tag1.value = x.toString();
				tag2.value = y.toString();
			}
		});

		map.on('moveend', showZoom);

		const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
		{
			const div = e.currentTarget.parentElement as HTMLElement;
			const input = div.querySelector('input') as HTMLInputElement;
			input.select();

			document.execCommand('Copy');
		};

		const copyButton = (
			<button onClick={copy}><FaRegCopy /></button>
		);

		const sizeClick = () =>
		{
			setShow(!show);
		};

		return (
			<div className='map-board' data-show={show}>
				<div className='item' data-name='header'>
					<button onClick={sizeClick}>{show ? <FaRegWindowMinimize /> : <FiMaximize />}</button>
				</div>

				<div className='item' data-name='layer'>
					<div>
						<small>layer</small>

						<select value={layerState} onChange={(e) => setLayerState(e.target.value)}>
							<option value='base-osm'>OSM</option>
							<option value='base-vworld-base'>VWorld 기본</option>
							<option value='base-vworld-gray'>VWorld 흑백</option>
							<option value='base-vworld-midnight'>VWorld 야간</option>
							<option value='base-vworld-satellite'>VWorld 위성</option>
							<option value='base-google-road'>Google 로드맵</option>
							<option value='base-google-terrain'>Google 지형도</option>
							<option value='base-google-alter'>Google 변경된 로드맵</option>
							<option value='base-google-satellite'>Google 위성</option>
							<option value='base-google-only-terrain'>Google 지형 전용도</option>
							<option value='base-google-hybrid'>Google 하이브리드</option>
						</select>
					</div>

					<div>
						<small>ext</small>
						<input type='checkbox' name='ext' checked={extState} onChange={(e) => setExtState(e.target.checked)} disabled={!layerState.startsWith('base-vworld')} />
					</div>
				</div>

				<div className='item' data-name='meta'>
					<div>
						<small>proj</small>
						<input name='proj' value={epsg} readOnly />
						{copyButton}
					</div>

					<div>
						<small>zoom</small>
						<input name='zoom' readOnly />
						{copyButton}
					</div>
				</div>

				<div className='item' data-name='boundary'>
					<div>
						<small>minX</small>
						<input name='minX' value='0' readOnly />
						{copyButton}
					</div>

					<div>
						<small>minY</small>
						<input name='minY' value='0' readOnly />
						{copyButton}
					</div>

					<div>
						<small>maxX</small>
						<input name='maxX' value='0' readOnly />
						{copyButton}
					</div>

					<div>
						<small>maxY</small>
						<input name='maxY' value='0' readOnly />
						{copyButton}
					</div>
				</div>

				<div className='item' data-name='position'>
					<div>
						<small>x</small>
						<input name='x' value='0' readOnly />
						{copyButton}
					</div>

					<div>
						<small>y</small>
						<input name='y' value='0' readOnly />
						{copyButton}
					</div>
				</div>
			</div>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}