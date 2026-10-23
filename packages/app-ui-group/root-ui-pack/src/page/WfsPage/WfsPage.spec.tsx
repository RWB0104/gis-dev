/**
 * WFS page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.22 목 18:20:00
 */

import { render, screen } from '@testing-library/react';

import WfsPage from '.';

vi.mock('#/organism/extended-map/WfsMap', () => ({
	default: () => <div data-testid="WfsMap" />
}));

describe('[@gis-dev/root-ui-pack] WfsPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<WfsPage />);

		expect(screen.getByTestId('WfsPage').tagName).toBe('MAIN');
	});

	it('main 안에 WfsMap을 렌더링한다', () => {
		render(<WfsPage />);

		expect(screen.getByTestId('WfsPage')).toContainElement(screen.getByTestId('WfsMap'));
	});
});
