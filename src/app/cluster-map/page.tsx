/**
 * 클러스터 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 23:26:24
 */

import ClusterMapTemplate from '@gis-dev/components/template/page/ClusterMapTemplate';
import { MENU_CLUSTER_MAP } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';

import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'Cluster Map' ],
	menu: MENU_CLUSTER_MAP
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