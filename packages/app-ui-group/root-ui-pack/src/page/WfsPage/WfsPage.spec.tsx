/**
 * WFS page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.22 목 18:20:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import WfsPage from '.';

const mapProviderSpy = vi.fn();

vi.mock('#/organism/map/MapProvider', () => ({
	default: ({ options, children }: { options?: unknown; children?: ReactNode }) => {
		mapProviderSpy(options);

		return <div data-testid="MapProvider">{children}</div>;
	}
}));

vi.mock('#/organism/map/MapController', () => ({
	default: () => <div data-testid="MapController" />
}));

vi.mock('#/atom/GoogleLayer', () => ({
	default: () => <div data-testid="GoogleLayer" />
}));

vi.mock('#/atom/WfsLayer', () => ({
	default: () => <div data-testid="WfsLayer" />
}));

vi.mock('#/atom/GeolocationButton', () => ({
	default: () => <div data-testid="GeolocationButton" />
}));

vi.mock('#/molecule/GuideDialog', () => ({
	default: ({ title }: { title: string }) => <div data-testid="GuideDialog" data-title={title} />
}));

vi.mock('#/template/InteractionTemplate', () => ({
	default: ({ children }: { children?: ReactNode }) => <div data-testid="InteractionTemplate">{children}</div>
}));

describe('[@gis-dev/root-ui-pack] WfsPage', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('sejongView를 MapProvider의 view 옵션으로 전달한다', () => {
		render(<WfsPage />);

		expect(mapProviderSpy).toHaveBeenCalledWith({ view: sejongView });
	});

	it('MapProvider 안에 MapController, GoogleLayer, WfsLayer, InteractionTemplate을 렌더링한다', () => {
		render(<WfsPage />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('GoogleLayer'));
		expect(provider).toContainElement(screen.getByTestId('WfsLayer'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 GeolocationButton과 GuideDialog를 렌더링한다', () => {
		render(<WfsPage />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 WFS 제목을 전달한다', () => {
		render(<WfsPage />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'WFS');
	});
});
