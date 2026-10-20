/**
 * 구글 레이어 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 18:10:29
 */

import { render } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { googleTileLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import GoogleLayer from '.';

const googleLayers = Object.values(googleTileLayer);

describe('[@gis-dev/root-ui-pack] GoogleLayer', () => {
	it('아무것도 렌더링하지 않는다', () => {
		const { container } = render(<GoogleLayer />);

		expect(container).toBeEmptyDOMElement();
	});

	it('map이 있으면 구글 타일 레이어를 모두 addLayer한다', () => {
		const map = new Map();

		const spy = vi.spyOn(map, 'addLayer');

		render(
			<MapContext value={{ map }}>
				<GoogleLayer />
			</MapContext>
		);

		expect(spy).toHaveBeenCalledTimes(googleLayers.length);

		for (const layer of googleLayers) {
			expect(spy).toHaveBeenCalledWith(layer);
		}
	});

	it('map이 없으면 addLayer를 호출하지 않는다', () => {
		const spy = vi.spyOn(Map.prototype, 'addLayer');

		render(
			<MapContext value={{}}>
				<GoogleLayer />
			</MapContext>
		);

		expect(spy).not.toHaveBeenCalled();

		spy.mockRestore();
	});
});
