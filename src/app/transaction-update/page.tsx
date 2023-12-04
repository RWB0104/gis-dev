/**
 * 트랜잭션 수정 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.18 Sat 02:08:13
 */

import TransactionUpdateTemplate from '@gis-dev/components/template/page/TransactionUpdateTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WFS-T 수정';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'WFS', 'Transaction', 'Update' ],
	title
});

/**
 * 트랜잭션 수정 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionUpdatePage(): ReactNode
{
	return (
		<TransactionUpdateTemplate />
	);
}