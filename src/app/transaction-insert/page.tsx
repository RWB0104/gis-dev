/**
 * WFS 트랜잭션 삽입 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 18:00:12
 */

import TransactionInsertTemplate from '@gis-dev/components/template/page/TransactionInsertTemplate';
import { MENU_TRANSACTION_INSERT } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';

import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'WFS', 'Transaction', 'Insert' ],
	menu: MENU_TRANSACTION_INSERT
});

/**
 * WFS 트랜잭션 삽입 페이지 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionInsertPage(): ReactNode
{
	return (
		<TransactionInsertTemplate />
	);
}