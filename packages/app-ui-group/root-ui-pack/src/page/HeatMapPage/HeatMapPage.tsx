/**
 * 히트맵 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 18:45:29
 */

import HeatMap from '#/organism/extended-map/HeatMap';

/**
 * 히트맵 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function HeatMapPage(): React.JSX.Element {
	return (
		<main data-testid="HeatMapPage">
			<HeatMap />
		</main>
	);
}
