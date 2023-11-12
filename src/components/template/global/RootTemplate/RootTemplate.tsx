/**
 * 루트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 04:34:22
 */

import AppThemeProvider from '@gis-dev/components/organism/global/AppThemeProvider';
import GoogleAnalyticsProvider from '@gis-dev/components/organism/global/GoogleAnalyticsProvider';
import ModalProvider from '@gis-dev/components/organism/global/ModalProvider';
import Navigation from '@gis-dev/components/organism/global/Navigation';
import ReactQueryProvider from '@gis-dev/components/organism/global/ReactQueryProvider';
import Stack from '@mui/material/Stack';
import { PropsWithChildren, ReactNode } from 'react';

export type RootTemplateProps = PropsWithChildren;

/**
 * 루트 template 컴포넌트 반환 메서드
 *
 * @param {RootTemplateProps} param0: RootTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function RootTemplate({ children, ...props }: RootTemplateProps): ReactNode
{
	return (
		<GoogleAnalyticsProvider>
			<ReactQueryProvider>
				<AppThemeProvider>
					<Stack data-component='RootTemplate' height='100vh' width='100%' {...props}>
						<Navigation />

						{children}
					</Stack>

					<ModalProvider />
				</AppThemeProvider>
			</ReactQueryProvider>
		</GoogleAnalyticsProvider>

	);
}