/**
 * 선택 피쳐 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:40:00
 */

import { act, renderHook } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map, type MapBrowserEvent } from 'ol';
import { Select } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';
import { createElement, type ReactNode } from 'react';

import { MapContext } from '#/context/map';

import { useSelectedFeature } from '.';

/**
 * 이름이 지정된 Select가 등록된 맵을 생성하는 메서드
 */
function createMap(selectName?: string): { map: Map; select: Select } {
	const select = new Select();

	if (selectName !== undefined) {
		select.set('name', selectName);
	}

	return { map: new Map({ interactions: [select] }), select };
}

/**
 * 맵 컨텍스트 래퍼로 훅을 렌더링하는 메서드
 */
function renderSelected(map?: Map): ReturnType<typeof renderHook<ReturnType<typeof useSelectedFeature>, unknown>> {
	const wrapper = ({ children }: { children: ReactNode }): ReactNode =>
		createElement(MapContext, { value: map === undefined ? {} : { map } }, children);

	return renderHook(() => useSelectedFeature(), { wrapper });
}

/**
 * select 이벤트를 발생시키는 메서드
 */
function emitSelect(select: Select, selected: Feature[], deselected: Feature[] = []): void {
	act(() => {
		select.dispatchEvent(new SelectEvent('select', selected, deselected, {} as MapBrowserEvent));
	});
}

describe('[@gis-dev/openlayers-service-pack] selectedFeature', () => {
	describe('useSelectedFeature 테스트', () => {
		it('처음에는 선택된 피쳐가 없다', () => {
			const { map } = createMap('clickSelect');

			const { result } = renderSelected(map);

			expect(result.current.feature).toBeUndefined();
		});

		it('clickSelect에서 피쳐가 선택되면 반환한다', () => {
			const { map, select } = createMap('clickSelect');
			const feature = new Feature();

			const { result } = renderSelected(map);

			emitSelect(select, [feature]);

			expect(result.current.feature).toBe(feature);
		});

		it('선택이 바뀌면 새 피쳐를 반환한다', () => {
			const { map, select } = createMap('clickSelect');
			const first = new Feature();
			const second = new Feature();

			const { result } = renderSelected(map);

			emitSelect(select, [first]);
			emitSelect(select, [second], [first]);

			expect(result.current.feature).toBe(second);
		});

		it('선택이 해제되면 undefined를 반환한다', () => {
			const { map, select } = createMap('clickSelect');
			const feature = new Feature();

			const { result } = renderSelected(map);

			emitSelect(select, [feature]);
			emitSelect(select, [], [feature]);

			expect(result.current.feature).toBeUndefined();
		});

		it('clear를 호출하면 선택 피쳐 컬렉션을 비우고 undefined를 반환한다', () => {
			const { map, select } = createMap('clickSelect');
			const feature = new Feature();

			const { result } = renderSelected(map);

			select.getFeatures().push(feature);

			emitSelect(select, [feature]);

			act(() => {
				result.current.clear();
			});

			expect(select.getFeatures().getLength()).toBe(0);
			expect(result.current.feature).toBeUndefined();
		});

		it('clickSelect가 아닌 Select의 이벤트는 구독하지 않는다', () => {
			const { map, select } = createMap('hoverSelect');

			const { result } = renderSelected(map);

			emitSelect(select, [new Feature()]);

			expect(result.current.feature).toBeUndefined();
		});

		it('Select가 없는 맵에서도 에러 없이 동작한다', () => {
			const map = new Map({ interactions: [] });

			const { result } = renderSelected(map);

			expect(result.current.feature).toBeUndefined();
			expect(() =>
				act(() => {
					result.current.clear();
				})
			).not.toThrow();
		});

		it('맵이 없어도 에러 없이 동작한다', () => {
			const { result } = renderSelected();

			expect(result.current.feature).toBeUndefined();
		});

		it('언마운트하면 select 리스너를 해제한다', () => {
			const { map, select } = createMap('clickSelect');
			const spy = vi.spyOn(select, 'un');

			const { unmount } = renderSelected(map);

			unmount();

			expect(spy).toHaveBeenCalledWith('select', expect.any(Function));
		});
	});
});
