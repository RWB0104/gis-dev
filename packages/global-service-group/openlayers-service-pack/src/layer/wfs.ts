/**
 * WFS 레이어 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 19:47:20
 */

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import type { Style } from 'ol/style';

import { clusterSource, wfsSource } from '#/source/index';
import { basicStyle, clusterBasicStyle, drawStyle, starbucksBasicStyle } from '#/style/index';

// 세종시 건물 WFS 레이어
export const sejongWfsLayer = new VectorLayer({
	minZoom: 15,
	properties: { name: 'wfs' },
	source: wfsSource.sejongBuildingSource,
	style: (feature): Style => basicStyle(feature, 'buld_nm'),
	zIndex: 5
});

// 트랜잭션 WFS 레이어
export const wfsTransactionLayer = new VectorLayer({
	minZoom: 15,
	properties: { name: 'wfs' },
	source: wfsSource.transactionSource,
	style: (feature): Style => basicStyle(feature, 'name'),
	zIndex: 5
});

// 드로우 레이어
export const drawLayer = new VectorLayer({
	properties: { name: 'draw' },
	source: new VectorSource(),
	style: drawStyle,
	zIndex: 6
});

// 스타벅스 WFS 레이어
export const wfsStarbucksClusterLayer = new VectorLayer({
	properties: { name: 'wfs' },
	source: clusterSource.starbucksClusterSource,
	style: (feature): Style =>
		feature.get('features').length > 1 ? clusterBasicStyle(feature) : starbucksBasicStyle(feature, 'name'),
	zIndex: 5
});

// 도시 벡터 WFS 레이어
export const wfsCityVectorLayer = new VectorLayer({
	properties: { name: 'wfs' },
	source: wfsSource.wfsCitySource,
	zIndex: 5
});
