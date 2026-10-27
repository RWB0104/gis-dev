/**
 * 오버레이 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.27 화 09:10:00
 */

import { Overlay } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { use, useEffect, useState } from 'react';

import { MapContext } from '#/context/map';

/**
 * 맵 오버레이 훅 메서드
 *
 * 맵에 오버레이를 추가하고, 지정한 위치에 표시한다(위치가 없으면 숨긴다). 언마운트되면 오버레이를 제거한다.
 * 오버레이 요소는 OL이 DOM 위치를 옮기므로, React가 소유하지 않는 요소를 만들어 반환한다.
 * 호출하는 쪽에서 createPortal 등으로 내용을 렌더링한다.
 *
 * @param {Coordinate} position 표시 위치(맵 투영 기준)
 *
 * @returns {HTMLElement | undefined} 오버레이 요소, 맵이 준비되기 전에는 undefined
 */
export function useMapOverlay(position?: Coordinate): HTMLElement | undefined {
	const { map } = use(MapContext);

	const [overlayState, setOverlayState] = useState<Overlay | undefined>();

	useEffect(() => {
		if (map === undefined) {
			return;
		}

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: document.createElement('div'),
			offset: [0, -20],
			positioning: 'bottom-center'
		});

		map.addOverlay(overlay);

		setOverlayState(overlay);

		return () => {
			map.removeOverlay(overlay);
		};
	}, [map]);

	// 배열 참조가 아니라 값으로 비교해서, 같은 좌표면 위치를 다시 지정하지(autoPan이 다시 돌지) 않게 한다
	const [x, y] = position ?? [];

	useEffect(() => {
		overlayState?.setPosition(x === undefined || y === undefined ? undefined : [x, y]);
	}, [overlayState, x, y]);

	return overlayState?.getElement();
}
