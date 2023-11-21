/**
 * WFS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 13:11:14
 */

'use client';

import WFSPopupTemplate from '@gis-dev/components/template/page/WFSPopupTemplate';
import { ReactNode } from 'react';

/**
 * WFS 팝업 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WFSPopupPage(): ReactNode
{
	return (
		<WFSPopupTemplate />
	);
}