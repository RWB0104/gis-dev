/**
 * 트랜잭션 삭제 버튼 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.28 수 18:10:00
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import TransactionDeleteButton from '.';

interface MutationOptions {
	axios: { headers: Record<string, string> };
	mutation: {
		onError: () => void;
		onSuccess: (response: { data: string }) => void;
	};
}

const mocks = vi.hoisted(() => ({
	clear: vi.fn(),
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

const mockedToastAdd = vi.mocked(toast.add);

/**
 * ID를 가진 피쳐를 생성하는 메서드
 */
function createFeature(id?: string | number): Feature {
	const feature = new Feature();

	if (id !== undefined) {
		feature.setId(id);
	}

	return feature;
}

/**
 * WFS 레이어가 등록된 맵과 그 소스의 refresh 스파이를 생성하는 메서드
 */
function createMap(): { map: Map; refresh: ReturnType<typeof vi.spyOn> } {
	const source = new VectorSource();
	const refresh = vi.spyOn(source, 'refresh');
	const map = new Map();

	map.addLayer(new VectorLayer({ properties: { name: 'wfs' }, source }));

	return { map, refresh };
}

/**
 * 맵 컨텍스트로 감싼 버튼을 만드는 메서드
 */
function createTree(map?: Map): React.JSX.Element {
	return (
		<MapContext value={map === undefined ? {} : { map }}>
			<TransactionDeleteButton />
		</MapContext>
	);
}

describe('[@gis-dev/root-ui-pack] TransactionDeleteButton', () => {
	beforeEach(() => {
		mocks.feature = createFeature('buld_test.12');
		mocks.isPending = false;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('렌더링', () => {
		it('접근성 이름을 가진 버튼을 렌더링한다', () => {
			render(createTree(createMap().map));

			expect(screen.getByRole('button', { name: '도형 삭제' })).toBe(screen.getByTestId('TransactionDeleteButton'));
		});

		it('선택된 피쳐가 없으면 버튼을 비활성화한다', () => {
			mocks.feature = undefined;

			render(createTree(createMap().map));

			expect(screen.getByTestId('TransactionDeleteButton')).toBeDisabled();
		});

		it('선택된 피쳐가 있으면 버튼을 활성화한다', () => {
			render(createTree(createMap().map));

			expect(screen.getByTestId('TransactionDeleteButton')).toBeEnabled();
		});

		it('전송 중이면 버튼을 비활성화한다', () => {
			mocks.isPending = true;

			render(createTree(createMap().map));

			expect(screen.getByTestId('TransactionDeleteButton')).toBeDisabled();
		});

		it('XML 본문을 text/plain으로 전송하도록 요청 헤더를 지정한다', () => {
			render(createTree(createMap().map));

			expect(mocks.options.axios.headers['Content-Type']).toBe('text/plain;charset=UTF-8');
		});
	});

	describe('삭제 요청', () => {
		it('선택된 피쳐 ID로 삭제 XML을 만들어 전송한다', () => {
			render(createTree(createMap().map));

			fireEvent.click(screen.getByTestId('TransactionDeleteButton'));

			expect(mocks.mutate).toHaveBeenCalledOnce();

			const xml = mocks.mutate.mock.calls[0]?.[0].data as string;

			expect(xml).toContain('<wfs:Delete typeName="buld_test">');
			expect(xml).toContain('<ogc:FeatureId fid="buld_test.12"/>');
		});

		it('숫자 ID도 문자열로 변환해 전송한다', () => {
			mocks.feature = createFeature(7);

			render(createTree(createMap().map));

			fireEvent.click(screen.getByTestId('TransactionDeleteButton'));

			expect(mocks.mutate.mock.calls[0]?.[0].data).toContain('<ogc:FeatureId fid="7"/>');
		});

		it('피쳐에 ID가 없으면 전송하지 않는다', () => {
			mocks.feature = createFeature();

			render(createTree(createMap().map));

			fireEvent.click(screen.getByTestId('TransactionDeleteButton'));

			expect(mocks.mutate).not.toHaveBeenCalled();
		});

		it('선택된 피쳐가 없으면 전송하지 않는다', () => {
			mocks.feature = undefined;

			render(createTree(createMap().map));

			fireEvent.click(screen.getByTestId('TransactionDeleteButton'));

			expect(mocks.mutate).not.toHaveBeenCalled();
		});
	});

	describe('전송 결과', () => {
		it('성공하면 알리고 WFS 레이어를 갱신한 뒤 선택을 해제한다', () => {
			const { map, refresh } = createMap();

			render(createTree(map));

			act(() => {
				mocks.options.mutation.onSuccess({ data: '<wfs:TransactionResponse />' });
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '삭제했습니다.',
				title: 'Delete success'
			});
			expect(refresh).toHaveBeenCalledOnce();
			expect(mocks.clear).toHaveBeenCalledOnce();
		});

		it('맵이 없어도 성공 처리 시 에러 없이 선택을 해제한다', () => {
			render(createTree());

			expect(() =>
				act(() => {
					mocks.options.mutation.onSuccess({ data: '<wfs:TransactionResponse />' });
				})
			).not.toThrow();
			expect(mocks.clear).toHaveBeenCalledOnce();
		});

		it('응답에 ExceptionReport가 있으면 실패로 알리고 갱신, 선택 해제는 하지 않는다', () => {
			const { map, refresh } = createMap();

			render(createTree(map));

			act(() => {
				mocks.options.mutation.onSuccess({ data: '<ows:ExceptionReport />' });
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '서버가 요청을 처리하지 못했습니다.',
				title: 'Delete failed'
			});
			expect(refresh).not.toHaveBeenCalled();
			expect(mocks.clear).not.toHaveBeenCalled();
		});

		it('요청이 실패하면 토스트로 알린다', () => {
			render(createTree(createMap().map));

			act(() => {
				mocks.options.mutation.onError();
			});

			expect(mockedToastAdd).toHaveBeenCalledExactlyOnceWith({
				description: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
				title: 'Delete failed'
			});
			expect(mocks.clear).not.toHaveBeenCalled();
		});
	});
});
