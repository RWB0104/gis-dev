/**
 * 인터렉션 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:40:00
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map, type MapBrowserEvent } from 'ol';
import { Select } from 'ol/interaction';
import type { Style } from 'ol/style';

import { clickStyle, hoverStyle } from '#/func/style';

import { getWfsClickSelect, getWfsHoverSelect } from '.';

vi.mock('#/func/style', () => ({
	clickStyle: vi.fn(),
	hoverStyle: vi.fn()
}));

const LABEL_COLUMN = 'buld_nm';

/**
 * 지정한 타입의 맵 브라우저 이벤트 흉내 객체를 생성하는 메서드
 */
function createEvent(map: Map, type: string): MapBrowserEvent {
	return { map, originalEvent: {}, pixel: [0, 0], type } as unknown as MapBrowserEvent;
}

/**
 * 해당 픽셀에 피쳐가 있는 것처럼 맵을 설정하고 Select를 맵에 연결하는 메서드
 */
function attachSelect(select: Select, features: Feature[]): Map {
	const map = new Map();

	vi.spyOn(map, 'forEachFeatureAtPixel').mockImplementation((_pixel, callback) => {
		for (const feature of features) {
			callback(feature, null as never, null as never);
		}
	});

	select.setMap(map);

	return map;
}

/**
 * id를 가진 피쳐를 생성하는 메서드
 */
function createFeature(id?: string): Feature {
	const feature = new Feature();

	if (id !== undefined) {
		feature.setId(id);
	}

	return feature;
}

describe('[@gis-dev/openlayers-service-pack] interaction', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('getWfsHoverSelect 테스트', () => {
		it('hoverSelect 이름을 가진 Select를 반환한다', () => {
			const select = getWfsHoverSelect(LABEL_COLUMN);

			expect(select).toBeInstanceOf(Select);
			expect(select.get('name')).toBe('hoverSelect');
		});

		it('pointermove 이벤트에서 id가 있는 피쳐를 선택한다', () => {
			const select = getWfsHoverSelect(LABEL_COLUMN);
			const feature = createFeature('building.1');
			const map = attachSelect(select, [feature]);

			select.handleEvent(createEvent(map, 'pointermove'));

			expect(select.getFeatures().getArray()).toEqual([feature]);
		});

		it('pointermove가 아닌 이벤트는 무시한다', () => {
			const select = getWfsHoverSelect(LABEL_COLUMN);
			const map = attachSelect(select, [createFeature('building.1')]);

			select.handleEvent(createEvent(map, 'click'));

			expect(select.getFeatures().getLength()).toBe(0);
		});

		it('id가 없는 피쳐는 선택하지 않는다', () => {
			const select = getWfsHoverSelect(LABEL_COLUMN);
			const map = attachSelect(select, [createFeature()]);

			select.handleEvent(createEvent(map, 'pointermove'));

			expect(select.getFeatures().getLength()).toBe(0);
		});

		it('선택된 피쳐에 라벨 컬럼 기준 hoverStyle을 적용한다', () => {
			const style = { id: 'hover' } as unknown as Style;

			vi.mocked(hoverStyle).mockReturnValue(style);

			const select = getWfsHoverSelect(LABEL_COLUMN);
			const feature = createFeature('building.1');
			const map = attachSelect(select, [feature]);

			select.handleEvent(createEvent(map, 'pointermove'));

			const styleFunction = feature.getStyleFunction();

			expect(styleFunction?.(feature, 1)).toBe(style);
			expect(hoverStyle).toHaveBeenCalledWith(feature, LABEL_COLUMN);
		});
	});

	describe('getWfsClickSelect 테스트', () => {
		it('clickSelect 이름을 가진 Select를 반환한다', () => {
			const select = getWfsClickSelect(LABEL_COLUMN);

			expect(select).toBeInstanceOf(Select);
			expect(select.get('name')).toBe('clickSelect');
		});

		it('click 이벤트에서 id가 있는 피쳐를 선택한다', () => {
			const select = getWfsClickSelect(LABEL_COLUMN);
			const feature = createFeature('building.1');
			const map = attachSelect(select, [feature]);

			select.handleEvent(createEvent(map, 'click'));

			expect(select.getFeatures().getArray()).toEqual([feature]);
		});

		it('click이 아닌 이벤트는 무시한다', () => {
			const select = getWfsClickSelect(LABEL_COLUMN);
			const map = attachSelect(select, [createFeature('building.1')]);

			select.handleEvent(createEvent(map, 'pointermove'));

			expect(select.getFeatures().getLength()).toBe(0);
		});

		it('id가 없는 피쳐는 선택하지 않는다', () => {
			const select = getWfsClickSelect(LABEL_COLUMN);
			const map = attachSelect(select, [createFeature()]);

			select.handleEvent(createEvent(map, 'click'));

			expect(select.getFeatures().getLength()).toBe(0);
		});

		it('선택된 피쳐에 라벨 컬럼 기준 clickStyle을 적용한다', () => {
			const style = { id: 'click' } as unknown as Style;

			vi.mocked(clickStyle).mockReturnValue(style);

			const select = getWfsClickSelect(LABEL_COLUMN);
			const feature = createFeature('building.1');
			const map = attachSelect(select, [feature]);

			select.handleEvent(createEvent(map, 'click'));

			const styleFunction = feature.getStyleFunction();

			expect(styleFunction?.(feature, 1)).toBe(style);
			expect(clickStyle).toHaveBeenCalledWith(feature, LABEL_COLUMN);
		});
	});
});
