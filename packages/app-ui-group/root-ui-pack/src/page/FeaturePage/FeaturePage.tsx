/**
 * 피쳐 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 16:08:25
 */

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import FeatureAddButton from '#/atom/FeatureAddButton';
import FeatureLayer from '#/atom/FeatureLayer';
import GeolocationButton from '#/atom/GeolocationButton';
import GoogleLayer from '#/atom/GoogleLayer';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 피쳐 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function FeaturePage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: seoulView
			}}
		>
			<MapController />
			<GoogleLayer />
			<FeatureLayer />

			<InteractionTemplate>
				<FeatureAddButton />
				<GeolocationButton />
				<GuideDialog title="Feature" />
			</InteractionTemplate>
		</MapProvider>
	);
}
