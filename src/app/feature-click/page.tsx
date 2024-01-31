/**
 * 피쳐 클릭 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 11:03:02
 */

import FeatureClickTemplate from '@gis-dev/components/template/page/FeatureClickTemplate';
import { MENU_FEATURE_CLICK } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'Feature', 'Interaction' ],
	menu: MENU_FEATURE_CLICK
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