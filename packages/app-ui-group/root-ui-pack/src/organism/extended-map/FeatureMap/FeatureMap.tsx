/**
 * 피쳐 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 14:51:44
 */

'use client';

import { baseLayer, transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import FeatureAddButton from '#/atom/FeatureAddButton';
import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 피쳐 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function FeatureMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				layers: [baseLayer.googleRoadLayer, transactionLayer.wfsFeatureVectorLayer],
				view: seoulView
			}}
		>
			<MapController />

			<InteractionTemplate>
				<FeatureAddButton />
				<GeolocationButton />
				<GuideDialog title="Feature" />
			</InteractionTemplate>
		</MapProvider>
	);
}
