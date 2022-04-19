/**
 * WebGL 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.04.19 Tue 15:44:37
 */

import { Feature, Map, Overlay, View } from 'ol';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import Popup from '../components/map/Popup';
import { sejongPosition } from '../common/position';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
import { webGLStyle } from '../common/style';

/**
 * WebGL 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WebGL()
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

	const features: Feature<Geometry>[] = [];

	let x = 14192766;
	let y = 4353014;

	for (let i = 0; i < 300000; i++)
	{
		x += 100;

		// 500건마다 뒤로 내림
		if (i % 500 === 0)
		{
			y += 100;

			x -= 50000;
		}

		const point = new Point([ x, y ]);

		const feature = new Feature<Geometry>({
			geometry: point
		});

		features.push(feature);
	}

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const vectorSource = new VectorSource({
			features: features
		});

		const webglLayer = new WebGLPointsLayer({
			source: vectorSource,
			style: webGLStyle(),
			zIndex: 5,
			properties: { name: 'wfs' }
		});

		const popup = document.getElementById('map-popup') as HTMLElement | null;

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
			layers: [ vworldBaseLayer, vworldHybridLayer, webglLayer ],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				zoom: 17,
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

				<SpeedWagon>
					<p>다량의 데이터를 표현할 수 있는 방법이 정말 없을까요?</p>
					<p>다행히 꼭 그렇지만은 않습니다. <span>WebGL을 사용하면 많은 양의 데이터도 무리없이 표현이 가능</span>합니다.</p>
					<br />

					<p>이 지도는 임의의 Feature 30만 개를 코드 상에서 생성하여 지도에 표시해줍니다.</p>
					<p>일반적인 Renderer와 달리, WebGL은 엄청나게 많은 양의 데이터를 무리없이 소화할 수 있습니다.</p>
					<br />

					<p>단, OpenLayers에서 제공하는 기능은 <span>Point 객체만을 지원</span>합니다.</p>
					<p>WebGL을 적용하지 않으면서, 동일한 데이터를 표현하는 지도도 있으니, 직접 비교해보세요.</p>
				</SpeedWagon>

				<Popup map={mapState}>{popupState}</Popup>
			</article>
		</section>
	);
}