/**
 * 클러스터 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.29 목 11:10:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { getClusterClickSelect, getClusterHoverSelect } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulMiddleView } from '@gis-dev/openlayers-service-pack/func/view';

import ClusterMap from '.';

const mapProviderSpy = vi.fn();

const mocks = vi.hoisted(() => ({
	click: { name: 'clickSelect' },
	hover: { name: 'hoverSelect' }
}));

vi.mock('@gis-dev/openlayers-service-pack/func/interaction', () => ({
	getClusterClickSelect: vi.fn(() => mocks.click),
	getClusterHoverSelect: vi.fn(() => mocks.hover)
}));

vi.mock('#/organism/map/MapProvider', () => ({
	default: ({ options, children }: { options?: unknown; children?: ReactNode }) => {
		mapProviderSpy(options);

		return <div data-testid="MapProvider">{children}</div>;
	}
}));

vi.mock('#/organism/map/MapController', () => ({
	default: () => <div data-testid="MapController" />
}));

vi.mock('#/organism/map/ClusterPopup', () => ({
	default: () => <div data-testid="ClusterPopup" />
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

describe('[@gis-dev/root-ui-pack] ClusterMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<ClusterMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('클릭, 호버 Select를 name 컬럼 기준으로 생성한다', () => {
		render(<ClusterMap />);

		expect(getClusterClickSelect).toHaveBeenCalledWith('name');
		expect(getClusterHoverSelect).toHaveBeenCalledWith('name');
	});

	it('인터렉션, 레이어, seoulMiddleView를 MapProvider 옵션으로 전달한다', () => {
		render(<ClusterMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			interactions: [mocks.click, mocks.hover],
			layers: [baseLayer.googleRoadLayer, wfsLayer.wfsStarbucksClusterLayer],
			view: seoulMiddleView
		});
	});

	it('MapProvider 안에 MapController, ClusterPopup, InteractionTemplate을 렌더링한다', () => {
		render(<ClusterMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('ClusterPopup'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 지오로케이션 버튼과 가이드를 렌더링한다', () => {
		render(<ClusterMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 Cluster 제목을 전달한다', () => {
		render(<ClusterMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'Cluster');
	});
});
