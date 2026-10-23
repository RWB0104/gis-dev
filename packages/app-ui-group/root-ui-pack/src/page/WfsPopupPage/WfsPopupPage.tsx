/**
 * WFS 팝업 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 16:59:53
 */

import WfsPopupMap from '#/organism/extended-map/WfsPopupMap';

/**
 * WFS 팝업 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WfsPopupPage(): React.JSX.Element {
	return (
		<main data-testid="WfsPopupPage">
			<WfsPopupMap />
		</main>
	);
}
