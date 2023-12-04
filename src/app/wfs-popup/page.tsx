/**
 * WFS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 13:11:14
 */

import WFSPopupTemplate from '@gis-dev/components/template/page/WFSPopupTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WFS를 활용한 팝업';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'GeoServer', 'WFS', 'Overlay' ],
	title
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