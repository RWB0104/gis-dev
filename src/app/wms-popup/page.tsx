/**
 * WMS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 16:10:23
 */

import WMSPopupTemplate from '@gis-dev/components/template/page/WMSPopupTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WMS를 활용한 팝업';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'GeoServer', 'WMS', 'Overlay' ],
	title
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