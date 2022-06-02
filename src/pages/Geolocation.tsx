/**
 * 지오 로케이션 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 00:50:31
 */

import { Map, View } from 'ol';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import { googleRoadLayer } from '../common/layers';
import { seoulPosition } from '../common/position';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { Location } from '../components/map/MapInteraction';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * 지오 로케이션 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Geolocation(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [ googleRoadLayer ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				projection: 'EPSG:3857',
				zoom: 17
			})
		});

		setMapState(map);
	}, []);

	return (
		<section className='page' id='geolocation'>
			<Meta description='지오 로케이션 예제' title='Geolocation' url='/geolocation/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapInteraction>
					<Location map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>웹이나 모바일의 GPS 정보를 활용하여 자신의 위치 정보를 얻는 것을 <span>지오로케이션</span>이라고 합니다.</p>
					<p>아래 <BiCurrentLocation color='limegreen' /> 버튼을 클릭해서 자신의 위치를 확인해보세요.</p>
					<p>인터넷 제공 업체의 인프라 구조에 따라, 자신의 위치가 아닌 엉뚱한 위치(실제 인터넷 중계 서버의 위치 등)가 표시될 수 있습니다.</p>
					<br />

					<p>보안 상의 이유로 <span>localhost</span> 혹은 <span>https</span> 환경에서만 사용이 가능합니다.</p>
					<p>왜인지 모르겠지만, Mac에서의 순수 지오로케이션은 느리니 사용에 참고하세요.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/04/03/gis-guide-for-programmer-13' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}