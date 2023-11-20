/**
 * 스타일 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 01:33:01
 */

import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import { LiteralStyle } from 'ol/style/literal';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

export type StyleFeatureType = RenderFeature | Feature<Geometry>;

const STARBUCKS_IMAGE = 'https://user-images.githubusercontent.com/50317129/284072787-6b393620-7a1b-4ccb-a92b-191da7f10532.png';

/**
 * 기본 스타일 반환 메서드
 *
 * @param {StyleFeatureType} feature: StyleFeatureType
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function basicStyle(feature: StyleFeatureType, labelColumn: string): Style
{
	return new Style({
		fill: new Fill({ color: 'rgba(100, 149, 237, 0.6)' }),
		stroke: new Stroke({
			color: 'rgba(100, 149, 237, 1)',
			width: 2
		}),
		text: new Text({
			fill: new Fill({ color: 'white' }),
			font: '0.8rem sans-serif',
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get(labelColumn)
		})
	});
}

/**
 * 호버 스타일 반환 메서드
 *
 * @param {StyleFeatureType} feature: StyleFeatureType
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function hoverStyle(feature: StyleFeatureType, labelColumn: string): Style
{
	return new Style({
		fill: new Fill({ color: 'rgba(100, 149, 237, 0.6)' }),
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 1)',
			width: 2
		}),
		text: new Text({
			fill: new Fill({ color: 'white' }),
			font: '0.8rem sans-serif',
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get(labelColumn)
		})
	});
}

/**
 * 클릭 스타일 반환 메서드
 *
 * @param {StyleFeatureType} feature: StyleFeatureType
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function clickStyle(feature: StyleFeatureType, labelColumn: string): Style
{
	return new Style({
		fill: new Fill({ color: 'rgba(100, 149, 237, 1)' }),
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 1)',
			width: 2
		}),
		text: new Text({
			fill: new Fill({ color: 'yellow' }),
			font: '0.8rem sans-serif',
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get(labelColumn)
		})
	});
}

export const drawStyle = new Style({
	fill: new Fill({ color: 'rgba(250, 112, 112, 0.6)' }),
	stroke: new Stroke({
		color: 'rgba(250, 112, 112, 1)',
		width: 2
	})
});

/**
 * 클러스터 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function clusterBasicStyle(feature: RenderFeature | Feature<Geometry>): Style
{
	return new Style({
		image: new Circle({
			fill: new Fill({ color: 'rgba(3, 102, 53, 0.6)' }),
			radius: 20,
			stroke: new Stroke({
				color: 'rgba(3, 102, 53, 1)',
				width: 2
			})
		}),
		text: new Text({
			fill: new Fill({ color: 'white' }),
			font: '0.8rem sans-serif',
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features').length.toString()
		})
	});
}

/**
 * 스타벅스 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function starbucksBasicStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string): Style
{
	return new Style({
		image: new Icon({
			scale: 0.35,
			src: STARBUCKS_IMAGE
		}),
		text: new Text({
			fill: new Fill({ color: 'white' }),
			font: '0.8rem sans-serif',
			offsetY: 30,
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features')[0].get(labelColumn)
		})
	});
}

/**
 * 스타벅스 호버 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function starbucksHoverStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string): Style
{
	return new Style({
		image: new Icon({
			scale: 0.5,
			src: STARBUCKS_IMAGE
		}),
		text: new Text({
			fill: new Fill({ color: 'white' }),
			font: '0.8rem sans-serif',
			offsetY: 35,
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features')[0].get(labelColumn)
		})
	});
}

/**
 * 스타벅스 클릭 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function starbucksClickStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string): Style
{
	return new Style({
		image: new Icon({
			scale: 0.5,
			src: STARBUCKS_IMAGE
		}),
		text: new Text({
			fill: new Fill({ color: 'yellow' }),
			font: '0.8rem sans-serif',
			offsetY: 35,
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features')[0].get(labelColumn)
		})
	});
}

/**
 * WebGL 스타일 반환 메서드
 *
 * @returns {LiteralStyle} 스타일
 */
export function getWebGLStyle(): LiteralStyle
{
	return {
		'circle-displacement': [
			0,
			0
		],
		'circle-fill-color': [
			'match',
			[
				'get',
				'hover'
			],
			1,
			'#ff3f3f',
			'#006688'
		],
		'circle-opacity': [
			'interpolate',
			[
				'linear'
			],
			[
				'get',
				'population'
			],
			40000,
			0.6,
			2000000,
			0.92
		],
		'circle-radius': [
			'interpolate',
			[
				'linear'
			],
			[
				'get',
				'population'
			],
			40000,
			4,
			2000000,
			14
		],
		'circle-rotate-with-view': false
	};
}