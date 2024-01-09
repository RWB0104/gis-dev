/**
 * VWorld 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 02:09:25
 */

import VWorldTemplate from '@gis-dev/components/template/page/VWorldTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

import { MENU_VWORLD } from '../../script/common/env';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'VectorLayer', 'VWorld' ],
	menu: MENU_VWORLD
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