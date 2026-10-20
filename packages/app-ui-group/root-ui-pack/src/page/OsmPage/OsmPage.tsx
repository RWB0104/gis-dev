/**
 * OSM page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 17:09:51
 */

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import OsmLayer from '#/atom/OsmLayer';
import MapProvider from '#/organism/map/MapProvider';

/**
 * OSM page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function OsmPage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: seoulView
			}}
		>
			<OsmLayer />
		</MapProvider>
	);
}
