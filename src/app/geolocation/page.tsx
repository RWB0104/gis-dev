/**
 * 지오로케이션 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 18:18:09
 */

import GeolocationTemplate from '@gis-dev/components/template/page/GeolocationTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = '지오로케이션';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'Geolocation' ],
	title
});

/**
 * 지오로케이션 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function GeolocationPage(): ReactNode
{
	return (
		<GeolocationTemplate />
	);
}