/**
 * WFS 레이어 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 19:47:20
 */

import { Heatmap } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Style } from 'ol/style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import { clusterSource, wfsSource } from '#/func/source';
import { basicStyle, clusterBasicStyle, drawStyle, starbucksBasicStyle } from '#/func/style';

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

// feature 레이어
export const wfsFeatureVectorLayer = new VectorLayer({
	properties: { name: 'feature' },
	source: new VectorSource(),
	style: new Style({
		image: new Circle({
			fill: new Fill({ color: 'dodgerblue' }),
			radius: 7,
			stroke: new Stroke({
				color: 'black',
				width: 2
			})
		})
	}),
	zIndex: 10
});

// 히트맵 WFS 레이어 (Heatmap 생성자가 document를 사용하므로 SSR 시점에 평가되지 않도록 함수로 제공)
export const getWfsHeatmapLayer = (): Heatmap =>
	new Heatmap({
		blur: 20,
		properties: { name: 'wfs' },
		radius: 20,
		source: wfsSource.starbucksSource as VectorSource,
		zIndex: 5
	});
