/**
 * WFS 팝업 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 17:20:00
 */

import { act, fireEvent, render, within } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map, type MapBrowserEvent } from 'ol';
import { Point, Polygon } from 'ol/geom';
import { Select } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { getWfsBuildingInfo } from '@gis-dev/openlayers-service-pack/func/feature';

import WfsPopup from '.';

vi.mock('@gis-dev/openlayers-service-pack/func/feature', () => ({
	getWfsBuildingInfo: vi.fn(() => ({
		id: 'buld_sejong.108',
		name: '세종시청사',
		noticeDate: '2015-03-16',
		serialNo: '58190'
	}))
}));

/**
 * 이름이 지정된 Select가 등록된 맵을 생성하는 메서드
 */
function createMap(selectName?: string): { map: Map; select: Select } {
	const select = new Select();

	if (selectName !== undefined) {
		select.set('name', selectName);
	}

	const map = new Map({ interactions: [select] });

	return { map, select };
}

/**
 * 맵 컨텍스트로 감싸 WfsPopup을 렌더링하는 메서드
 */
function renderPopup(map?: Map): ReturnType<typeof render> {
	return render(
		<MapContext value={map === undefined ? {} : { map }}>
			<WfsPopup />
		</MapContext>
	);
}

/**
 * 오버레이 요소 안의 정보 카드를 반환하는 메서드
 *
 * 맵에 target이 없어 오버레이 요소가 document에 붙지 않으므로, screen이 아니라 오버레이 요소 기준으로 조회한다.
 */
function queryCard(map: Map): HTMLElement | null {
	return within(map.getOverlays().item(0).getElement() as HTMLElement).queryByTestId('FeatureInfoCard');
}

/**
 * 피쳐를 선택한 것처럼 select 이벤트를 발생시키는 메서드
 */
function selectFeatures(select: Select, selected: Feature[], deselected: Feature[] = []): void {
	act(() => {
		select.dispatchEvent(new SelectEvent('select', selected, deselected, {} as MapBrowserEvent));
	});
}

/**
 * 폴리곤 지오메트리를 가진 피쳐를 생성하는 메서드
 */
function createPolygonFeature(): Feature {
	return new Feature({
		geometry: new Polygon([
			[
				[0, 0],
				[10, 0],
				[10, 20],
				[0, 20],
				[0, 0]
			]
		])
	});
}

describe('[@gis-dev/root-ui-pack] WfsPopup', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('맵이 없으면 아무것도 렌더링하지 않는다', () => {
		const { container } = renderPopup();

		expect(container).toBeEmptyDOMElement();
	});

	it('마운트하면 맵에 오버레이를 추가하고 처음에는 카드를 보여주지 않는다', () => {
		const { map } = createMap('clickSelect');

		renderPopup(map);

		expect(map.getOverlays().getLength()).toBe(1);
		expect(queryCard(map)).toBeNull();
	});

	it('언마운트하면 오버레이를 제거한다', () => {
		const { map } = createMap('clickSelect');

		const { unmount } = renderPopup(map);

		unmount();

		expect(map.getOverlays().getLength()).toBe(0);
	});

	it('언마운트하면 select 리스너를 해제한다', () => {
		const { map, select } = createMap('clickSelect');
		const spy = vi.spyOn(select, 'un');

		const { unmount } = renderPopup(map);

		unmount();

		expect(spy).toHaveBeenCalledWith('select', expect.any(Function));
	});

	it('피쳐를 선택하면 오버레이 요소 안에 정보 카드를 보여준다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createPolygonFeature()]);

		const card = queryCard(map) as HTMLElement;

		expect(card).not.toBeNull();
		expect(within(card).getByText('세종시청사').tagName).toBe('H3');
		expect(card).toHaveTextContent('buld_sejong.108');
		expect(card).toHaveTextContent('58190');
		expect(card).toHaveTextContent('2015-03-16');
	});

	it('선택된 피쳐로 건물 정보를 추출한다', () => {
		const { map, select } = createMap('clickSelect');
		const feature = createPolygonFeature();

		renderPopup(map);

		selectFeatures(select, [feature]);

		expect(getWfsBuildingInfo).toHaveBeenCalledWith(feature);
	});

	it('오버레이를 피쳐 extent의 중심에 위치시킨다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createPolygonFeature()]);

		expect(map.getOverlays().item(0).getPosition()).toEqual([5, 10]);
	});

	it('다른 피쳐를 선택하면 카드와 위치를 갱신한다', () => {
		const { map, select } = createMap('clickSelect');
		const next = new Feature({ geometry: new Point([100, 200]) });

		renderPopup(map);

		selectFeatures(select, [createPolygonFeature()]);
		selectFeatures(select, [next]);

		expect(getWfsBuildingInfo).toHaveBeenLastCalledWith(next);
		expect(map.getOverlays().item(0).getPosition()).toEqual([100, 200]);
	});

	it('선택이 해제되면 카드를 닫고 오버레이를 숨긴다', () => {
		const { map, select } = createMap('clickSelect');
		const feature = createPolygonFeature();

		renderPopup(map);

		selectFeatures(select, [feature]);
		expect(queryCard(map)).not.toBeNull();

		selectFeatures(select, [], [feature]);

		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('지오메트리가 없는 피쳐는 위치를 지정하지 않는다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [new Feature()]);

		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('닫기 버튼을 누르면 카드를 닫고 선택을 해제한다', () => {
		const { map, select } = createMap('clickSelect');
		const clearSpy = vi.spyOn(select.getFeatures(), 'clear');

		renderPopup(map);

		selectFeatures(select, [createPolygonFeature()]);

		fireEvent.click(within(queryCard(map) as HTMLElement).getByLabelText('닫기'));

		expect(clearSpy).toHaveBeenCalledOnce();
		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('clickSelect가 아닌 Select의 이벤트는 구독하지 않는다', () => {
		const { map, select } = createMap('hoverSelect');

		renderPopup(map);

		selectFeatures(select, [createPolygonFeature()]);

		expect(queryCard(map)).toBeNull();
	});

	it('Select가 등록되지 않은 맵에서도 에러 없이 동작한다', () => {
		const map = new Map({ interactions: [] });

		expect(() => renderPopup(map)).not.toThrow();
		expect(map.getOverlays().getLength()).toBe(1);
	});
});
