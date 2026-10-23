/**
 * 맵 정보 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 18:43:50
 */

import MapInfoMap from '#/organism/extended-map/MapInfoMap';

/**
 * 맵 정보 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapInfoPage(): React.JSX.Element {
	return (
		<main data-testid="MapInfoPage">
			<MapInfoMap />
		</main>
	);
}
