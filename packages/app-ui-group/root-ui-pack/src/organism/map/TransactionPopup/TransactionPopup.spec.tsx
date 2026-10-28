/**
 * 트랜잭션 팝업 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.28 수 14:50:00
 */

import { act, fireEvent, render, within } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map, type MapBrowserEvent } from 'ol';
import { Polygon } from 'ol/geom';
import { Select } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';

import TransactionPopup from '.';

/**
 * 이름이 지정된 Select가 등록된 맵을 생성하는 메서드
 */
function createMap(selectName?: string): { map: Map; select: Select } {
	const select = new Select();

	if (selectName !== undefined) {
		select.set('name', selectName);
	}

	return { map: new Map({ interactions: [select] }), select };
}

/**
 * 맵 컨텍스트로 감싸 TransactionPopup을 렌더링하는 메서드
 */
function renderPopup(map?: Map): ReturnType<typeof render> {
	return render(
		<MapContext value={map === undefined ? {} : { map }}>
			<TransactionPopup />
		</MapContext>
	);
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
 * 오버레이 요소 안의 정보 카드를 반환하는 메서드
 *
 * 맵에 target이 없어 오버레이 요소가 document에 붙지 않으므로, screen이 아니라 오버레이 요소 기준으로 조회한다.
 */
function queryCard(map: Map): HTMLElement | null {
	return within(map.getOverlays().item(0).getElement() as HTMLElement).queryByTestId('FeatureInfoCard');
}

/**
 * buld_test 속성을 가진 폴리곤 피쳐를 생성하는 메서드
 */
function createFeature(id: string, name: string, address: string): Feature {
	const feature = new Feature({
		address,
		geometry: new Polygon([
			[
				[0, 0],
				[10, 0],
				[10, 20],
				[0, 20],
				[0, 0]
			]
		]),
		name
	});

	feature.setId(id);

	return feature;
}

describe('[@gis-dev/root-ui-pack] TransactionPopup', () => {
	it('맵이 없으면 아무것도 렌더링하지 않는다', () => {
		const { container } = renderPopup();

		expect(container).toBeEmptyDOMElement();
	});

	it('처음에는 오버레이만 추가하고 카드는 보여주지 않는다', () => {
		const { map } = createMap('clickSelect');

		renderPopup(map);

		expect(map.getOverlays().getLength()).toBe(1);
		expect(queryCard(map)).toBeNull();
	});

	it('피쳐를 선택하면 이름을 제목으로, ID와 주소를 항목으로 보여준다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createFeature('buld_test.12', '청사', '서울 중구')]);

		const card = queryCard(map) as HTMLElement;

		expect(card).not.toBeNull();
		expect(within(card).getByText('청사').tagName).toBe('H3');
		expect(card).toHaveTextContent('ID');
		expect(card).toHaveTextContent('buld_test.12');
		expect(card).toHaveTextContent('주소');
		expect(card).toHaveTextContent('서울 중구');
	});

	it('buld_sejong 전용 항목(고유일련번호, 고시일자)은 보여주지 않는다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createFeature('buld_test.12', '청사', '서울 중구')]);

		const card = queryCard(map) as HTMLElement;

		expect(card).not.toHaveTextContent('고유일련번호');
		expect(card).not.toHaveTextContent('고시일자');
	});

	it('오버레이를 피쳐 extent의 중심에 위치시킨다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createFeature('buld_test.12', '청사', '서울 중구')]);

		expect(map.getOverlays().item(0).getPosition()).toEqual([5, 10]);
	});

	it('다른 피쳐를 선택하면 카드 내용을 갱신한다', () => {
		const { map, select } = createMap('clickSelect');
		const first = createFeature('buld_test.12', '청사', '서울 중구');

		renderPopup(map);

		selectFeatures(select, [first]);
		selectFeatures(select, [createFeature('buld_test.13', '시청', '세종')], [first]);

		const card = queryCard(map) as HTMLElement;

		expect(within(card).getByText('시청')).toBeTruthy();
		expect(card).toHaveTextContent('buld_test.13');
		expect(card).toHaveTextContent('세종');
	});

	it('선택이 해제되면 카드를 닫고 오버레이를 숨긴다', () => {
		const { map, select } = createMap('clickSelect');
		const feature = createFeature('buld_test.12', '청사', '서울 중구');

		renderPopup(map);

		selectFeatures(select, [feature]);

		expect(queryCard(map)).not.toBeNull();

		selectFeatures(select, [], [feature]);

		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('닫기 버튼을 누르면 선택을 해제하고 카드를 닫는다', () => {
		const { map, select } = createMap('clickSelect');
		const clearSpy = vi.spyOn(select.getFeatures(), 'clear');

		renderPopup(map);

		selectFeatures(select, [createFeature('buld_test.12', '청사', '서울 중구')]);

		fireEvent.click(within(queryCard(map) as HTMLElement).getByLabelText('닫기'));

		expect(clearSpy).toHaveBeenCalledOnce();
		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('clickSelect가 아닌 Select의 이벤트는 구독하지 않는다', () => {
		const { map, select } = createMap('hoverSelect');

		renderPopup(map);

		selectFeatures(select, [createFeature('buld_test.12', '청사', '서울 중구')]);

		expect(queryCard(map)).toBeNull();
	});

	it('언마운트하면 오버레이를 제거한다', () => {
		const { map } = createMap('clickSelect');

		const { unmount } = renderPopup(map);

		unmount();

		expect(map.getOverlays().getLength()).toBe(0);
	});
});
