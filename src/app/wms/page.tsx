/**
 * WMS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 02:22:39
 */

import WMSTemplate from '@gis-dev/components/template/page/WMSTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WMS';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'GeoServer', 'WMS' ],
	title
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