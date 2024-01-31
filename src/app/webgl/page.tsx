/**
 * WebGL 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 13:13:27
 */

import WebGLTemplate from '@gis-dev/components/template/page/WebGLTemplate';
import { MENU_WEBGL } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'WebGL' ],
	menu: MENU_WEBGL
});

/**
 * WebGL 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WebGLPage(): ReactNode
{
	return (
		<WebGLTemplate />
	);
}