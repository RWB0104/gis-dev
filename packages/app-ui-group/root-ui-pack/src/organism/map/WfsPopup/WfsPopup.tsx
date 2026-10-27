/**
 * WFS 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 16:59:11
 */

'use client';

import { describeWfsBuilding, getFeatureCenter } from '@gis-dev/openlayers-service-pack/func/feature';
import { useSelectedFeature } from '@gis-dev/openlayers-service-pack/hooks/selectedFeature';

import FeaturePopup from '#/organism/map/FeaturePopup';

/**
 * WFS 팝업 organism 컴포넌트 반환 메서드
 *
 * 선택된 피쳐(clickSelect)의 건물 정보를 피쳐 중심에 보여준다.
 *
 * @returns {React.JSX.Element | null} JSX
 */
export default function WfsPopup(): React.JSX.Element | null {
	const { clear, feature } = useSelectedFeature();

	return (
		<FeaturePopup
			feature={feature}
			getDescription={describeWfsBuilding}
			onClose={clear}
			position={getFeatureCenter(feature)}
		/>
	);
}
