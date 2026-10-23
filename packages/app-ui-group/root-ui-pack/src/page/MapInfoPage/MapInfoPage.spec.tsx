/**
 * 맵 정보 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:55:00
 */

import { render, screen } from '@testing-library/react';

import MapInfoPage from '.';

vi.mock('#/organism/extended-map/MapInfoMap', () => ({
	default: () => <div data-testid="MapInfoMap" />
}));

describe('[@gis-dev/root-ui-pack] MapInfoPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<MapInfoPage />);

		expect(screen.getByTestId('MapInfoPage').tagName).toBe('MAIN');
	});

	it('main 안에 MapInfoMap을 렌더링한다', () => {
		render(<MapInfoPage />);

		expect(screen.getByTestId('MapInfoPage')).toContainElement(screen.getByTestId('MapInfoMap'));
	});
});
