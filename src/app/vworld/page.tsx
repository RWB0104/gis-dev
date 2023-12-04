/**
 * VWorld 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 02:09:25
 */

import VWorldTemplate from '@gis-dev/components/template/page/VWorldTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'V-World 지도';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'VectorLayer', 'VWorld' ],
	title
});

/**
 * VWorld 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function VWorldPage(): ReactNode
{
	return (
		<VWorldTemplate />
	);
}