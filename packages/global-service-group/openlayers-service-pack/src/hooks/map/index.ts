/**
 * 맵 서비스 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.20 화 12:18:38
 */

import type { MapBrowserEvent, MapEvent } from 'ol';
import type { MapOptions } from 'ol/Map';
import OlMap from 'ol/Map';
import { type RefObject, use, useEffect, useEffectEvent, useRef, useState } from 'react';

import { MapContext } from '#/context/map';

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
			map.getLayers().clear();
			map.dispose();
		};
	}, []);

	return mapState;
}

export interface UseMapInfoParams {
	/**
	 * BBOX
	 */
	bbox: RefObject<HTMLElement | null>;

	/**
	 * 중심 좌표
	 */
	center: RefObject<HTMLElement | null>;

	/**
	 * 커서
	 */
	cursor: RefObject<HTMLElement | null>;

	/**
	 * SRS
	 */
	srs: RefObject<HTMLElement | null>;

	/**
	 * 줌
	 */
	zoom: RefObject<HTMLElement | null>;
}

/**
 * 맵 정보 훅 메서드
 *
 * @param {UseMapInfoParams} param0 UseMapInfoParams
 */
export function useMapInfo({ bbox, center, cursor, srs, zoom }: UseMapInfoParams): void {
	const { map } = use(MapContext);

	const handlePosition = useEffectEvent((m: OlMap) => {
		if (bbox.current === null || center.current === null) {
			return;
		}

		const [minX = 0, minY = 0, maxX = 0, maxY = 0] = m.getView().calculateExtent();
		bbox.current.textContent = `${minX}\n${minY}\n\n${maxX}\n${maxY}`;

		const [x, y] = [(minX + maxX) / 2, (minY + maxY) / 2];
		center.current.textContent = `${x}\n${y}`;
	});

	const handleCursor = useEffectEvent((e: MapBrowserEvent<KeyboardEvent | PointerEvent | WheelEvent>) => {
		if (cursor.current === null) {
			return;
		}

		const [x, y] = e.coordinate;

		cursor.current.textContent = `${x}\n${y}`;
	});

	const handleSrs = useEffectEvent((m: OlMap) => {
		if (srs.current === null) {
			return;
		}

		const epsg = m.getView().getProjection().getCode();
		srs.current.textContent = epsg;
	});

	const handleZoom = useEffectEvent((m: OlMap) => {
		if (zoom.current === null) {
			return;
		}

		const level = m.getView().getZoom();
		zoom.current.textContent = `${level?.toFixed(4)}`;
	});

	useEffect(() => {
		if (map === undefined) {
			return;
		}

		handlePosition(map);
		handleSrs(map);
		handleZoom(map);

		const handleRender = (e: MapEvent) => {
			handlePosition(e.map);
			handleZoom(e.map);
		};

		map.on('postrender', handleRender);
		map.on('pointermove', handleCursor);

		return () => {
			map.un('postrender', handleRender);
			map.un('pointermove', handleCursor);
		};
	}, [map]);
}
