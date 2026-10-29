/**
 * 히트맵 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.29 목 14:00:00
 */

import { render, screen } from '@testing-library/react';

import HeatMapPage from '.';

vi.mock('#/organism/extended-map/HeatMap', () => ({
	default: () => <div data-testid="HeatMap" />
}));

describe('[@gis-dev/root-ui-pack] HeatMapPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<HeatMapPage />);

		expect(screen.getByTestId('HeatMapPage').tagName).toBe('MAIN');
	});

	it('main 안에 HeatMap을 렌더링한다', () => {
		render(<HeatMapPage />);

		expect(screen.getByTestId('HeatMapPage')).toContainElement(screen.getByTestId('HeatMap'));
	});
});
