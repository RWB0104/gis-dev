/**
 * 피쳐 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.22 목 16:20:00
 */

import { render, screen } from '@testing-library/react';

import FeaturePage from '.';

vi.mock('#/organism/extended-map/FeatureMap', () => ({
	default: () => <div data-testid="FeatureMap" />
}));

describe('[@gis-dev/root-ui-pack] FeaturePage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<FeaturePage />);

		expect(screen.getByTestId('FeaturePage').tagName).toBe('MAIN');
	});

	it('main 안에 FeatureMap을 렌더링한다', () => {
		render(<FeaturePage />);

		expect(screen.getByTestId('FeaturePage')).toContainElement(screen.getByTestId('FeatureMap'));
	});
});
