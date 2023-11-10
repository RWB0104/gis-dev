/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2023.10.18 Wed 18:39:52
 */

import type { Metadata } from 'next';
import { PropsWithChildren, ReactNode } from 'react';

import Header from '@gis-dev/components/molecule/Header';
import AppThemeProvider from '@gis-dev/components/organism/global/AppThemeProvider';
import GoogleAnalyticsProvider from '@gis-dev/components/organism/global/GoogleAnalyticsProvider';
import ReactQueryProvider from '@gis-dev/components/organism/global/ReactQueryProvider';

export const metadata: Metadata = {
	description: 'Generated by create next app',
	title: 'Create Next App'
};

/**
 * 레이아웃 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function RootLayout({ children }: PropsWithChildren): ReactNode
{
	return (
		<html lang='ko'>
			<body>
				<Header />

				<GoogleAnalyticsProvider>
					<ReactQueryProvider>
						<AppThemeProvider>
							{children}
						</AppThemeProvider>
					</ReactQueryProvider>
				</GoogleAnalyticsProvider>
			</body>
		</html>
	);
}