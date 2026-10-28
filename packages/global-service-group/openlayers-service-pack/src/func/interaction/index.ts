/**
 * 인터렉션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.23 금 15:22:46
 */

import type { Collection, Feature, Map as OlMap } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import type { Geometry } from 'ol/geom';
import { Draw, type Interaction, Modify, Select, Snap } from 'ol/interaction';
import type VectorSource from 'ol/source/Vector';
import type { Style } from 'ol/style';

import { clickStyle, hoverStyle } from '#/func/style';

import { transactionLayer } from '../layer';
import { wfsSource } from '../source';

const EDIT_INTERACTION_NAMES = ['modify', 'snap'];

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

/**
 * 편집용 인터렉션(snap, modify)의 활성 상태를 바꾸는 메서드
 *
 * @param {OlMap | undefined} map 맵
 * @param {boolean} active 활성 여부
 */
export function setEditInteractionsActive(map: OlMap | undefined, active: boolean): void {
	map?.getInteractions().forEach((interaction: Interaction) => {
		if (EDIT_INTERACTION_NAMES.includes(interaction.get('name'))) {
			interaction.setActive(active);
		}
	});
}

/**
 * WFS 편집용 인터렉션 목록 반환 메서드
 *
 * snap, modify는 선택된 피쳐(clickSelect)만 대상으로 하고, 편집을 시작하기 전까지는 꺼 둔다.
 *
 * @param {string} name 라벨 컬럼
 * @returns {Interaction[]} 인터렉션 목록
 */
export function getWfsEditInteractions(name: string): Interaction[] {
	const select = getWfsClickSelect(name);
	const snap = getWfsSnap(select.getFeatures());
	const modify = getWfsModify(select.getFeatures());

	snap.setActive(false);
	modify.setActive(false);

	return [getWfsHoverSelect(name), select, snap, modify];
}
