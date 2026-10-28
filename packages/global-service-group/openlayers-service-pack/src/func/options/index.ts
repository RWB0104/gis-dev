/**
 * 맵 옵션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.28 수 19:20:00
 */

import type { MapOptions } from 'ol/Map';

import { getWfsClickSelect, getWfsEditInteractions, getWfsHoverSelect } from '#/func/interaction';
import { baseLayer, transactionLayer, wfsLayer } from '#/func/layer';
import { seoulView } from '#/func/view';

/**
 * 트랜잭션 수정 맵 옵션 반환 메서드
 *
 * 인터렉션은 호출마다 새로 만들어지므로 맵마다 한 번씩만 호출한다.
 *
 * @returns {MapOptions} MapOptions
 */
export function getTransactionUpdateOptions(): MapOptions {
	return {
		interactions: getWfsEditInteractions('name'),
		layers: [baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer],
		view: seoulView
	};
}

/**
 * 트랜잭션 삭제 맵 옵션 반환 메서드
 *
 * 인터렉션은 호출마다 새로 만들어지므로 맵마다 한 번씩만 호출한다.
 *
 * @returns {MapOptions} MapOptions
 */
export function getTransactionDeleteOptions(): MapOptions {
	return {
		interactions: [getWfsHoverSelect('name'), getWfsClickSelect('name')],
		layers: [baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer, transactionLayer.drawLayer],
		view: seoulView
	};
}
