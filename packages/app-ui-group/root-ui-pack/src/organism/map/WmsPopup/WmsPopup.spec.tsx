/**
 * WMS 팝업 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 18:15:00
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';
import type BaseEvent from 'ol/events/Event';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { getWfsBuildingInfo } from '@gis-dev/openlayers-service-pack/func/feature';
import { getWmsFeatureInfoUrl } from '@gis-dev/openlayers-service-pack/func/wms';

import WmsPopup from '.';

vi.mock('@gis-dev/openlayers-service-pack/func/wms', () => ({
	getWmsFeatureInfoUrl: vi.fn()
}));

vi.mock('@gis-dev/openlayers-service-pack/func/feature', () => ({
	getWfsBuildingInfo: vi.fn(() => ({
		id: 'buld_sejong.108',
		name: '세종시청사',
		noticeDate: '2015-03-16',
		serialNo: '58190'
	}))
}));

const fetchMock = vi.fn();

const FEATURE_INFO_URL = 'https://example.com/geoserver/wms?REQUEST=GetFeatureInfo';

const FEATURE_COLLECTION = {
	features: [
		{
			geometry: { coordinates: [1, 2], type: 'Point' },
			id: 'buld_sejong.108',
			properties: {},
			type: 'Feature'
		}
	],
	type: 'FeatureCollection'
};

const EMPTY_COLLECTION = { features: [], type: 'FeatureCollection' };

/**
 * 조회 결과를 반환하는 fetch 응답을 생성하는 메서드
 */
function createResponse(body: unknown, ok = true, status = 200): Response {
	return { json: () => Promise.resolve(body), ok, status } as unknown as Response;
}

/**
 * 쿼리 클라이언트와 맵 컨텍스트로 감싸 WmsPopup을 렌더링하는 메서드
 */
function renderPopup(map?: Map): ReturnType<typeof render> {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

	return render(
		<QueryClientProvider client={client}>
			<MapContext value={map === undefined ? {} : { map }}>
				<WmsPopup />
			</MapContext>
		</QueryClientProvider>
	);
}

/**
 * 맵을 클릭한 것처럼 singleclick 이벤트를 발생시키는 메서드
 */
function clickMap(map: Map, coordinate: number[]): void {
	act(() => {
		map.dispatchEvent({ coordinate, type: 'singleclick' } as unknown as BaseEvent);
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

describe('[@gis-dev/root-ui-pack] WmsPopup', () => {
	beforeEach(() => {
		fetchMock.mockResolvedValue(createResponse(FEATURE_COLLECTION));
		vi.mocked(getWmsFeatureInfoUrl).mockReturnValue(FEATURE_INFO_URL);

		vi.stubGlobal('fetch', fetchMock);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.clearAllMocks();
		fetchMock.mockReset();
	});

	it('맵이 없으면 아무것도 렌더링하지 않는다', () => {
		const { container } = renderPopup();

		expect(container).toBeEmptyDOMElement();
	});

	it('마운트하면 맵에 오버레이를 추가하고 처음에는 카드를 보여주지 않는다', () => {
		const map = new Map();

		renderPopup(map);

		expect(map.getOverlays().getLength()).toBe(1);
		expect(queryCard(map)).toBeNull();
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('언마운트하면 오버레이를 제거하고 singleclick 리스너를 해제한다', () => {
		const map = new Map();
		const spy = vi.spyOn(map, 'un');

		const { unmount } = renderPopup(map);

		unmount();

		expect(map.getOverlays().getLength()).toBe(0);
		expect(spy).toHaveBeenCalledWith('singleclick', expect.any(Function));
	});

	it('맵을 클릭하면 클릭 좌표로 GetFeatureInfo URL을 만들어 조회한다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());

		expect(getWmsFeatureInfoUrl).toHaveBeenCalledWith(map, [5, 10]);
		expect(fetchMock).toHaveBeenCalledWith(FEATURE_INFO_URL, expect.objectContaining({ signal: expect.anything() }));
	});

	it('피쳐가 조회되면 오버레이 요소 안에 정보 카드를 보여준다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(queryCard(map)).not.toBeNull());

		const card = queryCard(map) as HTMLElement;

		expect(within(card).getByText('세종시청사').tagName).toBe('H3');
		expect(card).toHaveTextContent('buld_sejong.108');
		expect(card).toHaveTextContent('58190');
		expect(card).toHaveTextContent('2015-03-16');
	});

	it('조회된 첫 번째 피쳐로 건물 정보를 추출한다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(getWfsBuildingInfo).toHaveBeenCalled());

		const feature = vi.mocked(getWfsBuildingInfo).mock.calls[0]?.[0];

		expect(feature?.getId()).toBe('buld_sejong.108');
	});

	it('오버레이를 클릭한 좌표에 위치시킨다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(queryCard(map)).not.toBeNull());

		expect(map.getOverlays().item(0).getPosition()).toEqual([5, 10]);
	});

	it('조회된 피쳐가 없으면 카드를 보여주지 않는다', async () => {
		fetchMock.mockResolvedValue(createResponse(EMPTY_COLLECTION));

		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());

		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('조회에 실패하면 카드를 보여주지 않는다', async () => {
		fetchMock.mockResolvedValue(createResponse({}, false, 500));

		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());

		expect(queryCard(map)).toBeNull();
	});

	it('WMS URL을 만들 수 없으면 조회하지 않는다', () => {
		vi.mocked(getWmsFeatureInfoUrl).mockReturnValue(undefined);

		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		expect(fetchMock).not.toHaveBeenCalled();
		expect(queryCard(map)).toBeNull();
	});

	it('카드가 열린 상태에서 URL을 만들 수 없는 곳을 클릭하면 카드를 닫는다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(queryCard(map)).not.toBeNull());

		vi.mocked(getWmsFeatureInfoUrl).mockReturnValue(undefined);

		clickMap(map, [50, 100]);

		await waitFor(() => expect(queryCard(map)).toBeNull());

		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('닫기 버튼을 누르면 카드를 닫고 오버레이를 숨긴다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(queryCard(map)).not.toBeNull());

		fireEvent.click(within(queryCard(map) as HTMLElement).getByLabelText('닫기'));

		await waitFor(() => expect(queryCard(map)).toBeNull());

		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('다른 위치를 클릭하면 새 URL로 다시 조회한다', async () => {
		const map = new Map();

		renderPopup(map);

		clickMap(map, [5, 10]);

		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

		vi.mocked(getWmsFeatureInfoUrl).mockReturnValue(`${FEATURE_INFO_URL}&second=true`);

		clickMap(map, [50, 100]);

		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

		expect(fetchMock).toHaveBeenLastCalledWith(`${FEATURE_INFO_URL}&second=true`, expect.anything());
	});
});
