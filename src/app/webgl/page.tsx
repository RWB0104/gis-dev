/**
 * WebGL 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 13:13:27
 */

import WebGLTemplate from '@gis-dev/components/template/page/WebGLTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WebGL을 활용한 맵';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'WebGL' ],
	title
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