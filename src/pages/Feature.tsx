/**
 * 피쳐 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 00:01:07
 */

import { Map, View } from 'ol';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapBoard from '../components/map/MapBoard';
import Meta from '../components/global/Meta';
import MapInteraction, { LocationWithMarker } from '../components/map/MapInteraction';
import SpeedWagon from '../components/map/SpeedWagon';
import { BiCurrentLocation } from 'react-icons/bi';
import { seoulPosition } from '../common/position';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';

/**
 * 피쳐 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Feature()
{
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [ vworldBaseLayer, vworldHybridLayer ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 17
			})
		});

		setMapState(map);
	}, []);

	return (
		<section id='feature' className='page'>
			<Meta title='Feature' description='피쳐 추가 예제' url='/feature/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>자신의 위치를 알았으니, 이를 직접 지도에 표시할 수도 있지 않을까요?</p>
					<br />

					<p>이 페이지는 지오로케이션을 통해 얻은 당신의 위치를 Feature로 만들어 지도에 표시할 것입니다.</p>

					<p>아까와 같이 <BiCurrentLocation color='limegreen' /> 버튼을 눌러보세요.</p>
					<p>현재 당신의 위치가 지도 상에 표시될 것입니다.</p>
					<br />

					<p>이렇게 지도에 표현되는 <span>Vector</span> 요소를 <span>Feature</span>라 부릅니다.</p>
					<p>이 Feature들은 지도 상의 객체이므로 <span>상호작용도 가능</span>합니다.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}