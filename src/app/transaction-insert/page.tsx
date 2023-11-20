/**
 * WFS 트랜잭션 삽입 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 18:00:12
 */

import TransactionInsertTemplate from '@gis-dev/components/template/page/TransactionInsertTemplate';
import { ReactNode } from 'react';

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