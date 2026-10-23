/**
 * WMS 팝업 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 18:15:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import WmsPopupMap from '.';

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

vi.mock('#/organism/map/WmsPopup', () => ({
	default: () => <div data-testid="WmsPopup" />
}));

vi.mock('#/organism/map/WmsTypeButtons', () => ({
	default: () => <div data-testid="WmsTypeButtons" />
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

describe('[@gis-dev/root-ui-pack] WmsPopupMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<WmsPopupMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('구글 로드맵 레이어와 sejongView를 MapProvider 옵션으로 전달한다', () => {
		render(<WmsPopupMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({ layers: [baseLayer.googleRoadLayer], view: sejongView });
	});

	it('MapProvider 안에 WmsPopup, MapController, InteractionTemplate을 렌더링한다', () => {
		render(<WmsPopupMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('WmsPopup'));
		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('MapController 안에 WmsTypeButtons를 렌더링한다', () => {
		render(<WmsPopupMap />);

		expect(screen.getByTestId('MapController')).toContainElement(screen.getByTestId('WmsTypeButtons'));
	});

	it('InteractionTemplate 안에 GeolocationButton과 GuideDialog를 렌더링한다', () => {
		render(<WmsPopupMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});
});
