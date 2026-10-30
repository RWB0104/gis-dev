/**
 * WebGL 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.30 금 18:07:05
 */

'use client';

import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulHighView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import WebglTypeButtons from '#/organism/map/WebglTypeButtons';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * WebGL 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WebglMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				layers: [baseLayer.googleRoadLayer, wfsLayer.wfsCityWebglLayer],
				view: seoulHighView
			}}
		>
			<MapController>
				<WebglTypeButtons />
			</MapController>

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="WebGL" />
			</InteractionTemplate>
		</MapProvider>
	);
}
