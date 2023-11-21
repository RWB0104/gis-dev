/**
 * 상호작용 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 11:27:59
 */

import { transactionLayer } from '@gis-dev/script/map/layers';
import { wfsSource } from '@gis-dev/script/map/source';
import { clickStyle, hoverStyle, starbucksClickStyle, starbucksHoverStyle } from '@gis-dev/script/map/style';
import { Collection } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import Snap from 'ol/interaction/Snap';
import Style from 'ol/style/Style';

/**
 * WFS 호버 상호작용 반환 메서드
 *
 * @param {string} name: 라벨 컬럼
 *
 * @returns {Select} Select 객체
 */
function getWfsHoverSelect(name: string): Select
{
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
 * @param {string} name: 라벨 컬럼
 *
 * @returns {Select} Select 객체
 */
function getWfsClickSelect(name: string): Select
{
	const select = new Select({
		condition: click,
		filter: (feature) => feature.getId() !== undefined,
		style: (feature): Style => clickStyle(feature, name)
	});

	select.set('name', 'clickSelect');

	return select;
}

const drawInteraction = new Draw({
	source: transactionLayer.drawLayer.getSource()!!,
	type: 'Polygon'
});

/**
 * WFS 스냅 상호작용 반환 메서드
 *
 * @param {Collection} feature: 피쳐 리스트
 *
 * @returns {Snap} Snap 객체
 */
function getWfsSnap(feature: Collection<Feature<Geometry>>): Snap
{
	const snap = new Snap({
		features: feature,
		source: wfsSource.transactionSource
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
function getWfsModify(feature: Collection<Feature<Geometry>>): Modify
{
	const modify = new Modify({
		features: feature,
		source: wfsSource.transactionSource
	});

	modify.set('name', 'modify');

	return modify;
}

/**
 * 클러스터 클릭 상호작용 반환 메서드
 *
 * @param {string} name: 라벨 컬럼
 *
 * @returns {Select} Select 객체
 */
function getClusterClickSelect(name: string): Select
{
	return new Select({
		condition: click,
		filter: (feature) => feature.get('features').length === 1,
		style: (feature) => starbucksClickStyle(feature, name)
	});
}

/**
 * 클러스터 호버 상호작용 반환 메서드
 *
 * @param {string} name: 라벨 컬럼
 *
 * @returns {Select} Select 객체
 */
function getClusterHoverSelect(name: string): Select
{
	return new Select({
		condition: pointerMove,
		filter: (feature) => feature.get('features').length === 1,
		style: (feature) => starbucksHoverStyle(feature, name)
	});
}

export const selects = {
	getClusterClickSelect,
	getClusterHoverSelect,
	getWfsClickSelect,
	getWfsHoverSelect
};
export const draws = { drawInteraction };
export const snaps = { getWfsSnap };
export const modifys = { getWfsModify };