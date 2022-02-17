import { Map, View, Overlay } from 'ol';
import { OSM, Vector } from 'ol/source';
import { Vector as VecterLayer } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { Style, Stroke, Fill, Text } from 'ol/style';
import React, { ReactElement, useEffect, useState } from 'react';
import proj4 from 'proj4';
import { EPSG5179, EPSG5181 } from '../common/proj';
import './WFS.scss';

/**
 * WFS 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function WFS(): ReactElement
{
	const [ map, setMap ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#wfs > .ol-viewport')?.remove();

		proj4.defs(EPSG5179.name, EPSG5179.proj);
		proj4.defs(EPSG5181.name, EPSG5181.proj);

		const wfs = new Vector({
			format: new GeoJSON(),
			url: (extent) => `https://api.itcode.dev/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:buld_sejong&srsName=EPSG:3857&outputFormat=application/json&bbox=${extent.join(',')},EPSG:3857`,
			strategy: bbox
		});

		const wfsLayer = new VecterLayer({
			source: wfs,
			style: (feature) => new Style({
				stroke: new Stroke({
					color: 'rgba(100, 149, 237, 1)',
					width: 2
				}),
				fill: new Fill({
					color: 'rgba(100, 149, 237, 0.6)'
				}),
				text: new Text({
					font: '0.8rem sans-serif',
					fill: new Fill({ color: 'white' }),
					stroke: new Stroke({
						color: 'rgba(0, 0, 0, 1)',
						width: 4
					}),
					text: feature.get('buld_nm')
				})
			}),
			zIndex: 5,
			minZoom: 15
		});

		const mapObject = new Map({
			layers: [
				wfsLayer,
				new TileLayer({
					source: new OSM({
						attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>'
					})
				})
			],
			target: 'wfs',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', [ 127.28923267492068, 36.48024986578043 ]),
				zoom: 19
			})
		});

		mapObject.on('pointermove', (e) =>
		{
			const boundary = document.querySelector('#wfs > .boundary');
			const position = document.querySelector('#wfs > .position');

			// 태그가 유효할 경우
			if (boundary)
			{
				const [ minX, minY, maxX, maxY ] = e.map.getView().calculateExtent();
				boundary.innerHTML = `<small>${minX} / ${minY}</small><br /><small>${maxX} / ${maxY}</small>`;
			}

			// 태그가 유효할 경우
			if (position)
			{
				const [ x, y ] = e.coordinate;
				position.innerHTML = `<small>${x} / ${y}</small>`;
			}

			mapObject.getViewport().style.cursor = mapObject.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
		});

		// map.on('click', (e) => map.forEachFeatureAtPixel(e.pixel, feature => console.dir(feature.getProperties())));



		setMap(mapObject);
	}, []);

	return (
		<React.Fragment>
			<section id='wfs' className='page'>
				<div className='boundary'></div>
				<div className='position'></div>
				<div className='popup'>
					<button>❌</button>
					<ul></ul>1
				</div>
			</section>
		</React.Fragment>
	);
}