/**
 * 맵 컨트롤러 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:50:00
 */

import { render, screen } from '@testing-library/react';

import MapController from '.';

vi.mock('#/organism/map/LayerSelect', () => ({
	default: ({ defaultValue }: { defaultValue?: string }) => <div data-default={defaultValue} data-testid="LayerSelect" />
}));

vi.mock('#/organism/map/MapInfoPopover', () => ({
	default: () => <div data-testid="MapInfoPopover" />
}));

describe('[@gis-dev/root-ui-pack] MapController', () => {
	it('맵 컨트롤러 컨테이너를 렌더링한다', () => {
		render(<MapController />);

		expect(screen.getByTestId('MapController')).toBeInTheDocument();
	});

	it('레이어 셀렉트와 맵 정보 팝오버를 함께 렌더링한다', () => {
		render(<MapController />);

		const controller = screen.getByTestId('MapController');

		expect(controller).toContainElement(screen.getByTestId('LayerSelect'));
		expect(controller).toContainElement(screen.getByTestId('MapInfoPopover'));
	});

	it('레이어 셀렉트의 기본값으로 Google 로드맵을 전달한다', () => {
		render(<MapController />);

		expect(screen.getByTestId('LayerSelect')).toHaveAttribute('data-default', 'base-google-road');
	});

	it('맵 우측 상단에 고정 배치한다', () => {
		render(<MapController />);

		expect(screen.getByTestId('MapController')).toHaveClass('absolute', 'top-2', 'right-2', 'z-10');
	});

	describe('direction / className / props', () => {
		it('children을 기본적으로 레이어 셀렉트 앞에 렌더링한다', () => {
			render(
				<MapController>
					<span data-testid="Child" />
				</MapController>
			);

			const [child, group] = Array.from(screen.getByTestId('MapController').children);

			expect(child).toBe(screen.getByTestId('Child'));
			expect(group).toContainElement(screen.getByTestId('LayerSelect'));
		});

		it('direction이 top이면 children을 앞에 렌더링한다', () => {
			render(
				<MapController direction="top">
					<span data-testid="Child" />
				</MapController>
			);

			expect(screen.getByTestId('MapController').firstElementChild).toBe(screen.getByTestId('Child'));
		});

		it('direction이 bottom이면 children을 레이어 셀렉트 뒤에 렌더링한다', () => {
			render(
				<MapController direction="bottom">
					<span data-testid="Child" />
				</MapController>
			);

			const [group, child] = Array.from(screen.getByTestId('MapController').children);

			expect(group).toContainElement(screen.getByTestId('LayerSelect'));
			expect(child).toBe(screen.getByTestId('Child'));
		});

		it('레이어 셀렉트와 맵 정보 팝오버를 하나의 그룹으로 묶는다', () => {
			render(<MapController />);

			expect(screen.getByTestId('LayerSelect').parentElement).toBe(screen.getByTestId('MapInfoPopover').parentElement);
		});

		it('className을 기본 클래스와 병합한다', () => {
			render(<MapController className="flex-col" />);

			expect(screen.getByTestId('MapController')).toHaveClass('absolute', 'top-2', 'right-2', 'flex-col');
		});

		it('나머지 props를 컨테이너에 전달한다', () => {
			render(<MapController aria-label="컨트롤러" id="ctrl" />);

			expect(screen.getByTestId('MapController')).toHaveAttribute('id', 'ctrl');
			expect(screen.getByTestId('MapController')).toHaveAttribute('aria-label', '컨트롤러');
		});
	});
});
