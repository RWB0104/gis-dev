'use client';

import { getWfsClickSelect, getWfsHoverSelect } from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, transactionLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import TransactionInsertButton from '#/organism/map/TransactionInsertButton';
import WfsPopup from '#/organism/map/WfsPopup';
import InteractionTemplate from '#/template/InteractionTemplate';

export default function TransactionInsertMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				interactions: [getWfsHoverSelect('name'), getWfsClickSelect('name')],
				layers: [baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer, transactionLayer.drawLayer],
				view: seoulView
			}}
		>
			<MapController />

			<WfsPopup />

			<InteractionTemplate>
				<TransactionInsertButton />
				<GeolocationButton />
				<GuideDialog title="WFS-T Insert" />
			</InteractionTemplate>
		</MapProvider>
	);
}
