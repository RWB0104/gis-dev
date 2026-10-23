/**
 * WMS 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 14:58:32
 */

'use client';

import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import WmsTypeButtons from '#/organism/map/WmsTypeButtons';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * WMS 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WmsMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				layers: [baseLayer.googleRoadLayer],
				view: sejongView
			}}
		>
			<MapController>
				<WmsTypeButtons />
			</MapController>

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="WMS" />
			</InteractionTemplate>
		</MapProvider>
	);
}
