/**
 * 맵 컨텍스트 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 17:17:55
 */

import { renderHook } from '@testing-library/react';
import { Map as OlMap } from 'ol';
import type { ReactNode } from 'react';
import { use } from 'react';

import { MapContext } from '.';

describe('[@gis-dev/openlayers-service-pack] map', () => {
	describe('MapContext 테스트', () => {
		it('기본값은 map이 없는 빈 컨텍스트다', () => {
			const { result } = renderHook(() => use(MapContext));

			expect(result.current.map).toBeUndefined();
		});

		it('Provider로 주입한 map을 소비한다', () => {
			const map = new OlMap();

			const wrapper = ({ children }: { children: ReactNode }): ReactNode => (
				<MapContext value={{ map }}>{children}</MapContext>
			);

			const { result } = renderHook(() => use(MapContext), { wrapper });

			expect(result.current.map).toBe(map);
		});
	});
});
