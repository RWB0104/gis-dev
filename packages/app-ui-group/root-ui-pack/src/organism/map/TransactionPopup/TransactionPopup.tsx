/**
 * 트랜잭션 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.28 수 14:33:28
 */

import { describeTransactionBuilding, getFeatureCenter } from '@gis-dev/openlayers-service-pack/func/feature';
import { useSelectedFeature } from '@gis-dev/openlayers-service-pack/hooks/selectedFeature';

import FeaturePopup from '#/organism/map/FeaturePopup';

/**
 * 트랜잭션 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionPopup(): React.JSX.Element {
	const { clear, feature } = useSelectedFeature();

	return (
		<FeaturePopup
			feature={feature}
			getDescription={describeTransactionBuilding}
			onClose={clear}
			position={getFeatureCenter(feature)}
		/>
	);
}
