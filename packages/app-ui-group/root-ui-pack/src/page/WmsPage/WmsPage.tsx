/**
 * WMS page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 10:06:30
 */

import WmsMap from '#/organism/extended-map/WmsMap';

/**
 * WMS page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WmsPage(): React.JSX.Element {
	return (
		<main data-testid="WmsPage">
			<WmsMap />
		</main>
	);
}
