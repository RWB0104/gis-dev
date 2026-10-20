/**
 * 맵 프로바이더 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 14:20:06
 */

import { render, screen } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';

import { useMap } from '@gis-dev/openlayers-service-pack/hooks/map';

import MapProvider from '.';

vi.mock('@gis-dev/openlayers-service-pack/hooks/map', () => ({
	useMap: vi.fn()
}));

const mockedUseMap = vi.mocked(useMap);

function createMap(): Map {
	const map = new Map();

	vi.spyOn(map, 'setTarget');

	return map;
}

describe('[@gis-dev/root-ui-pack] MapProvider', () => {
	beforeEach(() => {
		mockedUseMap.mockImplementation(() => createMap());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider section을 렌더링한다', () => {
		render(<MapProvider />);

		expect(screen.getByTestId('MapProvider').tagName).toBe('SECTION');
	});

	it('전달된 className을 병합한다', () => {
		render(<MapProvider className="custom-class" />);

		const section = screen.getByTestId('MapProvider');

		expect(section).toHaveClass('custom-class');
	});

	it('추가 HTML 속성을 그대로 전달한다', () => {
		render(<MapProvider id="map-root" />);

		expect(screen.getByTestId('MapProvider')).toHaveAttribute('id', 'map-root');
	});

	it('마운트 시 map.setTarget에 ref 엘리먼트를 전달한다', () => {
		const map = createMap();

		mockedUseMap.mockReturnValue(map);

		render(<MapProvider />);

		expect(map.setTarget).toHaveBeenCalledWith(screen.getByTestId('MapProvider'));
	});

	it('언마운트 시 map.setTarget(undefined)로 정리한다', () => {
		const map = createMap();

		mockedUseMap.mockReturnValue(map);

		const { unmount } = render(<MapProvider />);

		unmount();

		expect(map.setTarget).toHaveBeenLastCalledWith(undefined);
	});

	it('options를 useMap에 전달한다', () => {
		const options = { controls: [] };

		render(<MapProvider options={options} />);

		expect(mockedUseMap).toHaveBeenCalledWith(options);
	});
});
