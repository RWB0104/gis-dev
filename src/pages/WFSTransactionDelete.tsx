/**
 * WFS Transaction 삭제 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 02:20:46
 */

import { Map, Overlay, View } from 'ol';
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
import { WFS_URL } from '../common/env';
import './WFSTransactionDelete.scss';
import Meta from '../components/global/Meta';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { featureIdAtom, showAtom } from '../common/atom';
import { MdClose, MdDelete } from 'react-icons/md';
import { deleteTransaction } from '../common/transaction';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import { defaults, Select } from 'ol/interaction';
import { click, pointerMove } from 'ol/events/condition';

interface SubProps
{
	map?: Map
}

/**
 * WFS Transaction 삭제 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFSTransactionDelete()
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [ JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>> ];

	const setFeatureIdState = useSetRecoilState(featureIdAtom);
	const setShowState = useSetRecoilState(showAtom);

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
			style: basicStyle,
			properties: {
				name: 'wfs'
			},
			minZoom: 15,
			zIndex: 5
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			style: hoverStyle
		});

		const clickSelect = new Select({
			condition: click,
			style: clickStyle
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
			}),
			interactions: defaults().extend([ hoverSelect, clickSelect ])
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
		<section id='transaction-update' className='page'>
			<Meta title='WFS Transaction Update' description='WFS 트랜잭션 갱신 예제' url='/transaction-update/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<HomeButton map={mapState} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<Popup map={mapState} onDeleteClick={() =>
				{
					setShowState(true);
					mapState.getOverlayById('popup').setPosition(undefined);
				}}>{popupState}</Popup>

				<DeleteForm map={mapState} />
			</article>
		</section>
	);
}

/**
 * 삭제 폼 Element 반환 메서드
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
function DeleteForm({ map }: SubProps)
{
	const [ featureIdState, setFeatureIdState ] = useRecoilState(featureIdAtom);
	const [ showState, setShowState ] = useRecoilState(showAtom);

	return map ? (
		<div className='delete-form' data-show={showState}>
			<form
				onSubmit={async (e) =>
				{
					e.preventDefault();

					const id = featureIdState as string | number;
					const request = await deleteTransaction({ id: id });

					// 삭제에 실패할 경우
					if (!request.ok)
					{
						alert('삭제 실패');
					}

					setFeatureIdState(undefined);
					setShowState(false);

					map.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0].getSource().refresh();
				}}
				onReset={() =>
				{
					setFeatureIdState(undefined);
					setShowState(false);
				}}>
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