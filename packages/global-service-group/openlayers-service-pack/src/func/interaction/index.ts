/**
 * 인터렉션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.23 금 15:22:46
 */

import type { Collection, Feature } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import type { Geometry } from 'ol/geom';
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import type VectorSource from 'ol/source/Vector';
import type { Style } from 'ol/style';

import { clickStyle, hoverStyle } from '#/func/style';

import { transactionLayer } from '../layer';
import { wfsSource } from '../source';

/**
 * WFS 호버 상호작용 반환 메서드
 *
 * @param {string} name 라벨 컬럼
 *
 * @returns {Select} Select 객체
 */
export function getWfsHoverSelect(name: string): Select {
	const select = new Select({
		condition: pointerMove,
		filter: (feature) => feature.getId() !== undefined,
		style: (feature): Style => hoverStyle(feature, name)
	});

	select.set('name', 'hoverSelect');

	return select;
}

/**
 * WFS 클릭 상호작용 반환 메서드
 *
 * @param {string} name 라벨 컬럼
 *
 * @returns {Select} Select 객체
 */
export function getWfsClickSelect(name: string): Select {
	const select = new Select({
		condition: click,
		filter: (feature) => feature.getId() !== undefined,
		style: (feature): Style => clickStyle(feature, name)
	});

	select.set('name', 'clickSelect');

	return select;
}

export const drawInteraction = new Draw({
	source: transactionLayer.drawLayer.getSource() ?? undefined,
	type: 'Polygon'
});

/**
 * WFS 스냅 상호작용 반환 메서드
 *
 * @param {Collection} feature: 피쳐 리스트
 *
 * @returns {Snap} Snap 객체
 */
export function getWfsSnap(feature: Collection<Feature<Geometry>>): Snap {
	const snap = new Snap({
		features: feature,
		pixelTolerance: 100,
		source: wfsSource.transactionSource as VectorSource
	});

	snap.set('name', 'snap');

	return snap;
}

/**
 * WFS 수정 상호작용 반환 메서드
 *
 * @param {Collection} feature: 피쳐 리스트
 *
 * @returns {Modify} Modify 객체
 */
export function getWfsModify(feature: Collection<Feature<Geometry>>): Modify {
	const modify = new Modify({
		features: feature,
		source: wfsSource.transactionSource as VectorSource
	});

	modify.set('name', 'modify');

	return modify;
}
