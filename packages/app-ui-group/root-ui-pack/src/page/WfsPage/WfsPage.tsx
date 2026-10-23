/**
 * WFS page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 18:06:24
 */

import WfsMap from '#/organism/extended-map/WfsMap';

/**
 * WFS page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WfsPage(): React.JSX.Element {
	return (
		<main data-testid="WfsPage">
			<WfsMap />
		</main>
	);
}
