/**
 * WMS 팝업 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 18:15:00
 */

import { render, screen } from '@testing-library/react';

import WmsPopupPage from '.';

vi.mock('#/organism/extended-map/WmsPopupMap', () => ({
	default: () => <div data-testid="WmsPopupMap" />
}));

describe('[@gis-dev/root-ui-pack] WmsPopupPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<WmsPopupPage />);

		expect(screen.getByRole('main').tagName).toBe('MAIN');
	});

	it('main 안에 WmsPopupMap을 렌더링한다', () => {
		render(<WmsPopupPage />);

		expect(screen.getByRole('main')).toContainElement(screen.getByTestId('WmsPopupMap'));
	});
});
