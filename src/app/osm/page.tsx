/**
 * OSM 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 02:51:01
 */

import OSMBox from '@gis-dev/components/organism/box/OSMBox';
import { ReactNode } from 'react';

/**
 * OSM 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function OSMPage(): ReactNode
{
	return (
		<OSMBox />
	);
}