/**
 * VWorld 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.03.01 Tue 16:22:54
 */

import { Map, View } from 'ol';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';
import { vworldBaseLayer, vworldGrayLayer, vworldHybridLayer, vworldMidnightLayer, vworldSatelliteLayer } from '../common/layers';
import MapPanel from '../components/map/MapPanel';
import { seoulPosition } from '../common/position';
import './VWorld.scss';

/**
 * VWorld 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function VWorld()
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ layerState, setLayerState ] = useState('base-vworld-base');
	const [ extState, setExtState ] = useState(true);

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [ vworldBaseLayer, vworldHybridLayer ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 17,
				minZoom: 6,
				maxZoom: 18
			})
		});

		setMapState(map);
	}, []);

	useEffect(() =>
	{
		mapState.getAllLayers().filter(layer => (layer.get('name') as string).startsWith('base-vworld')).forEach(layer => mapState.removeLayer(layer));

		switch (layerState)
		{
			case 'base-vworld-gray':
				mapState.addLayer(vworldGrayLayer);
				break;

			case 'base-vworld-midnight':
				mapState.addLayer(vworldMidnightLayer);
				break;

			case 'base-vworld-satellite':
				mapState.addLayer(vworldSatelliteLayer);
				break;

			default:
				mapState.addLayer(vworldBaseLayer);
				break;
		}
	}, [ layerState ]);

	useEffect(() =>
	{
		// 확장 레이어를 추가할 경우
		if (extState)
		{
			mapState.addLayer(vworldHybridLayer);
		}

		// 확장 레이어를 삭제할 경우
		else
		{
			mapState.getAllLayers().filter(layer => (layer.get('name') as string).startsWith('ext')).forEach(layer => mapState.removeLayer(layer));
		}
	}, [ extState ]);

	return (
		<section id='vworld' className='page'>
			<Meta title='VWorld' description='VWorld 베이스 지도 예제' url='/vworld/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapPanel map={mapState} width={200} height={120}>
					<div className='item'>
						<div className='label'>
							<small>베이스</small>
						</div>

						<div className='body'>
							<select value={layerState} onChange={(e) => setLayerState(e.target.value)}>
								<option value='base-vworld-base'>VWorld 기본</option>
								<option value='base-vworld-gray'>VWorld 흑백</option>
								<option value='base-vworld-midnight'>VWorld 야간</option>
								<option value='base-vworld-satellite'>VWorld 위성</option>
							</select>
						</div>
					</div>

					<div className='item'>
						<div className='label'>
							<small>확장</small>
						</div>

						<div className='body'>
							<input type='checkbox' checked={extState} onChange={(e) => setExtState(e.target.checked)} />
						</div>
					</div>
				</MapPanel>

				<SpeedWagon>
					<p>OSM을 쓰면서 아쉬운 점은 없었나요?</p>
					<p>눈치챘는지 모르겠지만, OSM은 사실 국내에서 주력으로 쓰기 그리 좋은 지도는 아닙니다.</p>
					<p>국내 한정 서비스를 기획중이라면, OSM은 그리 좋은 선택지가 아닐겁니다.</p>
					<br />

					<p><span>VWorld</span>는 <span>국내에 특화된 지도를 OpenAPI 형태로 제공</span>하고 있습니다.</p>
					<p>이걸 활용하면 조금 더 국내 친화적인 지도 서비스를 제공하는 것이 가능합니다.</p>
					<br />

					<p>VWorld에서는 일반지도 뿐만 아니라 위성지도 같은 다양한 레이어를 제공합니다.</p>
					<p>좌측 상단 메뉴에서 지도를 변경해보세요.</p>
					<br />

					<p>자세한 내용은 <a target='_blank' href='https://blog.itcode.dev/posts/2022/03/21/gis-guide-for-programmer-11'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}