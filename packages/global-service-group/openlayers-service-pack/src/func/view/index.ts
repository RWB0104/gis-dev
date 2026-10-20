/**
 * 뷰 인덱스 모델
 *
 * @author RWB
 * @since 2026.10.19 월 19:47:02
 */

'use client';

import { View } from 'ol';

import { position } from '#/func/position';

// 서울시 기준 View
export const seoulView = new View({
	center: position.seoul[3857],
	projection: 'EPSG:3857',
	zoom: 17
});

// 서울시 기준 중레벨 View
export const seoulMiddleView = new View({
	center: position.seoul[3857],
	projection: 'EPSG:3857',
	zoom: 10
});

// 서울시 기준 저레벨 View
export const seoulHighView = new View({
	center: position.seoul[3857],
	projection: 'EPSG:3857',
	zoom: 5
});

// 세종시 기준 View
export const sejongView = new View({
	center: position.sejong[3857],
	projection: 'EPSG:3857',
	zoom: 17
});
