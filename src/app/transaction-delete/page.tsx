/**
 * 트랜잭션 삭제 페이지 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 02:38:06
 */

import TransactionDeleteTemplate from '@gis-dev/components/template/page/TransactionDeleteTemplate';
import { ReactNode } from 'react';

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