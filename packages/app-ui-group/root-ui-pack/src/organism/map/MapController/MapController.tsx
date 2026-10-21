/**
 * 맵 컨트롤러 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 15:07:16
 */

import LayerSelect from '#/organism/map/LayerSelect';
import MapInfoPopover from '#/organism/map/MapInfoPopover';

/**
 * 맵 컨트롤러 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapController(): React.JSX.Element {
	return (
		<div className="absolute top-2 right-2 z-10 flex items-center gap-1.5" data-testid="MapController">
			<LayerSelect defaultValue="base-google-road" />
			<MapInfoPopover />
		</div>
	);
}
