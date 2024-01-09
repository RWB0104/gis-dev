/**
 * 피쳐 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 23:40:00
 */

import FeatureTemplate from '@gis-dev/components/template/page/FeatureTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

import { MENU_FEATURE } from '../../script/common/env';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'Feature' ],
	menu: MENU_FEATURE
});

/**
 * 피쳐 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function FeaturePage(): ReactNode
{
	return (
		<FeatureTemplate />
	);
}