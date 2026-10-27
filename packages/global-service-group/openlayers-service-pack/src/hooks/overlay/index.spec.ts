/**
 * 오버레이 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.27 화 09:20:00
 */

import { renderHook } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { createElement, type ReactNode } from 'react';

import { MapContext } from '#/context/map';

import { useMapOverlay } from '.';

/**
 * 맵 컨텍스트 래퍼로 훅을 렌더링하는 메서드
 */
function renderOverlay(
	map: Map | undefined,
	position?: Coordinate
): ReturnType<typeof renderHook<HTMLElement | undefined, Coordinate | undefined>> {
	const wrapper = ({ children }: { children: ReactNode }): ReactNode =>
		createElement(MapContext, { value: map === undefined ? {} : { map } }, children);

	return renderHook<HTMLElement | undefined, Coordinate | undefined>((pos) => useMapOverlay(pos), {
		initialProps: position,
		wrapper
	});
}

describe('[@gis-dev/openlayers-service-pack] overlay', () => {
	describe('useMapOverlay 테스트', () => {
		it('맵이 없으면 요소를 반환하지 않는다', () => {
			const { result } = renderOverlay(undefined, [1, 2]);

			expect(result.current).toBeUndefined();
		});

		it('마운트하면 맵에 오버레이를 추가하고 오버레이 요소를 반환한다', () => {
			const map = new Map();

			const { result } = renderOverlay(map);

			expect(map.getOverlays().getLength()).toBe(1);
			expect(result.current).toBeInstanceOf(HTMLElement);
			expect(result.current).toBe(map.getOverlays().item(0).getElement());
		});

		it('리렌더해도 같은 오버레이 요소를 유지한다', () => {
			const map = new Map();

			const { rerender, result } = renderOverlay(map);

			const first = result.current;

			rerender([1, 2]);

			expect(result.current).toBe(first);
			expect(map.getOverlays().getLength()).toBe(1);
		});

		it('카드가 위쪽에 놓이도록 위치 기준과 오프셋을 지정한다', () => {
			const map = new Map();

			renderOverlay(map);

			const overlay = map.getOverlays().item(0);

			expect(overlay.getPositioning()).toBe('bottom-center');
			expect(overlay.getOffset()).toEqual([0, -20]);
		});

		it('위치가 없으면 오버레이를 숨긴다', () => {
			const map = new Map();

			renderOverlay(map);

			expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
		});

		it('지정한 위치에 오버레이를 표시한다', () => {
			const map = new Map();

			renderOverlay(map, [5, 10]);

			expect(map.getOverlays().item(0).getPosition()).toEqual([5, 10]);
		});

		it('위치가 바뀌면 오버레이를 옮기고, 위치가 없어지면 숨긴다', () => {
			const map = new Map();

			const { rerender } = renderOverlay(map, [5, 10]);

			rerender([50, 100]);

			expect(map.getOverlays().item(0).getPosition()).toEqual([50, 100]);

			rerender(undefined);

			expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
		});

		it('좌표가 한쪽만 있으면 위치를 지정하지 않는다', () => {
			const map = new Map();

			renderOverlay(map, [5] as unknown as Coordinate);

			expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
		});

		it('같은 값의 새 배열을 넘겨도 위치를 다시 지정하지 않는다', () => {
			const map = new Map();

			const { rerender } = renderOverlay(map, [5, 10]);

			const spy = vi.spyOn(map.getOverlays().item(0), 'setPosition');

			rerender([5, 10]);
			rerender([5, 10]);

			expect(spy).not.toHaveBeenCalled();
		});

		it('언마운트하면 오버레이를 제거한다', () => {
			const map = new Map();

			const { unmount } = renderOverlay(map, [5, 10]);

			unmount();

			expect(map.getOverlays().getLength()).toBe(0);
		});
	});
});
