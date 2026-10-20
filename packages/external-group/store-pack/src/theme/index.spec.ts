/**
 * 테마 스토어 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 11:18:22
 */

import { themeStore } from '.';

describe('[@jader/store-pack] theme', () => {
	beforeEach(() => {
		themeStore.setState({ themeState: undefined });
		localStorage.clear();
	});

	describe('setThemeState 테스트', () => {
		it('값을 직접 전달하면 그 값으로 상태를 갱신한다', () => {
			themeStore.getState().setThemeState('dark');

			expect(themeStore.getState().themeState).toBe('dark');
		});

		it('함수를 전달하면 이전 상태를 인자로 받아 계산한 값으로 갱신한다', () => {
			themeStore.setState({ themeState: 'light' });

			themeStore.getState().setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

			expect(themeStore.getState().themeState).toBe('dark');
		});

		it('명시적 테마를 전달하면 localStorage에 저장한다', () => {
			themeStore.getState().setThemeState('dark');

			expect(localStorage.getItem('theme')).toBe('dark');
		});

		it('undefined를 전달하면(시스템 테마) localStorage의 theme 키를 제거한다', () => {
			localStorage.setItem('theme', 'dark');
			themeStore.setState({ themeState: 'dark' });

			themeStore.getState().setThemeState(undefined);

			expect(themeStore.getState().themeState).toBeUndefined();
			expect(localStorage.getItem('theme')).toBeNull();
		});
	});

	describe('syncThemeState 테스트', () => {
		it('localStorage에 저장된 테마가 light/dark면 상태에 반영한다', () => {
			localStorage.setItem('theme', 'dark');

			themeStore.getState().syncThemeState();

			expect(themeStore.getState().themeState).toBe('dark');
		});

		it('localStorage에 저장된 값이 light/dark가 아니면 상태를 변경하지 않는다', () => {
			localStorage.setItem('theme', 'invalid-value');

			themeStore.getState().syncThemeState();

			expect(themeStore.getState().themeState).toBeUndefined();
		});

		it('localStorage에 저장된 값이 없으면 상태를 변경하지 않는다', () => {
			themeStore.getState().syncThemeState();

			expect(themeStore.getState().themeState).toBeUndefined();
		});

		it('실행 후엔 localStorage의 theme 키를 항상 제거한다', () => {
			localStorage.setItem('theme', 'invalid-value');

			themeStore.getState().syncThemeState();

			expect(localStorage.getItem('theme')).toBeNull();
		});
	});
});
