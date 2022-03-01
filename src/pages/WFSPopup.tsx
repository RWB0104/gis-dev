/**
 * WFS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 10:17:24
 */

import { Map, Overlay, View } from 'ol';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import Popup from '../components/map/Popup';
import { sejongPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import { click, pointerMove } from 'ol/events/condition';
import { defaults, Select } from 'ol/interaction';
import SpeedWagon from '../components/map/SpeedWagon';
import { osmLayer, vworldBaseLayer, vworldHybridLayer } from '../common/layers';

/**
 * WFS 팝업 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFSPopup()
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const wfs = new Vector({
			format: new GeoJSON(),
			url: (extent) => `${WFS_URL}?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:buld_sejong&srsName=EPSG:3857&outputFormat=application/json&bbox=${extent.join(',')},EPSG:3857`,
			strategy: bbox
		});

		const wfsLayer = new VectorLayer({
			source: wfs,
			style: feature => basicStyle(feature, 'buld_nm'),
			minZoom: 15,
			zIndex: 5,
			properties: { name: 'wfs' }
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			style: feature => hoverStyle(feature, 'buld_nm')
		});

		const clickSelect = new Select({
			condition: click,
			style: feature => clickStyle(feature, 'buld_nm')
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
			interactions: defaults().extend([ clickSelect, hoverSelect ]),
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				zoom: 17,
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
					// 해당 객체의 아이디가 buld_sejong으로 시작할 경우
					if (feature.getId()?.toString().startsWith('buld_sejong'))
					{
						const geom = feature.getGeometry();

						// 공간정보가 유효할 경우
						if (geom)
						{
							const [ minX, minY, maxX, maxY ] = geom.getExtent();

							setPopupState((
								<ul>
									<li>{feature.getId() || ''}</li>
									<li>{feature.get('buld_nm') || <span>이름 없음</span>}</li>
									<li>{feature.get('bul_man_no')}</li>
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
		<section id='wfs-popup' className='page'>
			<Meta title='WFS Popup' description='WFS 팝업 표시 예제' url='/wfs-popup/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<Popup map={mapState}>{popupState}</Popup>

				<SpeedWagon>
					<p>이전에 지도를 사용해봤다면, 지도의 요소 데이터를 보여주는 팝업을 본 적이 있겠지?</p>
					<p>이 페이지에선 WFS를 통해 <span>호출한 Feature의 팝업</span>을 구현한다!</p>
					<br />

					<p>이미 WFS를 통해 지도에 표시되는 Feature의 정보를 가지고 있으므로, 클릭 시 해당 Feature가 가진 값을 보여주기만 하면 된다.</p>
					<p>팝업은 미리 HTML 태그를 작성해두고, OL의 <span>Overlay</span>로 사용하는 방식이야.</p>
					<p>클릭한 Feature를 지도상에 연계하여 표시하는 게 생각보다 귀찮으니 코드를 유심있게 보도록 하라고.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}