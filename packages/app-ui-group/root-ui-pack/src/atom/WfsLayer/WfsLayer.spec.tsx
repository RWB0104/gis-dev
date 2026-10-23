/**
 * WFS 레이어 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.22 목 18:20:00
 */

import { render } from '@testing-library/react';
import { Map as OlMap } from 'ol';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import WfsLayer from '.';

describe('[@gis-dev/root-ui-pack] WfsLayer', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('아무것도 렌더링하지 않는다', () => {
		const { container } = render(<WfsLayer />);

		expect(container).toBeEmptyDOMElement();
	});

	it('map이 있으면 sejongWfsLayer를 addLayer한다', () => {
		const map = new OlMap();

		const spy = vi.spyOn(map, 'addLayer');

		render(
			<MapContext value={{ map }}>
				<WfsLayer />
			</MapContext>
		);

		expect(spy).toHaveBeenCalledExactlyOnceWith(wfsLayer.sejongWfsLayer);
		expect(map.getAllLayers()).toContain(wfsLayer.sejongWfsLayer);

		map.getLayers().clear();
	});

	it('map이 없으면 addLayer를 호출하지 않는다', () => {
		const spy = vi.spyOn(OlMap.prototype, 'addLayer');

		render(
			<MapContext value={{}}>
				<WfsLayer />
			</MapContext>
		);

		expect(spy).not.toHaveBeenCalled();
	});
});
