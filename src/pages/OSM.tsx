/**
 * OSM 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.17 Thu 01:04:47
 */

import { Map, View } from 'ol';
import { OSM as OSMLayer } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { useEffect } from 'react';
import proj4 from 'proj4';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * OSM 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function OSM()
{
	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		new Map({
			layers: [
				new TileLayer({
					source: new OSMLayer({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
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
	}, []);

	return (
		<section id='osm' className='page'>
			<Meta title='OSM' description='OSM 베이스 지도 예제' url='/osm/' />

			<article className='map-wrapper'>
				<div id='map'></div>
			</article>

			<SpeedWagon>
				<p>이 페이지는 베이스 레이어를 <span>Open Street Map(OSM)</span>으로 표현한 예제 페이지지!</p>
				<p>OpenLayers는 기본적으로 OSM 객체를 제공해주기 때문에, <span>세계지도를 쉽게 구현</span>할 수 있어.</p>
				<p>직접 지도를 조작해 보도록!</p>
			</SpeedWagon>
		</section>
	);
}