/**
 * WebGL 미적용 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.04.19 Tue 15:44:37
 */

import { Feature, Map, Overlay, View } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
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

/**
 * WFS 팝업 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function NonWebGL()
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

		const wfsLayer = new VectorLayer({
			source: vectorSource,
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
			layers: [ vworldBaseLayer, vworldHybridLayer, wfsLayer ],
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
		<section id='non-webgl' className='page'>
			<Meta title='Non WebGL' description='WebGL 미적용 비교군 예제' url='/wfs-popup/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>만약, 엄청난 양의 데이터를 지도에 표시해야만 한다면 어떨까요?</p>
					<p>구현은 어렵지 않겠지만, 너무 많은 양의 데이터는 OpenLayers가 감당하기 어려울겁니다.</p>
					<br />

					<p>이 데이터는 30만 건의 Feature를 코드 상에서 생성하여 표현한 지도입니다.</p>
					<p>아마 매우 느릴 테니 주의하세요.</p>
					<br />

					<p>OpenLayers는 지도에 수 만건 이상의 객체를 표현하지 않도록 권고하고 있습니다.</p>
					<p>만약, 많은 양의 데이터를 표시해야한다면, Cluster Map을 활용하는 것이 좋습니다.</p>
					<p>그래도 반드시 전부 표현해야겠다면, 어떤 일이 생길까요?</p>
				</SpeedWagon>

				<Popup map={mapState}>{popupState}</Popup>
			</article>
		</section>
	);
}