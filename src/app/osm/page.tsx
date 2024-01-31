/**
 * OSM 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 02:51:01
 */

import OSMTemplate from '@gis-dev/components/template/page/OSMTemplate';
import { MENU_OSM } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'VectorLayer', 'OSM' ],
	menu: MENU_OSM
});

/**
 * OSM 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function OSMPage(): ReactNode
{
	return (
		<OSMTemplate />
	);
}