/**
 * WebGL page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.30 금 18:10:34
 */

import WebglMap from '#/organism/extended-map/WebglMap';

/**
 * WebGL page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WebglPage(): React.JSX.Element {
	return (
		<main data-testid="WebglPage">
			<WebglMap />
		</main>
	);
}
