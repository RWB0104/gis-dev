/**
 * 지오로케이션 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 19:20:00
 */

import { render, screen } from '@testing-library/react';

import GeolocationPage from '.';

vi.mock('#/organism/extended-map/GeolocationMap', () => ({
	default: () => <div data-testid="GeolocationMap" />
}));

describe('[@gis-dev/root-ui-pack] GeolocationPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<GeolocationPage />);

		expect(screen.getByTestId('GeolocationPage').tagName).toBe('MAIN');
	});

	it('main 안에 GeolocationMap을 렌더링한다', () => {
		render(<GeolocationPage />);

		expect(screen.getByTestId('GeolocationPage')).toContainElement(screen.getByTestId('GeolocationMap'));
	});
});
