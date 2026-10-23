/**
 * WFS 팝업 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 16:58:15
 */

'use client';

import { getWfsClickSelect, getWfsHoverSelect } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import WfsPopup from '#/organism/map/WfsPopup';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * WFS 팝업 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WfsPopupMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				interactions: [getWfsHoverSelect('buld_nm'), getWfsClickSelect('buld_nm')],
				layers: [baseLayer.googleRoadLayer, wfsLayer.sejongWfsLayer],
				view: sejongView
			}}
		>
			<MapController />

			<WfsPopup />

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="WFS Popup" />
			</InteractionTemplate>
		</MapProvider>
	);
}
