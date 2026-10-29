/**
 * 클러스터 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 10:43:55
 */

import { describeClusterPoint, getFeatureCenter } from '@gis-dev/openlayers-service-pack/func/feature';
import { useSelectedFeature } from '@gis-dev/openlayers-service-pack/hooks/selectedFeature';

import FeaturePopup from '#/organism/map/FeaturePopup';

/**
 * 클러스터 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function ClusterPopup(): React.JSX.Element {
	const { clear, feature } = useSelectedFeature();

	return (
		<FeaturePopup
			feature={feature}
			getDescription={describeClusterPoint}
			onClose={clear}
			position={getFeatureCenter(feature)}
		/>
	);
}
