/**
 * 클러스터 맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 23:26:24
 */

import ClusterMapBox from '@gis-dev/components/organism/box/ClusterMapBox';
import { ReactNode } from 'react';

/**
 * 클러스터 맵 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ClusterMap(): ReactNode
{
	return (
		<ClusterMapBox />
	);
}