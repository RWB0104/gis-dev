/**
 * WFS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 10:17:24
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

import { WFS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { sejongPosition } from '../common/position';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import { urlBuilder } from '../common/util';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import Popup from '../components/map/Popup';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * WFS 팝업 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFSPopup(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

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
				typename: 'TEST:buld_sejong',
				version: '2.0.0'
			})
		});

		const wfsLayer = new VectorLayer({
			minZoom: 15,
			properties: { name: 'wfs' },
			source: wfs,
			style: (feature) => basicStyle(feature, 'buld_nm'),
			zIndex: 5
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			style: (feature) => hoverStyle(feature, 'buld_nm')
		});

		const clickSelect = new Select({
			condition: click,
			style: (feature) => clickStyle(feature, 'buld_nm')
		});

		const popup = document.getElementById('map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: popup || undefined,
			id: 'popup',
			positioning: 'center-center'
		});

		const map = new Map({
			interactions: defaults().extend([ clickSelect, hoverSelect ]),
			layers: [ googleRoadLayer, wfsLayer ],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				projection: 'EPSG:3857',
				zoom: 17
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
		<section className='page' id='wfs-popup'>
			<Meta description='WFS 팝업 표시 예제' title='WFS Popup' url='/wfs-popup/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>이전에 지도를 사용해봤다면, 지도의 요소 데이터를 보여주는 팝업을 본 적이 있을겁니다.</p>
					<p>이 페이지에선 WFS를 통해 <span>호출한 Feature의 팝업</span>을 구현합니다.</p>
					<br />

					<p>이미 WFS를 통해 지도에 표시되는 Feature의 정보를 가지고 있으므로, 클릭 시 해당 Feature가 가진 값을 보여주기만 하면 됩니다.</p>
					<p>팝업은 미리 HTML 태그를 작성해두고, OL의 <span>Overlay</span>로 사용하는 방식입니다.</p>
					<p>클릭한 Feature를 지도상에 연계하여 표시하는 게 생각보다 귀찮으니 코드를 자세히 봐두는 것도 도움이 될 것입니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/25/gis-guide-for-programmer-18' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>

				<Popup map={mapState}>{popupState}</Popup>
			</article>
		</section>
	);
}