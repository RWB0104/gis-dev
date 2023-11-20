/**
 * WMS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 16:10:23
 */

import WMSPopupTemplate from '@gis-dev/components/template/page/WMSPopupTemplate';
import { ReactNode } from 'react';

/**
 * WMS 팝업 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMSPopupPage(): ReactNode
{
	return (
		<WMSPopupTemplate />
	);
}