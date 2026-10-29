/**
 * 클러스터 팝업 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.29 목 11:10:00
 */

/** biome-ignore-all lint/style/useNamingConvention: for column name */

import { act, fireEvent, render, within } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map } from 'ol';
import { Point } from 'ol/geom';
import { Select } from 'ol/interaction';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';

import ClusterPopup from '.';

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
 * 맵 컨텍스트로 감싸 ClusterPopup을 렌더링하는 메서드
 */
function renderPopup(map?: Map): ReturnType<typeof render> {
	return render(
		<MapContext value={map === undefined ? {} : { map }}>
			<ClusterPopup />
		</MapContext>
	);
}

/**
 * 선택 피쳐 컬렉션을 주어진 피쳐로 교체해 피쳐를 선택한 것처럼 만드는 메서드
 */
function selectFeatures(select: Select, selected: Feature[]): void {
	act(() => {
		const features = select.getFeatures();

		// clear 호출 여부를 검증하는 테스트가 있어 clear 대신 하나씩 제거한다
		for (const feature of [...features.getArray()]) {
			features.remove(feature);
		}

		features.extend(selected);
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
 * 원본 피쳐 하나를 묶은 클러스터 래퍼 피쳐를 생성하는 메서드
 */
function createCluster(id: string, name: string, [x, y]: [number, number] = [5, 10]): Feature {
	const member = new Feature({
		addr: '서울 강남구 역삼동',
		doro_addr: '서울 강남구 테헤란로 1',
		name,
		tel: '02-123-4567',
		thumbnail: '/upload/store/a.jpg'
	});

	member.setId(id);

	return new Feature({ features: [member], geometry: new Point([x, y]) });
}

describe('[@gis-dev/root-ui-pack] ClusterPopup', () => {
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

	it('클러스터를 선택하면 묶인 원본 피쳐의 이름과 주소, 연락처를 보여준다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점')]);

		const card = queryCard(map) as HTMLElement;

		expect(card).not.toBeNull();
		expect(within(card).getByText('강남점').tagName).toBe('H3');
		expect(card).toHaveTextContent('point_starbucks.1');
		expect(card).toHaveTextContent('서울 강남구 테헤란로 1');
		expect(card).toHaveTextContent('서울 강남구 역삼동');
		expect(card).toHaveTextContent('02-123-4567');
	});

	it('주소와 연락처를 링크로, 썸네일을 이미지로 보여준다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점')]);

		const card = queryCard(map) as HTMLElement;

		// 오버레이 요소가 document에 붙지 않아 접근성 트리 기반 role 조회가 되지 않으므로 태그로 조회한다
		expect(card.querySelectorAll('a')).toHaveLength(3);
		expect(within(card).getByText('02-123-4567').closest('a')).toHaveAttribute('href', 'tel:02-123-4567');
		expect(within(card).getByAltText('강남점').tagName).toBe('IMG');
	});

	it('오버레이를 클러스터 지오메트리의 중심에 위치시킨다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점', [30, 40])]);

		expect(map.getOverlays().item(0).getPosition()).toEqual([30, 40]);
	});

	it('다른 클러스터를 선택하면 카드 내용을 갱신한다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점')]);
		selectFeatures(select, [createCluster('point_starbucks.2', '역삼점')]);

		const card = queryCard(map) as HTMLElement;

		expect(within(card).getByText('역삼점')).toBeTruthy();
		expect(card).toHaveTextContent('point_starbucks.2');
	});

	it('선택이 해제되면 카드를 닫고 오버레이를 숨긴다', () => {
		const { map, select } = createMap('clickSelect');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점')]);

		expect(queryCard(map)).not.toBeNull();

		selectFeatures(select, []);

		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('닫기 버튼을 누르면 선택을 해제하고 카드를 닫는다', () => {
		const { map, select } = createMap('clickSelect');
		const clearSpy = vi.spyOn(select.getFeatures(), 'clear');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점')]);

		fireEvent.click(within(queryCard(map) as HTMLElement).getByLabelText('닫기'));

		expect(clearSpy).toHaveBeenCalledOnce();
		expect(queryCard(map)).toBeNull();
	});

	it('clickSelect가 아닌 Select의 선택은 구독하지 않는다', () => {
		const { map, select } = createMap('hoverSelect');

		renderPopup(map);

		selectFeatures(select, [createCluster('point_starbucks.1', '강남점')]);

		expect(queryCard(map)).toBeNull();
	});

	it('언마운트하면 오버레이를 제거한다', () => {
		const { map } = createMap('clickSelect');

		const { unmount } = renderPopup(map);

		unmount();

		expect(map.getOverlays().getLength()).toBe(0);
	});
});
