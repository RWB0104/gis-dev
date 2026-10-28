/**
 * 트랜잭션 삭제 맵 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.28 수 18:10:00
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { getTransactionDeleteOptions } from '@gis-dev/openlayers-service-pack/func/options';

import TransactionDeleteMap from '.';

const mapProviderSpy = vi.fn();

const mocks = vi.hoisted(() => ({
	options: { name: 'deleteOptions' }
}));

vi.mock('@gis-dev/openlayers-service-pack/func/options', () => ({
	getTransactionDeleteOptions: vi.fn(() => mocks.options)
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

vi.mock('#/organism/map/TransactionPopup', () => ({
	default: () => <div data-testid="TransactionPopup" />
}));

vi.mock('#/organism/map/TransactionDeleteButton', () => ({
	default: () => <div data-testid="TransactionDeleteButton" />
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

describe('[@gis-dev/root-ui-pack] TransactionDeleteMap', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider를 렌더링한다', () => {
		render(<TransactionDeleteMap />);

		expect(screen.getByTestId('MapProvider')).toBeInTheDocument();
	});

	it('삭제용 맵 옵션을 한 번 만들어 MapProvider에 그대로 전달한다', () => {
		render(<TransactionDeleteMap />);

		expect(getTransactionDeleteOptions).toHaveBeenCalledOnce();
		expect(mapProviderSpy).toHaveBeenCalledExactlyOnceWith(mocks.options);
	});

	it('리렌더해도 옵션을 다시 만들지 않고 같은 옵션을 유지한다', () => {
		const { rerender } = render(<TransactionDeleteMap />);

		rerender(<TransactionDeleteMap />);

		expect(getTransactionDeleteOptions).toHaveBeenCalledOnce();
		expect(mapProviderSpy.mock.calls[1]?.[0]).toBe(mapProviderSpy.mock.calls[0]?.[0]);
	});

	it('MapProvider 안에 MapController, TransactionPopup, InteractionTemplate을 렌더링한다', () => {
		render(<TransactionDeleteMap />);

		const provider = screen.getByTestId('MapProvider');

		expect(provider).toContainElement(screen.getByTestId('MapController'));
		expect(provider).toContainElement(screen.getByTestId('TransactionPopup'));
		expect(provider).toContainElement(screen.getByTestId('InteractionTemplate'));
	});

	it('InteractionTemplate 안에 삭제 버튼, 지오로케이션 버튼, 가이드를 렌더링한다', () => {
		render(<TransactionDeleteMap />);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByTestId('TransactionDeleteButton'));
		expect(template).toContainElement(screen.getByTestId('GeolocationButton'));
		expect(template).toContainElement(screen.getByTestId('GuideDialog'));
	});

	it('GuideDialog에 WFS-T Delete 제목을 전달한다', () => {
		render(<TransactionDeleteMap />);

		expect(screen.getByTestId('GuideDialog')).toHaveAttribute('data-title', 'WFS-T Delete');
	});
});
