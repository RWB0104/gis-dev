/**
 * Feature 클릭 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 05:01:07
 */

import { Map, View } from 'ol';
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
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * Feature 클릭 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WFS(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));

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

		const map = new Map({
			interactions: defaults().extend([ clickSelect, hoverSelect ]),
			layers: [googleRoadLayer, wfsLayer ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				projection: 'EPSG:3857',
				zoom: 17
			})
		});

		setMapState(map);
	}, []);

	return (
		<section className='page' id='wfs'>
			<Meta description='WFS 레이어 예제' title='WFS' url='/wfs/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p>지도 상의 객체 중 하나인 Feature는 상호작용이 가능합니다.</p>
					<p>WFS는 데이터를 지도 상의 Feature로 표현하기 때문에 지도에 다양한 상호작용을 적용할 수 있습니다.</p>
					<br />

					<p><span>Select</span> 객체를 통해 상호작용에 따라 <span>Feature의 스타일</span>을 변경할 수 있습니다.</p>
					<p><span>마우스 호버</span>, <span>클릭</span>에 대한 상호작용이 구현되어 있으니 직접 객체를 클릭해보세요.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/21/gis-guide-for-programmer-17' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}