/**
 * 뷰 모듈
 *
 * @author RWB
 * @since 2023.11.23 Thu 01:18:32
 */

import { position3857 } from '@gis-dev/script/map/positions';

import { View } from 'ol';

// 서울시 기준 View
const seoulView = new View({
	center: position3857.seoulPosition,
	projection: 'EPSG:3857',
	zoom: 17
});

// 서울시 기준 중레벨 View
const seoulMiddleView = new View({
	center: position3857.seoulPosition,
	projection: 'EPSG:3857',
	zoom: 10
});

// 서울시 기준 저레벨 View
const seoulHighView = new View({
	center: position3857.seoulPosition,
	projection: 'EPSG:3857',
	zoom: 5
});

// 세종시 기준 View
const sejongView = new View({
	center: position3857.sejongPosition,
	projection: 'EPSG:3857',
	zoom: 17
});

export const views = {
	sejongView,
	seoulHighView,
	seoulMiddleView,
	seoulView
};