/**
 * 지오로케이션 버튼 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 19:20:00
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map, View } from 'ol';
import proj4 from 'proj4';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import GeolocationButton from '.';

vi.mock('@gis-dev/shadcn-ui-pack/components/ui/toast', () => ({
	toast: { add: vi.fn() }
}));

const mockedToastAdd = vi.mocked(toast.add);

const getCurrentPosition = vi.fn();

const LATITUDE = 37.5665;
const LONGITUDE = 126.978;

interface Callbacks {
	failure?: PositionErrorCallback;
	success?: PositionCallback;
}

/**
 * 투영과 중심이 지정된 테스트용 맵을 생성하는 메서드
 */
function createMap(projection = 'EPSG:3857'): Map {
	return new Map({ view: new View({ center: [0, 0], projection, zoom: 2 }) });
}

/**
 * 맵 컨텍스트로 감싸 GeolocationButton을 렌더링하는 메서드
 */
function renderButton(map?: Map, props?: Parameters<typeof GeolocationButton>[0]): void {
	render(
		<MapContext value={map === undefined ? {} : { map }}>
			<GeolocationButton {...props} />
		</MapContext>
	);
}

/**
 * getCurrentPosition에 전달된 콜백을 가로채는 메서드
 */
function captureCallbacks(): Callbacks {
	const callbacks: Callbacks = {};

	getCurrentPosition.mockImplementation((success: PositionCallback, failure: PositionErrorCallback) => {
		callbacks.success = success;
		callbacks.failure = failure;
	});

	return callbacks;
}

/**
 * 테스트용 위치 정보를 생성하는 메서드
 */
function createPosition(): GeolocationPosition {
	return { coords: { latitude: LATITUDE, longitude: LONGITUDE } } as GeolocationPosition;
}

describe('[@gis-dev/root-ui-pack] GeolocationButton', () => {
	beforeEach(() => {
		getCurrentPosition.mockReset();

		Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition } });
	});

	afterEach(() => {
		vi.clearAllMocks();

		Reflect.deleteProperty(navigator, 'geolocation');
	});

	it('버튼을 렌더링한다', () => {
		renderButton();

		expect(screen.getByRole('button')).toBe(screen.getByTestId('GeolocationButton'));
	});

	it('className을 병합하고 나머지 속성을 전달한다', () => {
		renderButton(undefined, { 'aria-label': '내 위치', className: 'custom' });

		const button = screen.getByTestId('GeolocationButton');

		expect(button).toHaveClass('custom', 'bg-emerald-600');
		expect(button).toHaveAttribute('aria-label', '내 위치');
	});

	it('클릭하면 전달된 onClick을 호출한다', () => {
		const onClick = vi.fn();

		renderButton(createMap(), { onClick });

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		expect(onClick).toHaveBeenCalledOnce();
	});

	it('맵이 없으면 위치를 요청하지 않고 onClick만 호출한다', () => {
		const onClick = vi.fn();

		renderButton(undefined, { onClick });

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		expect(onClick).toHaveBeenCalledOnce();
		expect(getCurrentPosition).not.toHaveBeenCalled();
		expect(screen.getByTestId('GeolocationButton')).toBeEnabled();
	});

	it('맵이 있으면 고정밀 옵션으로 현재 위치를 요청한다', () => {
		renderButton(createMap());

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		expect(getCurrentPosition).toHaveBeenCalledExactlyOnceWith(expect.any(Function), expect.any(Function), {
			enableHighAccuracy: true,
			timeout: 3000
		});
	});

	it('위치를 요청하는 동안 버튼을 비활성화한다', () => {
		captureCallbacks();

		renderButton(createMap());

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		expect(screen.getByTestId('GeolocationButton')).toBeDisabled();
	});

	it('위치를 받으면 지도 투영으로 변환한 좌표로 이동하고 버튼을 복원한다', () => {
		const callbacks = captureCallbacks();
		const map = createMap();
		const animate = vi.spyOn(map.getView(), 'animate');

		renderButton(map);

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		act(() => {
			callbacks.success?.(createPosition());
		});

		expect(animate).toHaveBeenCalledExactlyOnceWith({
			center: proj4('EPSG:4326', 'EPSG:3857', [LONGITUDE, LATITUDE]),
			duration: 2000
		});
		expect(screen.getByTestId('GeolocationButton')).toBeEnabled();
	});

	it('지도 투영이 EPSG:4326이면 변환 없이 경위도로 이동한다', () => {
		const callbacks = captureCallbacks();
		const map = createMap('EPSG:4326');
		const animate = vi.spyOn(map.getView(), 'animate');

		renderButton(map);

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		act(() => {
			callbacks.success?.(createPosition());
		});

		expect(animate).toHaveBeenCalledExactlyOnceWith({ center: [LONGITUDE, LATITUDE], duration: 2000 });
	});

	it('위치 요청에 실패하면 토스트로 알리고 버튼을 복원한다', () => {
		const callbacks = captureCallbacks();

		renderButton(createMap());

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		act(() => {
			callbacks.failure?.({ code: 1, message: 'User denied Geolocation' } as GeolocationPositionError);
		});

		expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
			description: 'User denied Geolocation',
			title: 'Geolocation failed - 1'
		});
		expect(screen.getByTestId('GeolocationButton')).toBeEnabled();
	});

	it('위치 요청에 실패하면 지도를 이동하지 않는다', () => {
		const callbacks = captureCallbacks();
		const map = createMap();
		const animate = vi.spyOn(map.getView(), 'animate');

		renderButton(map);

		fireEvent.click(screen.getByTestId('GeolocationButton'));

		act(() => {
			callbacks.failure?.({ code: 3, message: 'Timeout expired' } as GeolocationPositionError);
		});

		expect(animate).not.toHaveBeenCalled();
	});
});
