/**
 * WMS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.21 Mon 23:48:03
 */

import { Map, Overlay, View } from 'ol';
import { ImageWMS, TileWMS, Vector } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import React, { useEffect, useState } from 'react';
import proj4 from 'proj4';
import ImageLayer from 'ol/layer/Image';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapBoard from '../components/map/MapBoard';
import { IoAppsSharp, IoImagesSharp } from 'react-icons/io5';
import Popup from '../components/map/Popup';
import './WMSPopup.scss';
import { GeoJSON } from 'ol/format';
import { getCenter } from 'ol/extent';
import { sejongPosition } from '../common/position';
import { WMS_URL } from '../common/env';
import Meta from '../components/global/Meta';
import SpeedWagon from '../components/map/SpeedWagon';
import { vworldBaseLayer, vworldHybridLayer } from '../common/layers';
import MapPanel from '../components/map/MapPanel';

/**
 * WMS 팝업 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WMS()
{
	const [ type, setType ] = useState(true);
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const popup = document.getElementById('map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			id: 'popup',
			element: popup || undefined,
			positioning: 'center-center',
			autoPan: {
				animation: {
					duration: 250
				}
			}
		});

		const map = new Map({
			layers: [ vworldBaseLayer, vworldHybridLayer, getLayer(type) ],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				projection: 'EPSG:3857',
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				zoom: 17,
				constrainResolution: true
			})
		});

		map.on('singleclick', async (e) =>
		{
			const wmsLayer = map.getAllLayers().filter(layer => layer.get('name') === 'wms')[0];

			const source: TileWMS | ImageWMS = wmsLayer.getSource();

			const url = source.getFeatureInfoUrl(e.coordinate, map.getView().getResolution() || 0, 'EPSG:3857', {
				QUERY_LAYERS: 'buld_sejong',
				INFO_FORMAT: 'application/json'
			});

			// GetFeatureInfo URL이 유효할 경우
			if (url)
			{
				const request = await fetch(url.toString(), { method: 'GET' }).catch(e => alert(e.message));

				// 응답이 유효할 경우
				if (request)
				{
					// 응답이 정상일 경우
					if (request.ok)
					{
						const json = await request.json();

						// 객체가 하나도 없을 경우
						if (json.features.length === 0)
						{
							overlay.setPosition(undefined);
						}

						// 객체가 있을 경우
						else
						{
							const feature = new GeoJSON().readFeature(json.features[0]);
							const vector = new Vector({ features: [ feature ] });

							setPopupState(
								<ul>
									<li>{feature.getId() || ''}</li>
									<li>{feature.get('buld_nm') || <span>이름 없음</span>}</li>
									<li>{feature.get('bul_man_no')}</li>
								</ul>
							);

							overlay.setPosition(getCenter(vector.getExtent()));
						}
					}

					// 아닐 경우
					else
					{
						alert(request.status);
					}
				}
			}
		});

		setMapState(map);
	}, []);

	useEffect(() =>
	{
		mapState.getAllLayers().filter(layer => layer.get('name') === 'wms').forEach(layer => mapState.removeLayer(layer));
		mapState.addLayer(getLayer(type));
	}, [ type ]);

	return (
		<section id='wms-popup' className='page'>
			<Meta title='WMS Popup' description='WMS 팝업 표시 예제' url='/WMS-popup/' />

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
					<p>WMS는 상호작용이 불가능하지만, WMS 또한 팝업을 구현할 수 있습니다.</p>
					<p>물론 Feature가 아닌 순수 이미지인 탓에, 방식은 조금 다르다는 특징이 있습니다.</p>
					<p>OGC 표준의 <span>GetFeatureInfo</span>를 통해 현재 지도 상의 Feature 데이터 호출이 가능합니다.</p>
					<br />

					<p>이미 저장된 Feature의 값을 불러오는 WFS와 다르게, <span>WMS는 API 호출을 통해 Feature의 값을 별도로 불러오는 과정</span>이 있습니다.</p>
				</SpeedWagon>

				<Popup map={mapState}>{popupState}</Popup>
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