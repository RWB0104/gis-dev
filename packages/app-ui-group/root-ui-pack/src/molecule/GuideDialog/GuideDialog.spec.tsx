/**
 * 가이드 다이얼로그 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 19:20:00
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import GuideDialog from '.';

/**
 * 트리거를 클릭해 다이얼로그를 여는 메서드
 */
async function openDialog(): Promise<HTMLElement> {
	fireEvent.click(screen.getByRole('button'));

	return await screen.findByRole('dialog');
}

describe('[@gis-dev/root-ui-pack] GuideDialog', () => {
	it('트리거 버튼을 렌더링한다', () => {
		render(<GuideDialog title="가이드" />);

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('처음에는 다이얼로그가 닫혀 있다', () => {
		render(<GuideDialog title="가이드" />);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('트리거를 클릭하면 제목, 설명, 본문을 보여준다', async () => {
		render(
			<GuideDialog description="사용 방법" title="가이드">
				<p>본문 내용</p>
			</GuideDialog>
		);

		const dialog = await openDialog();

		expect(dialog).toHaveTextContent('가이드');
		expect(dialog).toHaveTextContent('사용 방법');
		expect(dialog).toHaveTextContent('본문 내용');
	});

	it('다이얼로그의 접근 가능한 이름을 제목으로 지정한다', async () => {
		render(<GuideDialog title="가이드" />);

		await openDialog();

		expect(screen.getByRole('dialog', { name: '가이드' })).toBeInTheDocument();
	});

	it('설명이 없으면 설명 영역을 비워 둔다', async () => {
		render(<GuideDialog title="가이드" />);

		await openDialog();

		expect(document.querySelector('[data-slot="dialog-description"]')).toBeEmptyDOMElement();
	});

	it('Esc 키를 누르면 닫힌다', async () => {
		render(<GuideDialog title="가이드" />);

		const dialog = await openDialog();

		fireEvent.keyDown(dialog, { key: 'Escape' });

		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});

	it('닫기 버튼을 누르면 닫힌다', async () => {
		render(<GuideDialog title="가이드" />);

		await openDialog();

		fireEvent.click(screen.getByRole('button', { name: 'Close' }));

		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});
});
