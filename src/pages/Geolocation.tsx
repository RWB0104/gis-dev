/**
 * 지오 로케이션 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 00:50:31
 */

import { Map, View } from 'ol';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { Location } from '../components/map/MapInteraction';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';
import { BiCurrentLocation } from 'react-icons/bi';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import { seoulPosition } from '../common/position';

/**
 * 지오 로케이션 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Geolocation()
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
				zoom: 17,
				constrainResolution: true
			})
		});

		setMapState(map);
	}, []);

	return (
		<section id='geolocation' className='page'>
			<Meta title='Geolocation' description='지오 로케이션 예제' url='/geolocation/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<Location map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>웹이나 모바일의 GPS 정보를 활용하여 자신의 위치 정보를 얻는 것을 <span>지오로케이션</span>이라고 한다!</p>
					<p>아래 <BiCurrentLocation color='limegreen' /> 버튼을 클릭해서 자신의 위치를 확인해봐라.</p>
					<p>네 인터넷 제공자의 구조에 따라 실제 네 위치가 아닌 다른 위치가 뜰 수도 있으니 놀라지 말라고.</p>
					<br />

					<p>보안 상의 이유로 <span>localhost</span> 혹은 <span>https</span> 환경에서만 사용 가능함을 반드시 기억하도록!</p>
					<p>왜인지 Mac은 브라우저의 지오로케이션 API가 좀 느린 것 같으니 참고하라고.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}