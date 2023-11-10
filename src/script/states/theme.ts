/**
 * 테마 상태관리 모듈
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:22:47
 */

import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

export type ThemeStoreSetThemeHandler = (theme: PaletteMode) => void;
export type ThemeStoreToggleThemeHandler = () => void;

export interface ThemeStoreProps
{
	/**
	 * 테마
	 */
	theme: PaletteMode;

	/**
	 * 테마 할당 메서드
	 */
	setTheme: ThemeStoreSetThemeHandler;

	/**
	 * 테마 토글 메서드
	 */
	toggleTheme: ThemeStoreToggleThemeHandler;
}

export const themeStore = create<ThemeStoreProps>((set) => ({
	setTheme: (theme): void =>
	{
		localStorage.setItem('theme', theme);
		set({ theme });
	},
	theme: 'light',
	toggleTheme: (): void =>
	{
		set(({ theme }) =>
		{
			const target: PaletteMode = (theme === 'light') ? 'dark' : 'light';

			localStorage.setItem('theme', target);

			return { theme: target };
		});
	}
}));