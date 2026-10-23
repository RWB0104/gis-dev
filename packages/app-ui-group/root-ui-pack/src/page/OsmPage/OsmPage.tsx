/**
 * OSM page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 17:09:51
 */

import OsmMap from '#/organism/extended-map/OsmMap';

/**
 * OSM page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function OsmPage(): React.JSX.Element {
	return (
		<main data-testid="OsmPage">
			<OsmMap />
		</main>
	);
}
