/**
 * 히트 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.03.01 Tue 02:05:31
 */

import { Map, View } from 'ol';
import { OSM, Vector } from 'ol/source';
import { Heatmap } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
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
import SpeedWagon from '../components/map/SpeedWagon';
import MapPanel from '../components/map/MapPanel';
import './ClusterMap.scss';

/**
 * 히트 맵 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function HeatMap()
{
	const [ mapState, setMapState ] = useState(new Map({}));

	const defaultValue = 20;

	const [ blurState, setBlurState ] = useState(defaultValue);
	const [ radiusState, setRadiusState ] = useState(defaultValue);

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

		const heatLayer = new Heatmap({
			source: wfs,
			zIndex: 5,
			properties: { name: 'wfs' },
			blur: defaultValue,
			radius: defaultValue
		});

		const map = new Map({
			layers: [
				heatLayer,
				new TileLayer({
					source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
					properties: { name: 'base' }
				})
			],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 13,
				constrainResolution: true
			})
		});

		setMapState(map);
	}, []);

	useEffect(() =>
	{
		const layer = mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0];

		// 레이어가 유효할 경우
		if (layer)
		{
			const heat = layer as Heatmap;
			heat.setBlur(blurState);
		}
	}, [ blurState ]);

	useEffect(() =>
	{
		const layer = mapState.getAllLayers().filter(layer => layer.get('name') === 'wfs')[0];

		// 레이어가 유효할 경우
		if (layer)
		{
			const heat = layer as Heatmap;
			heat.setBlur(radiusState);
		}
	}, [ radiusState ]);

	return (
		<section id='cluster-map' className='page'>
			<Meta title='Cluster Map' description='클러스터 맵 예제' url='/cluster-map/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapPanel map={mapState}>
					<div className='item'>
						<div className='head'>
							<small>블러 (blur)</small>

							<input readOnly value={blurState} />
						</div>

						<div className='body'>
							<small>0</small>
							<input type='range' value={blurState} min={0} max={100} step={1} onChange={(e) => setBlurState(parseInt(e.target.value))} />
							<small>200</small>
						</div>
					</div>

					<div className='item'>
						<div className='head'>
							<small>반지름 (radius)</small>

							<input readOnly value={radiusState} />
						</div>

						<div className='body'>
							<small>0</small>
							<input type='range' value={radiusState} min={0} max={100} step={1} onChange={(e) => setRadiusState(parseInt(e.target.value))} />
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