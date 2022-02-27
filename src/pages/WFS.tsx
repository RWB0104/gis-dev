/**
 * WFS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 01:52:32
 */

import { Map, View } from 'ol';
import { OSM, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import { EPSG5179, EPSG5181 } from '../common/proj';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { sejongPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import { basicStyle } from '../common/style';

/**
 * WFS 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFS()
{
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		proj4.defs(EPSG5179.name, EPSG5179.proj);
		proj4.defs(EPSG5181.name, EPSG5181.proj);

		const wfs = new Vector({
			format: new GeoJSON(),
			url: (extent) => `${WFS_URL}?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:buld_sejong&srsName=EPSG:3857&outputFormat=application/json&bbox=${extent.join(',')},EPSG:3857`,
			strategy: bbox
		});

		const wfsLayer = new VectorLayer({
			source: wfs,
			style: basicStyle,
			minZoom: 15,
			zIndex: 5
		});

		const map = new Map({
			layers: [
				wfsLayer,
				new TileLayer({
					source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
					properties: { name: 'base' }
				})
			],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				zoom: 19,
				constrainResolution: true
			})
		});

		setMapState(map);
	}, []);

	return (
		<section id='wfs' className='page'>
			<Meta title='WFS' description='WFS 레이어 예제' url='/wfs/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />
			</article>
		</section>
	);
}