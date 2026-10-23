/**
 * Google page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 18:15:36
 */

import { render, screen } from '@testing-library/react';

import GooglePage from '.';

vi.mock('#/organism/extended-map/GoogleMap', () => ({
	default: () => <div data-testid="GoogleMap" />
}));

describe('[@gis-dev/root-ui-pack] GooglePage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<GooglePage />);

		expect(screen.getByTestId('GooglePage').tagName).toBe('MAIN');
	});

	it('main 안에 GoogleMap을 렌더링한다', () => {
		render(<GooglePage />);

		expect(screen.getByTestId('GooglePage')).toContainElement(screen.getByTestId('GoogleMap'));
	});
});
