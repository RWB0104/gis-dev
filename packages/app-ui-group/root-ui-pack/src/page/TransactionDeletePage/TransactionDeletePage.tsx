/**
 * 트랜잭션 삭제 맵 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.28 수 16:09:04
 */

import TransactionDeleteMap from '#/organism/extended-map/TransactionDeleteMap';

/**
 * 트랜잭션 삭제 맵 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionDeletePage(): React.JSX.Element {
	return (
		<main data-testid="TransactionDeletePage">
			<TransactionDeleteMap />
		</main>
	);
}
