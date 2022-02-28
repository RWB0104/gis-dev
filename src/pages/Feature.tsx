/**
 * 피쳐 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 00:01:07
 */

import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapBoard from '../components/map/MapBoard';
import Meta from '../components/global/Meta';
import MapInteraction, { LocationWithMarker } from '../components/map/MapInteraction';
import SpeedWagon from '../components/map/SpeedWagon';
import { BiCurrentLocation } from 'react-icons/bi';

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
		<section id='feature' className='page'>
			<Meta title='Feature' description='피쳐 추가 예제' url='/feature/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>자신의 위치를 직접 지도에 표시해보고 싶단 생각이 들지 않나?</p>
					<p>그런 너를 위해, 이 페이지에선 <span>자신의 위치 정보를 직접 지도 상에 표시</span>해줄 것이다.</p>
					<br />

					<p>아까와 같이 <BiCurrentLocation />을 눌러봐라.</p>
					<p>마커를 표시할 VectorLayer를 하나 생성해서, 네 위치에 마커를 동적으로 찍어줄 것이다.</p>
					<br />

					<p>이렇게 지도에 표현되는 놈들을 <span>Feature</span>라 부른다.</p>
					<p>이 놈들은 <span>상호작용이 가능</span>하다는 점을 기억해라. 훗날 도움이 될 것이네.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}