/**
 * 맵 정보 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 01:08:21
 */

import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapBoard from '../components/map/MapBoard';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * 맵 정보 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function MapInfo()
{
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [
				new TileLayer({
					source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
					properties: { name: 'base' }
				})
			],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', [ 126.9779495953371, 37.566340091156945 ]),
				zoom: 19,
				constrainResolution: true
			})
		});

		setMapState(map);
	}, []);

	return (
		<section id='map-info' className='page'>
			<Meta title='MapInfo' description='맵 관련 정보 예제' url='/map-info/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapBoard map={mapState} />
			</article>

			<SpeedWagon>
				<p>단순 지도만 쳐다본다면 아무런 의미가 없다는 건 너도 잘 알겠지?</p>
				<p>OL의 <span>View 객체</span>는 지도의 현재 상태값을 갖고 있다고 한다.</p>
				<br />

				<p>우측 하단의 정보창을 주목해라! 너를 위해 도움이 될 만한 것을 챙겨왔다.</p>

				<ul>
					<li>좌표계</li>
					<li>줌 레벨</li>
					<li>현재 영역</li>
					<li>마우스 위치</li>
				</ul>

				<p>View 객체와 이벤트를 적절히 활용하면 <span>현재 맵의 정보를 실시간으로 표현</span>이 가능하단걸 기억하도록!</p>
			</SpeedWagon>
		</section>
	);
}