/**
 * 피쳐 클릭 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 15:28:36
 */

import FeatureClickMap from '#/organism/extended-map/FeatureClickMap';

/**
 * 피쳐 클릭 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function FeatureClickPage(): React.JSX.Element {
	return (
		<main data-testid="">
			<FeatureClickMap />
		</main>
	);
}
