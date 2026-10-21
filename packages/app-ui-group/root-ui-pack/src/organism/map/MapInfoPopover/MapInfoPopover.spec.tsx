/**
 * 맵 정보 popover organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:50:00
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import MapInfoPopover from '.';

vi.mock('#/organism/map/MapInfoPanel', () => ({
	default: () => <div data-testid="MapInfoPanel" />
}));

describe('[@gis-dev/root-ui-pack] MapInfoPopover', () => {
	it('맵 정보 트리거 버튼을 렌더링한다', () => {
		render(<MapInfoPopover />);

		expect(screen.getByRole('button', { name: '맵 정보' })).toBeInTheDocument();
	});

	it('처음에는 팝업이 닫혀 있다', () => {
		render(<MapInfoPopover />);

		expect(screen.queryByTestId('MapInfoPanel')).not.toBeInTheDocument();
	});

	it('트리거를 클릭하면 제목과 맵 정보 패널을 보여준다', async () => {
		render(<MapInfoPopover />);

		fireEvent.click(screen.getByRole('button', { name: '맵 정보' }));

		expect(await screen.findByTestId('MapInfoPanel')).toBeInTheDocument();
		expect(screen.getByText('맵 정보', { selector: '[data-slot="popover-title"]' })).toBeInTheDocument();
	});

	it('열린 상태에서 트리거를 다시 클릭하면 닫힌다', async () => {
		render(<MapInfoPopover />);

		const trigger = screen.getByRole('button', { name: '맵 정보' });

		fireEvent.click(trigger);

		await screen.findByTestId('MapInfoPanel');

		fireEvent.click(trigger);

		await waitFor(() => expect(screen.queryByTestId('MapInfoPanel')).not.toBeInTheDocument());
	});

	it('Esc 키를 누르면 닫힌다', async () => {
		render(<MapInfoPopover />);

		fireEvent.click(screen.getByRole('button', { name: '맵 정보' }));

		const panel = await screen.findByTestId('MapInfoPanel');

		fireEvent.keyDown(panel, { key: 'Escape' });

		await waitFor(() => expect(screen.queryByTestId('MapInfoPanel')).not.toBeInTheDocument());
	});

	it('바깥 영역을 눌러도 닫히지 않는다', async () => {
		render(<MapInfoPopover />);

		fireEvent.click(screen.getByRole('button', { name: '맵 정보' }));

		await screen.findByTestId('MapInfoPanel');

		fireEvent.pointerDown(document.body);
		fireEvent.mouseDown(document.body);
		fireEvent.click(document.body);

		expect(screen.getByTestId('MapInfoPanel')).toBeInTheDocument();
	});
});
