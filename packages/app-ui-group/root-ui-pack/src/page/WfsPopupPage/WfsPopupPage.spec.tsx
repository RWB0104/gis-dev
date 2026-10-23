/**
 * WFS 팝업 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 17:20:00
 */

import { render, screen } from '@testing-library/react';

import WfsPopupPage from '.';

vi.mock('#/organism/extended-map/WfsPopupMap', () => ({
	default: () => <div data-testid="WfsPopupMap" />
}));

describe('[@gis-dev/root-ui-pack] WfsPopupPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<WfsPopupPage />);

		expect(screen.getByTestId('WfsPopupPage').tagName).toBe('MAIN');
	});

	it('main 안에 WfsPopupMap을 렌더링한다', () => {
		render(<WfsPopupPage />);

		expect(screen.getByTestId('WfsPopupPage')).toContainElement(screen.getByTestId('WfsPopupMap'));
	});
});
