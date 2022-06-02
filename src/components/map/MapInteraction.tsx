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
import { Circle, Fill, Stroke, Style } from 'ol/style';
import proj4 from 'proj4';
import { SyntheticEvent } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { FaHome, FaPlus } from 'react-icons/fa';

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
export default function MapInteraction({ children }: Props): JSX.Element
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
export function Location({ map }: SubProps): JSX.Element | null
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		const onClick = (e: SyntheticEvent) =>
		{
			const button = e.currentTarget as HTMLButtonElement;

			// 지오로케이션 사용이 가능할 경우
			if ('geolocation' in navigator)
			{
				button.setAttribute('disabled', '');

				navigator.geolocation.getCurrentPosition((position) =>
				{
					const { latitude, longitude } = position.coords;
					const baseEPSG = map.getView().getProjection().getCode();

					flyTo(map.getView(), proj4('EPSG:4326', baseEPSG, [ longitude, latitude ]));

					button.removeAttribute('disabled');
				}, () =>
				{
					alert('실패');
					button.removeAttribute('disabled');
				}, { enableHighAccuracy: true });
			}

			// 아닐 경우
			else
			{
				alert('사용자 위치를 확인할 수 없습니다.');
			}
		};

		return (
			<button className='location' onClick={onClick}><BiCurrentLocation color='white' size={25} /></button>
		);
	}

	// 아닐 경우

	return null;
}

/**
 * 위치 마커 추가 버튼 Element 반환 메서드
 *
 * @param {SubProps} props: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export function LocationWithMarker({ map }: SubProps): JSX.Element | null
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		map.on('pointerdrag', () =>
		{
			map.getAllLayers().filter((layer) => layer.get('name') === 'location')[0].getSource().clear();
		});

		// 로케이션 벡터 레이어가 없을 경우
		if (map.getAllLayers().filter((layer) => layer.get('name') === 'location').length === 0)
		{
			map.addLayer(new VectorLayer({
				minZoom: 15,
				properties: { name: 'location' },
				source: new VectorSource(),
				style: new Style({
					image: new Circle({
						fill: new Fill({ color: 'dodgerblue' }),
						radius: 10,
						stroke: new Stroke({
							color: 'white',
							width: 3
						})
					})
				}),
				zIndex: 10
			}));
		}

		const onClick = (e: SyntheticEvent) =>
		{
			// 지오로케이션 사용이 가능할 경우
			if ('geolocation' in navigator)
			{
				const button = e.currentTarget as HTMLButtonElement;

				button.setAttribute('disabled', '');

				navigator.geolocation.getCurrentPosition((position) =>
				{
					const { latitude, longitude } = position.coords;
					const baseEPSG = map.getView().getProjection().getCode();

					const coord = proj4('EPSG:4326', baseEPSG, [ longitude, latitude ]);

					flyTo(map.getView(), coord);

					map.getAllLayers().filter((layer) => layer.get('name') === 'location')[0].getSource().addFeature(new Feature({ geometry: new Point(coord) }));

					button.removeAttribute('disabled');
				}, () =>
				{
					alert('실패');
					button.removeAttribute('disabled');
				}, { enableHighAccuracy: true });
			}

			// 아닐 경우
			else
			{
				alert('사용자 위치를 확인할 수 없습니다.');
			}
		};

		return (
			<button className='location' title='현재 위치 이동' onClick={onClick}><BiCurrentLocation color='white' size={25} /></button>
		);
	}

	// 아닐 경우

	return null;
}

/**
 * 초기 위치 이동 버튼 Element 반환 메서드
 *
 * @param {SubProps2} props: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
export function HomeButton({ map, position = seoulPosition }: SubProps2): JSX.Element | null
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		const onClick = () =>
		{
			flyTo(map.getView(), proj4('EPSG:4326', 'EPSG:3857', position));
		};

		return (
			<button className='sejong' title='세종시 이동' onClick={onClick}><FaHome color='white' size={25} /></button>
		);
	}

	// 아닐 경우

	return null;
}

/**
 * 폴리곤 추가 버튼 Element 반환 메서드
 *
 * @param {SubProps3} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} Element
 */
export function AddPolygon({ map, drawend }: SubProps3): JSX.Element | null
{
	// 맵 객체가 유효할 경우
	if (map)
	{
		let drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'draw')[0];

		// 드로우 벡터 레이어가 없을 경우
		if (!drawLayer)
		{
			const drawSource = new VectorSource();

			drawLayer = new VectorLayer({
				properties: { name: 'draw' },
				source: drawSource
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
			drawInteraction.once('drawstart', () =>
			{
				const source: VectorSource<Geometry> = drawLayer.getSource();
				source.clear();
			});

			// 드로우 종료 메서드가 있을 경우
			if (drawend)
			{
				drawInteraction.once('drawend', (e) =>
				{
					map.removeInteraction(drawInteraction);
					drawend(e);
				});
			}

			map.addInteraction(drawInteraction);
		};

		return (
			<button className='add' title='건물 추가' onClick={onClick}><FaPlus color='white' size={20} /></button>
		);
	}

	// 아닐 경우

	return null;
}

/**
 * 비행 애니메이션 메서드
 *
 * @param {View} view: 뷰 객체
 * @param {number[]} location: 좌표 (EPSG:4326)
 */
function flyTo(view: View, location: number[]): void
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
		duration
	}, callback);

	view.animate(
		{
			duration: duration / 2,
			zoom: zoom - 3
		},
		{
			duration: duration / 2,
			zoom
		},

		callback
	);
}