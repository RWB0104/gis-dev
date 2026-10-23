/**
 * OSM page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 17:16:06
 */

import { render, screen } from '@testing-library/react';

import OsmPage from '.';

vi.mock('#/organism/extended-map/OsmMap', () => ({
	default: () => <div data-testid="OsmMap" />
}));

describe('[@gis-dev/root-ui-pack] OsmPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<OsmPage />);

		expect(screen.getByTestId('OsmPage').tagName).toBe('MAIN');
	});

	it('main 안에 OsmMap을 렌더링한다', () => {
		render(<OsmPage />);

		expect(screen.getByTestId('OsmPage')).toContainElement(screen.getByTestId('OsmMap'));
	});
});
