/**
 * 앱 컴포넌트
 *
 * @author RWB
 * @since 2023.10.18 Wed 18:40:21
 */

import HomeTemplate from '@gis-dev/components/template/page/HomeTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

import { MENU_HOME } from '../script/common/env';

export const metadata = getMetadata({ menu: MENU_HOME });

/**
 * 앱 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function App(): ReactNode
{
	return (
		<HomeTemplate />
	);
}