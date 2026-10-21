/**
 * 맵 서비스 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 17:16:06
 */

import { renderHook } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map, MapEvent, View } from 'ol';
import type BaseEvent from 'ol/events/Event';
import { createElement, type ReactNode, type RefObject } from 'react';

import { MapContext } from '#/context/map';

import { useMap, useMapInfo } from '.';

type InfoRefs = Record<'bbox' | 'center' | 'cursor' | 'srs' | 'zoom', RefObject<HTMLElement | null>>;

function createRefs(): InfoRefs {
	return {
		bbox: { current: document.createElement('p') },
		center: { current: document.createElement('p') },
		cursor: { current: document.createElement('p') },
		srs: { current: document.createElement('p') },
		zoom: { current: document.createElement('p') }
	};
}

function createNullRefs(): InfoRefs {
	return {
		bbox: { current: null },
		center: { current: null },
		cursor: { current: null },
		srs: { current: null },
		zoom: { current: null }
	};
}

function createMap(): Map {
	return new Map({ view: new View({ center: [1000, 2000], projection: 'EPSG:3857', zoom: 2 }) });
}

function renderMapInfo(map: Map, refs: InfoRefs): ReturnType<typeof renderHook> {
	const wrapper = ({ children }: { children: ReactNode }): ReactNode =>
		createElement(MapContext, { value: { map } }, children);

	return renderHook(() => useMapInfo(refs), { wrapper });
}

function readPair(ref: RefObject<HTMLElement | null>): number[] {
	return (ref.current?.textContent ?? '').split('\n').map(Number);
}

function movePointer(map: Map, coordinate: number[]): void {
	map.dispatchEvent({ coordinate, type: 'pointermove' } as unknown as BaseEvent);
}

describe('[@gis-dev/openlayers-service-pack] map', () => {
	describe('useMap 테스트', () => {
		it('마운트 후 Map 인스턴스를 반환한다', () => {
			const { result } = renderHook(() => useMap());

			expect(result.current).toBeInstanceOf(Map);
		});

		it('options를 Map 생성에 반영한다', () => {
			const { result } = renderHook(() => useMap({ controls: [] }));

			expect(result.current?.getControls().getLength()).toBe(0);
		});

		it('언마운트 시 setTarget(undefined)로 정리한다', () => {
			const { result, unmount } = renderHook(() => useMap());

			const map = result.current as Map;
			const spy = vi.spyOn(map, 'setTarget');

			unmount();

			expect(spy).toHaveBeenCalledWith(undefined);
		});

		it('options 참조가 바뀌어도 Map을 재생성하지 않는다', () => {
			const { result, rerender } = renderHook((options?: ConstructorParameters<typeof Map>[0]) => useMap(options), {
				initialProps: { controls: [] }
			});

			const first = result.current;

			rerender({ controls: [] });

			expect(result.current).toBe(first);
		});
	});

	describe('useMapInfo 테스트', () => {
		it('마운트 즉시 bbox, center, srs, zoom을 기록한다', () => {
			const map = createMap();
			const refs = createRefs();

			renderMapInfo(map, refs);

			const [minX, minY, maxX, maxY] = map.getView().calculateExtent();

			expect(refs.bbox.current?.textContent).toBe(`${minX}\n${minY}\n\n${maxX}\n${maxY}`);
			expect(readPair(refs.center)[0]).toBeCloseTo(1000, 5);
			expect(readPair(refs.center)[1]).toBeCloseTo(2000, 5);
			expect(refs.srs.current?.textContent).toBe('EPSG:3857');
			expect(refs.zoom.current?.textContent).toBe('2.0000');
		});

		it('마운트 시점에는 커서를 기록하지 않는다', () => {
			const refs = createRefs();

			renderMapInfo(createMap(), refs);

			expect(refs.cursor.current?.textContent).toBe('');
		});

		it('postrender 이벤트마다 center, bbox, zoom을 갱신한다', () => {
			const map = createMap();
			const refs = createRefs();

			renderMapInfo(map, refs);

			const view = map.getView();

			view.setCenter([5000, 6000]);
			view.setZoom(5);

			map.dispatchEvent(new MapEvent('postrender', map));

			const [minX, minY, maxX, maxY] = view.calculateExtent();

			expect(refs.bbox.current?.textContent).toBe(`${minX}\n${minY}\n\n${maxX}\n${maxY}`);
			expect(readPair(refs.center)[0]).toBeCloseTo(5000, 5);
			expect(readPair(refs.center)[1]).toBeCloseTo(6000, 5);
			expect(refs.zoom.current?.textContent).toBe('5.0000');
		});

		it('pointermove 이벤트의 좌표를 커서로 기록한다', () => {
			const map = createMap();
			const refs = createRefs();

			renderMapInfo(map, refs);
			movePointer(map, [10, 20]);

			expect(refs.cursor.current?.textContent).toBe('10\n20');
		});

		it('언마운트 시 리스너를 해제하고 이후 이벤트를 무시한다', () => {
			const map = createMap();
			const refs = createRefs();
			const spy = vi.spyOn(map, 'un');

			const { unmount } = renderMapInfo(map, refs);

			unmount();
			movePointer(map, [10, 20]);

			expect(spy).toHaveBeenCalledWith('postrender', expect.any(Function));
			expect(spy).toHaveBeenCalledWith('pointermove', expect.any(Function));
			expect(refs.cursor.current?.textContent).toBe('');
		});

		it('맵이 없으면 아무것도 기록하지 않는다', () => {
			const refs = createRefs();

			renderHook(() => useMapInfo(refs));

			expect(refs.bbox.current?.textContent).toBe('');
			expect(refs.srs.current?.textContent).toBe('');
		});

		it('모든 ref가 null이어도 에러 없이 무시한다', () => {
			const map = createMap();

			expect(() => {
				renderMapInfo(map, createNullRefs());
				map.dispatchEvent(new MapEvent('postrender', map));
				movePointer(map, [10, 20]);
			}).not.toThrow();
		});

		it.each(['bbox', 'center'] as const)('%s ref가 null이면 위치 정보를 기록하지 않는다', (key) => {
			const refs = createRefs();

			refs[key] = { current: null };

			renderMapInfo(createMap(), refs);

			const other = key === 'bbox' ? refs.center : refs.bbox;

			expect(other.current?.textContent).toBe('');
		});
	});
});
