/**
 * WebGL page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.30 금 18:30:00
 */

import { render, screen } from '@testing-library/react';

import WebglPage from '.';

vi.mock('#/organism/extended-map/WebglMap', () => ({
	default: () => <div data-testid="WebglMap" />
}));

describe('[@gis-dev/root-ui-pack] WebglPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<WebglPage />);

		expect(screen.getByTestId('WebglPage').tagName).toBe('MAIN');
	});

	it('main 안에 WebglMap을 렌더링한다', () => {
		render(<WebglPage />);

		expect(screen.getByTestId('WebglPage')).toContainElement(screen.getByTestId('WebglMap'));
	});
});
