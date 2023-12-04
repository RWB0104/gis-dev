/**
 * 트랜잭션 삭제 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 02:38:06
 */

import TransactionDeleteTemplate from '@gis-dev/components/template/page/TransactionDeleteTemplate';
import { getMetadata } from '@gis-dev/script/common/util';
import { ReactNode } from 'react';

const title = 'WFS-T 삭제';

export const metadata = getMetadata({
	description: `OpenLayers ${title} 예시 페이지`,
	keywords: [ 'OpenLayers', 'WFS', 'Transaction', 'Delete' ],
	title
});

/**
 * 트랜잭션 삭제 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionDeletePage(): ReactNode
{
	return (
		<TransactionDeleteTemplate />
	);
}