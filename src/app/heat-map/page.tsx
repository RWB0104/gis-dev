/**
 * 히트맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 11:52:43
 */

import HeatMapTemplate from '@gis-dev/components/template/page/HeatMapTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

import { MENU_HEAT_MAP } from '../../script/common/env';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'Heatmap' ],
	menu: MENU_HEAT_MAP
});

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