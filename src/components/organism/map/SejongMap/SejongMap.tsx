/**
 * 세종 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:39:29
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { views } from '@gis-dev/script/map/view';

import { PropsWithChildren, ReactNode } from 'react';

/**
 * 세종 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function SejongMap({ children }: PropsWithChildren): ReactNode
{
	return (
		<MapProvider view={views.sejongView} hasCursor>
			{children}
		</MapProvider>
	);
}