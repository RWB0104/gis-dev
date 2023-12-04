/**
 * 클러스터 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 23:26:24
 */

import ClusterMapTemplate from '@gis-dev/components/template/page/ClusterMapTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = '클러스터맵';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'Cluster Map' ],
	title
});

/**
 * 클러스터 맵 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ClusterMap(): ReactNode
{
	return (
		<ClusterMapTemplate />
	);
}