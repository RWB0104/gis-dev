/**
 * 트랜잭션 삽입 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:50:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { getWfsClickSelect, getWfsHoverSelect } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, transactionLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import TransactionInsertMap from '.';

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

vi.mock('#/organism/map/TransactionPopup', () => ({
	default: () => <div data-testid="TransactionPopup" />
}));

vi.mock('#/organism/map/TransactionInsertButton', () => ({
	default: () => <div data-testid="TransactionInsertButton" />
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

describe('[@gis-dev/root-ui-pack] TransactionInsertMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<TransactionInsertMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('호버, 클릭 Select를 트랜잭션 레이어의 name 컬럼 기준으로 생성한다', () => {
		render(<TransactionInsertMap />);

		expect(getWfsHoverSelect).toHaveBeenCalledWith('name');
		expect(getWfsClickSelect).toHaveBeenCalledWith('name');
	});

	it('인터렉션, 레이어 3개, seoulView를 MapProvider 옵션으로 전달한다', () => {
		render(<TransactionInsertMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			interactions: [mocks.hover, mocks.click],
			layers: [baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer, transactionLayer.drawLayer],
			view: seoulView
		});
	});

	it('삽입 대상인 buld_test 레이어(wfsTransactionLayer)를 지도에 올린다', () => {
		render(<TransactionInsertMap />);

		const options = mapProviderSpy.mock.calls[0]?.[0] as { layers: unknown[] };

		expect(options.layers).toContain(wfsLayer.wfsTransactionLayer);
		expect(options.layers).not.toContain(wfsLayer.sejongWfsLayer);
	});

	it('buld_test 컬럼에 맞는 TransactionPopup을 쓰고 buld_sejong용 WfsPopup은 쓰지 않는다', () => {
		render(<TransactionInsertMap />);

		expect(screen.getByTestId('TransactionPopup')).toBeInTheDocument();
		expect(screen.queryByTestId('WfsPopup')).not.toBeInTheDocument();
	});

	it('MapProvider 안에 MapController, TransactionPopup, InteractionTemplate을 렌더링한다', () => {
		render(<TransactionInsertMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('TransactionPopup'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 삽입 버튼, 지오로케이션 버튼, 가이드를 렌더링한다', () => {
		render(<TransactionInsertMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('TransactionInsertButton'));
		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 WFS-T Insert 제목을 전달한다', () => {
		render(<TransactionInsertMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'WFS-T Insert');
	});
});
