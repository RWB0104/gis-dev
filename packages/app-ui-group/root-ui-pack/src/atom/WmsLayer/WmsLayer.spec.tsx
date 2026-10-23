/**
 * WMS 레이어 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 12:39:13
 */

import { render } from '@testing-library/react';
import { Map as OlMap } from 'ol';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wmsLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import WmsLayer from '.';

describe('[@gis-dev/root-ui-pack] WmsLayer', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('아무것도 렌더링하지 않는다', () => {
		const { container } = render(<WmsLayer />);

		expect(container).toBeEmptyDOMElement();
	});

	it('map이 있으면 sejongTileWmsLayer를 addLayer한다', () => {
		const map = new OlMap();

		const spy = vi.spyOn(map, 'addLayer');

		render(
			<MapContext value={{ map }}>
				<WmsLayer />
			</MapContext>
		);

		expect(spy).toHaveBeenCalledExactlyOnceWith(wmsLayer.sejongTileWmsLayer);
		expect(map.getAllLayers()).toContain(wmsLayer.sejongTileWmsLayer);

		map.getLayers().clear();
	});

	it('map이 없으면 addLayer를 호출하지 않는다', () => {
		const spy = vi.spyOn(OlMap.prototype, 'addLayer');

		render(
			<MapContext value={{}}>
				<WmsLayer />
			</MapContext>
		);

		expect(spy).not.toHaveBeenCalled();
	});
});
