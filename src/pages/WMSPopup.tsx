/**
 * WMS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.21 Mon 23:48:03
 */

import { Map, Overlay, View } from 'ol';
import { getCenter } from 'ol/extent';
import { GeoJSON } from 'ol/format';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import { ImageWMS, TileWMS, Vector } from 'ol/source';
import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';
import { IoAppsSharp, IoImagesSharp } from 'react-icons/io5';

import './WMSPopup.scss';

import { WMS_URL } from '../common/env';
import { googleRoadLayer } from '../common/layers';
import { sejongPosition } from '../common/position';
import Meta from '../components/global/Meta';
import MapBoard from '../components/map/MapBoard';
import MapInteraction, { LocationWithMarker, HomeButton } from '../components/map/MapInteraction';
import MapPanel from '../components/map/MapPanel';
import Popup from '../components/map/Popup';
import SpeedWagon from '../components/map/SpeedWagon';

/**
 * WMS 팝업 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function WMS(): JSX.Element
{
	const [ type, setType ] = useState(true);
	const [ mapState, setMapState ] = useState(new Map({}));
	const [ popupState, setPopupState ] = useState() as [JSX.Element, React.Dispatch<React.SetStateAction<JSX.Element>>];

	useEffect(() =>
	{
		document.querySelector('#map > .ol-viewport')?.remove();

		const popup = document.getElementById('map-popup') as HTMLElement | null;

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: popup || undefined,
			id: 'popup',
			positioning: 'center-center'
		});

		const map = new Map({
			layers: [ googleRoadLayer, getLayer(type) ],
			overlays: [ overlay ],
			target: 'map',
			view: new View({
				center: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
				projection: 'EPSG:3857',
				zoom: 17
			})
		});

		map.on('singleclick', async (e) =>
		{
			const wmsLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'wms')[0];

			const source: TileWMS | ImageWMS = wmsLayer.getSource();

			const url = source.getFeatureInfoUrl(e.coordinate, map.getView().getResolution() || 0, 'EPSG:3857', {
				INFO_FORMAT: 'application/json',
				QUERY_LAYERS: 'buld_sejong'
			});

			// GetFeatureInfo URL이 유효할 경우
			if (url)
			{
				const request = await fetch(url.toString(), { method: 'GET' }).catch((e) => alert(e.message));

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
		mapState.getAllLayers().filter((layer) => layer.get('name') === 'wms').forEach((layer) => mapState.removeLayer(layer));
		mapState.addLayer(getLayer(type));
	}, [ type ]);

	return (
		<section className='page' id='wms-popup'>
			<Meta description='WMS 팝업 표시 예제' title='WMS Popup' url='/WMS-popup/' />

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
					<p>WMS는 상호작용이 불가능하지만, WMS 또한 팝업을 구현할 수 있습니다.</p>
					<p>물론 Feature가 아닌 순수 이미지인 탓에, 방식은 조금 다르다는 특징이 있습니다.</p>
					<p>OGC 표준의 <span>GetFeatureInfo</span>를 통해 현재 지도 상의 Feature 데이터 호출이 가능합니다.</p>
					<br />

					<p>이미 저장된 Feature의 값을 불러오는 WFS와 다르게, <span>WMS는 API 호출을 통해 Feature의 값을 별도로 불러오는 과정</span>이 있습니다.</p>
					<br />

					<p>자세한 내용은 <a href='https://blog.itcode.dev/projects/2022/05/28/gis-guide-for-programmer-19' rel='noreferrer' target='_blank'>여기</a>를 참조하세요.</p>
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