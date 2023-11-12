/**
 * VWorld 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 02:09:25
 */

import VWorldBox from '@gis-dev/components/organism/page/VWorldBox';
import { ReactNode } from 'react';

/**
 * VWorld 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function VWorld(): ReactNode
{
	return (
		<VWorldBox />
	);
}