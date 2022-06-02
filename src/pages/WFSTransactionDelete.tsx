/**
 * WFS Transaction 삭제 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 02:20:46
 */

import { Map, Overlay, View } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import { GeoJSON } from 'ol/format';
import { defaults, Select } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { bbox } from 'ol/loadingstrategy';
import { Vector as VectorSource } from 'ol/source';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { MdClose, MdDelete } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './WFSTransactionDelete.scss';

import { featureIdAtom, showAtom } from '../common/atom';
import { WFS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { seoulPosition } from '../common/position';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import { deleteTransaction } from '../common/transaction';
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
 * WFS Transaction 삭제 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFSTransactionDelete(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [ JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>> ];

	const setFeatureIdState = useSetRecoilState(featureIdAtom);
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
			style: (feature) => hoverStyle(feature, 'name')
		});

		const clickSelect = new Select({
			condition: click,
			style: (feature) => clickStyle(feature, 'name')
		});

		const popup = document.getElementById('map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: popup || undefined,
			id: 'popup',
			positioning: 'center-center'
		});

		const map = new Map({
			interactions: defaults().extend([ hoverSelect, clickSelect ]),
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

							setFeatureIdState(feature.getId());

							overlay.setPosition([ (maxX + minX) / 2, (maxY + minY) / 2 ]);
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
		<section className='page' id='transaction-delete'>
			<Meta description='WFS 트랜잭션 삭제 예제' title='WFS Transaction Delete' url='/transaction-delete/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapInteraction>
					<HomeButton map={mapState} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<DeleteForm map={mapState} />

				<SpeedWagon>
					<p>WFS Transaction 중 Delete는 <span>지도 상의 도형을 삭제</span>할 수 있습니다.</p>
					<p>Feature를 클릭하고 <MdDelete color='crimson' /> 버튼을 눌러 Feature를 삭제해보세요.</p>
					<br />

					<p>이 페이지는 하나만 삭제할 수 있도록 구성되어있지만, 구성하기에 따라 조건에 맞는 여러 Feature를 동시에 삭제할 수도 있습니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/31/gis-guide-for-programmer-22' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>

				<Popup
					map={mapState}
					onDeleteClick={() =>
					{
						setShowState(true);
						mapState.getOverlayById('popup').setPosition(undefined);
					}}
				>{popupState}
				</Popup>
			</article>
		</section>
	);
}

/**
 * 삭제 폼 Element 반환 메서드
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
function DeleteForm({ map }: SubProps): JSX.Element | null
{
	const [ featureIdState, setFeatureIdState ] = useRecoilState(featureIdAtom);
	const [ showState, setShowState ] = useRecoilState(showAtom);

	return map ? (
		<div className='delete-form' data-show={showState}>
			<form
				onReset={() =>
				{
					setFeatureIdState(undefined);
					setShowState(false);
				}}
				onSubmit={async (e) =>
				{
					e.preventDefault();

					const id = featureIdState as string | number;
					const request = await deleteTransaction({ id });

					// 삭제에 실패할 경우
					if (request && !request.ok)
					{
						alert('삭제 실패');
					}

					setFeatureIdState(undefined);
					setShowState(false);

					map.getAllLayers().filter((layer) => layer.get('name') === 'wfs')[0].getSource().refresh();
				}}
			>
				<div className='form-row'>
					<h4>정말 삭제하시겠습니까?</h4>
				</div>

				<div className='form-row'>
					<b>{featureIdState}</b>
				</div>

				<div className='form-row'>
					<p><small>삭제된 피쳐는 다시 복구할 수 없습니다.</small></p>
					<p><small><del>근데 뭐 싹 다 지워도 크게 의미 없음</del></small></p>
				</div>

				<div className='form-interaction'>
					<button type='submit'><MdDelete /> 삭제</button>
					<button type='reset'><MdClose /> 취소</button>
				</div>
			</form>
		</div>
	) : null;
}