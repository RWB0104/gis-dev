/**
 * 맵 정보 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:14:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import MapInfoMap from '.';

const mapProviderSpy = vi.fn();

vi.mock('#/organism/map/MapProvider', () => ({
	default: ({ options, children }: { options?: unknown; children?: ReactNode }) => {
		mapProviderSpy(options);

		return <div data-testid="MapProvider">{children}</div>;
	}
}));

vi.mock('#/organism/map/MapController', () => ({
	default: ({ children }: { children?: ReactNode }) => <div data-testid="MapController">{children}</div>
}));

describe('[@gis-dev/root-ui-pack] MapInfoMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<MapInfoMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('레이어 1개와 seoulView를 MapProvider 옵션으로 전달한다', () => {
		render(<MapInfoMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({ layers: [baseLayer.googleRoadLayer], view: seoulView });
	});

	it('MapProvider 안에 MapController를 렌더링한다', () => {
		render(<MapInfoMap />);

		expect(screen.getByTestId('MapProvider')).toContainElement(screen.getByTestId('MapController'));
	});
});
