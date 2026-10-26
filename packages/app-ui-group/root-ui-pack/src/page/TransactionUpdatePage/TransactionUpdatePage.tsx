/**
 * 트랜잭션 수정 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.26 월 21:35:00
 */

import TransactionUpdateMap from '#/organism/extended-map/TransactionUpdateMap';

/**
 * 트랜잭션 수정 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionUpdatePage(): React.JSX.Element {
	return (
		<main data-testid="TransactionUpdatePage">
			<TransactionUpdateMap />
		</main>
	);
}
