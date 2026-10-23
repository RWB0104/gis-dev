/**
 * 피쳐 레이어 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.22 목 16:20:00
 */

import { render } from '@testing-library/react';
import { Map as OlMap } from 'ol';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import FeatureLayer from '.';

describe('[@gis-dev/root-ui-pack] FeatureLayer', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('아무것도 렌더링하지 않는다', () => {
		const { container } = render(<FeatureLayer />);

		expect(container).toBeEmptyDOMElement();
	});

	it('map이 있으면 wfsFeatureVectorLayer를 addLayer한다', () => {
		const map = new OlMap();

		const spy = vi.spyOn(map, 'addLayer');

		render(
			<MapContext value={{ map }}>
				<FeatureLayer />
			</MapContext>
		);

		expect(spy).toHaveBeenCalledExactlyOnceWith(transactionLayer.wfsFeatureVectorLayer);
		expect(map.getAllLayers()).toContain(transactionLayer.wfsFeatureVectorLayer);

		map.getLayers().clear();
	});

	it('map이 없으면 addLayer를 호출하지 않는다', () => {
		const spy = vi.spyOn(OlMap.prototype, 'addLayer');

		render(
			<MapContext value={{}}>
				<FeatureLayer />
			</MapContext>
		);

		expect(spy).not.toHaveBeenCalled();
	});
});
