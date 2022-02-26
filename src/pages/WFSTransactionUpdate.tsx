/**
 * WFS Transaction 갱신 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 02:09:40
 */

import { Feature, Map, Overlay, View } from 'ol';
import { OSM, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { Style, Stroke, Fill, Text } from 'ol/style';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import { EPSG5179, EPSG5181 } from '../common/proj';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import Popup from '../components/map/Popup';
import { seoulPosition } from '../common/position';
import Geometry from 'ol/geom/Geometry';
import Polygon from 'ol/geom/Polygon';
import { insertTransaction } from '../common/transaction';
import { WFS_URL } from '../common/env';
import './WFSTransactionInsert.scss';
import VectorSource from 'ol/source/Vector';
import { MdClose, MdAdd } from 'react-icons/md';
import Meta from '../components/global/Meta';

interface SubProps
{
	map?: Map,
	feature?: Feature<Geometry>,
	setFeature: React.Dispatch<React.SetStateAction<Feature<Geometry> | undefined>>
}

/**
 * WFS Transaction 갱신 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFSTransactionUpdate()
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [ JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>> ];
	const [ featureState, setFeatureState ] = useState(undefined) as [ Feature<Geometry> | undefined, React.Dispatch<React.SetStateAction<Feature<Geometry> | undefined>> ];

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		proj4.defs(EPSG5179.name, EPSG5179.proj);
		proj4.defs(EPSG5181.name, EPSG5181.proj);

		const wfs = new Vector({
			format: new GeoJSON(),
			url: (extent) => `${WFS_URL}?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:buld_test&srsName=EPSG:3857&outputFormat=application/json&bbox=${extent.join(',')},EPSG:3857`,
			strategy: bbox
		});

		const wfsLayer = new VectorLayer({
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
					text: feature.get('name')
				})
			}),
			properties: {
				name: 'wfs'
			},
			minZoom: 15,
			zIndex: 5
		});

		const popup = document.querySelector('.map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			id: 'popup',
			element: popup || undefined,
			positioning: 'center-center',
			autoPan: {
				animation: {
					duration: 250
				}
			}
		});

		const map = new Map({
			layers: [
				wfsLayer,
				new TileLayer({
					source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
					properties: { name: 'base' }
				})
			],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 19,
				constrainResolution: true
			})
		});

		map.on('pointermove', (e) => map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '');

		map.on('singleclick', (e) =>
		{
			// 해당 픽셀에 객체가 있을 경우
			if (map.hasFeatureAtPixel(e.pixel))
			{
				map.forEachFeatureAtPixel(e.pixel, feature =>
				{
					// 해당 객체의 아이디가 buld_test으로 시작할 경우
					if (feature.getId()?.toString().startsWith('buld_test'))
					{
						const geom = feature.getGeometry();

						// 공간정보가 유효할 경우
						if (geom)
						{
							const [ minX, minY, maxX, maxY ] = geom.getExtent();

							setPopupState((
								<ul>
									<li><b>{feature.getId() || ''}</b></li>
									<li>{feature.get('name') || <span>이름 없음</span>}</li>
									<li>🏠 {feature.get('address') ? <a href={`https://map.naver.com/v5/search/${feature.get('address')}`} target='_blank'>{feature.get('address')}</a> : <span>주소 없음</span>}</li>
									<li>🕗 {feature.get('reg_date')}</li>
								</ul>
							));

							overlay.setPosition([ (maxX + minX) / 2, (maxY + minY) / 2 ]);
						}
					}
				});
			}

			// 없을 경우
			else
			{
				overlay.setPosition(undefined);
			}
		});

		setMapState(map);
	}, []);

	return (
		<section id='transaction-update' className='page'>
			<Meta title='WFS Transaction Update' description='WFS 트랜잭션 갱신 예제' url='/transaction-update/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<HomeButton map={mapState} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<Popup map={mapState} onUpdateClick={() => console.dir(1)}>{popupState}</Popup>
			</article>
		</section>
	);
}

/**
 * 갱신 폼 Element 반환 메서드
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
function UpdateForm({ map, feature, setFeature }: SubProps)
{
	return map ? (
		<div className='update-form' data-show={feature !== undefined}>
			<form
				onSubmit={async (e) =>
				{
					e.preventDefault();

					const drawLayer = map.getAllLayers().filter(layer => layer.get('name') === 'draw')[0];
					const drawSource = drawLayer.getSource() as VectorSource<Geometry>;

					const feature = drawSource.getFeatures()[0];
					const polygon = feature.getGeometry() as Polygon;

					const target = e.target as HTMLFormElement;

					const name = target.querySelector('[name=name]') as HTMLInputElement;
					const address = target.querySelector('[name=address]') as HTMLInputElement;

					const response = await insertTransaction({
						body: {
							name: name.value,
							address: address.value
						},
						geom: polygon.getFlatCoordinates()
					});

					if (!response.ok)
					{
						alert('추가 실패');
					}

					map.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0].getSource().refresh();

					drawSource.clear();
					setFeature(undefined);
				}}
				onReset={() =>
				{
					const drawLayer = map.getAllLayers().filter(layer => layer.get('name') === 'draw')[0];
					const drawSource: VectorSource<Geometry> = drawLayer.getSource();
					drawSource.clear();

					setFeature(undefined);
				}}>
				<div className='form-row'>
					<small>이름</small>
					<input name='name' />
				</div>

				<div className='form-row'>
					<small>주소</small>
					<input name='address' />
				</div>

				<div className='form-interaction'>
					<button type='submit'><MdAdd /> 추가</button>
					<button type='reset'><MdClose /> 취소</button>
				</div>
			</form>
		</div>
	) : null;
}