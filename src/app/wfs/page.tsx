/**
 * WFS 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 00:59:33
 */

import WFSTemplate from '@gis-dev/components/template/page/WFSTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WFS';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'GeoServer', 'WFS' ],
	title
});

/**
 * WFS 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WFSPage(): ReactNode
{
	return (
		<WFSTemplate />
	);
}