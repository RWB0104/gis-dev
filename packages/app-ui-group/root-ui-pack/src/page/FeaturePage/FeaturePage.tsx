/**
 * 피쳐 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 16:08:25
 */

import FeatureMap from '#/organism/extended-map/FeatureMap';

/**
 * 피쳐 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function FeaturePage(): React.JSX.Element {
	return (
		<main data-testid="FeaturePage">
			<FeatureMap />
		</main>
	);
}
