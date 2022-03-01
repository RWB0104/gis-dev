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
import { vworldBaseLayer, vworldGrayLayer, vworldHybridLayer, vworldMidnightLayer, vworldSatelliteLayer } from '../../common/layers';
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

		const [ layerState, setLayerState ] = useState('vworld-base');
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
			map.getAllLayers().filter(layer => layer.get('name') === 'base' && layer.get('id') !== 'vworld-hybrid').forEach(layer => map.removeLayer(layer));

			switch (layerState)
			{
				case 'vworld-gray':
					map.addLayer(vworldGrayLayer);
					break;

				case 'vworld-midnight':
					map.addLayer(vworldMidnightLayer);
					break;

				case 'vworld-satellite':
					map.addLayer(vworldSatelliteLayer);
					break;

				default:
					map.addLayer(vworldBaseLayer);
					break;
			}
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
				map.getAllLayers().filter(layer => layer.get('id') === 'vworld-hybrid').forEach(layer => map.removeLayer(layer));
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
							<option value='osm'>OSM</option>
							<option value='vworld-base'>VWorld 기본</option>
							<option value='vworld-gray'>VWorld 흑백</option>
							<option value='vworld-midnight'>VWorld 야간</option>
							<option value='vworld-satellite'>VWorld 위성</option>
						</select>
					</div>

					<div>
						<small>ext</small>
						<input type='checkbox' name='ext' checked={extState} onChange={(e) => setExtState(e.target.checked)} />
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