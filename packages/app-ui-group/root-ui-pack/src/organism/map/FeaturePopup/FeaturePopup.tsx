/**
 * 피쳐 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.27 화 09:10:00
 */

'use client';

import type { Coordinate } from 'ol/coordinate';
import type { FeatureLike } from 'ol/Feature';
import { createPortal } from 'react-dom';

import type { FeatureDescription } from '@gis-dev/openlayers-service-pack/func/feature';
import { useMapOverlay } from '@gis-dev/openlayers-service-pack/hooks/overlay';

import FeatureInfoCard from '#/molecule/FeatureInfoCard';

export interface FeaturePopupProps {
	/**
	 * 표시할 피쳐, 없으면 숨긴다
	 */
	feature?: FeatureLike;

	/**
	 * 피쳐를 카드 표시 내용으로 변환하는 메서드
	 */
	getDescription: Func<FeatureLike, FeatureDescription>;

	/**
	 * 닫기 이벤트 메서드
	 */
	onClose?: Func<void>;

	/**
	 * 표시 위치(맵 투영 기준)
	 */
	position?: Coordinate;
}

/**
 * 피쳐 팝업 organism 컴포넌트 반환 메서드
 *
 * 맵 오버레이에 피쳐 정보 카드를 보여준다. 피쳐를 어떻게 얻고(선택, 조회 등) 어떤 내용을 보여줄지는
 * 호출하는 쪽이 정하고, 이 컴포넌트는 오버레이 생성, 위치 지정, 렌더링만 맡는다.
 *
 * @param {FeaturePopupProps} param0 FeaturePopupProps
 *
 * @returns {React.JSX.Element | null} JSX
 */
export default function FeaturePopup({
	getDescription,
	feature,
	onClose,
	position
}: FeaturePopupProps): React.JSX.Element | null {
	const element = useMapOverlay(feature === undefined ? undefined : position);

	if (feature === undefined || element === undefined) {
		return null;
	}

	return createPortal(<FeatureInfoCard {...getDescription(feature)} onClose={onClose} />, element);
}
