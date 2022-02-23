/**
 * OSM 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.17 Thu 01:04:47
 */

import { Map, View } from 'ol';
import { OSM as OSMLayer } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { ReactElement, useEffect } from 'react';
import proj4 from 'proj4';

/**
 * OSM 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function OSM(): ReactElement
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
			<article className='map-wrapper'>
				<div id='map'></div>
			</article>
		</section>
	);
}