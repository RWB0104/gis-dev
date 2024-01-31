/**
 * WMS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 02:22:39
 */

import WMSTemplate from '@gis-dev/components/template/page/WMSTemplate';
import { MENU_WMS } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'GeoServer', 'WMS' ],
	menu: MENU_WMS
});

/**
 * WMS 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMSPage(): ReactNode
{
	return (
		<WMSTemplate />
	);
}