/**
 * 피쳐 클릭 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:40:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { getWfsClickSelect, getWfsHoverSelect } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import FeatureClickMap from '.';

const mapProviderSpy = vi.fn();

const mocks = vi.hoisted(() => ({
	click: { name: 'clickSelect' },
	hover: { name: 'hoverSelect' }
}));

vi.mock('@gis-dev/openlayers-service-pack/func/interaction', () => ({
	getWfsClickSelect: vi.fn(() => mocks.click),
	getWfsHoverSelect: vi.fn(() => mocks.hover)
}));

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

describe('[@gis-dev/root-ui-pack] FeatureClickMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<FeatureClickMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('호버, 클릭 Select를 라벨 컬럼 buld_nm 기준으로 생성한다', () => {
		render(<FeatureClickMap />);

		expect(getWfsHoverSelect).toHaveBeenCalledWith('buld_nm');
		expect(getWfsClickSelect).toHaveBeenCalledWith('buld_nm');
	});

	it('인터렉션, 레이어 2개, sejongView를 MapProvider 옵션으로 전달한다', () => {
		render(<FeatureClickMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			interactions: [mocks.hover, mocks.click],
			layers: [baseLayer.googleRoadLayer, wfsLayer.sejongWfsLayer],
			view: sejongView
		});
	});

	it('MapProvider 안에 MapController와 InteractionTemplate을 렌더링한다', () => {
		render(<FeatureClickMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 GeolocationButton과 GuideDialog를 렌더링한다', () => {
		render(<FeatureClickMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 WFS Feature Click 제목을 전달한다', () => {
		render(<FeatureClickMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'WFS Feature Click');
	});
});
