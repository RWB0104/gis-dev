/**
 * 맵 서비스 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 17:16:06
 */

import { renderHook } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';

import { useMap } from '.';

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
});
