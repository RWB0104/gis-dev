/**
 * 피쳐 추가 버튼 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.22 목 16:20:00
 */

import { fireEvent, render, screen } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map, View } from 'ol';
import type { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import type { ComponentProps } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import FeatureAddButton from '.';

vi.mock('@gis-dev/shadcn-ui-pack/components/ui/toast', () => ({
	toast: { add: vi.fn() }
}));

const mockedToastAdd = vi.mocked(toast.add);

const featureLayer = transactionLayer.wfsFeatureVectorLayer;

const CENTER = [1000, 2000];

/**
 * 중심이 지정된 뷰를 가진 테스트용 맵을 생성하는 메서드
 *
 * @param {boolean} withLayer feature 레이어를 맵에 올릴지 여부
 */
function createMap(withLayer = true, view = new View({ center: CENTER, zoom: 2 })): Map {
	const map = new Map({ view });

	if (withLayer) {
		map.addLayer(featureLayer);
	}

	return map;
}

/**
 * 맵 컨텍스트로 감싸 FeatureAddButton을 렌더링하는 메서드
 */
function renderButton(map?: Map, props?: ComponentProps<typeof FeatureAddButton>): ReturnType<typeof render> {
	return render(
		<MapContext value={map === undefined ? {} : { map }}>
			<FeatureAddButton {...props} />
		</MapContext>
	);
}

/**
 * 버튼을 클릭하는 메서드
 */
function clickButton(): void {
	fireEvent.click(screen.getByTestId('FeatureAddButton'));
}

describe('[@gis-dev/root-ui-pack] FeatureAddButton', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.clearAllMocks();

		featureLayer.getSource()?.clear();
	});

	it('버튼을 렌더링한다', () => {
		renderButton();

		expect(screen.getByRole('button')).toBe(screen.getByTestId('FeatureAddButton'));
	});

	it('className을 병합하고 나머지 속성을 전달한다', () => {
		renderButton(undefined, { 'aria-label': '피쳐 추가', className: 'custom' });

		const button = screen.getByTestId('FeatureAddButton');

		expect(button).toHaveClass('custom', 'bg-blue-600');
		expect(button).toHaveAttribute('aria-label', '피쳐 추가');
	});

	it('클릭하면 전달된 onClick을 호출한다', () => {
		const onClick = vi.fn();

		renderButton(createMap(), { onClick });

		clickButton();

		expect(onClick).toHaveBeenCalledOnce();
	});

	it('맵이 없으면 아무 동작도 하지 않는다', () => {
		renderButton();

		clickButton();

		expect(mockedToastAdd).not.toHaveBeenCalled();
		expect(featureLayer.getSource()?.getFeatures()).toHaveLength(0);
	});

	it('feature 레이어가 맵에 없으면 토스트로 알린다', () => {
		renderButton(createMap(false));

		clickButton();

		expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
			description: 'feature 레이어가 존재하지 않습니다.',
			title: 'Feature action failed'
		});
		expect(featureLayer.getSource()?.getFeatures()).toHaveLength(0);
	});

	it('feature 레이어의 소스가 없으면 토스트로 알린다', () => {
		vi.spyOn(featureLayer, 'getSource').mockReturnValue(null);

		renderButton(createMap());

		clickButton();

		expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
			description: '정의된 요소가 올바르지 않습니다. 새로고침 후 재시도해주세요.',
			title: 'Feature action failed'
		});
	});

	it('뷰의 중심이 없으면 토스트로 알린다', () => {
		renderButton(createMap(true, new View()));

		clickButton();

		expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
			description: '정의된 요소가 올바르지 않습니다. 새로고침 후 재시도해주세요.',
			title: 'Feature action failed'
		});
		expect(featureLayer.getSource()?.getFeatures()).toHaveLength(0);
	});

	it('중심에 피쳐가 없으면 중심 좌표에 Point 피쳐를 추가한다', () => {
		renderButton(createMap());

		clickButton();

		const features = featureLayer.getSource()?.getFeatures() ?? [];
		const geometry = features[0]?.getGeometry();

		expect(features).toHaveLength(1);
		expect(geometry).toBeInstanceOf(Point);
		expect((geometry as Point).getCoordinates()).toEqual(CENTER);
		expect(mockedToastAdd).not.toHaveBeenCalled();
	});

	it('feature 레이어만 대상으로 중심 픽셀의 피쳐를 조회한다', () => {
		const map = createMap();
		const spy = vi.spyOn(map, 'getFeaturesAtPixel').mockReturnValue([]);

		renderButton(map);

		clickButton();

		const layerFilter = spy.mock.calls[0]?.[1]?.layerFilter;

		expect(layerFilter?.(featureLayer)).toBe(true);
		expect(layerFilter?.(new TileLayer({ properties: { name: 'base-osm' } }))).toBe(false);
	});

	it('중심에 이미 피쳐가 있으면 추가하지 않고 제거한다', () => {
		const map = createMap();
		const source = featureLayer.getSource();
		const existing = new Feature({ geometry: new Point(CENTER) });

		source?.addFeature(existing);

		vi.spyOn(map, 'getFeaturesAtPixel').mockReturnValue([existing as FeatureLike]);

		renderButton(map);

		clickButton();

		expect(source?.getFeatures()).toHaveLength(0);
	});

	it('한 번 얻은 소스는 이후 클릭에서 다시 조회하지 않고 재사용한다', () => {
		const source = featureLayer.getSource();

		renderButton(createMap());

		clickButton();

		vi.spyOn(featureLayer, 'getSource').mockReturnValue(null);

		clickButton();

		expect(source?.getFeatures()).toHaveLength(2);
		expect(mockedToastAdd).not.toHaveBeenCalled();
	});

	it('Space 키를 떼면 피쳐를 추가한다', () => {
		renderButton(createMap());

		fireEvent.keyUp(document, { code: 'Space' });

		expect(featureLayer.getSource()?.getFeatures()).toHaveLength(1);
	});

	it('Space가 아닌 키는 무시한다', () => {
		renderButton(createMap());

		fireEvent.keyUp(document, { code: 'Enter' });

		expect(featureLayer.getSource()?.getFeatures()).toHaveLength(0);
	});

	it('언마운트하면 키보드 리스너를 해제한다', () => {
		const { unmount } = renderButton(createMap());

		unmount();

		fireEvent.keyUp(document, { code: 'Space' });

		expect(featureLayer.getSource()?.getFeatures()).toHaveLength(0);
	});
});
