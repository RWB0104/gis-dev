/**
 * 히트맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 11:52:43
 */

import HeatMapTemplate from '@gis-dev/components/template/page/HeatMapTemplate';
import { ReactNode } from 'react';

/**
 * 히트맵 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMap(): ReactNode
{
	return (
		<HeatMapTemplate />
	);
}