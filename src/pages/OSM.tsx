/**
 * OSM 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.17 Thu 01:04:47
 */

import { Map, View } from 'ol';
import proj4 from 'proj4';
import React, { useEffect } from 'react';

import { osmLayer } from '../common/layers';
import { seoulPosition } from '../common/position';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * OSM 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function OSM(): JSX.Element
{
	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		new Map({
			layers: [ osmLayer ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				projection: 'EPSG:3857',
				zoom: 17
			})
		});
	}, []);

	return (
		<section className='page' id='osm'>
			<Meta description='OSM 베이스 지도 예제' title='OSM' url='/osm/' />

			<article className='map-wrapper'>
				<div id='map' />

				<SpeedWagon>
					<p>이 페이지는 베이스 레이어를 <span>Open Street Map(OSM)</span>으로 표현한 예제 페이지입니다.</p>
					<p>OpenLayers는 기본적으로 OSM 객체를 제공해주기 때문에, <span>세계지도를 쉽게 구현</span>할 수 있습니다.</p>
					<p>직접 지도를 조작해 보세요.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/03/19/gis-guide-for-programmer-10' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}