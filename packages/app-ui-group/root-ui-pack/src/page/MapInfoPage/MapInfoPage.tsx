/**
 * 맵 정보 page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 18:43:50
 */

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GoogleLayer from '#/atom/GoogleLayer';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';

/**
 * 맵 정보 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
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
