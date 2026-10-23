/**
 * WMS page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 10:06:30
 */

import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GoogleLayer from '#/atom/GoogleLayer';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import WmsTypeButtons from '#/organism/map/WmsTypeButtons';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * WMS page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WmsPage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: sejongView
			}}
		>
			<MapController>
				<WmsTypeButtons />
			</MapController>

			<GoogleLayer />

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="WMS" />
			</InteractionTemplate>
		</MapProvider>
	);
}
