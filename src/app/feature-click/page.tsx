/**
 * 피쳐 클릭 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 11:03:02
 */

import FeatureClickTemplate from '@gis-dev/components/template/page/FeatureClickTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = '맵 피쳐 상호작용';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'Feature', 'Interaction' ],
	title
});

/**
 * 피쳐 클릭 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function FeatureClickPage(): ReactNode
{
	return (
		<FeatureClickTemplate />
	);
}