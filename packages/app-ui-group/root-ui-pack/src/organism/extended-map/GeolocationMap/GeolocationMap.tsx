/**
 * 지오로케이션 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 14:47:20
 */

'use client';

import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 지오로케이션 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GeolocationMap(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				layers: [baseLayer.googleRoadLayer],
				view: seoulView
			}}
		>
			<MapController />

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="Geolocation" />
			</InteractionTemplate>
		</MapProvider>
	);
}
