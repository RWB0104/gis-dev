/**
 * WFS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 13:11:14
 */

import WFSPopupTemplate from '@gis-dev/components/template/page/WFSPopupTemplate';
import { MENU_WFS_POPUP } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'GeoServer', 'WFS', 'Overlay' ],
	menu: MENU_WFS_POPUP
});

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