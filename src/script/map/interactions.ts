/**
 * 상호작용 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 11:27:59
 */

import { clickStyle, hoverStyle } from '@gis-dev/script/map/style';
import { click, pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import Style from 'ol/style/Style';

// WFS 호버 이벤트
const wfsHoverSelect = new Select({
	condition: pointerMove,
	style: (feature): Style => hoverStyle(feature, 'buld_nm')
});

// WFS 클릭 이벤트
const wfsClickSelect = new Select({
	condition: click,
	style: (feature): Style => clickStyle(feature, 'buld_nm')
});

export const selects = {
	wfsClickSelect,
	wfsHoverSelect
};