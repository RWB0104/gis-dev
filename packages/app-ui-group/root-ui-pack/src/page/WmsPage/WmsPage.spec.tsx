/**
 * WMS page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 12:47:35
 */

import { render, screen } from '@testing-library/react';

import WmsPage from '.';

vi.mock('#/organism/extended-map/WmsMap', () => ({
	default: () => <div data-testid="WmsMap" />
}));

describe('[@gis-dev/root-ui-pack] WmsPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<WmsPage />);

		expect(screen.getByTestId('WmsPage').tagName).toBe('MAIN');
	});

	it('main 안에 WmsMap을 렌더링한다', () => {
		render(<WmsPage />);

		expect(screen.getByTestId('WmsPage')).toContainElement(screen.getByTestId('WmsMap'));
	});
});
