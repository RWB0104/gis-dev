/**
 * 피쳐 클릭 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 15:40:00
 */

import { render, screen } from '@testing-library/react';

import FeatureClickPage from '.';

vi.mock('#/organism/extended-map/FeatureClickMap', () => ({
	default: () => <div data-testid="FeatureClickMap" />
}));

describe('[@gis-dev/root-ui-pack] FeatureClickPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<FeatureClickPage />);

		expect(screen.getByRole('main').tagName).toBe('MAIN');
	});

	it('main 안에 FeatureClickMap을 렌더링한다', () => {
		render(<FeatureClickPage />);

		expect(screen.getByRole('main')).toContainElement(screen.getByTestId('FeatureClickMap'));
	});
});
