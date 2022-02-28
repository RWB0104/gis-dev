/**
 * 스타일 모듈
 *
 * @author RWB
 * @since 2022.02.27 Sun 12:22:55
 */

import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

/**
 * 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function basicStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string)
{
	return new Style({
		stroke: new Stroke({
			color: 'rgba(100, 149, 237, 1)',
			width: 2
		}),
		fill: new Fill({
			color: 'rgba(100, 149, 237, 0.6)'
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'white' }),
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
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function hoverStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string)
{
	return new Style({
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 1)',
			width: 2
		}),
		fill: new Fill({
			color: 'rgba(100, 149, 237, 0.6)'
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'white' }),
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
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function clickStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string)
{
	return new Style({
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 1)',
			width: 2
		}),
		fill: new Fill({
			color: 'rgba(100, 149, 237, 1)'
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'yellow' }),
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get(labelColumn)
		})
	});
}

export function poiBasicStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string)
{
	const poiStyle = new Style({
		image: new Circle({
			stroke: new Stroke({
				color: 'rgba(3, 102, 53, 1)',
				width: 2
			}),
			fill: new Fill({
				color: 'rgba(3, 102, 53, 0.6)'
			}),
			radius: 20
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'white' }),
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features').length.toString()
		})
	});

	const featureStyle = new Style({
		image: new Circle({
			stroke: new Stroke({
				color: 'rgba(3, 102, 53, 1)',
				width: 2
			}),
			fill: new Fill({
				color: 'rgba(3, 102, 53, 0.6)'
			}),
			radius: 10
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'white' }),
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features')[0].get(labelColumn),
			offsetY: 25
		})
	});

	return feature.get('features').length > 1 ? poiStyle : featureStyle;
}

export function poiHoverStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string)
{
	return new Style({
		image: new Circle({
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			fill: new Fill({
				color: 'rgba(3, 102, 53, 0.6)'
			}),
			radius: 10
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'white' }),
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features')[0].get(labelColumn),
			offsetY: 25
		})
	});
}

export function poiClickStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string)
{
	return new Style({
		image: new Circle({
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 2
			}),
			fill: new Fill({
				color: 'rgba(3, 102, 53, 1)'
			}),
			radius: 10
		}),
		text: new Text({
			font: '0.8rem sans-serif',
			fill: new Fill({ color: 'yellow' }),
			stroke: new Stroke({
				color: 'rgba(0, 0, 0, 1)',
				width: 4
			}),
			text: feature.get('features')[0].get(labelColumn),
			offsetY: 25
		})
	});
}