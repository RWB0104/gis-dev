/**
 * 피쳐 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:14:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { baseLayer, transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import FeatureMap from '.';

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

vi.mock('#/atom/FeatureAddButton', () => ({
	default: () => <div data-testid="FeatureAddButton" />
}));

vi.mock('#/atom/GeolocationButton', () => ({
	default: () => <div data-testid="GeolocationButton" />
}));

vi.mock('#/molecule/GuideDialog', () => ({
	default: ({ title }: { title: string }) => <div data-testid="GuideDialog" data-title={title} />
}));

describe('[@gis-dev/root-ui-pack] FeatureMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<FeatureMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('레이어 2개와 seoulView를 MapProvider 옵션으로 전달한다', () => {
		render(<FeatureMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			layers: [baseLayer.googleRoadLayer, transactionLayer.wfsFeatureVectorLayer],
			view: seoulView
		});
	});

	it('MapProvider 안에 MapController와 InteractionTemplate을 렌더링한다', () => {
		render(<FeatureMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 FeatureAddButton, GeolocationButton, GuideDialog를 렌더링한다', () => {
		render(<FeatureMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('FeatureAddButton'));
		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 Feature 제목을 전달한다', () => {
		render(<FeatureMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'Feature');
	});
});
