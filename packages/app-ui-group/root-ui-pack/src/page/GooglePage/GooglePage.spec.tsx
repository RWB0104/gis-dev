/**
 * Google page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 18:15:36
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GooglePage from '.';

const mapProviderSpy = vi.fn();

vi.mock('#/organism/map/MapProvider', () => ({
	default: ({ options, children }: { options?: unknown; children?: ReactNode }) => {
		mapProviderSpy(options);

		return <div data-testid="MapProvider">{children}</div>;
	}
}));

vi.mock('#/atom/GoogleLayer', () => ({
	default: () => <div data-testid="GoogleLayer" />
}));

describe('[@gis-dev/root-ui-pack] GooglePage', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider 안에 GoogleLayer를 렌더링한다', () => {
		render(<GooglePage />);

		expect(screen.getByTestId('MapProvider')).toContainElement(screen.getByTestId('GoogleLayer'));
	});

	it('seoulView를 MapProvider의 view 옵션으로 전달한다', () => {
		render(<GooglePage />);

		expect(mapProviderSpy).toHaveBeenCalledWith({ view: seoulView });
	});
});
