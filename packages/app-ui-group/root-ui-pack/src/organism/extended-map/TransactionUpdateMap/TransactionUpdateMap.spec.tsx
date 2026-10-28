/**
 * 트랜잭션 수정 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:40:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import {
	getWfsClickSelect,
	getWfsHoverSelect,
	getWfsModify,
	getWfsSnap
} from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import TransactionUpdateMap from '.';

const mapProviderSpy = vi.fn();

const mocks = vi.hoisted(() => {
	const features = { name: 'selectedFeatures' };

	return {
		click: { getFeatures: vi.fn(() => features), name: 'clickSelect' },
		features,
		hover: { name: 'hoverSelect' },
		modify: { name: 'modify', setActive: vi.fn() },
		snap: { name: 'snap', setActive: vi.fn() }
	};
});

vi.mock('@gis-dev/openlayers-service-pack/func/interaction', () => ({
	getWfsClickSelect: vi.fn(() => mocks.click),
	getWfsHoverSelect: vi.fn(() => mocks.hover),
	getWfsModify: vi.fn(() => mocks.modify),
	getWfsSnap: vi.fn(() => mocks.snap)
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

	it('호버, 클릭 Select를 트랜잭션 레이어의 name 컬럼 기준으로 생성한다', () => {
		render(<TransactionUpdateMap />);

		expect(getWfsHoverSelect).toHaveBeenCalledWith('name');
		expect(getWfsClickSelect).toHaveBeenCalledWith('name');
	});

	it('snap, modify를 선택된 피쳐 컬렉션 기준으로 생성한다', () => {
		render(<TransactionUpdateMap />);

		expect(getWfsSnap).toHaveBeenCalledWith(mocks.features);
		expect(getWfsModify).toHaveBeenCalledWith(mocks.features);
	});

	it('snap, modify는 수정 버튼을 누르기 전까지 꺼 둔다', () => {
		render(<TransactionUpdateMap />);

		expect(mocks.snap.setActive).toHaveBeenCalledExactlyOnceWith(false);
		expect(mocks.modify.setActive).toHaveBeenCalledExactlyOnceWith(false);
	});

	it('인터렉션, 레이어, seoulView를 MapProvider 옵션으로 전달한다', () => {
		render(<TransactionUpdateMap />);

		expect(mapProviderSpy).toHaveBeenCalledWith({
			interactions: [mocks.hover, mocks.click, mocks.snap, mocks.modify],
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

		expect(getWfsClickSelect).toHaveBeenCalledOnce();
		expect(getWfsSnap).toHaveBeenCalledOnce();
		expect(getWfsModify).toHaveBeenCalledOnce();
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
