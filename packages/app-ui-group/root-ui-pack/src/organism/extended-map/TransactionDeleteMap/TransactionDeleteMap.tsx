/**
 * 트랜잭션 삭제 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.28 수 15:01:38
 */

'use client';

import { useState } from 'react';

import { getTransactionDeleteOptions } from '@gis-dev/openlayers-service-pack/func/options';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import TransactionDeleteButton from '#/organism/map/TransactionDeleteButton';
import TransactionPopup from '#/organism/map/TransactionPopup';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 트랜잭션 삭제 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionDeleteMap(): React.JSX.Element {
	// 인터렉션은 맵마다 새로 만들어야 하고 첫 렌더의 옵션만 쓰이므로 lazy 초기화로 한 번만 만든다
	const [options] = useState(getTransactionDeleteOptions);

	return (
		<MapProvider options={options}>
			<MapController />

			<TransactionPopup />

			<InteractionTemplate>
				<TransactionDeleteButton />
				<GeolocationButton />
				<GuideDialog title="WFS-T Delete" />
			</InteractionTemplate>
		</MapProvider>
	);
}
