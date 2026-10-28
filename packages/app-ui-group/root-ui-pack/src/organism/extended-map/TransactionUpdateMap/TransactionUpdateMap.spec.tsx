/**
 * 트랜잭션 수정 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:40:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { getWfsEditInteractions } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import TransactionUpdateMap from '.';

const mapProviderSpy = vi.fn();

const mocks = vi.hoisted(() => ({
	interactions: [{ name: 'hoverSelect' }, { name: 'clickSelect' }, { name: 'snap' }, { name: 'modify' }]
}));

vi.mock('@gis-dev/openlayers-service-pack/func/interaction', () => ({
	getWfsEditInteractions: vi.fn(() => mocks.interactions)
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

vi.mock('#/organism/map/TransactionPopup', () => ({
	default: () => <div data-testid="TransactionPopup" />
}));

vi.mock('#/organism/map/TransactionUpdateButton', () => ({
	default: () => <div data-testid="TransactionUpdateButton" />
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

describe('[@gis-dev/root-ui-pack] TransactionUpdateMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<TransactionUpdateMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('편집용 인터렉션을 트랜잭션 레이어의 name 컬럼 기준으로 생성한다', () => {
		render(<TransactionUpdateMap />);

		expect(getWfsEditInteractions).toHaveBeenCalledExactlyOnceWith('name');
	});

	it('인터렉션, 레이어, seoulView를 MapProvider 옵션으로 전달한다', () => {
		render(<TransactionUpdateMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			interactions: mocks.interactions,
			layers: [baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer],
			view: seoulView
		});
	});

	it('수정 대상인 buld_test 레이어(wfsTransactionLayer)를 지도에 올린다', () => {
		render(<TransactionUpdateMap />);

		const options = mapProviderSpy.mock.calls[0]?.[0] as { layers: unknown[] };

		expect(options.layers).toContain(wfsLayer.wfsTransactionLayer);
		expect(options.layers).not.toContain(wfsLayer.sejongWfsLayer);
	});

	it('리렌더해도 인터렉션을 다시 만들지 않고 같은 옵션을 유지한다', () => {
		const { rerender } = render(<TransactionUpdateMap />);

		rerender(<TransactionUpdateMap />);

		expect(getWfsEditInteractions).toHaveBeenCalledOnce();
		expect(mapProviderSpy.mock.calls[1]?.[0]).toBe(mapProviderSpy.mock.calls[0]?.[0]);
	});

	it('MapProvider 안에 MapController, TransactionPopup, InteractionTemplate을 렌더링한다', () => {
		render(<TransactionUpdateMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('TransactionPopup'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 수정 버튼, 지오로케이션 버튼, 가이드를 렌더링한다', () => {
		render(<TransactionUpdateMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('TransactionUpdateButton'));
		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 WFS-T Update 제목을 전달한다', () => {
		render(<TransactionUpdateMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'WFS-T Update');
	});
});
