/**
 * 트랜잭션 수정 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.26 월 21:35:00
 */

'use client';

import type { MapOptions } from 'ol/Map';
import { useState } from 'react';

import {
	getWfsClickSelect,
	getWfsHoverSelect,
	getWfsModify,
	getWfsSnap
} from '@gis-dev/openlayers-service-pack/func/interaction';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import TransactionUpdateButton from '#/organism/map/TransactionUpdateButton';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 수정용 맵 옵션 반환 메서드
 *
 * snap, modify는 선택된 피쳐(clickSelect)만 대상으로 하고, 수정 버튼을 누르기 전까지는 꺼 둔다.
 *
 * @returns {MapOptions} MapOptions
 */
function createOptions(): MapOptions {
	const select = getWfsClickSelect('name');
	const snap = getWfsSnap(select.getFeatures());
	const modify = getWfsModify(select.getFeatures());

	snap.setActive(false);
	modify.setActive(false);

	return {
		interactions: [getWfsHoverSelect('name'), select, snap, modify],
		layers: [baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer],
		view: seoulView
	};
}

/**
 * 트랜잭션 수정 맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionUpdateMap(): React.JSX.Element {
	// 인터렉션은 맵마다 새로 만들어야 하고 첫 렌더의 옵션만 쓰이므로 lazy 초기화로 한 번만 만든다
	const [options] = useState(createOptions);

	return (
		<MapProvider options={options}>
			<MapController />

			<InteractionTemplate>
				<TransactionUpdateButton />
				<GeolocationButton />
				<GuideDialog title="WFS-T Update" />
			</InteractionTemplate>
		</MapProvider>
	);
}
