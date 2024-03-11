/**
 * WFS Transaction 갱신 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 02:09:40
 */

import { Collection, Feature, Map, Overlay, View } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import { GeoJSON } from 'ol/format';
import Geometry from 'ol/geom/Geometry';
import Polygon from 'ol/geom/Polygon';
import { defaults, Modify, Select, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { bbox } from 'ol/loadingstrategy';
import { Vector as VectorSource } from 'ol/source';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { MdClose, MdAdd, MdEdit } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './WFSTransactionUpdate.scss';

import { featureIdAtom, showAtom } from '../common/atom';
import { WFS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { seoulPosition } from '../common/position';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import { updateTransaction } from '../common/transaction';
import { urlBuilder } from '../common/util';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import Popup from '../components/map/Popup';
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
export default function WFSTransactionUpdate(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [ JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>> ];

	const [ featureIdState, setFeatureIdState ] = useRecoilState(featureIdAtom);
	const setShowState = useSetRecoilState(showAtom);

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const wfs = new VectorSource({
			format: new GeoJSON(),
			strategy: bbox,
			url: (extent) => urlBuilder(WFS_URL, {
				bbox: `${extent.join(',')},EPSG:3857`,
				exceptions: 'application/json',
				outputFormat: 'application/json',
				request: 'GetFeature',
				service: 'WFS',
				srsName: 'EPSG:3857',
				typename: 'TEST:buld_test',
				version: '2.0.0'
			})
		});

		const wfsLayer = new VectorLayer({
			minZoom: 15,
			properties: { name: 'wfs' },
			source: wfs,
			style: (feature) => basicStyle(feature, 'name'),
			zIndex: 5
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			filter: (feature) => feature.getId() !== undefined,
			style: (feature) => hoverStyle(feature, 'name')
		});

		const clickSelect = new Select({
			condition: click,
			filter: (feature) => feature.getId() !== undefined,
			style: (feature) => clickStyle(feature, 'name')
		});

		const snap = new Snap({ source: wfs });

		const popup = document.getElementById('map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: popup || undefined,
			id: 'popup',
			positioning: 'center-center'
		});

		const map = new Map({
			interactions: defaults().extend([ hoverSelect, clickSelect, snap ]),
			layers: [ googleRoadLayer, wfsLayer ],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				projection: 'EPSG:3857',
				zoom: 18
			})
		});

		map.on('pointermove', (e) => map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '');

		map.on('singleclick', (e) =>
		{
			// 해당 픽셀에 객체가 있을 경우
			if (map.hasFeatureAtPixel(e.pixel))
			{
				map.forEachFeatureAtPixel(e.pixel, (feature) =>
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
									<li>🏠 {feature.get('address') ? <a href={`https://map.naver.com/v5/search/${feature.get('address')}`} rel='noreferrer' target='_blank'>{feature.get('address')}</a> : <span>주소 없음</span>}</li>
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
		<section className='page' id='transaction-update'>
			<Meta description='WFS 트랜잭션 갱신 예제' title='WFS Transaction Update' url='/transaction-update/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapInteraction>
					<HomeButton map={mapState} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<UpdateForm map={mapState} />

				<SpeedWagon>
					<p><span>Transaction Update</span>를 통해 데이터를 수정할 수도 있습니다.</p>
					<p>팝업의 <MdEdit color='dodgerblue' />를 클릭해서 도형이나 데이터를 수정해보세요.</p>
					<br />

					<p>도형을 수정하고 오른쪽 마우스 혹은 ESC를 클릭해서 도형 수정을 종료할 수 있습니다.</p>
					<p>이후 변경하려는 데이터의 값을 입력해보세요.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/31/gis-guide-for-programmer-21' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>

				<Popup
					map={mapState}
					onUpdateClick={() =>
					{
						const source: VectorSource<Geometry> = mapState.getAllLayers().filter((layer) => layer.get('name') === 'wfs')[0].getSource();

						const features = new Collection<Feature<Geometry>>();
						features.push(source.getFeatures().filter((e) => e.getId() === featureIdState)[0]);

						const modify = new Modify({ source });

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
					}}
				>{popupState}
				</Popup>
			</article>
		</section>
	);
}

/**
 * 갱신 폼 Element 반환 메서드
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
function UpdateForm({ map }: SubProps): JSX.Element | null
{
	const [ showState, setShowState ] = useRecoilState(showAtom);
	const [ featureIdState, setFeatureIdState ] = useRecoilState(featureIdAtom);

	return map ? (
		<div className='update-form' data-show={showState}>
			<form
				onReset={() =>
				{
					const drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'wfs')[0];
					const drawSource: VectorSource<Geometry> = drawLayer.getSource();
					drawSource.refresh();

					setShowState(false);
					setFeatureIdState(undefined);
				}}
				onSubmit={async (e) =>
				{
					e.preventDefault();

					const drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'wfs')[0];
					const drawSource = drawLayer.getSource() as VectorSource<Geometry>;

					const feature = drawSource.getFeatureById(featureIdState as string);
					const polygon = feature.getGeometry() as Polygon;

					const target = e.target as HTMLFormElement;

					const name = target.querySelector('[name=name]') as HTMLInputElement;
					const address = target.querySelector('[name=address]') as HTMLInputElement;

					const response = await updateTransaction({
						body: {
							address: address.value,
							name: name.value
						},
						geom: polygon.getFlatCoordinates(),
						id: feature.getId() as string
					});

					if (response && !response.ok)
					{
						alert('추가 실패');
					}

					map.getAllLayers().filter((layer) => layer.get('name') === 'wfs')[0].getSource().refresh();

					setShowState(false);
					setFeatureIdState(undefined);
				}}
			>
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