/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:40:00
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map, View } from 'ol';
import { Point, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { drawInteraction } from '@gis-dev/openlayers-service-pack/func/interaction';
import { transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import TransactionInsertButton from '.';

interface DialogProps {
	cta?: string;
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
	dialogProps: undefined as unknown as DialogProps,
	isPending: false,
	mutate: vi.fn(),
	options: undefined as unknown as MutationOptions
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

const EXCEPTION_REPORT = '<ows:ExceptionReport />';
const SUCCESS_RESPONSE = '<wfs:TransactionResponse />';

/**
 * 투영이 EPSG:3857인 테스트용 맵을 생성하는 메서드
 */
function createMap(): Map {
	return new Map({ view: new View({ center: [0, 0], projection: 'EPSG:3857', zoom: 2 }) });
}

/**
 * 맵 컨텍스트로 감싼 버튼을 만드는 메서드
 */
function createTree(map?: Map): React.JSX.Element {
	return (
		<MapContext value={map === undefined ? {} : { map }}>
			<TransactionInsertButton />
		</MapContext>
	);
}

/**
 * 그려진 폴리곤 피쳐를 draw 레이어에 추가하는 메서드
 */
function drawPolygon(): void {
	transactionLayer.drawLayer.getSource()?.addFeature(
		new Feature(
			new Polygon([
				[
					[0, 0],
					[10, 0],
					[10, 10],
					[0, 0]
				]
			])
		)
	);
}

/**
 * 그리기 시작 버튼을 클릭하는 메서드
 */
function startDrawing(): void {
	fireEvent.click(screen.getByTestId('TransactionInsertButton'));
}

/**
 * ESC 키로 그리기를 종료하는 메서드
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

describe('[@gis-dev/root-ui-pack] TransactionInsertButton', () => {
	let map: Map;

	beforeEach(() => {
		map = createMap();
		mocks.isPending = false;
	});

	afterEach(() => {
		map.removeInteraction(drawInteraction);

		transactionLayer.drawLayer.getSource()?.clear();

		vi.clearAllMocks();
	});

	it('버튼과 닫힌 다이얼로그를 렌더링한다', () => {
		render(createTree(map));

		expect(screen.getByTestId('TransactionInsertButton')).toBeEnabled();
		expect(isDialogOpen()).toBe(false);
	});

	it('삽입용 제목, 설명, CTA를 다이얼로그에 전달한다', () => {
		render(createTree(map));

		expect(mocks.dialogProps).toMatchObject({
			cta: '추가',
			description: '그린 도형에 연결할 건물 정보를 입력해 주세요.',
			title: '트랜잭션 삽입'
		});
	});

	describe('그리기', () => {
		it('클릭하면 그리기 인터렉션을 맵에 추가하고 draw 이름을 붙인다', () => {
			render(createTree(map));

			startDrawing();

			expect(map.getInteractions().getArray()).toContain(drawInteraction);
			expect(drawInteraction.get('name')).toBe('draw');
		});

		it('클릭하면 이전에 그린 도형을 지운다', () => {
			drawPolygon();

			render(createTree(map));

			startDrawing();

			expect(transactionLayer.drawLayer.getSource()?.getFeatures()).toHaveLength(0);
		});

		it('그리는 동안 버튼을 비활성화하고 종료 안내를 보여준다', () => {
			render(createTree(map));

			startDrawing();

			expect(screen.getByTestId('TransactionInsertButton')).toBeDisabled();
			expect(screen.getByText('ESC 또는 오른쪽 마우스 버튼을 눌러 종료하세요.')).toBeInTheDocument();
		});

		it('맵이 없으면 클릭해도 그리기를 시작하지 않는다', () => {
			render(createTree());

			startDrawing();

			expect(screen.getByTestId('TransactionInsertButton')).toBeEnabled();
			expect(screen.queryByText('ESC 또는 오른쪽 마우스 버튼을 눌러 종료하세요.')).not.toBeInTheDocument();
		});

		it('ESC 키로 그리기를 종료하면 인터렉션을 제거하고 버튼을 복원한다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();

			expect(map.getInteractions().getArray()).not.toContain(drawInteraction);
			expect(screen.getByTestId('TransactionInsertButton')).toBeEnabled();
			expect(screen.queryByText('ESC 또는 오른쪽 마우스 버튼을 눌러 종료하세요.')).not.toBeInTheDocument();
		});

		it('도형을 그린 뒤 종료하면 다이얼로그를 연다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();

			expect(isDialogOpen()).toBe(true);
		});

		it('도형 없이 종료하면 다이얼로그를 열지 않는다', () => {
			render(createTree(map));

			startDrawing();
			pressEscape();

			expect(isDialogOpen()).toBe(false);
		});

		it('오른쪽 마우스 버튼으로도 그리기를 종료하고 기본 메뉴는 막는다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();

			const notPrevented = fireEvent.contextMenu(document);

			expect(notPrevented).toBe(false);
			expect(isDialogOpen()).toBe(true);
			expect(map.getInteractions().getArray()).not.toContain(drawInteraction);
		});

		it('ESC가 아닌 키는 무시한다', () => {
			render(createTree(map));

			startDrawing();
			fireEvent.keyUp(document, { code: 'Enter' });

			expect(screen.getByTestId('TransactionInsertButton')).toBeDisabled();
		});

		it('그리는 중이 아니면 도형이 있어도 ESC 키를 무시한다', () => {
			render(createTree(map));

			drawPolygon();
			pressEscape();

			expect(isDialogOpen()).toBe(false);
		});

		it('종료 후에는 ESC 리스너가 해제되어 도형이 있어도 반응하지 않는다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();

			act(() => {
				mocks.dialogProps.onOpenChange(false);
			});

			drawPolygon();
			pressEscape();

			expect(isDialogOpen()).toBe(false);
		});

		it('그리는 중 맵이 사라지면 종료해도 아무 일도 일어나지 않는다', () => {
			const { rerender } = render(createTree(map));

			startDrawing();

			rerender(createTree());

			pressEscape();

			expect(screen.getByTestId('TransactionInsertButton')).toBeDisabled();
			expect(isDialogOpen()).toBe(false);
		});

		it('언마운트하면 그리기 인터렉션을 제거한다', () => {
			const { unmount } = render(createTree(map));

			startDrawing();

			expect(map.getInteractions().getArray()).toContain(drawInteraction);

			unmount();

			expect(map.getInteractions().getArray()).not.toContain(drawInteraction);
		});
	});

	describe('다이얼로그', () => {
		it('닫기를 요청하면 다이얼로그를 닫고 그린 도형을 지운다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();

			act(() => {
				mocks.dialogProps.onOpenChange(false);
			});

			expect(isDialogOpen()).toBe(false);
			expect(transactionLayer.drawLayer.getSource()?.getFeatures()).toHaveLength(0);
		});

		it('열기를 요청하면 도형을 지우지 않는다', () => {
			render(createTree(map));

			drawPolygon();

			act(() => {
				mocks.dialogProps.onOpenChange(true);
			});

			expect(isDialogOpen()).toBe(true);
			expect(transactionLayer.drawLayer.getSource()?.getFeatures()).toHaveLength(1);
		});

		it('전송 중이면 다이얼로그에 loading을 전달한다', () => {
			mocks.isPending = true;

			render(createTree(map));

			expect(mocks.dialogProps.loading).toBe(true);
		});
	});

	describe('제출', () => {
		it('입력값과 그린 폴리곤으로 삽입 XML을 만들어 전송한다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();

			act(() => {
				mocks.dialogProps.onSubmit({ address: '서울', name: '청사' });
			});

			expect(mocks.mutate).toHaveBeenCalledOnce();

			const xml = mocks.mutate.mock.calls[0]?.[0].data as string;

			expect(xml).toContain('<wfs:Insert><buld_test>');
			expect(xml).toContain('<name>청사</name>');
			expect(xml).toContain('<address>서울</address>');
			expect(xml).toContain('<gml:Polygon srsName="EPSG:3857">');
		});

		it('폴리곤이 아닌 도형만 있으면 전송하지 않는다', () => {
			render(createTree(map));

			startDrawing();
			transactionLayer.drawLayer.getSource()?.addFeature(new Feature(new Point([0, 0])));
			pressEscape();

			act(() => {
				mocks.dialogProps.onSubmit({ address: '서울', name: '청사' });
			});

			expect(mocks.mutate).not.toHaveBeenCalled();
		});

		it('맵이 없으면 전송하지 않는다', () => {
			const { rerender } = render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();

			rerender(createTree());

			act(() => {
				mocks.dialogProps.onSubmit({ address: '서울', name: '청사' });
			});

			expect(mocks.mutate).not.toHaveBeenCalled();
		});

		it('draw 레이어에 그려진 피쳐가 없으면 전송하지 않는다', () => {
			render(createTree(map));

			act(() => {
				mocks.dialogProps.onSubmit({ address: '서울', name: '청사' });
			});

			expect(mocks.mutate).not.toHaveBeenCalled();
		});

		it('제출 시점에 draw 레이어에 남은 폴리곤을 대상으로 한다', () => {
			render(createTree(map));

			startDrawing();
			drawPolygon();
			pressEscape();
			drawPolygon();

			act(() => {
				mocks.dialogProps.onSubmit({ address: '서울', name: '청사' });
			});

			const xml = mocks.mutate.mock.calls[0]?.[0].data as string;

			expect(xml.match(/<gml:Polygon /gu)).toHaveLength(2);
		});

		it('draw 레이어에 소스가 없어도 에러 없이 전송하지 않는다', () => {
			const spy = vi.spyOn(transactionLayer.drawLayer, 'getSource').mockReturnValue(null);

			render(createTree(map));

			expect(() =>
				act(() => {
					mocks.dialogProps.onSubmit({ address: '서울', name: '청사' });
				})
			).not.toThrow();
			expect(mocks.mutate).not.toHaveBeenCalled();

			spy.mockRestore();
		});

		it('XML 본문을 text/plain으로 전송하도록 요청 헤더를 지정한다', () => {
			render(createTree(map));

			expect(mocks.options.axios.headers['Content-Type']).toBe('text/plain;charset=UTF-8');
		});
	});

	describe('전송 결과', () => {
		/**
		 * WFS 레이어와 소스 refresh 스파이를 맵에 구성하는 메서드
		 */
		function setupWfsLayer(): ReturnType<typeof vi.spyOn> {
			const source = new VectorSource();

			map.addLayer(new VectorLayer({ properties: { name: 'wfs' }, source }));

			return vi.spyOn(source, 'refresh');
		}

		/**
		 * 도형을 그리고 다이얼로그가 열린 상태로 만드는 메서드
		 */
		function openDialogWithShape(): void {
			startDrawing();
			drawPolygon();
			pressEscape();
		}

		it('성공하면 WFS 레이어를 갱신하고 그린 도형을 지운 뒤 다이얼로그를 닫는다', () => {
			const refresh = setupWfsLayer();

			render(createTree(map));

			openDialogWithShape();

			act(() => {
				mocks.options.mutation.onSuccess({ data: SUCCESS_RESPONSE });
			});

			expect(refresh).toHaveBeenCalledOnce();
			expect(transactionLayer.drawLayer.getSource()?.getFeatures()).toHaveLength(0);
			expect(isDialogOpen()).toBe(false);
			expect(mockedToastAdd).toHaveBeenCalled();
		});

		it('응답에 ExceptionReport가 있으면 토스트로 알리고 다이얼로그를 유지한다', () => {
			const refresh = setupWfsLayer();

			render(createTree(map));

			openDialogWithShape();

			act(() => {
				mocks.options.mutation.onSuccess({ data: EXCEPTION_REPORT });
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '서버가 요청을 처리하지 못했습니다.',
				title: 'Insert failed'
			});
			expect(refresh).not.toHaveBeenCalled();
			expect(isDialogOpen()).toBe(true);
			expect(transactionLayer.drawLayer.getSource()?.getFeatures()).toHaveLength(1);
		});

		it('WFS 레이어가 없어도 성공 처리가 에러 없이 끝난다', () => {
			render(createTree(map));

			openDialogWithShape();

			expect(() =>
				act(() => {
					mocks.options.mutation.onSuccess({ data: SUCCESS_RESPONSE });
				})
			).not.toThrow();

			expect(isDialogOpen()).toBe(false);
		});

		it('맵이 없어도 성공 처리가 에러 없이 끝난다', () => {
			render(createTree());

			expect(() =>
				act(() => {
					mocks.options.mutation.onSuccess({ data: SUCCESS_RESPONSE });
				})
			).not.toThrow();
		});

		it('실패하면 토스트로 알린다', () => {
			render(createTree(map));

			act(() => {
				mocks.options.mutation.onError();
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
				title: 'Insert failed'
			});
		});
	});
});
