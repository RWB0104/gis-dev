/**
 * 테마 스토어 모듈
 *
 * @author RWB
 * @since 2026.10.20 화 11:18:28
 */

import { create } from 'zustand';

export interface ThemeProps {
	/**
	 * 테마 할당 핸들러
	 */
	setThemeState: Func<Updater<Theme | undefined>>;

	/**
	 * 테마 싱크 핸들러
	 */
	syncThemeState: Func<void>;

	/**
	 * 테마
	 */
	themeState?: Theme;
}

export const themeStore = create<ThemeProps>((set, get) => ({
	setThemeState: (state) => {
		let newState: Theme | undefined;

		// 함수일 경우
		if (typeof state === 'function') {
			newState = state(get().themeState);
		}

		// 값일 경우
		else {
			newState = state;
		}

		// 명시적 테마일 경우
		if (newState) {
			localStorage.setItem('theme', newState);
		}

		// 시스템 테마일 경우
		else {
			localStorage.removeItem('theme');
		}

		set({ themeState: newState });
	},
	syncThemeState: () => {
		const theme = localStorage.getItem('theme');

		if (theme === 'light' || theme === 'dark') {
			set({ themeState: theme });

			return;
		}

		localStorage.removeItem('theme');
	}
}));
