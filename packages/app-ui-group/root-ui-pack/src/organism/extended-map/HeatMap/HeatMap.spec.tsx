/**
 * 히트맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.29 목 14:00:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulMiddleView } from '@gis-dev/openlayers-service-pack/func/view';

import HeatMap from '.';

const mapProviderSpy = vi.fn();

const mocks = vi.hoisted(() => ({
	heatmap: { name: 'heatmap' }
}));

vi.mock('@gis-dev/openlayers-service-pack/func/layer', async (importOriginal) => {
	const original = await importOriginal<typeof import('@gis-dev/openlayers-service-pack/func/layer')>();

	return {
		...original,
		wfsLayer: { ...original.wfsLayer, getWfsHeatmapLayer: vi.fn(() => mocks.heatmap) }
	};
});

vi.mock('#/organism/map/MapProvider', () => ({
	default: ({ options, children }: { options?: unknown; children?: ReactNode }) => {
		mapProviderSpy(options);

		return <div data-testid="MapProvider">{children}</div>;
	}
}));

vi.mock('#/organism/map/MapController', () => ({
	default: ({ children, direction, className }: { children?: ReactNode; direction?: string; className?: string }) => (
		<div className={className} data-direction={direction} data-testid="MapController">
			{children}
		</div>
	)
}));

vi.mock('#/organism/map/HeatController', () => ({
	default: () => <div data-testid="HeatController" />
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

describe('[@gis-dev/root-ui-pack] HeatMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('서버 렌더에서는 Heatmap 레이어를 만들지 않고 아무것도 렌더링하지 않는다', () => {
		expect(renderToString(<HeatMap />)).toBe('');
		expect(wfsLayer.getWfsHeatmapLayer).not.toHaveBeenCalled();
	});

	it('마운트 후 MapProvider를 렌더링한다', () => {
		render(<HeatMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('마운트 후 Heatmap 레이어를 한 번만 만든다', () => {
		const { rerender } = render(<HeatMap />);

		rerender(<HeatMap />);

		expect(wfsLayer.getWfsHeatmapLayer).toHaveBeenCalledTimes(1);
	});

	it('레이어와 seoulMiddleView를 MapProvider 옵션으로 전달한다', () => {
		render(<HeatMap />);

		expect(mapProviderSpy).toHaveBeenLastCalledWith({
			layers: [baseLayer.googleRoadLayer, mocks.heatmap],
			view: seoulMiddleView
		});
	});

	it('MapProvider 안에 MapController, InteractionTemplate을 렌더링한다', () => {
		render(<HeatMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('MapController를 아래 방향 세로 배치로 렌더링하고 HeatController를 그 안에 둔다', () => {
		render(<HeatMap />);

		const controller = screen.getByTestId('MapController');

		expect(controller).toHaveAttribute('data-direction', 'bottom');
		expect(controller).toHaveClass('flex', 'flex-col');
		expect(controller).toContainElement(screen.getByTestId('HeatController'));
	});

	it('InteractionTemplate 안에 지오로케이션 버튼과 Heat 제목의 가이드를 렌더링한다', () => {
		render(<HeatMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'Heat');
	});
});
