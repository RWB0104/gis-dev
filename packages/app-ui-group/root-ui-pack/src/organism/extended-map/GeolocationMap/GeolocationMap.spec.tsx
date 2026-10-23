/**
 * 지오로케이션 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:14:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationMap from '.';

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

vi.mock('#/template/InteractionTemplate', () => ({
	default: ({ children }: { children?: ReactNode }) => <div data-testid="InteractionTemplate">{children}</div>
}));

vi.mock('#/atom/GeolocationButton', () => ({
	default: () => <div data-testid="GeolocationButton" />
}));

vi.mock('#/molecule/GuideDialog', () => ({
	default: ({ title }: { title: string }) => <div data-testid="GuideDialog" data-title={title} />
}));

describe('[@gis-dev/root-ui-pack] GeolocationMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<GeolocationMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('레이어 1개와 seoulView를 MapProvider 옵션으로 전달한다', () => {
		render(<GeolocationMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({ layers: [baseLayer.googleRoadLayer], view: seoulView });
	});

	it('MapProvider 안에 MapController와 InteractionTemplate을 렌더링한다', () => {
		render(<GeolocationMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 GeolocationButton과 GuideDialog를 렌더링한다', () => {
		render(<GeolocationMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 Geolocation 제목을 전달한다', () => {
		render(<GeolocationMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'Geolocation');
	});
});
