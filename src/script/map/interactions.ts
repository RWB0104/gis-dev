/**
 * 상호작용 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 11:27:59
 */

import { transactionLayer } from '@gis-dev/script/map/layers';
import { clickStyle, hoverStyle } from '@gis-dev/script/map/style';
import { click, pointerMove } from 'ol/events/condition';
import Draw from 'ol/interaction/Draw';
import Select from 'ol/interaction/Select';
import Style from 'ol/style/Style';

// WFS 호버 이벤트
function getWfsHoverSelect(name: string): Select
{
	return new Select({
		condition: pointerMove,
		filter: (feature) => feature.getId() !== undefined,
		style: (feature): Style => hoverStyle(feature, name)
	});
}

function getWfsClickSelect(name: string): Select
{
	return new Select({
		condition: click,
		filter: (feature) => feature.getId() !== undefined,
		style: (feature): Style => clickStyle(feature, name)
	});
}

const drawInteraction = new Draw({
	source: transactionLayer.drawLayer.getSource()!!,
	type: 'Polygon'
});

export const selects = {
	getWfsClickSelect,
	getWfsHoverSelect
};

export const draws = { drawInteraction };