/**
 * 맵 상호작용 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 00:54:06
 */

import { Feature, Map, View } from 'ol';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import Draw, { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import proj4 from 'proj4';
import { BiCurrentLocation } from 'react-icons/bi';
import { FaEdit, FaHome, FaPlus } from 'react-icons/fa';
import { seoulPosition } from '../../common/position';
import './MapInteraction.scss';

interface Props
{
	children?: JSX.Element | JSX.Element[]
}

interface SubProps
{
	map?: Map
}

interface SubProps2
{
	map?: Map,
	position?: number[]
}

interface SubProps3
{
	map?: Map,
	drawend?: (e: DrawEvent) => void
}

/**
 * 맵 상호작용 JSX 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function MapInteraction({ children }: Props)
{
	return (
		<div className='map-interaction'>
			{children}
		</div>
	);
}

/**
 * 위치 버튼 JSX 반환 메서드
 *
 * @param {SubProps} props: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export function Location({ map }: SubProps)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		const onClick = () =>
		{
			// 지오로케이션 사용이 가능할 경우
			if ('geolocation' in navigator)
			{
				navigator.geolocation.getCurrentPosition(position =>
				{
					const { latitude, longitude } = position.coords;
					const baseEPSG = map.getView().getProjection().getCode();

					flyTo(map.getView(), proj4('EPSG:4326', baseEPSG, [ longitude, latitude ]));
				}, () => alert('실패'), { enableHighAccuracy: true });
			}

			// 아닐 경우
			else
			{
				alert('사용자 위치를 확인할 수 없습니다.');
			}
		};

		return (
			<button className='location' onClick={onClick}><BiCurrentLocation size={25} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

/**
 * 위치 마커 추가 버튼 Element 반환 메서드
 *
 * @param {SubProps} props: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
export function LocationWithMarker({ map }: SubProps)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		map.on('pointerdrag', () =>
		{
			map.getAllLayers().filter(layer => layer.get('name') === 'location')[0].getSource().clear();
		});

		// 로케이션 벡터 레이어가 없을 경우
		if (map.getAllLayers().filter(layer => layer.get('name') === 'location').length === 0)
		{
			map.addLayer(new VectorLayer({
				source: new VectorSource(),
				properties: {
					name: 'location'
				},
				style: new Style({
					image: new Icon({
						src: 'https://tsauerwein.github.io/ol3/animation-flights/examples/data/icon.png'
					})
				}),
				minZoom: 15
			}));
		}

		const onClick = () =>
		{
			// 지오로케이션 사용이 가능할 경우
			if ('geolocation' in navigator)
			{
				navigator.geolocation.getCurrentPosition(position =>
				{
					const { latitude, longitude } = position.coords;
					const baseEPSG = map.getView().getProjection().getCode();

					const coord = proj4('EPSG:4326', baseEPSG, [ longitude, latitude ]);

					flyTo(map.getView(), coord);

					map.getAllLayers().filter(layer => layer.get('name') === 'location')[0].getSource().addFeature(new Feature({
						geometry: new Point(coord)
					}));
				}, () => alert('실패'), { enableHighAccuracy: true });
			}

			// 아닐 경우
			else
			{
				alert('사용자 위치를 확인할 수 없습니다.');
			}
		};

		return (
			<button className='location' title='현재 위치 이동' onClick={onClick}><BiCurrentLocation size={25} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

/**
 * 초기 위치 이동 버튼 Element 반환 메서드
 *
 * @param {SubProps2} props: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
export function HomeButton({ map, position = seoulPosition }: SubProps2)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		const onClick = () =>
		{
			flyTo(map.getView(), proj4('EPSG:4326', 'EPSG:3857', position));
		};

		return (
			<button className='sejong' title='세종시 이동' onClick={onClick}><FaHome size={25} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

/**
 * 폴리곤 추가 버튼 Element 반환 메서드
 *
 * @param {SubProps3} param0: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
export function AddPolygon({ map, drawend }: SubProps3)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		let drawLayer = map.getAllLayers().filter(layer => layer.get('name') === 'draw')[0];

		// 드로우 벡터 레이어가 없을 경우
		if (!drawLayer)
		{
			const drawSource = new VectorSource();

			drawLayer = new VectorLayer({
				source: drawSource,
				properties: { name: 'draw' }
			});

			map.addLayer(drawLayer);
		}

		const drawInteraction = new Draw({
			source: drawLayer.getSource(),
			type: 'Polygon'
		});

		document.onkeyup = (e) =>
		{
			// ESC를 눌렀을 경우
			if (e.key.toLowerCase() === 'escape')
			{
				map.removeInteraction(drawInteraction);
			}
		};

		document.oncontextmenu = () =>
		{
			map.removeInteraction(drawInteraction);
		};

		const onClick = () =>
		{
			drawInteraction.on('drawstart', () =>
			{
				const source: VectorSource<Geometry> = drawLayer.getSource();
				source.clear();
			});

			// 드로우 종료 메서드가 있을 경우
			if (drawend)
			{
				drawInteraction.on('drawend', (e) =>
				{
					drawend(e);
					map.removeInteraction(drawInteraction);
				});
			}

			map.addInteraction(drawInteraction);
		};

		return (
			<button className='add' title='건물 추가' onClick={onClick}><FaPlus size={20} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

export function UpdatePolygon({ map }: SubProps)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		map.on('singleclick', (e) =>
		{
			// 해당 픽셀에 객체가 있을 경우
			if (map.hasFeatureAtPixel(e.pixel))
			{
				map.forEachFeatureAtPixel(e.pixel, feature =>
				{
					// 해당 객체의 아이디가 buld_test으로 시작할 경우
					if (feature.getId()?.toString().startsWith('buld_test'))
					{
						console.dir(feature);
					}
				});
			}
		});

		return (
			<button className='update' title='건물 갱신'><FaEdit size={20} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

/**
 * 폴리곤 삭제 버튼 Element 반환 메서드
 *
 * @param {SubProps3} param0: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
export function DeletePolygon({ map }: SubProps)
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		map.on('singleclick', (e) =>
		{
			// 해당 픽셀에 객체가 있을 경우
			if (map.hasFeatureAtPixel(e.pixel))
			{
				map.forEachFeatureAtPixel(e.pixel, feature =>
				{
					// 해당 객체의 아이디가 buld_test으로 시작할 경우
					if (feature.getId()?.toString().startsWith('buld_test'))
					{
						console.dir(feature);
					}
				});
			}
		});

		return (
			<button className='delete' title='건물 삭제'><FaPlus size={20} color="white" /></button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

/**
 * 비행 애니메이션 메서드
 *
 * @param {View} view: 뷰 객체
 * @param {number[]} location: 좌표 (EPSG:4326)
 */
function flyTo(view: View, location: number[])
{
	const duration = 2000;
	const zoom = view.getZoom() || 15;

	let parts = 2;
	let called = false;

	const callback = (complete: boolean) =>
	{
		--parts;

		// 동작이 끝났을 경우
		if (called)
		{
			console.dir(2);
			return;
		}

		// 동작한 경우
		if (parts === 0 || !complete)
		{
			called = true;
		}
	};

	view.animate({
		center: location,
		duration: duration
	}, callback);

	view.animate({
		zoom: zoom - 3,
		duration: duration / 2
	},
	{
		zoom: zoom,
		duration: duration / 2
	}, callback);
}