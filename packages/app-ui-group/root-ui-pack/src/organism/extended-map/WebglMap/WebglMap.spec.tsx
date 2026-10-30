/**
 * WebGL 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.30 금 18:30:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulHighView } from '@gis-dev/openlayers-service-pack/func/view';

import WebglMap from '.';

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

vi.mock('#/organism/map/WebglTypeButtons', () => ({
	default: () => <div data-testid="WebglTypeButtons" />
}));

vi.mock('#/template/InteractionTemplate', () => ({
	default: ({ children }: { children?: ReactNode }) => <div data-testid="InteractionTemplate">{children}</div>
}));

vi.mock('#/atom/GeolocationButton', () => ({
	default: () => <div data-testid="GeolocationButton" />
}));

vi.mock('#/molecule/GuideDialog', () => ({
	default: ({ title }: { title: string }) => <div data-testid="GuideDialog" data-title={title} />
}));

describe('[@gis-dev/root-ui-pack] WebglMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<WebglMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('구글 로드맵, WebGL 도시 레이어, seoulHighView를 옵션으로 전달한다', () => {
		render(<WebglMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			layers: [baseLayer.googleRoadLayer, wfsLayer.wfsCityWebglLayer],
			view: seoulHighView
		});
	});

	it('MapController 안에 WebglTypeButtons를 렌더링한다', () => {
		render(<WebglMap />);

		expect(screen.getByTestId('MapController')).toContainElement(screen.getByTestId('WebglTypeButtons'));
		expect(screen.getByTestId('MapProvider')).toContainElement(screen.getByTestId('MapController'));
	});

	it('InteractionTemplate 안에 지오로케이션 버튼과 WebGL 제목의 가이드를 렌더링한다', () => {
		render(<WebglMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'WebGL');
	});
});
