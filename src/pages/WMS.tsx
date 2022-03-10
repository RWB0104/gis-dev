/**
 * WMS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 03:04:39
 */

import { Map, View } from 'ol';
import { ImageWMS, TileWMS } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import ImageLayer from 'ol/layer/Image';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { IoAppsSharp, IoImagesSharp } from 'react-icons/io5';
import { sejongPosition } from '../common/position';
import { WMS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import MapPanel from '../components/map/MapPanel';
import './WMS.scss';

/**
 * WMS 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WMS()
{
	const [ type, setType ] = useState(true);
	const [ mapState, setMapState ] = useState(new Map({}));

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const map = new Map({
			layers: [ vworldBaseLayer, vworldHybridLayer, getLayer(type) ],
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

	useEffect(() =>
	{
		mapState.getAllLayers().filter(layer => layer.get('name') === 'wms').forEach(layer => mapState.removeLayer(layer));
		mapState.addLayer(getLayer(type));
	}, [ type ]);

	return (
		<section id='wms' className='page'>
			<Meta title='WMS' description='WMS 레이어 예제' url='/wms/' />

			<article className='map-wrapper'>
				<div id='map'></div>

				<MapPanel map={mapState} width={230} height={85}>
					<div className='item'>
						<button onClick={() => setType(true)} data-selected={type}><IoAppsSharp /> Tile</button>
						<button onClick={() => setType(false)} data-selected={!type}><IoImagesSharp /> Image</button>
					</div>
				</MapPanel>

				<MapInteraction>
					<HomeButton map={mapState} position={sejongPosition} />
					<LocationWithMarker map={mapState} />
				</MapInteraction>

				<MapBoard map={mapState} />

				<SpeedWagon>
					<p><span>WMS</span>란 놈은 WFS랑 비슷하지만, 실상은 전혀 다르네.</p>
					<p>WMS는 데이터를 지도 상에 Feature가 아닌 <span>온전한 그림으로 표시</span>한다.</p>
					<p>즉, 컴퓨터 입장에선 지도와 동일한 완전한 이미지기 때문에 <span>상호작용이 불가능</span>하다네!</p>
					<p>사용하는 API 형식은 OGC표준의 <span>GetImage</span>다!</p>
					<br />

					<p><span>Tile</span>과 <span>Image</span> 방식이 존재한다.</p>

					<ul>
						<li><b>Tile</b>: 이미지를 <span>여러 타일</span>로 배치한다. 한 화면의 지도에 여러 데이터를 잘게 불러오므로 용량이 작아서 빠르지만, 요청 횟수가 많아진다.</li>
						<li><b>Image</b>: 이미지를 <span>하나의 큰 통짜 이미지</span>로 배치한다. 한꺼번에 불러오므로 용량이 커서 굼뜨지만, 요청 횟수를 줄일 수 있다.</li>
					</ul>

					<p>좌측 상단에서 레이어의 종류를 선택해보도록!</p>
					<p>스타일은 코드 상이 아닌 GeoServer에서 SLD 형태로 미리 지정해둔다.</p>
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
			source: new TileWMS({
				url: WMS_URL,
				params: {
					layers: 'buld_sejong',
					exceptions: 'application/json'
				},
				transition: 0.3,
				serverType: 'geoserver'
			}),
			minZoom: 15,
			properties: { name: 'wms' },
			zIndex: 5
		});
	}

	// Image 레이어일 경우
	else
	{
		return new ImageLayer({
			source: new ImageWMS({
				url: WMS_URL,
				params: {
					layers: 'buld_sejong',
					exceptions: 'application/json'
				},
				serverType: 'geoserver'
			}),
			minZoom: 15,
			properties: { name: 'wms' },
			zIndex: 5
		});
	}
}