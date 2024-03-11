/**
 * 클러스터 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.28 Mon 23:45:46
 */

import { Map, Overlay, View } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import { GeoJSON } from 'ol/format';
import { defaults, Select } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { bbox } from 'ol/loadingstrategy';
import { Cluster, Vector as VectorSource } from 'ol/source';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';

import './ClusterMap.scss';

import { WFS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { sejongPosition, seoulPosition } from '../common/position';
import { clusterBasicStyle, starbucksBasicStyle, starbucksClickStyle, starbucksHoverStyle } from '../common/style';
import { urlBuilder } from '../common/util';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapPanel from '../components/map/MapPanel';
import Popup from '../components/map/Popup';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * 클러스터 맵 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ClusterMap(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

	const defaultDistance = 100;

	const [ distanceState, setDistanceState ] = useState(defaultDistance);

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
				typename: 'TEST:point_starbucks',
				version: '2.0.0'
			})
		});

		const clusterSource = new Cluster({
			distance: defaultDistance,
			source: wfs
		});

		const wfsLayer = new VectorLayer({
			properties: { name: 'wfs' },
			source: clusterSource,
			style: (feature) => (feature.get('features').length > 1 ? clusterBasicStyle(feature) : starbucksBasicStyle(feature, 'name')),
			zIndex: 5
		});

		const hoverSelect = new Select({
			condition: pointerMove,
			filter: (feature) => feature.get('features').length === 1,
			style: (feature) => starbucksHoverStyle(feature, 'name')
		});

		const clickSelect = new Select({
			condition: click,
			filter: (feature) => feature.get('features').length === 1,
			style: (feature) => starbucksClickStyle(feature, 'name')
		});

		const popup = document.getElementById('map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: popup || undefined,
			id: 'popup',
			offset: [ 0, -30 ],
			positioning: 'bottom-center'
		});

		const map = new Map({
			interactions: defaults().extend([ hoverSelect, clickSelect ]),
			layers: [ googleRoadLayer, wfsLayer ],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				projection: 'EPSG:3857',
				zoom: 13
			})
		});

		map.on('pointermove', (e) => map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '');

		map.on('singleclick', (e) =>
		{
			// 해당 픽셀에 객체가 있을 경우
			if (map.hasFeatureAtPixel(e.pixel))
			{
				map.forEachFeatureAtPixel(e.pixel, (features) =>
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
									{feature.get('thumbnail') && (
										<div className='thumbnail'>
											<a href={`https://www.starbucks.co.kr/${feature.get('thumbnail')}`} rel='noreferrer' target='_blank'><img alt='thumbnail' src={`https://www.starbucks.co.kr/${feature.get('thumbnail')}`} /></a>
										</div>
									)}

									<ul>
										<li>{feature.getId() || ''}</li>
										<li>{feature.get('name') || <span>이름 없음</span>}</li>
										<li>🏠 {feature.get('doro_addr') ? <a href={`https://map.naver.com/v5/search/${feature.get('doro_addr')}${feature.get('name') && ` 스타벅스 ${feature.get('name')}점`}`} rel='noreferrer' target='_blank'>{feature.get('doro_addr')}{feature.get('name') && ` 스타벅스  ${feature.get('name')}점`}</a> : <span>주소 없음</span>}</li>
										<li>🏠 {feature.get('addr') ? <a href={`https://map.naver.com/v5/search/${feature.get('addr')}${feature.get('name') && ` 스타벅스  ${feature.get('name')}점`}`} rel='noreferrer' target='_blank'>{feature.get('addr')}{feature.get('name') && ` 스타벅스  ${feature.get('name')}점`}</a> : <span>주소 없음</span>}</li>
										<li>📱 {feature.get('tel') ? <a data-tel='true' href={`tel:${feature.get('tel')}`}>{feature.get('tel')}</a> : <span>번호 없음</span>}</li>
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
		const layer = mapState.getAllLayers().filter((layer) => layer.get('name') === 'wfs')[0];

		// 레이어가 유효할 경우
		if (layer)
		{
			const cluster = layer.getSource() as Cluster;
			cluster.setDistance(distanceState);
		}
	}, [ distanceState ]);

	return (
		<section className='page' id='cluster-map'>
			<Meta description='클러스터 맵 예제' title='Cluster Map' url='/cluster-map/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapPanel height={100} map={mapState} width={220}>
					<div className='item'>
						<div className='head'>
							<small>그룹화 거리 (distance)</small>

							<input value={distanceState} readOnly />
						</div>

						<div className='body'>
							<small>0</small>
							<input max={200} min={0} step={1} type='range' onChange={(e) => setDistanceState(parseInt(e.target.value))} />
							<small>200</small>
						</div>
					</div>
				</MapPanel>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>이 페이지의 데이터는 국내 스타벅스 전국 매장의 위치 데이터입니다.</p>
					<p>이렇게 광범위한 지역에 걸친 다량의 데이터는, 한 눈에 보기에 어려움이 있습니다.</p>
					<br />

					<p>이 때, <span>Cluster Map</span>을 사용하면 많은 양의 데이터를 쉽게 함축해서 볼 수 있습니다.</p>
					<p>지도에 표현되는 피쳐의 수가 적어지므로 <span>많은 양의 데이터를 빠르게 표현</span>할 수 있습니다.</p>
					<br />

					<p>우측 상단의 패널에서 <span>그룹화 기준 거리를 변경</span>해보세요.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/06/01/gis-guide-for-programmer-23' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>

				<Popup map={mapState}>{popupState}</Popup>
			</article>
		</section>
	);
}