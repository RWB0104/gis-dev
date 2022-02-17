import { Map, View } from 'ol';
import { ImageWMS, OSM, TileWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { ReactElement, useEffect, useState } from 'react';
import proj4 from 'proj4';
import { EPSG5179, EPSG5181 } from '../common/proj';
import './WMS.scss';
import ImageLayer from 'ol/layer/Image';

/**
 * WMS 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function WMS(): ReactElement
{
	const [ type, setType ] = useState(true);
	const [ map, setMap ] = useState(new Map({}));

	useEffect(() =>
	{
		proj4.defs(EPSG5179.name, EPSG5179.proj);
		proj4.defs(EPSG5181.name, EPSG5181.proj);

		const mapObject = new Map({
			layers: [
				new TileLayer({
					source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' })
				}),
				getLayer(type)
			],
			target: 'wms',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', [ 127.28923267492068, 36.48024986578043 ]),
				zoom: 19
			})
		});

		mapObject.on('pointermove', (e) =>
		{
			const boundary = document.querySelector('#wms > .boundary');
			const position = document.querySelector('#wms > .position');

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

		mapObject.on('click', (e) => mapObject.forEachFeatureAtPixel(e.pixel, feature => console.dir(feature.getProperties())));

		setMap(mapObject);
	}, []);

	useEffect(() =>
	{
		map.getAllLayers().filter(layer => layer.get('id') === 'wms').forEach(layer => map.removeLayer(layer));
		map.addLayer(getLayer(type));
	}, [ type ]);

	return (
		<React.Fragment>
			<section id='wms' className='page'>
				<div className='type'>
					<div>
						<input id='tile' type='radio' name='type' value='tile' checked={type} onChange={() => setType(true)} />
						<label htmlFor='tile'>TileWMS</label>
					</div>

					<div>
						<input id='image' type='radio' name='type' value='image' checked={!type} onChange={() => setType(false)} />
						<label htmlFor='image'>ImageWMS</label>
					</div>
				</div>

				<div className='boundary'></div>
				<div className='position'></div>
			</section>
		</React.Fragment>
	);
}

/**
 * 레이어 반환 메서드
 *
 * @param {boolean} type: 레이어 타입
 *
 * @returns {TileLayer<TileWMS> | ImageLayer<ImageWMS>} 레이어
 */
function getLayer(type: boolean): TileLayer<TileWMS> | ImageLayer<ImageWMS>
{
	// Tile 레이어일 경우
	if (type)
	{
		return new TileLayer({
			source: new TileWMS({
				url: 'https://api.itcode.dev/geoserver/wms',
				params: {
					layers: 'buld_sejong',
					tiled: true
				},
				transition: 0.3,
				serverType: 'geoserver'
			}),
			minZoom: 15,
			properties: {
				id: 'wms'
			}
		});
	}

	// Image 레이어일 경우
	else
	{
		return new ImageLayer({
			source: new ImageWMS({
				url: 'https://api.itcode.dev/geoserver/wms',
				params: {
					layers: 'buld_sejong'
				},
				serverType: 'geoserver'
			}),
			minZoom: 15,
			properties: {
				id: 'wms'
			}
		});
	}
}