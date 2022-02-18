/**
 * 피쳐 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 00:01:07
 */

import { Map, View } from 'ol';
import { OSM as OSMLayer } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { ReactElement, useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker } from '../components/map/MapInteraction';
import './Feature.scss';

/**
 * 피쳐 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function Feature(): ReactElement
{
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [
				new TileLayer({
					source: new OSMLayer({
						attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>'
					}),
					properties: {
						name: 'base'
					}
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
			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />
			</article>
		</section>
	);
}