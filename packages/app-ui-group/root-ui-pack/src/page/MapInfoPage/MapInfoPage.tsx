import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GoogleLayer from '#/atom/GoogleLayer';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';

export default function MapInfoPage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: seoulView
			}}
		>
			<MapController />
			<GoogleLayer />
		</MapProvider>
	);
}
