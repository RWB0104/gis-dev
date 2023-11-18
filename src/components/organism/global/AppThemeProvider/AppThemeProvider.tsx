/**
 * 앱 테마 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 16:35:20
 */

'use client';

import { themeStore } from '@gis-dev/script/states/theme';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// eslint-disable-next-line camelcase
import { Noto_Sans_KR, Montserrat } from 'next/font/google';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

export type AppThemeProviderProps = PropsWithChildren;

export const notoSans = Noto_Sans_KR({ subsets: [ 'latin' ], weight: [ '100', '300', '400', '500', '700', '900' ] });
export const montserrat = Montserrat({ subsets: [ 'latin' ], weight: 'variable' });

const fontFamily = [ notoSans.style.fontFamily ];

/**
 * 앱 테마 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {AppThemeProviderProps} param0: AppThemeProviderProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function AppThemeProvider({ children }: AppThemeProviderProps): ReactNode
{
	const { theme } = themeStore();

	const themeObject = useMemo(() => createTheme(({
		palette: { mode: theme },
		transitions: { duration: { standard: 0.3 } },
		typography: { fontFamily: fontFamily.join(', ') }
	})), [ theme ]);

	return (
		<ThemeProvider theme={themeObject}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}