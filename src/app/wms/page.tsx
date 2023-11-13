/**
 * WMS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 02:22:39
 */

import WMSBox from '@gis-dev/components/organism/page/WMSBox';
import { ReactNode } from 'react';

/**
 * WMS 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMS(): ReactNode
{
	return (
		<WMSBox />
	);
}