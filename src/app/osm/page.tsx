/**
 * OSM 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 02:51:01
 */

import OSMTemplate from '@gis-dev/components/template/page/OSMTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'OSM 지도';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'VectorLayer', 'OSM' ],
	title
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