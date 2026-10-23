/**
 * 인터렉션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.23 금 15:22:46
 */

import { click, pointerMove } from 'ol/events/condition';
import { Select } from 'ol/interaction';
import type { Style } from 'ol/style';

import { clickStyle, hoverStyle } from '#/func/style';

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
