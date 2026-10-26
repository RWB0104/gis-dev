/**
 * 선택 피쳐 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.26 월 21:30:00
 */

import type { Feature } from 'ol';
import { Select } from 'ol/interaction';
import type { SelectEvent } from 'ol/interaction/Select';
import { use, useEffect, useRef, useState } from 'react';

import { MapContext } from '#/context/map';

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

	const [featureState, setFeatureState] = useState<Feature | undefined>();

	const selectRef = useRef<Select>(undefined);

	useEffect(() => {
		if (map === undefined) {
			return;
		}

		const select = map
			.getInteractions()
			.getArray()
			.find((i): i is Select => i instanceof Select && i.get('name') === 'clickSelect');

		const handleSelect = (e: SelectEvent): void => {
			setFeatureState(e.selected[0]);
		};

		select?.on('select', handleSelect);

		selectRef.current = select;

		return () => {
			select?.un('select', handleSelect);

			selectRef.current = undefined;
		};
	}, [map]);

	const clear = (): void => {
		selectRef.current?.getFeatures().clear();

		setFeatureState(undefined);
	};

	return { clear, feature: featureState };
}
