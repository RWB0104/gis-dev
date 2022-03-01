/**
 * Feature 클릭 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 05:01:07
 */

import { Map, View } from 'ol';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { defaults, Select } from 'ol/interaction';
import { click, pointerMove } from 'ol/events/condition';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { sejongPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import { basicStyle, clickStyle, hoverStyle } from '../common/style';
import SpeedWagon from '../components/map/SpeedWagon';
import { osmLayer, vworldBaseLayer, vworldHybridLayer } from '../common/layers';

/**
 * Feature 클릭 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFS()
{
	const [ mapState, setMapState ] = useState(new Map({}));

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

		const map = new Map({
			layers: [ osmLayer, vworldBaseLayer, vworldHybridLayer, wfsLayer ],
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

		setMapState(map);
	}, []);

	return (
		<section id='wfs' className='page'>
			<Meta title='WFS' description='WFS 레이어 예제' url='/wfs/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>내가 이전에 Feature는 상호작용이 가능하다고 얘기했던가?</p>
					<p>WFS는 Feature로 표현하기 때문에 지도에 UX를 적용할 수 있다!</p>
					<br />

					<p><span>Select</span> 객체를 통해 <span>상호작용에 따라 Feature의 스타일</span>을 바꿀 수 있지.</p>
					<p><span>마우스 호버</span>, <span>클릭</span>에 대한 상호작용이 구현되어 있으니 한 번 해보도록!</p>
				</SpeedWagon>
			</article>
		</section>
	);
}