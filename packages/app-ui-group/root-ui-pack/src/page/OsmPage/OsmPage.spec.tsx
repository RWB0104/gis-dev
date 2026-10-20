/**
 * OSM page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 17:16:06
 */

import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import OsmPage from '.';

const mapProviderSpy = vi.fn();

vi.mock('#/organism/map/MapProvider', () => ({
	default: ({ options, children }: { options?: unknown; children?: ReactNode }) => {
		mapProviderSpy(options);

		return <div data-testid="MapProvider">{children}</div>;
	}
}));

vi.mock('#/atom/OsmLayer', () => ({
	default: () => <div data-testid="OsmLayer" />
}));

describe('[@gis-dev/root-ui-pack] OsmPage', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('MapProvider 안에 OsmLayer를 렌더링한다', () => {
		render(<OsmPage />);

		expect(screen.getByTestId('MapProvider')).toContainElement(screen.getByTestId('OsmLayer'));
	});

	it('seoulView를 MapProvider의 view 옵션으로 전달한다', () => {
		render(<OsmPage />);

		expect(mapProviderSpy).toHaveBeenCalledWith({ view: seoulView });
	});
});
