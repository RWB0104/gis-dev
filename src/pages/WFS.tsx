/**
 * WFS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 01:52:32
 */

import { Map, View } from 'ol';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { sejongPosition } from '../common/position';
import { WFS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import { basicStyle } from '../common/style';
import SpeedWagon from '../components/map/SpeedWagon';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import { FaHome } from 'react-icons/fa';
import { urlBuilder } from '../common/util';

/**
 * WFS 페이지 JSX 반환 메서드
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
			url: (extent) => urlBuilder(WFS_URL, {
				service: 'WFS',
				version: '2.0.0',
				request: 'GetFeature',
				typename: 'TEST:buld_sejong',
				srsName: 'EPSG:3857',
				outputFormat: 'application/json',
				exceptions: 'application/json',
				bbox: `${extent.join(',')},EPSG:3857`
			}),
			strategy: bbox
		});

		const wfsLayer = new VectorLayer({
			source: wfs,
			style: feature => basicStyle(feature, 'buld_nm'),
			minZoom: 15,
			zIndex: 5,
			properties: { name: 'wfs' }
		});

		const map = new Map({
			layers: [ vworldBaseLayer, vworldHybridLayer, wfsLayer ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				zoom: 17,
				constrainResolution: true
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
					<p>너만의 공간 데이터를 지도에 표현할 수 있다면 멋지지 않겠나?</p>
					<p>그렇다면 <span>WFS</span>를 잘 기억하도록.</p>
					<br />

					<p>GeoServer라는 GIS엔진을 활용하여 API 형태로 너만의 <span>데이터를 지도에 표현</span>할 수 있다.</p>
					<p>표현되는 데이터들은 <span>Feature 형태</span>로 지도에 표현된다.</p>
					<p>사용하는 API 형식은 OGC표준의 <span>GetFeature</span>다!</p>
					<br />

					<p>여기 세종시의 건물 데이터를 준비했으니, 한 번 확인해보도록!</p>
					<p>건물의 <span>스타일은 코드 상에서 얼마든지 구현이 가능</span>하다.</p>
					<p><span>건물 데이터의 값에 따라 디자인을 다르게 표현</span>하는 것도 가능하다걸 알아두는 것도 좋겠지.</p>
					<br />

					<p>아, 갑자기 생긴 <FaHome color='dodgerblue' />는 맵의 초기 위치로 가는 버튼이야. 크게 중요한 건 아니니 알아만 둬.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}