/**
 * WFS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 01:52:32
 */

import { Map, View } from 'ol';
import { GeoJSON } from 'ol/format';
import { Vector as VectorLayer } from 'ol/layer';
import { bbox } from 'ol/loadingstrategy';
import { Vector as VectorSource } from 'ol/source';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';

import { WFS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { sejongPosition } from '../common/position';
import { basicStyle } from '../common/style';
import { urlBuilder } from '../common/util';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * WFS 페이지 JSX 반환 메서드
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

		const map = new Map({
			layers: [ googleRoadLayer, wfsLayer ],
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
					<p>너만의 공간 데이터를 지도에 표현할 수 있다면 멋지지 않을까요?</p>
					<p>그렇다면 <span>WFS</span>를 기억해두세요.</p>
					<br />

					<p>GeoServer라는 GIS엔진을 활용하여 API 형태로 당신만의 <span>데이터를 지도에 표현</span>할 수 있습니다.</p>
					<p>표현되는 데이터들은 <span>Feature 형태</span>로 지도에 표현됩니다.</p>
					<p>사용하는 API 형식은 OGC표준의 <span>GetFeature</span>입니다.</p>
					<br />

					<p>여기 세종시의 건물 데이터를 준비했으니, 한 번 확인해보세요.</p>
					<p>건물의 <span>스타일은 코드 상에서 얼마든지 구현이 가능</span>합니다.</p>
					<p><span>건물 데이터의 값에 따라 디자인을 다르게 표현</span>하는 것도 가능합니다.</p>
					<br />

					<p>이 지도부터 생긴 <FaHome color='dodgerblue' /> 버튼은 맵의 초기 위치로 가는 버튼입니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/15/gis-guide-for-programmer-15' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}