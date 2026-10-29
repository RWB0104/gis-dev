/**
 * 클러스터 맵 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 10:52:07
 */

import ClusterMap from '#/organism/extended-map/ClusterMap';

/**
 * 클러스터 맵 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function ClusterMapPage(): React.JSX.Element {
	return (
		<main data-testid="ClusterMapPage">
			<ClusterMap />
		</main>
	);
}
