/**
 * 지오로케이션 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 18:43:10
 */

import GeolocationMap from '#/organism/extended-map/GeolocationMap';

/**
 * 지오로케이션 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GeolocationPage(): React.JSX.Element {
	return (
		<main data-testid="GeolocationPage">
			<GeolocationMap />
		</main>
	);
}
