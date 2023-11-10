/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2023.10.18 Wed 18:39:52
 */

import AppThemeProvider from '@gis-dev/components/organism/global/AppThemeProvider';
import GoogleAnalyticsProvider from '@gis-dev/components/organism/global/GoogleAnalyticsProvider';
import Navigation from '@gis-dev/components/organism/global/Navigation';
import ReactQueryProvider from '@gis-dev/components/organism/global/ReactQueryProvider';
import RootTemplate from '@gis-dev/components/template/global/RootTemplate';
import type { Metadata } from 'next';
import { PropsWithChildren, ReactNode } from 'react';

import './app.scss';

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
				<GoogleAnalyticsProvider>
					<ReactQueryProvider>
						<AppThemeProvider>
							<RootTemplate>
								<Navigation />

								{children}
							</RootTemplate>
						</AppThemeProvider>
					</ReactQueryProvider>
				</GoogleAnalyticsProvider>
			</body>
		</html>
	);
}