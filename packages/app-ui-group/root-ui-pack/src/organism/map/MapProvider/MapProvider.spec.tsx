/**
 * 맵 프로바이더 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 14:20:06
 */

import { render, screen } from '@testing-library/react';
import { Map as OlMap } from 'ol';
import { getUid } from 'ol/util';
import { use } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { useMap } from '@gis-dev/openlayers-service-pack/hooks/map';

import MapProvider from '.';

vi.mock('@gis-dev/openlayers-service-pack/hooks/map', () => ({
	useMap: vi.fn()
}));

const mockedUseMap = vi.mocked(useMap);

function createMap(): OlMap {
	const map = new OlMap();

	vi.spyOn(map, 'setTarget');

	return map;
}

/**
 * MapContext의 map 식별자를 노출하는 테스트용 컴포넌트
 */
function Consumer(): React.JSX.Element {
	const { map } = use(MapContext);

	return <span data-map-id={map === undefined ? undefined : getUid(map)} data-testid="Consumer" />;
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

	it('홈(/)으로 돌아가는 링크를 렌더링한다', () => {
		render(<MapProvider />);

		const link = screen.getByTestId('MapProvider').querySelector('a');

		expect(link).toHaveAttribute('href', '/');
		expect(screen.getByTestId('MapProvider')).toContainElement(link);
	});

	it('십자선 가이드를 가로/세로 두 개 렌더링한다', () => {
		render(<MapProvider />);

		const guides = screen.getByTestId('MapProvider').querySelectorAll('.pointer-events-none');

		expect(guides).toHaveLength(2);
		expect(guides[0]).toHaveClass('h-0.5', 'w-4');
		expect(guides[1]).toHaveClass('h-4', 'w-0.5');
	});

	it('children을 section 안에 렌더링한다', () => {
		render(
			<MapProvider>
				<span data-testid="Child" />
			</MapProvider>
		);

		expect(screen.getByTestId('MapProvider')).toContainElement(screen.getByTestId('Child'));
	});

	it('MapContext로 map을 하위 컴포넌트에 제공한다', () => {
		const map = createMap();

		mockedUseMap.mockReturnValue(map);

		render(
			<MapProvider>
				<Consumer />
			</MapProvider>
		);

		expect(screen.getByTestId('Consumer')).toHaveAttribute('data-map-id', getUid(map));
	});
});
