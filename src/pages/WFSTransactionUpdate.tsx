/**
 * WFS Transaction 갱신 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 02:09:40
 */

import { Collection, Feature, Map, Overlay, View } from 'ol';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import Popup from '../components/map/Popup';
import { seoulPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import './WFSTransactionInsert.scss';
import { MdClose, MdAdd, MdEdit } from 'react-icons/md';
import Meta from '../components/global/Meta';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import { defaults, Modify, Select, Snap } from 'ol/interaction';
import { click, pointerMove } from 'ol/events/condition';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { featureIdAtom, showAtom } from '../common/atom';
import { osmLayer, vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import Geometry from 'ol/geom/Geometry';
import './WFSTransactionUpdate.scss';
import VectorSource from 'ol/source/Vector';
import Polygon from 'ol/geom/Polygon';
import { updateTransaction } from '../common/transaction';
import SpeedWagon from '../components/map/SpeedWagon';

interface SubProps
{
	map?: Map
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

	const [ featureIdState, setFeatureIdState ] = useRecoilState(featureIdAtom);
	const setShowState = useSetRecoilState(showAtom);

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const wfs = new Vector({
			format: new GeoJSON(),
			url: (extent) => `${WFS_URL}?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:buld_test&srsName=EPSG:3857&outputFormat=application/json&bbox=${extent.join(',')},EPSG:3857`,
			strategy: bbox
		});

		const wfsLayer = new VectorLayer({
			source: wfs,
			style: feature => basicStyle(feature, 'name'),
			minZoom: 15,
			zIndex: 5,
			properties: { name: 'wfs' }
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			filter: feature => feature.getId() !== undefined,
			style: feature => hoverStyle(feature, 'name')
		});

		const clickSelect = new Select({
			condition: click,
			filter: feature => feature.getId() !== undefined,
			style: feature => clickStyle(feature, 'name')
		});

		const snap = new Snap({
			source: wfs
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
			layers: [ osmLayer, vworldBaseLayer, vworldHybridLayer, wfsLayer ],
			overlays: [ overlay ],
			target: 'map',
			interactions: defaults().extend([ hoverSelect, clickSelect, snap ]),
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 18,
				constrainResolution: true,
				smoothResolutionConstraint: true,
				smoothExtentConstraint: true
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

							const name = document.querySelector('[name=name]') as HTMLInputElement;
							const address = document.querySelector('[name=address]') as HTMLInputElement;

							name.value = feature.get('name');
							address.value = feature.get('address');

							overlay.setPosition([ (maxX + minX) / 2, (maxY + minY) / 2 ]);

							setFeatureIdState(feature.getId());
						}
					}
				});
			}

			// 없을 경우
			else
			{
				overlay.setPosition(undefined);

				setFeatureIdState(undefined);
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

				<Popup map={mapState} onUpdateClick={() =>
				{
					const source: VectorSource<Geometry> = mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0].getSource();

					const features = new Collection<Feature<Geometry>>();
					features.push(source.getFeatures().filter(e => e.getId() === featureIdState)[0]);

					const modify = new Modify({
						source: mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0].getSource()
					});

					document.oncontextmenu = () =>
					{
						mapState.removeInteraction(modify);

						setShowState(true);
					};

					document.onkeyup = (e) =>
					{
						// ESC를 눌렀을 경우
						if (e.key.toLowerCase() === 'escape')
						{
							mapState.removeInteraction(modify);

							setShowState(true);
						}
					};

					mapState.addInteraction(modify);

					mapState.getOverlayById('popup').setPosition(undefined);
				}}>{popupState}</Popup>

				<UpdateForm map={mapState} />

				<SpeedWagon>
					<p><span>Transaction Update</span>를 통해 데이터를 수정할 수도 있다!</p>
					<p>팝업의 <MdEdit color='dodgerblue' />를 클릭해서 도형이나 데이터를 수정할 수 있다네.</p>
					<br />

					<p>도형을 수정하고 오른쪽 마우스 혹은 ESC를 클릭해서 도형 수정을 종료할 수 있지.</p>
					<p>이후 변경하려는 데이터의 값을 입력하면 끝일세!</p>
				</SpeedWagon>
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
function UpdateForm({ map }: SubProps)
{
	const [ showState, setShowState ] = useRecoilState(showAtom);
	const [ featureIdState, setFeatureIdState ] = useRecoilState(featureIdAtom);

	return map ? (
		<div className='update-form' data-show={showState}>
			<form
				onSubmit={async (e) =>
				{
					e.preventDefault();

					const drawLayer = map.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0];
					const drawSource = drawLayer.getSource() as VectorSource<Geometry>;

					const feature = drawSource.getFeatureById(featureIdState as string);
					const polygon = feature.getGeometry() as Polygon;

					const target = e.target as HTMLFormElement;

					const name = target.querySelector('[name=name]') as HTMLInputElement;
					const address = target.querySelector('[name=address]') as HTMLInputElement;

					const response = await updateTransaction({
						id: feature.getId() as string,
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

					setShowState(false);
					setFeatureIdState(undefined);
				}}
				onReset={() =>
				{
					const drawLayer = map.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0];
					const drawSource: VectorSource<Geometry> = drawLayer.getSource();
					drawSource.refresh();

					setShowState(false);
					setFeatureIdState(undefined);
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