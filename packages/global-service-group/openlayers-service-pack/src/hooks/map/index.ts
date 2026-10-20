/**
 * 맵 서비스 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.20 화 12:18:38
 */

import type { MapOptions } from 'ol/Map';
import OlMap from 'ol/Map';
import { useEffect, useRef, useState } from 'react';

/**
 * 맵 훅 메서드
 *
 * OpenLayers Map은 생성자에서 DOM(document)에 접근하므로 SSR 단계에서 만들 수 없다.
 * 마운트 이후(useEffect)에 한 번만 생성하고, 언마운트 시 target을 해제한다.
 * options는 최초 생성 시점에만 반영한다(OL Map options는 생성 시 고정이며,
 * view/layer 등은 이후 setView/addLayer로 갱신하는 것이 OL 관례).
 *
 * @param {MapOptions} options MapOptions
 *
 * @returns {OlMap | undefined} 마운트 전에는 undefined, 이후 Map 인스턴스
 */
export function useMap(options?: MapOptions): OlMap | undefined {
	const [mapState, setMapState] = useState<OlMap>();

	const optionsRef = useRef(options);

	useEffect(() => {
		const map = new OlMap(optionsRef.current);

		setMapState(map);

		return () => {
			map.setTarget(undefined);
		};
	}, []);

	return mapState;
}
