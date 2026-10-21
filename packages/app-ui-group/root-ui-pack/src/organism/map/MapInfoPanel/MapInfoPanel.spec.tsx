/**
 * 맵 정보 패널 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:50:00
 */

import { render, screen } from '@testing-library/react';

import { useMapInfo } from '@gis-dev/openlayers-service-pack/hooks/map';

import MapInfoPanel from '.';

vi.mock('@gis-dev/openlayers-service-pack/hooks/map', () => ({
	useMapInfo: vi.fn()
}));

const mockedUseMapInfo = vi.mocked(useMapInfo);

const LABELS = ['범위 (최소 x y | 최대 x y)', '중심 좌표 (x y)', 'SRS', '커서 (x y)', '줌 레벨'];

describe('[@gis-dev/root-ui-pack] MapInfoPanel', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('맵 정보 리스트를 렌더링한다', () => {
		render(<MapInfoPanel />);

		expect(screen.getByTestId('MapInfoList')).toBeInTheDocument();
	});

	it.each(LABELS)('"%s" 라벨을 표시한다', (label) => {
		render(<MapInfoPanel />);

		expect(screen.getByText(label)).toBeInTheDocument();
	});

	it('항목마다 복사 버튼을 렌더링한다', () => {
		render(<MapInfoPanel />);

		expect(screen.getAllByTestId('CopyButton')).toHaveLength(LABELS.length);
	});

	it('useMapInfo에 다섯 개의 ref를 전달한다', () => {
		render(<MapInfoPanel />);

		expect(mockedUseMapInfo).toHaveBeenCalledWith({
			bbox: expect.any(Object),
			center: expect.any(Object),
			cursor: expect.any(Object),
			srs: expect.any(Object),
			zoom: expect.any(Object)
		});
	});

	it('useMapInfo에 전달한 ref가 각 라벨의 값 엘리먼트에 연결된다', () => {
		render(<MapInfoPanel />);

		const refs = mockedUseMapInfo.mock.calls[0]?.[0];

		expect(refs?.bbox.current).toBe(screen.getByText(LABELS[0] as string).nextElementSibling);
		expect(refs?.center.current).toBe(screen.getByText(LABELS[1] as string).nextElementSibling);
		expect(refs?.srs.current).toBe(screen.getByText(LABELS[2] as string).nextElementSibling);
		expect(refs?.cursor.current).toBe(screen.getByText(LABELS[3] as string).nextElementSibling);
		expect(refs?.zoom.current).toBe(screen.getByText(LABELS[4] as string).nextElementSibling);
	});
});
