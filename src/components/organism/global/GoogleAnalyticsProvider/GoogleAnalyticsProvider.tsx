/**
 * Google Analytics 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 16:10:06
 */

'use client';

import { PropsWithChildren, ReactNode } from 'react';
import ReactGA from 'react-ga4';

export type GoogleAnalyticsProviderProps = PropsWithChildren;

/**
 * Google Analytics 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {GoogleAnalyticsProviderProps} param0: GoogleAnalyticsProviderProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function GoogleAnalyticsProvider({ children }: GoogleAnalyticsProviderProps): ReactNode
{
	ReactGA.initialize('G-1YPNLPR0CQ');

	return children;
}