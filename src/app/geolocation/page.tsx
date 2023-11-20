/**
 * 지오로케이션 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 18:18:09
 */

import GeolocationTemplate from '@gis-dev/components/template/page/GeolocationTemplate';
import { ReactNode } from 'react';

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