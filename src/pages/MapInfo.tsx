/**
 * 맵 정보 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 01:08:21
 */

import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { ReactElement, useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapBoard from '../components/map/MapBoard';

/**
 * 맵 정보 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function MapInfo(): ReactElement
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
			<article className='map-wrapper'>
				<div id='map'></div>

				<MapBoard map={mapState} />
			</article>
		</section>
	);
}