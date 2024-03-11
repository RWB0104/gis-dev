/**
 * 맵 정보 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 03:39:15
 */

import MapInfoTemplate from '@gis-dev/components/template/page/MapInfoTemplate';
import { MENU_MAP_INFO } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';

import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'Coordination', 'EPSG', 'Zoom' ],
	menu: MENU_MAP_INFO
});

/**
 * 맵 정보 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function MapInfoPage(): ReactNode
{
	return <MapInfoTemplate />;
}