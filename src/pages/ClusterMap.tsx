/**
 * 클러스터 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.28 Mon 23:45:46
 */

import { Map, Overlay, View } from 'ol';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import { EPSG5179, EPSG5181 } from '../common/proj';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { sejongPosition, seoulPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import { clusterBasicStyle, starbucksBasicStyle, starbucksClickStyle, starbucksHoverStyle } from '../common/style';
import SpeedWagon from '../components/map/SpeedWagon';
import { defaults, Select } from 'ol/interaction';
import { click, pointerMove } from 'ol/events/condition';
import Popup from '../components/map/Popup';
import MapPanel from '../components/map/MapPanel';
import './ClusterMap.scss';
import { osmLayer, vworldBaseLayer, vworldHybridLayer } from '../common/layers';

/**
 * 클러스터 맵 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ClusterMap()
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

	const defaultDistance = 100;

	const [ distanceState, setDistanceState ] = useState(defaultDistance);

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		proj4.defs(EPSG5179.name, EPSG5179.proj);
		proj4.defs(EPSG5181.name, EPSG5181.proj);

		const wfs = new Vector({
			format: new GeoJSON(),
			url: (extent) => `${WFS_URL}?service=WFS&version=2.0.0&request=GetFeature&typename=TEST:point_starbucks&srsName=EPSG:3857&outputFormat=application/json&bbox=${extent.join(',')},EPSG:3857`,
			strategy: bbox
		});

		const clusterSource = new Cluster({
			source: wfs,
			distance: defaultDistance
		});

		const wfsLayer = new VectorLayer({
			source: clusterSource,
			style: feature => feature.get('features').length > 1 ? clusterBasicStyle(feature) : starbucksBasicStyle(feature, 'name'),
			zIndex: 5,
			properties: { name: 'wfs' }
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			filter: feature => feature.get('features').length === 1,
			style: feature => starbucksHoverStyle(feature, 'name')
		});

		const clickSelect = new Select({
			condition: click,
			filter: feature => feature.get('features').length === 1,
			style: feature => starbucksClickStyle(feature, 'name')
		});

		const popup = document.querySelector('.map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			id: 'popup',
			element: popup || undefined,
			positioning: 'bottom-center',
			offset: [ 0, -30 ],
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
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 13,
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
				map.forEachFeatureAtPixel(e.pixel, features =>
				{
					const feature = features.get('features')[0];

					// 피쳐가 하나이며, 해당 객체의 아이디가 point_starbucks으로 시작할 경우
					if (features.get('features').length === 1 && feature.getId()?.toString().startsWith('point_starbucks'))
					{
						const geom = feature.getGeometry();

						// 공간정보가 유효할 경우
						if (geom)
						{
							const [ minX, minY, maxX, maxY ] = geom.getExtent();

							setPopupState((
								<>
									{feature.get('thumbnail') && <div className='thumbnail'>
										<a href={`https://www.starbucks.co.kr/${feature.get('thumbnail')}`} target='_blank'><img src={`https://www.starbucks.co.kr/${feature.get('thumbnail')}`} /></a>
									</div>}

									<ul>
										<li>{feature.getId() || ''}</li>
										<li>{feature.get('name') || <span>이름 없음</span>}</li>
										<li>🏠 {feature.get('doro_addr') ? <a href={`https://map.naver.com/v5/search/${feature.get('doro_addr')}${feature.get('name') && ` 스타벅스 ${feature.get('name')}점`}`} target='_blank'>{feature.get('doro_addr')}{feature.get('name') && ` 스타벅스  ${feature.get('name')}점`}</a> : <span>주소 없음</span>}</li>
										<li>🏠 {feature.get('addr') ? <a href={`https://map.naver.com/v5/search/${feature.get('addr')}${feature.get('name') && ` 스타벅스  ${feature.get('name')}점`}`} target='_blank'>{feature.get('addr')}{feature.get('name') && ` 스타벅스  ${feature.get('name')}점`}</a> : <span>주소 없음</span>}</li>
										<li>📱 {feature.get('tel') ? <a href={`tel:${feature.get('tel')}`} data-tel="true">{feature.get('tel')}</a> : <span>번호 없음</span>}</li>
									</ul>
								</>
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

	useEffect(() =>
	{
		const layer = mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0];

		// 레이어가 유효할 경우
		if (layer)
		{
			const cluster = layer.getSource() as Cluster;
			cluster.setDistance(distanceState);
		}
	}, [ distanceState ]);

	return (
		<section id='cluster-map' className='page'>
			<Meta title='Cluster Map' description='클러스터 맵 예제' url='/cluster-map/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapPanel map={mapState}>
					<div className='item'>
						<div className='head'>
							<small>그룹화 거리 (distance)</small>

							<input readOnly value={distanceState} />
						</div>

						<div className='body'>
							<small>0</small>
							<input type='range' min={0} max={200} step={1} onChange={(e) => setDistanceState(parseInt(e.target.value))} />
							<small>200</small>
						</div>
					</div>
				</MapPanel>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<Popup map={mapState}>{popupState}</Popup>

				<SpeedWagon>
					<p>여기 대한민국의 스타벅스 위치 데이터를 가져왔다!</p>
					<p>정말 많은 지점이 있지만, 이 모든 지점을 한 눈에 보기는 네놈도 어려울거다.</p>
					<br />

					<p>이 때 <span>Cluster Map</span>을 활용하면 지점을 효과적으로 그룹화하여 표시할 수 있지!</p>
					<p>다행히 구현하는 방법도 그리 어렵지 않을거다!</p>
					<br />

					<p>우측 상단 패널에서 그룹화할 <span>Feature의 기준 거리를 조절</span>할 수 있다.</p>
					<p>데이터가 많아도 그룹화로 인해 Feature의 수가 줄어들어 <span>동작이 빨라진다</span>는 점을 알아두도록!</p>
					<br />

					<p>하지만 스타일링을 구현하는 덴 조금 신경을 써줘야 할걸세.</p>
					<p>Feature를 그룹화하는 것 이외엔 나머지와 다를 바 없으니 너무 겁먹지들 말라고.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}