/**
 * WFS page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 18:06:24
 */

import { sejongView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GoogleLayer from '#/atom/GoogleLayer';
import WfsLayer from '#/atom/WfsLayer';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * WFS page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WfsPage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: sejongView
			}}
		>
			<MapController />
			<GoogleLayer />
			<WfsLayer />

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="WFS" />
			</InteractionTemplate>
		</MapProvider>
	);
}
