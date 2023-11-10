/**
 * 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2023.10.18 Wed 18:39:52
 */

import type { Metadata } from 'next';
import { PropsWithChildren, ReactNode } from 'react';

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
			<body>{children}</body>
		</html>
	);
}