/**
 * 맵 상호작용 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 00:54:06
 */

import { Geolocation, Map, View } from 'ol';
import proj4 from 'proj4';
import './MapInteraction.scss';

interface Props
{
	children?: JSX.Element | JSX.Element[]
}

interface SubProps
{
	map?: Map
}

/**
 * 맵 상호작용 Element 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {JSX.Element} Element
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
 * 위치 버튼 Element 반환 메서드
 *
 * @param {SubProps} props: 프로퍼티
 *
 * @returns {JSX.Element} Element
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
			<button className='location' onClick={onClick}>O</button>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}

function flyTo(view: View, location: number[])
{
	const duration = 2000;
	const zoom = view.getZoom() || 15;

	let parts = 2;
	let called = false;

	const callback = (complete: boolean) =>
	{
		--parts;

		if (called)
		{
			return;
		}

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
	}, {
		zoom: zoom,
		duration: duration / 2
	}, callback);
}