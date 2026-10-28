/**
 * 인터렉션 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:40:00
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Collection, Feature, Map, type MapBrowserEvent } from 'ol';
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import type { Style } from 'ol/style';

import { clickStyle, hoverStyle } from '#/func/style';

import {
	drawInteraction,
	getWfsClickSelect,
	getWfsEditInteractions,
	getWfsHoverSelect,
	getWfsModify,
	getWfsSnap,
	setEditInteractionsActive
} from '.';

// 레이어 모듈이 같은 스타일 모듈의 다른 export(drawStyle 등)를 쓰므로 hover, click 스타일만 대체한다
vi.mock('#/func/style', async (importOriginal) => ({
	...(await importOriginal<typeof import('#/func/style')>()),
	clickStyle: vi.fn(),
	hoverStyle: vi.fn()
}));

const LABEL_COLUMN = 'buld_nm';

const DEFAULT_PIXEL_TOLERANCE = 10;

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

	describe('drawInteraction 테스트', () => {
		it('Draw 인터렉션이다', () => {
			expect(drawInteraction).toBeInstanceOf(Draw);
		});

		it('draw 레이어에 소스가 없어도 Draw를 만든다', async () => {
			vi.resetModules();
			vi.doMock('../layer', () => ({ transactionLayer: { drawLayer: { getSource: () => null } } }));

			// 모듈 레지스트리를 초기화했으므로 ol 모듈도 새로 불러와 같은 클래스로 비교한다
			const { Draw: FreshDraw } = await import('ol/interaction');
			const fresh = await import('.');

			expect(fresh.drawInteraction).toBeInstanceOf(FreshDraw);

			vi.doUnmock('../layer');
			vi.resetModules();
		});

		it('맵에 추가할 수 있다', () => {
			const map = new Map();

			map.addInteraction(drawInteraction);

			expect(map.getInteractions().getArray()).toContain(drawInteraction);

			map.removeInteraction(drawInteraction);
		});
	});

	describe('getWfsSnap 테스트', () => {
		it('snap 이름을 가진 Snap을 반환한다', () => {
			const snap = getWfsSnap(new Collection<Feature>());

			expect(snap).toBeInstanceOf(Snap);
			expect(snap.get('name')).toBe('snap');
		});

		it('호출할 때마다 새 인스턴스를 반환한다', () => {
			const features = new Collection<Feature>();

			expect(getWfsSnap(features)).not.toBe(getWfsSnap(features));
		});

		it('빠른 움직임에도 붙도록 스냅 허용 반경을 OL 기본값(10px)보다 크게 한다', () => {
			const snap = getWfsSnap(new Collection<Feature>());

			// OL은 허용 반경을 공개 getter로 제공하지 않아 내부 필드를 읽는다
			expect(Reflect.get(snap, 'pixelTolerance_')).toBeGreaterThan(DEFAULT_PIXEL_TOLERANCE);
		});
	});

	describe('getWfsModify 테스트', () => {
		it('modify 이름을 가진 Modify를 반환한다', () => {
			const modify = getWfsModify(new Collection<Feature>());

			expect(modify).toBeInstanceOf(Modify);
			expect(modify.get('name')).toBe('modify');
		});

		it('호출할 때마다 새 인스턴스를 반환한다', () => {
			const features = new Collection<Feature>();

			expect(getWfsModify(features)).not.toBe(getWfsModify(features));
		});
	});

	describe('setEditInteractionsActive 테스트', () => {
		/**
		 * 편집용(snap, modify)과 그 외 인터렉션이 함께 등록된 맵을 생성하는 메서드
		 */
		function createEditMap(): { click: Select; hover: Select; map: Map; modify: Modify; snap: Snap } {
			const features = new Collection<Feature>();
			const click = getWfsClickSelect(LABEL_COLUMN);
			const hover = getWfsHoverSelect(LABEL_COLUMN);
			const modify = getWfsModify(features);
			const snap = getWfsSnap(features);

			return { click, hover, map: new Map({ interactions: [hover, click, modify, snap] }), modify, snap };
		}

		it('true이면 snap, modify를 활성화한다', () => {
			const { map, modify, snap } = createEditMap();

			modify.setActive(false);
			snap.setActive(false);

			setEditInteractionsActive(map, true);

			expect(modify.getActive()).toBe(true);
			expect(snap.getActive()).toBe(true);
		});

		it('false이면 snap, modify를 비활성화한다', () => {
			const { map, modify, snap } = createEditMap();

			setEditInteractionsActive(map, false);

			expect(modify.getActive()).toBe(false);
			expect(snap.getActive()).toBe(false);
		});

		it('hoverSelect, clickSelect 등 편집용이 아닌 인터렉션은 건드리지 않는다', () => {
			const { click, hover, map } = createEditMap();

			setEditInteractionsActive(map, false);

			expect(click.getActive()).toBe(true);
			expect(hover.getActive()).toBe(true);

			click.setActive(false);

			setEditInteractionsActive(map, true);

			expect(click.getActive()).toBe(false);
		});

		it('이름이 없는 인터렉션은 건드리지 않는다', () => {
			const unnamed = new Snap({ features: new Collection<Feature>() });
			const map = new Map({ interactions: [unnamed] });

			setEditInteractionsActive(map, false);

			expect(unnamed.getActive()).toBe(true);
		});

		it('맵이 없으면 에러 없이 무시한다', () => {
			expect(() => setEditInteractionsActive(undefined, true)).not.toThrow();
		});

		it('인터렉션이 없는 맵도 에러 없이 처리한다', () => {
			expect(() => setEditInteractionsActive(new Map({ interactions: [] }), true)).not.toThrow();
		});
	});

	describe('getWfsEditInteractions 테스트', () => {
		it('hover, click, snap, modify 순서의 인터렉션을 반환한다', () => {
			const interactions = getWfsEditInteractions(LABEL_COLUMN);

			expect(interactions.map((interaction) => interaction.get('name'))).toEqual([
				'hoverSelect',
				'clickSelect',
				'snap',
				'modify'
			]);
		});

		it('snap, modify는 꺼 두고 hover, click은 켜 둔다', () => {
			const [hover, click, snap, modify] = getWfsEditInteractions(LABEL_COLUMN);

			expect(hover?.getActive()).toBe(true);
			expect(click?.getActive()).toBe(true);
			expect(snap?.getActive()).toBe(false);
			expect(modify?.getActive()).toBe(false);
		});

		it('호출할 때마다 새 인스턴스를 반환한다', () => {
			const [first] = getWfsEditInteractions(LABEL_COLUMN);
			const [second] = getWfsEditInteractions(LABEL_COLUMN);

			expect(first).not.toBe(second);
		});

		it('편집용 인터렉션 목록을 setEditInteractionsActive가 그대로 제어할 수 있다', () => {
			const interactions = getWfsEditInteractions(LABEL_COLUMN);
			const map = new Map({ interactions });

			setEditInteractionsActive(map, true);

			expect(interactions.map((interaction) => interaction.getActive())).toEqual([true, true, true, true]);
		});
	});
});
