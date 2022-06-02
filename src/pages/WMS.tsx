/**
 * WMS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 03:04:39
 */

import { Map, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import { ImageWMS, TileWMS } from 'ol/source';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { IoAppsSharp, IoImagesSharp } from 'react-icons/io5';

import './WMS.scss';

import { WMS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { sejongPosition } from '../common/position';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapPanel from '../components/map/MapPanel';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * WMS 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WMS(): JSX.Element
{
	const [ type, setType ] = useState(true);
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [ googleRoadLayer, getLayer(type) ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				projection: 'EPSG:3857',
				zoom: 17
			})
		});

		setMapState(map);
	}, []);

	useEffect(() =>
	{
		mapState.getAllLayers().filter((layer) => layer.get('name') === 'wms').forEach((layer) => mapState.removeLayer(layer));
		mapState.addLayer(getLayer(type));
	}, [ type ]);

	return (
		<section className='page' id='wms'>
			<Meta description='WMS 레이어 예제' title='WMS' url='/wms/' />

			<article className='map-wrapper'>
				<div id='map' />

				<MapPanel height={85} map={mapState} width={230}>
					<div className='item'>
						<button data-selected={type} onClick={() => setType(true)}><IoAppsSharp /> Tile</button>
						<button data-selected={!type} onClick={() => setType(false)}><IoImagesSharp /> Image</button>
					</div>
				</MapPanel>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p><span>WMS</span>란 놈은 WFS랑 비슷하지만, 그 동작은 전혀 다릅니다.</p>
					<p>WMS는 데이터를 지도 상에 Feature가 아닌 <span>온전한 그림으로 표시</span>합니다.</p>
					<p>즉, 컴퓨터 입장에선 지도와 동일한 완전한 이미지기 때문에 <span>상호작용이 불가능</span>하다는 특징이 있습니다.</p>
					<p>사용하는 API 형식은 OGC표준의 <span>GetImage</span>입니다.</p>
					<br />

					<p><span>Tile</span>과 <span>Image</span> 방식이 존재합니다.</p>

					<ul>
						<li><b>Tile</b>: 이미지를 <span>여러 타일</span>로 배치한다. 한 화면의 지도에 여러 데이터를 잘게 불러오므로 용량이 작아서 빠르지만, 요청 횟수가 많아진다.</li>
						<li><b>Image</b>: 이미지를 <span>하나의 큰 통짜 이미지</span>로 배치한다. 한꺼번에 불러오므로 용량이 커서 굼뜨지만, 요청 횟수를 줄일 수 있다.</li>
					</ul>

					<p>좌측 상단에서 레이어의 종류를 선택해보세요.</p>
					<p>스타일은 코드 상이 아닌 GeoServer에서 SLD 형태로 미리 작성합니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/16/gis-guide-for-programmer-16' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
				</SpeedWagon>
			</article>
		</section>
	);
}

/**
 * 레이어 반환 메서드
 *
 * @param {boolean} type: 레이어 타입
 *
 * @returns {TileLayer<TileWMS> | ImageLayer<ImageWMS>} 레이어
 */
function getLayer(type: boolean): TileLayer<TileWMS> | ImageLayer<ImageWMS>
{
	// Tile 레이어일 경우
	if (type)
	{
		return new TileLayer({
			minZoom: 15,
			properties: { name: 'wms' },
			source: new TileWMS({
				params: {
					exceptions: 'application/json',
					layers: 'buld_sejong'
				},
				serverType: 'geoserver',
				transition: 0.3,
				url: WMS_URL
			}),
			zIndex: 5
		});
	}

	// Image 레이어일 경우

	return new ImageLayer({
		minZoom: 15,
		properties: { name: 'wms' },
		source: new ImageWMS({
			params: {
				exceptions: 'application/json',
				layers: 'buld_sejong'
			},
			serverType: 'geoserver',
			url: WMS_URL
		}),
		zIndex: 5
	});
}