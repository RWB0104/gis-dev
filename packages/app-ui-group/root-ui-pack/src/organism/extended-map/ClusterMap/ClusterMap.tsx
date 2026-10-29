/**
 * 클러스터 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 10:44:39
 */

'use client';

import { getClusterClickSelect, getClusterHoverSelect } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulMiddleView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import ClusterPopup from '#/organism/map/ClusterPopup';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 클러스터 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function ClusterMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				interactions: [getClusterClickSelect('name'), getClusterHoverSelect('name')],
				layers: [baseLayer.googleRoadLayer, wfsLayer.wfsStarbucksClusterLayer],
				view: seoulMiddleView
			}}
		>
			<MapController />

			<ClusterPopup />

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="Cluster" />
			</InteractionTemplate>
		</MapProvider>
	);
}
