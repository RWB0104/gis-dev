/**
 * 선택 피쳐 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.26 월 21:30:00
 */

import type { Collection, Feature, Map as OlMap } from 'ol';
import type { Geometry } from 'ol/geom';
import { Select } from 'ol/interaction';
import { use, useCallback, useMemo, useSyncExternalStore } from 'react';

import { MapContext } from '#/context/map';

/**
 * 맵에 등록된 클릭 선택(name이 clickSelect인 Select)의 피쳐 컬렉션 반환 메서드
 */
function getClickSelectFeatures(map: OlMap | undefined): Collection<Feature<Geometry>> | undefined {
	return map
		?.getInteractions()
		.getArray()
		.find((i): i is Select => i instanceof Select && i.get('name') === 'clickSelect')
		?.getFeatures();
}

export interface UseSelectedFeatureResult {
	/**
	 * 선택 해제 메서드
	 */
	clear: () => void;

	/**
	 * 선택된 피쳐
	 */
	feature: Feature | undefined;
}

/**
 * 선택 피쳐 훅 메서드
 *
 * 맵에 등록된 클릭 선택(name이 clickSelect인 Select)의 선택 피쳐를 반환한다.
 *
 * @returns {UseSelectedFeatureResult} 선택 피쳐와 선택 해제 메서드
 */
export function useSelectedFeature(): UseSelectedFeatureResult {
	const { map } = use(MapContext);

	const features = useMemo(() => getClickSelectFeatures(map), [map]);

	const subscribe = useCallback(
		(onChange: () => void) => {
			features?.on(['add', 'remove'], onChange);

			return () => features?.un(['add', 'remove'], onChange);
		},
		[features]
	);

	const feature = useSyncExternalStore(
		subscribe,
		() => features?.item(0),
		() => undefined
	);

	const clear = useCallback(() => features?.clear(), [features]);

	return { clear, feature };
}
