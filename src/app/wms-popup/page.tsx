/**
 * WMS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 16:10:23
 */

import WMSPopupTemplate from '@gis-dev/components/template/page/WMSPopupTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

import { MENU_WMS_POPUP } from '../../script/common/env';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'GeoServer', 'WMS', 'Overlay' ],
	menu: MENU_WMS_POPUP
});

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