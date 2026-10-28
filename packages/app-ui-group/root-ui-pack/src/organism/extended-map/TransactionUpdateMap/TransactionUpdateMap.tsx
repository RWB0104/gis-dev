/**
 * 트랜잭션 수정 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.26 월 21:35:00
 */

'use client';

import { useState } from 'react';

import { getTransactionUpdateOptions } from '@gis-dev/openlayers-service-pack/func/options';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import TransactionPopup from '#/organism/map/TransactionPopup';
import TransactionUpdateButton from '#/organism/map/TransactionUpdateButton';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 트랜잭션 수정 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionUpdateMap(): React.JSX.Element {
	// 인터렉션은 맵마다 새로 만들어야 하고 첫 렌더의 옵션만 쓰이므로 lazy 초기화로 한 번만 만든다
	const [options] = useState(getTransactionUpdateOptions);

	return (
		<MapProvider options={options}>
			<MapController />

			<TransactionPopup />

			<InteractionTemplate>
				<TransactionUpdateButton />
				<GeolocationButton />
				<GuideDialog title="WFS-T Update" />
			</InteractionTemplate>
		</MapProvider>
	);
}
