import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import WmsPopup from '#/organism/map/WmsPopup';
import WmsTypeButtons from '#/organism/map/WmsTypeButtons';
import InteractionTemplate from '#/template/InteractionTemplate';

export default function WmsPopupMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				layers: [baseLayer.googleRoadLayer],
				view: sejongView
			}}
		>
			<WmsPopup />

			<MapController>
				<WmsTypeButtons />
			</MapController>

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="WFS Popup" />
			</InteractionTemplate>
		</MapProvider>
	);
}
