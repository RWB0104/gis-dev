/**
 * 트랜잭션 수정 버튼 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 22:00:00
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Collection, Feature, Map } from 'ol';
import { Point, Polygon } from 'ol/geom';
import { type Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { getWfsModify, getWfsSnap } from '@gis-dev/openlayers-service-pack/func/interaction';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import TransactionUpdateButton from '.';

interface DialogProps {
	cta?: string;
	defaultValue?: { address: string; name: string };
	description?: string;
	loading?: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (values: { address: string; name: string }) => void;
	open: boolean;
	title: string;
}

interface MutationOptions {
	axios: { headers: Record<string, string> };
	mutation: {
		onError: () => void;
		onSuccess: (response: { data: string }) => void;
	};
}

const mocks = vi.hoisted(() => ({
	clear: vi.fn(),
	dialogProps: undefined as unknown as DialogProps,
	feature: undefined as Feature | undefined,
	isPending: false,
	mutate: vi.fn(),
	options: undefined as unknown as MutationOptions
}));

vi.mock('@gis-dev/openlayers-service-pack/hooks/selectedFeature', () => ({
	useSelectedFeature: () => ({ clear: mocks.clear, feature: mocks.feature })
}));

vi.mock('@gis-dev/api-pack/generated/react-query/api/wfs/wfs', () => ({
	useWfsTransaction: vi.fn((options: MutationOptions) => {
		mocks.options = options;

		return { isPending: mocks.isPending, mutate: mocks.mutate };
	})
}));

vi.mock('@gis-dev/shadcn-ui-pack/components/ui/toast', () => ({
	toast: { add: vi.fn() }
}));

vi.mock('#/organism/map/TransactionFormDialog', () => ({
	default: (props: DialogProps) => {
		mocks.dialogProps = props;

		return <div data-open={props.open} data-testid="TransactionFormDialog" />;
	}
}));

const mockedToastAdd = vi.mocked(toast.add);

const GUIDE_TEXT = '도형 바깥을 누르거나 ESC로 종료하세요.';

/**
 * 폴리곤 지오메트리와 속성을 가진 피쳐를 생성하는 메서드
 */
function createFeature(
	id: string | null = 'buld_test.12',
	properties: Record<string, unknown> = { address: '서울', name: '청사' }
): Feature {
	const feature = new Feature({
		geometry: new Polygon([
			[
				[0, 0],
				[10, 0],
				[10, 10],
				[0, 0]
			]
		]),
		...properties
	});

	if (id !== null) {
		feature.setId(id);
	}

	return feature;
}

/**
 * 이름이 지정된 snap, modify가 비활성 상태로 등록된 맵을 생성하는 메서드
 */
function createMap(): { map: Map; modify: Modify; snap: Snap } {
	const features = new Collection<Feature>();
	const modify = getWfsModify(features);
	const snap = getWfsSnap(features);

	modify.setActive(false);
	snap.setActive(false);

	return { map: new Map({ interactions: [modify, snap] }), modify, snap };
}

/**
 * 맵 컨텍스트로 감싼 버튼을 만드는 메서드
 */
function createTree(map?: Map): React.JSX.Element {
	return (
		<MapContext value={map === undefined ? {} : { map }}>
			<TransactionUpdateButton />
		</MapContext>
	);
}

/**
 * 편집을 시작하는 메서드
 */
function startEdit(): void {
	fireEvent.click(screen.getByTestId('TransactionUpdateButton'));
}

/**
 * ESC 키로 편집을 종료하는 메서드
 */
function pressEscape(): void {
	fireEvent.keyUp(document, { code: 'Escape' });
}

/**
 * 다이얼로그 열림 여부를 반환하는 메서드
 */
function isDialogOpen(): boolean {
	return screen.getByTestId('TransactionFormDialog').getAttribute('data-open') === 'true';
}

describe('[@gis-dev/root-ui-pack] TransactionUpdateButton', () => {
	beforeEach(() => {
		mocks.feature = createFeature();
		mocks.isPending = false;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('렌더링', () => {
		it('선택된 피쳐가 없으면 버튼을 비활성화한다', () => {
			mocks.feature = undefined;

			render(createTree(createMap().map));

			expect(screen.getByTestId('TransactionUpdateButton')).toBeDisabled();
		});

		it('선택된 피쳐가 있으면 버튼을 활성화한다', () => {
			render(createTree(createMap().map));

			expect(screen.getByTestId('TransactionUpdateButton')).toBeEnabled();
		});

		it('다이얼로그는 처음에 닫혀 있고 수정용 제목과 CTA를 받는다', () => {
			render(createTree(createMap().map));

			expect(isDialogOpen()).toBe(false);
			expect(mocks.dialogProps).toMatchObject({ cta: '수정', title: '트랜잭션 수정' });
		});

		it('XML 본문을 text/plain으로 전송하도록 요청 헤더를 지정한다', () => {
			render(createTree(createMap().map));

			expect(mocks.options.axios.headers['Content-Type']).toBe('text/plain;charset=UTF-8');
		});

		it('전송 중이면 다이얼로그에 loading을 전달한다', () => {
			mocks.isPending = true;

			render(createTree(createMap().map));

			expect(mocks.dialogProps.loading).toBe(true);
		});
	});

	describe('편집', () => {
		it('클릭하면 snap, modify를 활성화한다', () => {
			const { map, modify, snap } = createMap();

			render(createTree(map));

			startEdit();

			expect(modify.getActive()).toBe(true);
			expect(snap.getActive()).toBe(true);
		});

		it('편집 중에는 버튼을 비활성화하고 종료 안내를 보여준다', () => {
			render(createTree(createMap().map));

			startEdit();

			expect(screen.getByTestId('TransactionUpdateButton')).toBeDisabled();
			expect(screen.getByText(GUIDE_TEXT)).toBeInTheDocument();
		});

		it('편집용이 아닌 인터렉션은 건드리지 않는다', () => {
			const { map, modify } = createMap();
			const other = new Snap({ features: new Collection<Feature>() });

			other.setActive(false);

			map.addInteraction(other);

			render(createTree(map));

			startEdit();

			expect(modify.getActive()).toBe(true);
			expect(other.getActive()).toBe(false);
		});

		it('ESC로 종료하면 snap, modify를 다시 비활성화하고 버튼을 복원한다', () => {
			const { map, modify, snap } = createMap();

			render(createTree(map));

			startEdit();
			pressEscape();

			expect(modify.getActive()).toBe(false);
			expect(snap.getActive()).toBe(false);
			expect(screen.getByTestId('TransactionUpdateButton')).toBeEnabled();
			expect(screen.queryByText(GUIDE_TEXT)).not.toBeInTheDocument();
		});

		it('도형을 수정하지 않고 종료하면 다이얼로그를 열지 않는다', () => {
			render(createTree(createMap().map));

			startEdit();
			pressEscape();

			expect(isDialogOpen()).toBe(false);
		});

		it('도형을 수정한 뒤 ESC로 종료하면 다이얼로그를 연다', () => {
			const { map, modify } = createMap();

			render(createTree(map));

			startEdit();
			modify.dispatchEvent('modifyend');
			pressEscape();

			expect(isDialogOpen()).toBe(true);
		});

		it('도형 바깥을 눌러 선택이 해제되어도 수정했다면 이전 피쳐로 다이얼로그를 연다', () => {
			const { map, modify } = createMap();
			const { rerender } = render(createTree(map));

			startEdit();
			modify.dispatchEvent('modifyend');

			mocks.feature = undefined;
			rerender(createTree(map));

			expect(isDialogOpen()).toBe(true);
			expect(mocks.dialogProps.description).toBe('대상 빌딩: buld_test.12');
			expect(screen.getByTestId('TransactionUpdateButton')).toBeDisabled();
		});

		it('다른 피쳐를 선택하면 편집을 종료하고 이전 피쳐를 대상으로 한다', () => {
			const { map, modify } = createMap();
			const { rerender } = render(createTree(map));

			startEdit();
			modify.dispatchEvent('modifyend');

			mocks.feature = createFeature('buld_test.99');
			rerender(createTree(map));

			expect(mocks.dialogProps.description).toBe('대상 빌딩: buld_test.12');
		});

		it('선택이 바뀌어도 수정하지 않았다면 다이얼로그를 열지 않는다', () => {
			const { map } = createMap();
			const { rerender } = render(createTree(map));

			startEdit();

			mocks.feature = undefined;
			rerender(createTree(map));

			expect(isDialogOpen()).toBe(false);
			expect(screen.queryByText(GUIDE_TEXT)).not.toBeInTheDocument();
		});

		it('편집 중이 아닐 때 선택이 바뀌어도 아무 일도 일어나지 않는다', () => {
			const { map } = createMap();
			const { rerender } = render(createTree(map));

			mocks.feature = createFeature('buld_test.99');
			rerender(createTree(map));

			expect(isDialogOpen()).toBe(false);
			expect(screen.queryByText(GUIDE_TEXT)).not.toBeInTheDocument();
		});

		it('같은 피쳐가 유지되면 리렌더해도 편집을 종료하지 않는다', () => {
			const { map } = createMap();
			const { rerender } = render(createTree(map));

			startEdit();

			rerender(createTree(map));

			expect(screen.getByText(GUIDE_TEXT)).toBeInTheDocument();
		});

		it('ESC가 아닌 키는 무시한다', () => {
			render(createTree(createMap().map));

			startEdit();
			fireEvent.keyUp(document, { code: 'Enter' });

			expect(screen.getByText(GUIDE_TEXT)).toBeInTheDocument();
		});

		it('종료 이벤트가 연달아 들어와도 한 번만 처리한다', () => {
			const { map, modify } = createMap();

			render(createTree(map));

			startEdit();
			modify.dispatchEvent('modifyend');

			expect(() =>
				act(() => {
					pressEscape();
					pressEscape();
				})
			).not.toThrow();

			expect(isDialogOpen()).toBe(true);
		});

		it('편집 중이 아닐 때 modifyend가 들어와도 에러 없이 무시한다', () => {
			const { map, modify } = createMap();

			render(createTree(map));

			expect(() => modify.dispatchEvent('modifyend')).not.toThrow();
		});

		it('편집이 끝난 뒤의 modifyend는 다음 편집에 영향을 주지 않는다', () => {
			const { map, modify } = createMap();

			render(createTree(map));

			startEdit();
			pressEscape();

			modify.dispatchEvent('modifyend');

			startEdit();
			pressEscape();

			expect(isDialogOpen()).toBe(false);
		});

		it('언마운트하면 modifyend 리스너를 해제하고 편집용 인터렉션을 끈다', () => {
			const { map, modify, snap } = createMap();
			const spy = vi.spyOn(modify, 'un');

			const { unmount } = render(createTree(map));

			startEdit();
			unmount();

			expect(spy).toHaveBeenCalledWith('modifyend', expect.any(Function));
			expect(modify.getActive()).toBe(false);
			expect(snap.getActive()).toBe(false);
		});

		it('modify가 없는 맵과 맵이 없는 경우에도 에러 없이 렌더링한다', () => {
			expect(() => render(createTree(new Map({ interactions: [] })))).not.toThrow();
			expect(() => render(createTree())).not.toThrow();
		});
	});

	describe('다이얼로그', () => {
		/**
		 * 도형을 수정하고 다이얼로그가 열린 상태로 만드는 메서드
		 */
		function openDialog(modify: Modify): void {
			startEdit();
			modify.dispatchEvent('modifyend');
			pressEscape();
		}

		it('대상 피쳐의 기존 값으로 폼을 채우고 대상 ID를 안내한다', () => {
			const { map, modify } = createMap();

			render(createTree(map));

			openDialog(modify);

			expect(isDialogOpen()).toBe(true);
			expect(mocks.dialogProps.defaultValue).toEqual({ address: '서울', name: '청사' });
			expect(mocks.dialogProps.description).toBe('대상 빌딩: buld_test.12');
		});

		it('속성과 ID가 없는 피쳐는 빈 값으로 채운다', () => {
			mocks.feature = createFeature(null, {});

			const { map, modify } = createMap();

			render(createTree(map));

			openDialog(modify);

			expect(mocks.dialogProps.defaultValue).toEqual({ address: '', name: '' });
			expect(mocks.dialogProps.description).toBe('대상 빌딩: ');
		});

		it('닫기를 요청하면 WFS 레이어를 되돌리고 선택을 해제하며 다이얼로그를 닫는다', () => {
			const source = new VectorSource();
			const refresh = vi.spyOn(source, 'refresh');
			const { map, modify } = createMap();

			map.addLayer(new VectorLayer({ properties: { name: 'wfs' }, source }));

			render(createTree(map));

			openDialog(modify);

			act(() => {
				mocks.dialogProps.onOpenChange(false);
			});

			expect(refresh).toHaveBeenCalledOnce();
			expect(mocks.clear).toHaveBeenCalledOnce();
			expect(isDialogOpen()).toBe(false);
		});

		it('열기를 요청하는 변경은 무시한다', () => {
			const { map } = createMap();

			render(createTree(map));

			act(() => {
				mocks.dialogProps.onOpenChange(true);
			});

			expect(mocks.clear).not.toHaveBeenCalled();
			expect(isDialogOpen()).toBe(false);
		});
	});

	describe('제출', () => {
		/**
		 * 도형을 수정하고 다이얼로그가 열린 상태로 만드는 메서드
		 */
		function openDialog(modify: Modify): void {
			startEdit();
			modify.dispatchEvent('modifyend');
			pressEscape();
		}

		it('입력값과 수정된 도형, 피쳐 ID로 수정 XML을 만들어 전송한다', () => {
			const { map, modify } = createMap();

			render(createTree(map));

			openDialog(modify);

			act(() => {
				mocks.dialogProps.onSubmit({ address: '세종', name: '시청' });
			});

			expect(mocks.mutate).toHaveBeenCalledOnce();

			const xml = mocks.mutate.mock.calls[0]?.[0].data as string;

			expect(xml).toContain('<wfs:Update typeName="buld_test">');
			expect(xml).toContain('<wfs:Name>name</wfs:Name><wfs:Value>시청</wfs:Value>');
			expect(xml).toContain('<wfs:Name>address</wfs:Name><wfs:Value>세종</wfs:Value>');
			expect(xml).toContain('<gml:Polygon srsName="EPSG:3857">');
			expect(xml).toContain('<ogc:FeatureId fid="buld_test.12"/>');
		});

		it('피쳐 ID가 없으면 전송하지 않는다', () => {
			mocks.feature = createFeature(null);

			const { map, modify } = createMap();

			render(createTree(map));

			openDialog(modify);

			act(() => {
				mocks.dialogProps.onSubmit({ address: '세종', name: '시청' });
			});

			expect(mocks.mutate).not.toHaveBeenCalled();
		});

		it('폴리곤이 아닌 도형이면 전송하지 않는다', () => {
			mocks.feature = new Feature({ geometry: new Point([0, 0]) });
			mocks.feature.setId('buld_test.12');

			const { map, modify } = createMap();

			render(createTree(map));

			openDialog(modify);

			act(() => {
				mocks.dialogProps.onSubmit({ address: '세종', name: '시청' });
			});

			expect(mocks.mutate).not.toHaveBeenCalled();
		});

		it('맵이 없으면 전송하지 않는다', () => {
			const { map, modify } = createMap();
			const { rerender } = render(createTree(map));

			openDialog(modify);

			rerender(createTree());

			act(() => {
				mocks.dialogProps.onSubmit({ address: '세종', name: '시청' });
			});

			expect(mocks.mutate).not.toHaveBeenCalled();
		});
	});

	describe('전송 결과', () => {
		/**
		 * 도형을 수정하고 다이얼로그가 열린 상태로 만드는 메서드
		 */
		function openDialog(modify: Modify): void {
			startEdit();
			modify.dispatchEvent('modifyend');
			pressEscape();
		}

		it('성공하면 WFS 레이어를 갱신하고 선택을 해제한 뒤 다이얼로그를 닫는다', () => {
			const source = new VectorSource();
			const refresh = vi.spyOn(source, 'refresh');
			const { map, modify } = createMap();

			map.addLayer(new VectorLayer({ properties: { name: 'wfs' }, source }));

			render(createTree(map));

			openDialog(modify);

			act(() => {
				mocks.options.mutation.onSuccess({ data: '<wfs:TransactionResponse />' });
			});

			expect(refresh).toHaveBeenCalledOnce();
			expect(mocks.clear).toHaveBeenCalledOnce();
			expect(isDialogOpen()).toBe(false);
			expect(mockedToastAdd).toHaveBeenCalled();
		});

		it('응답에 ExceptionReport가 있으면 토스트로 알리고 다이얼로그를 유지한다', () => {
			const source = new VectorSource();
			const refresh = vi.spyOn(source, 'refresh');
			const { map, modify } = createMap();

			map.addLayer(new VectorLayer({ properties: { name: 'wfs' }, source }));

			render(createTree(map));

			openDialog(modify);

			act(() => {
				mocks.options.mutation.onSuccess({ data: '<ows:ExceptionReport />' });
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '서버가 요청을 처리하지 못했습니다.',
				title: 'Update failed'
			});
			expect(refresh).not.toHaveBeenCalled();
			expect(mocks.clear).not.toHaveBeenCalled();
			expect(isDialogOpen()).toBe(true);
		});

		it('실패하면 토스트로 알린다', () => {
			render(createTree(createMap().map));

			act(() => {
				mocks.options.mutation.onError();
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
				title: 'Update failed'
			});
		});
	});
});
