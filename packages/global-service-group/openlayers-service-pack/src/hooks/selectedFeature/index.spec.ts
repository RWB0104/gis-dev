/**
 * 선택 피쳐 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:40:00
 */

import { act, renderHook } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map } from 'ol';
import { Select } from 'ol/interaction';
import { createElement, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

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
 * 선택 피쳐 컬렉션을 주어진 피쳐로 교체하는 메서드
 */
function setSelected(select: Select, selected: Feature[]): void {
	act(() => {
		select.getFeatures().clear();
		select.getFeatures().extend(selected);
	});
}

/**
 * 선택 피쳐가 없는지 여부를 문자열로 렌더링하는 컴포넌트
 */
function Probe(): string {
	return `${useSelectedFeature().feature === undefined}`;
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

			setSelected(select, [feature]);

			expect(result.current.feature).toBe(feature);
		});

		it('훅을 렌더링하기 전에 이미 선택된 피쳐도 반환한다', () => {
			const { map, select } = createMap('clickSelect');
			const feature = new Feature();

			select.getFeatures().push(feature);

			const { result } = renderSelected(map);

			expect(result.current.feature).toBe(feature);
		});

		it('선택이 바뀌면 새 피쳐를 반환한다', () => {
			const { map, select } = createMap('clickSelect');
			const second = new Feature();

			const { result } = renderSelected(map);

			setSelected(select, [new Feature()]);
			setSelected(select, [second]);

			expect(result.current.feature).toBe(second);
		});

		it('선택이 해제되면 undefined를 반환한다', () => {
			const { map, select } = createMap('clickSelect');

			const { result } = renderSelected(map);

			setSelected(select, [new Feature()]);
			setSelected(select, []);

			expect(result.current.feature).toBeUndefined();
		});

		it('clear를 호출하면 선택 피쳐 컬렉션을 비우고 undefined를 반환한다', () => {
			const { map, select } = createMap('clickSelect');

			const { result } = renderSelected(map);

			setSelected(select, [new Feature()]);

			act(() => {
				result.current.clear();
			});

			expect(select.getFeatures().getLength()).toBe(0);
			expect(result.current.feature).toBeUndefined();
		});

		it('여러 곳에서 훅을 써도 한쪽의 clear가 다른 쪽에도 반영된다', () => {
			const { map, select } = createMap('clickSelect');

			const first = renderSelected(map);
			const second = renderSelected(map);

			setSelected(select, [new Feature()]);

			expect(second.result.current.feature).toBeDefined();

			act(() => {
				first.result.current.clear();
			});

			expect(first.result.current.feature).toBeUndefined();
			expect(second.result.current.feature).toBeUndefined();
		});

		it('다른 맵의 선택은 반영하지 않는다', () => {
			const { map } = createMap('clickSelect');
			const other = createMap('clickSelect');

			const { result } = renderSelected(map);

			setSelected(other.select, [new Feature()]);

			expect(result.current.feature).toBeUndefined();
		});

		it('clickSelect가 아닌 Select의 선택은 구독하지 않는다', () => {
			const { map, select } = createMap('hoverSelect');

			const { result } = renderSelected(map);

			setSelected(select, [new Feature()]);

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

		it('서버 렌더링에서는 이미 선택된 피쳐가 있어도 undefined로 렌더링한다', () => {
			const { map, select } = createMap('clickSelect');

			select.getFeatures().push(new Feature());

			const html = renderToString(createElement(MapContext, { value: { map } }, createElement(Probe)));

			expect(html).toBe('true');
		});

		it('언마운트하면 컬렉션 리스너를 해제한다', () => {
			const { map, select } = createMap('clickSelect');
			const spy = vi.spyOn(select.getFeatures(), 'un');

			const { unmount } = renderSelected(map);

			unmount();

			expect(spy).toHaveBeenCalledWith(['add', 'remove'], expect.any(Function));
		});
	});
});
