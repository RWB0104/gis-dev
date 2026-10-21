/**
 * 지오로케이션 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 18:43:10
 */

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GoogleLayer from '#/atom/GoogleLayer';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 지오로케이션 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GeolocationPage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: seoulView
			}}
		>
			<MapController />
			<GoogleLayer />

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="Geolocation" />
			</InteractionTemplate>
		</MapProvider>
	);
}
