/**
 * 맵 정보 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 01:08:21
 */

import { Map, View } from 'ol';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';

import { googleRoadLayer } from '../common/layers';
import { seoulPosition } from '../common/position';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * 맵 정보 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function MapInfo(): JSX.Element
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
		<section className='page' id='map-info'>
			<Meta description='맵 관련 정보 예제' title='MapInfo' url='/map-info/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>이제 지도를 통해 좀 더 의미있는 정보들을 얻어봅시다.</p>
					<p>OL의 <span>View 객체</span>는 지도의 현재 상태값을 갖고 있습니다.</p>
					<br />

					<p>우측 하단의 정보창은 유용할만한 정보들을 모아 표시합니다.</p>

					<ul>
						<li>베이스 맵 종류</li>
						<li>베이스 확장 맵 활성화 여부</li>
						<li>좌표계</li>
						<li>줌 레벨</li>
						<li>현재 영역</li>
						<li>마우스 위치</li>
					</ul>

					<p>메뉴 간소화를 위해 VWorld 페이지 좌측 상단의 메뉴를 통합했습니다.</p>
					<p>View 객체와 이벤트를 적절히 활용하면 <span>현재 맵의 정보를 실시간으로 표현</span>이 가능합니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/03/22/gis-guide-for-programmer-12' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}