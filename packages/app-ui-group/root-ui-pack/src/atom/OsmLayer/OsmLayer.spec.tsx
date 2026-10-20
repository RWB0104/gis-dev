/**
 * OSM 레이어 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 17:15:02
 */

import { render } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import OsmLayer from '.';

describe('[@gis-dev/root-ui-pack] OsmLayer', () => {
	it('아무것도 렌더링하지 않는다', () => {
		const { container } = render(<OsmLayer />);

		expect(container).toBeEmptyDOMElement();
	});

	it('map이 있으면 osmLayer를 addLayer한다', () => {
		const map = new Map();

		const spy = vi.spyOn(map, 'addLayer');

		render(
			<MapContext value={{ map }}>
				<OsmLayer />
			</MapContext>
		);

		expect(spy).toHaveBeenCalledWith(baseLayer.osmLayer);
	});

	it('map이 없으면 addLayer를 호출하지 않는다', () => {
		const spy = vi.spyOn(Map.prototype, 'addLayer');

		render(
			<MapContext value={{}}>
				<OsmLayer />
			</MapContext>
		);

		expect(spy).not.toHaveBeenCalled();

		spy.mockRestore();
	});
});
