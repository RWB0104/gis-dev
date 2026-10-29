/**
 * 클러스터 맵 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.29 목 11:10:00
 */

import { render, screen } from '@testing-library/react';

import ClusterMapPage from '.';

vi.mock('#/organism/extended-map/ClusterMap', () => ({
	default: () => <div data-testid="ClusterMap" />
}));

describe('[@gis-dev/root-ui-pack] ClusterMapPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<ClusterMapPage />);

		expect(screen.getByTestId('ClusterMapPage').tagName).toBe('MAIN');
	});

	it('main 안에 ClusterMap을 렌더링한다', () => {
		render(<ClusterMapPage />);

		expect(screen.getByTestId('ClusterMapPage')).toContainElement(screen.getByTestId('ClusterMap'));
	});
});
