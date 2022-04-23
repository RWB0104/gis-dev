/**
 * 히트 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.03.01 Tue 02:05:31
 */

import { Map, View } from 'ol';
import { Vector as VectorSource } from 'ol/source';
import { Heatmap } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { sejongPosition, seoulPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';
import MapPanel from '../components/map/MapPanel';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import './HeatMap.scss';
import { urlBuilder } from '../common/util';

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

		const wfs = new VectorSource({
			format: new GeoJSON(),
			url: (extent) => urlBuilder(WFS_URL, {
				service: 'WFS',
				version: '2.0.0',
				request: 'GetFeature',
				typename: 'TEST:point_starbucks',
				srsName: 'EPSG:3857',
				outputFormat: 'application/json',
				exceptions: 'application/json',
				bbox: `${extent.join(',')},EPSG:3857`
			}),
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
			layers: [ vworldBaseLayer, vworldHybridLayer, heatLayer ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
				zoom: 13
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
		<section id='heat-map' className='page'>
			<Meta title='Heat Map' description='히트 맵 예제' url='/heat-map/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapPanel map={mapState} width={220} height={155}>
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
					<p>때론 나무 보단 숲을 볼 때가 더욱 중요한 때가 있습니다.</p>
					<p>Feature를 하나하나 보는 것도 좋지만, 데이터의 분포나 패턴을 분석해야할 소요가 발생할 때가 생기기도 합니다.</p>
					<br />

					<p><span>Heat Map은 지도 상의 데이터를 열 분포 형태로 표현</span>해줍니다.</p>
					<p>각 Feature 하나하나를 파악하기 어렵지만, Feature의 전체적인 흐름이나 분포를 파악할 수 있습니다.</p>
					<p>Cluster Map과 마찬가지로 구현 난이도도 그리 어렵지 않습니다.</p>
					<p>우측 상단의 패널에서 <span>블러</span>, <span>반지름</span> 옵션을 변경해보세요.</p>
					<br />

					<p>예를 들어, 스타벅스는 강원도, 특히 강원도 아랫지방엔 거의 입점하지 않고 있다는 걸 파악할 수 있습니다.</p>
					<p>반면 서울, 특히 강남과 시청 지역은 그 수가 매우 밀접합니다.</p>
					<p>같은 데이터도 관점에 따라 얻을 수 있는 정보가 달라질 수 있습니다.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}