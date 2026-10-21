/**
 * 복사 버튼 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:29:22
 */

import { act, fireEvent, render, screen } from '@testing-library/react';

import CopyButton from '.';

const COPIED_DURATION = 1200;

const writeText = vi.fn();

const getUndefined = (): undefined => undefined;

/**
 * 복사 버튼을 클릭하고 비동기 클립보드 처리가 끝날 때까지 기다리는 메서드
 */
async function clickButton(): Promise<void> {
	// biome-ignore lint/nursery/useAwaitThenable: act는 Promise를 반환하는 콜백을 받으면 Promise를 반환한다
	await act(() => Promise.resolve(fireEvent.click(screen.getByTestId('CopyButton'))));
}

describe('[@gis-dev/root-ui-pack] CopyButton', () => {
	beforeEach(() => {
		vi.useFakeTimers();

		writeText.mockReset();
		writeText.mockResolvedValue(undefined);

		Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
	});

	afterEach(() => {
		vi.useRealTimers();

		Reflect.deleteProperty(navigator, 'clipboard');
	});

	it('버튼을 렌더링한다', () => {
		render(<CopyButton />);

		expect(screen.getByRole('button')).toBe(screen.getByTestId('CopyButton'));
	});

	it('문자열 copyText를 클립보드에 복사한다', async () => {
		render(<CopyButton copyText="127.0 37.5" />);

		await clickButton();

		expect(writeText).toHaveBeenCalledExactlyOnceWith('127.0 37.5');
	});

	it('함수 copyText는 클릭 시점에 호출해 반환값을 복사한다', async () => {
		const copyText = vi.fn().mockReturnValue('lazy');

		render(<CopyButton copyText={copyText} />);

		expect(copyText).not.toHaveBeenCalled();

		await clickButton();

		expect(copyText).toHaveBeenCalledOnce();
		expect(writeText).toHaveBeenCalledExactlyOnceWith('lazy');
	});

	it('copyText가 없으면 복사하지 않는다', async () => {
		render(<CopyButton />);

		await clickButton();

		expect(writeText).not.toHaveBeenCalled();
		expect(screen.getByTestId('CopyButton')).toBeEnabled();
	});

	it('copyText 함수가 undefined를 반환하면 복사하지 않는다', async () => {
		render(<CopyButton copyText={getUndefined} />);

		await clickButton();

		expect(writeText).not.toHaveBeenCalled();
		expect(screen.getByTestId('CopyButton')).toBeEnabled();
	});

	it('onClick을 호출한다', async () => {
		const onClick = vi.fn();

		render(<CopyButton onClick={onClick} />);

		await clickButton();

		expect(onClick).toHaveBeenCalledOnce();
	});

	it('복사에 성공하면 버튼을 잠시 비활성화했다가 복원한다', async () => {
		render(<CopyButton copyText="text" />);

		await clickButton();

		expect(screen.getByTestId('CopyButton')).toBeDisabled();

		act(() => {
			vi.advanceTimersByTime(COPIED_DURATION - 1);
		});

		expect(screen.getByTestId('CopyButton')).toBeDisabled();

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(screen.getByTestId('CopyButton')).toBeEnabled();
	});

	it('복사 상태에 따라 체크 아이콘과 복사 아이콘을 전환한다', async () => {
		const { container } = render(<CopyButton copyText="text" />);

		const check = container.querySelector('.lucide-check');
		const copy = container.querySelector('.lucide-copy');

		expect(check).toHaveClass('opacity-0');
		expect(copy).not.toHaveClass('opacity-0');

		await clickButton();

		expect(check).not.toHaveClass('opacity-0');
		expect(copy).toHaveClass('opacity-0');

		act(() => {
			vi.advanceTimersByTime(COPIED_DURATION);
		});

		expect(check).toHaveClass('opacity-0');
		expect(copy).not.toHaveClass('opacity-0');
	});

	it('클립보드 쓰기에 실패하면 복사 상태로 바꾸지 않는다', async () => {
		writeText.mockRejectedValue(new Error('denied'));

		render(<CopyButton copyText="text" />);

		await clickButton();

		expect(screen.getByTestId('CopyButton')).toBeEnabled();
	});

	it('className과 나머지 속성을 전달한다', () => {
		render(<CopyButton aria-label="복사" className="custom" />);

		const button = screen.getByTestId('CopyButton');

		expect(button).toHaveClass('custom', 'relative');
		expect(button).toHaveAttribute('aria-label', '복사');
	});
});
