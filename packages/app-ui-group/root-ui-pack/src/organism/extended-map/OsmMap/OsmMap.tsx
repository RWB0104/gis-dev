/**
 * OSM 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 14:21:03
 */

'use client';

import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import MapProvider from '#/organism/map/MapProvider';

/**
 * OSM 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function OsmMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				layers: [baseLayer.osmLayer],
				view: seoulView
			}}
		/>
	);
}
