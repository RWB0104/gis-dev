/**
 * WMS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 03:04:39
 */

import { Map, View } from 'ol';
import { ImageWMS, OSM, TileWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { ReactElement, useEffect, useState } from 'react';
import proj4 from 'proj4';
import ImageLayer from 'ol/layer/Image';
import { defaults } from 'ol/interaction';
import MapInteraction, { LocationWithMarker, SejongCity } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { IoAppsSharp, IoImagesSharp } from 'react-icons/io5';
import './WMS.scss';

/**
 * WMS 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function WMS(): ReactElement
{
	const [ type, setType ] = useState(true);
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [
				new TileLayer({
					source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' })
				}),
				getLayer(type)
			],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', [ 127.28923267492068, 36.48024986578043 ]),
				zoom: 19,
				constrainResolution: true
			})
		});

		setMapState(map);
	}, []);

	useEffect(() =>
	{
		mapState.getAllLayers().filter(layer => layer.get('id') === 'wms').forEach(layer => mapState.removeLayer(layer));
		mapState.addLayer(getLayer(type));
	}, [ type ]);

	const onTypeClick = (type: boolean) =>
	{
		setType(type);
	};

	return (
		<section id='wms' className='page'>
			<article className='map-wrapper'>
				<div id='map'></div>

				<div className='wms-board'>
					<button onClick={() => onTypeClick(true)} data-selected={type}><IoAppsSharp /> Tile</button>
					<button onClick={() => onTypeClick(false)} data-selected={!type}><IoImagesSharp /> Image</button>
				</div>

				<MapInteraction>
					<SejongCity map={mapState} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />
			</article>
		</section>
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