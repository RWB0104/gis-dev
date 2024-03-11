/**
 * 트랜잭션 삭제 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 02:38:06
 */

import TransactionDeleteTemplate from '@gis-dev/components/template/page/TransactionDeleteTemplate';
import { MENU_TRANSACTION_DELETE } from '@gis-dev/script/common/env';
import { getMetadata } from '@gis-dev/script/common/util';

import { ReactNode } from 'react';

export const metadata = getMetadata({
	keywords: [ 'OpenLayers', 'WFS', 'Transaction', 'Delete' ],
	menu: MENU_TRANSACTION_DELETE
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