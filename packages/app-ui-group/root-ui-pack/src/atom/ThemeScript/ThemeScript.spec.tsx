/**
 * 테마 스크립트 atom 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 11:07:28
 */

import { render, screen } from '@testing-library/react';

import ThemeScript from '.';

/**
 * 렌더링된 ThemeScript의 스크립트 본문을 실행하는 메서드
 *
 * DOM에 innerHTML로 삽입된 <script>는 브라우저/jsdom 스펙상 실행되지 않으므로,
 * 스크립트 본문을 직접 꺼내 격리된 함수로 실행해 실제 동작을 검증한다.
 */
function runThemeScript(): void {
	render(<ThemeScript />);

	const script = screen.getByTestId('ThemeScript');

	// biome-ignore lint/nursery/noImpliedEval: 스크립트 본문의 실제 동작을 검증하기 위해 격리 실행
	new Function(script.textContent ?? '')();
}

describe('[@gis-dev/root-ui-pack] ThemeScript', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove('dark');
	});

	afterEach(() => {
		// next/script는 afterInteractive 전략에서 <script>를 document.body에 직접 appendChild 하므로,
		// React 트리 밖에서 관리되어 @testing-library/react의 cleanup 대상에 포함되지 않는다.
		// 따라서 테스트 간 잔존 스크립트가 누적되지 않도록 직접 제거한다.
		for (const script of document.querySelectorAll('[data-testid="ThemeScript"]')) {
			script.remove();
		}
	});

	it('script 태그를 렌더링한다', () => {
		render(<ThemeScript />);

		expect(screen.getByTestId('ThemeScript').tagName).toBe('SCRIPT');
	});

	it('전달된 속성을 그대로 전달한다', () => {
		render(<ThemeScript id="theme-script" />);

		expect(screen.getByTestId('ThemeScript')).toHaveAttribute('id', 'theme-script');
	});

	it('저장된 테마가 dark면 html에 dark 클래스를 추가한다', () => {
		localStorage.setItem('theme', 'dark');
		window.matchMedia = vi.fn().mockReturnValue({ matches: false } as MediaQueryList);

		runThemeScript();

		expect(document.documentElement.classList.contains('dark')).toBe(true);

		vi.restoreAllMocks();
	});

	it('저장된 테마가 light면 dark 클래스를 추가하지 않는다', () => {
		localStorage.setItem('theme', 'light');
		window.matchMedia = vi.fn().mockReturnValue({ matches: true } as MediaQueryList);

		runThemeScript();

		expect(document.documentElement.classList.contains('dark')).toBe(false);

		vi.restoreAllMocks();
	});

	it('저장된 테마가 없고 시스템이 다크면 dark 클래스를 추가한다', () => {
		window.matchMedia = vi.fn().mockReturnValue({ matches: true } as MediaQueryList);

		runThemeScript();

		expect(document.documentElement.classList.contains('dark')).toBe(true);

		vi.restoreAllMocks();
	});

	it('저장된 테마가 없고 시스템이 라이트면 dark 클래스를 추가하지 않는다', () => {
		window.matchMedia = vi.fn().mockReturnValue({ matches: false } as MediaQueryList);

		runThemeScript();

		expect(document.documentElement.classList.contains('dark')).toBe(false);

		vi.restoreAllMocks();
	});

	it('localStorage 접근이 실패해도 예외를 던지지 않는다', () => {
		vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
			throw new Error('blocked');
		});

		expect(() => runThemeScript()).not.toThrow();
		expect(document.documentElement.classList.contains('dark')).toBe(false);

		vi.restoreAllMocks();
	});
});
