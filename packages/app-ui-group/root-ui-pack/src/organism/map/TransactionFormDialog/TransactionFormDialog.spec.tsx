/**
 * 트랜잭션 폼 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:30:00
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TransactionFormDialog from '.';

describe('[@gis-dev/root-ui-pack] TransactionFormDialog', () => {
	it('닫혀 있으면 다이얼로그를 렌더링하지 않는다', () => {
		render(<TransactionFormDialog open={false} title="트랜잭션 삽입" />);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('열려 있으면 제목과 설명을 보여준다', async () => {
		render(<TransactionFormDialog description="정보를 입력해 주세요." open title="트랜잭션 삽입" />);

		const dialog = await screen.findByRole('dialog');

		expect(dialog).toHaveTextContent('트랜잭션 삽입');
		expect(dialog).toHaveTextContent('정보를 입력해 주세요.');
	});

	it('빌딩명과 빌딩 주소 입력을 보여준다', async () => {
		render(<TransactionFormDialog open title="트랜잭션 삽입" />);

		await screen.findByRole('dialog');

		expect(screen.getByLabelText('빌딩명')).toBeRequired();
		expect(screen.getByLabelText('빌딩 주소')).toBeRequired();
	});

	it('기본값이 없으면 입력이 비어 있다', async () => {
		render(<TransactionFormDialog open title="트랜잭션 삽입" />);

		await screen.findByRole('dialog');

		expect(screen.getByLabelText('빌딩명')).toHaveValue('');
		expect(screen.getByLabelText('빌딩 주소')).toHaveValue('');
	});

	it('기본값으로 입력을 채운다', async () => {
		render(
			<TransactionFormDialog
				defaultValue={{ address: '세종 한누리대로', name: '세종시청사' }}
				open
				title="트랜잭션 수정"
			/>
		);

		await screen.findByRole('dialog');

		expect(screen.getByLabelText('빌딩명')).toHaveValue('세종시청사');
		expect(screen.getByLabelText('빌딩 주소')).toHaveValue('세종 한누리대로');
	});

	it('입력 길이를 제한한다', async () => {
		render(<TransactionFormDialog open title="트랜잭션 삽입" />);

		await screen.findByRole('dialog');

		expect(screen.getByLabelText('빌딩명')).toHaveAttribute('maxlength', '100');
		expect(screen.getByLabelText('빌딩 주소')).toHaveAttribute('maxlength', '200');
	});

	it('CTA 기본 텍스트는 제출이다', async () => {
		render(<TransactionFormDialog open title="트랜잭션 삽입" />);

		expect(await screen.findByRole('button', { name: '제출' })).toBeInTheDocument();
	});

	it('CTA 텍스트를 지정할 수 있다', async () => {
		render(<TransactionFormDialog cta="추가" open title="트랜잭션 삽입" />);

		expect(await screen.findByRole('button', { name: '추가' })).toBeInTheDocument();
	});

	it('로딩 중에는 제출 버튼을 비활성화한다', async () => {
		render(<TransactionFormDialog cta="추가" loading open title="트랜잭션 삽입" />);

		expect(await screen.findByRole('button', { name: '추가' })).toBeDisabled();
	});

	it('로딩 중이 아니면 제출 버튼이 활성화되어 있다', async () => {
		render(<TransactionFormDialog cta="추가" open title="트랜잭션 삽입" />);

		expect(await screen.findByRole('button', { name: '추가' })).toBeEnabled();
	});

	it('제출하면 입력한 빌딩명과 주소를 전달한다', async () => {
		const onSubmit = vi.fn();

		render(<TransactionFormDialog onSubmit={onSubmit} open title="트랜잭션 삽입" />);

		await screen.findByRole('dialog');

		fireEvent.change(screen.getByLabelText('빌딩명'), { target: { value: '청사' } });
		fireEvent.change(screen.getByLabelText('빌딩 주소'), { target: { value: '서울' } });
		fireEvent.submit(screen.getByLabelText('빌딩명').closest('form') as HTMLFormElement);

		expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ address: '서울', name: '청사' });
	});

	it('기본값이 채워진 채 제출하면 기본값을 전달한다', async () => {
		const onSubmit = vi.fn();

		render(
			<TransactionFormDialog defaultValue={{ address: '주소', name: '이름' }} onSubmit={onSubmit} open title="수정" />
		);

		await screen.findByRole('dialog');

		fireEvent.submit(screen.getByLabelText('빌딩명').closest('form') as HTMLFormElement);

		expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ address: '주소', name: '이름' });
	});

	it('onSubmit이 없어도 제출이 에러 없이 동작한다', async () => {
		render(<TransactionFormDialog open title="트랜잭션 삽입" />);

		await screen.findByRole('dialog');

		expect(() => fireEvent.submit(screen.getByLabelText('빌딩명').closest('form') as HTMLFormElement)).not.toThrow();
	});

	it('ESC 키를 누르면 닫기를 요청한다', async () => {
		const onOpenChange = vi.fn();

		render(<TransactionFormDialog onOpenChange={onOpenChange} open title="트랜잭션 삽입" />);

		fireEvent.keyDown(await screen.findByRole('dialog'), { key: 'Escape' });

		await waitFor(() => expect(onOpenChange).toHaveBeenCalled());

		expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
	});

	it('닫기 버튼을 누르면 닫기를 요청한다', async () => {
		const onOpenChange = vi.fn();

		render(<TransactionFormDialog onOpenChange={onOpenChange} open title="트랜잭션 삽입" />);

		fireEvent.click(await screen.findByRole('button', { name: 'Close' }));

		expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
	});
});
