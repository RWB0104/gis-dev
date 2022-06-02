/**
 * WebGL 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.04.19 Tue 15:44:37
 */

import { Feature, Map, View } from 'ol';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
import VectorSource from 'ol/source/Vector';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { FiZap, FiZapOff } from 'react-icons/fi';

import { googleRoadLayer } from '../common/layers';
import { sejongPosition } from '../common/position';
import { webGLStyle } from '../common/style';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapPanel from '../components/map/MapPanel';
import SpeedWagon from '../components/map/SpeedWagon';

import './WebGL.scss';

/**
 * WebGL 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WebGL(): JSX.Element
{
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ type, setType ] = useState(true);
	const [ source, setSource ] = useState(new VectorSource()) as [ VectorSource<Geometry>, React.Dispatch<React.SetStateAction<VectorSource<Geometry>>> ];

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const features: Feature<Geometry>[] = [];

		let x = 14333482;
		let y = 4304950;

		for (let i = 0; i < 300000; i++)
		{
			x += 500;

			// 500건마다 뒤로 내림
			if (i % 500 === 0)
			{
				y += 500;

				x -= 250000;
			}

			const point = new Point([ x, y ]);

			const feature = new Feature<Geometry>({ geometry: point });

			features.push(feature);
		}

		const vectorSource = new VectorSource({ features });

		setSource(vectorSource);

		const map = new Map({
			layers: [ googleRoadLayer, getLayer(type, vectorSource) ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				projection: 'EPSG:3857',
				zoom: 17
			})
		});

		map.on('pointermove', (e) => map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '');

		setMapState(map);
	}, []);

	useEffect(() =>
	{
		mapState.getAllLayers().filter((layer) => layer.get('name') === 'wfs').forEach((layer) => mapState.removeLayer(layer));
		mapState.addLayer(getLayer(type, source));
	}, [ type ]);

	return (
		<section className='page' id='webgl'>
			<Meta description='WebGL 적용 예제' title='WebGL' url='/webgl/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapPanel height={85} map={mapState} width={300}>
					<div className='item'>
						<button data-selected={type} onClick={() => setType(true)}><FiZap /> WebGL</button>
						<button data-selected={!type} onClick={() => setType(false)}><FiZapOff /> Non WebGL</button>
					</div>
				</MapPanel>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p><b><span>30만개의 Feature를 동적으로 생성하므로, 약간의 초기 지연시간이 존재합니다!</span></b></p>
					<br />

					<p>다량의 데이터를 표현할 수 있는 방법이 정말 없을까요?</p>
					<p>다행히 꼭 그렇지만은 않습니다. <span>WebGL을 사용하면 많은 양의 데이터도 무리없이 표현이 가능</span>합니다.</p>
					<br />

					<p>이 지도는 임의의 Feature 30만 개를 코드 상에서 생성하여 지도에 표시해줍니다.</p>
					<p>일반적인 Renderer와 달리, WebGL은 엄청나게 많은 양의 데이터를 무리없이 소화할 수 있습니다.</p>
					<br />

					<p>단, OpenLayers에서 제공하는 기능은 <span>Point 객체만을 지원</span>합니다.</p>
					<p>우측 상단 패널에서, WebGL의 유무에 따른 속도 차이를 비교해보세요!</p>
					<p>지도를 많이 축소한 상태에서 <span>Non WebGL</span>을 사용하게 되면 페이지가 멈출 가능성이 높습니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/06/02/gis-guide-for-programmer-25' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}

/**
 * 레이어 반환 메서드
 *
 * @param {boolean} type: 레이어 타입
 * @param {VectorSource<Geometry>} 벡터 소스
 *
 * @returns {WebGLPointsLayer<VectorSource<Geometry>> | VectorLayer<VectorSource<Geometry>>} 레이어
 */
function getLayer(type: boolean, source: VectorSource<Geometry>): WebGLPointsLayer<VectorSource<Geometry>> | VectorLayer<VectorSource<Geometry>>
{
	// Tile 레이어일 경우
	if (type)
	{
		return new WebGLPointsLayer({
			properties: { name: 'wfs' },
			source,
			style: webGLStyle(),
			zIndex: 5
		});
	}

	// Image 레이어일 경우

	return new VectorLayer({
		properties: { name: 'wfs' },
		source,
		zIndex: 5
	});
}