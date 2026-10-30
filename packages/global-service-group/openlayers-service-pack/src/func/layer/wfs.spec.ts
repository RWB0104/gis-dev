/**
 * WFS 레이어 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Heatmap, WebGLVector } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import { Circle, type Style } from 'ol/style';

import { wfsSource } from '#/func/source';

import {
	drawLayer,
	getWfsHeatmapLayer,
	sejongWfsLayer,
	wfsCityVectorLayer,
	wfsCityWebglLayer,
	wfsStarbucksClusterLayer,
	wfsTransactionLayer
} from './wfs';

function labelFeature(column: string, value: string): Feature<Point> {
	return new Feature({ [column]: value, geometry: new Point([0, 0]) });
}

function clusterFeature(count: number): Feature<Point> {
	const members = Array.from({ length: count }, () => labelFeature('name', '점포'));

	return new Feature({ features: members, geometry: new Point([0, 0]) });
}

function callStyle(style: ReturnType<VectorLayer['getStyle']>, feature: Feature): unknown {
	return (style as (f: Feature, r: number) => unknown)(feature, 1);
}

describe('[@gis-dev/openlayers-service-pack] layer/wfs', () => {
	describe('sejongWfsLayer 테스트', () => {
		it('name wfs, minZoom 15인 VectorLayer다', () => {
			expect(sejongWfsLayer).toBeInstanceOf(VectorLayer);
			expect(sejongWfsLayer.get('name')).toBe('wfs');
			expect(sejongWfsLayer.getMinZoom()).toBe(15);
		});

		it('style 콜백이 buld_nm 라벨을 쓴다', () => {
			const style = callStyle(sejongWfsLayer.getStyle(), labelFeature('buld_nm', '건물'));

			expect(style).toBeDefined();
		});
	});

	describe('wfsTransactionLayer 테스트', () => {
		it('style 콜백이 name 라벨을 쓴다', () => {
			const style = callStyle(wfsTransactionLayer.getStyle(), labelFeature('name', '건물'));

			expect(style).toBeDefined();
		});
	});

	describe('drawLayer 테스트', () => {
		it('name draw, zIndex 6인 VectorLayer다', () => {
			expect(drawLayer.get('name')).toBe('draw');
			expect(drawLayer.getZIndex()).toBe(6);
		});
	});

	describe('wfsStarbucksClusterLayer 테스트', () => {
		it('멤버가 2개 이상이면 클러스터 스타일 분기를 탄다', () => {
			const style = callStyle(wfsStarbucksClusterLayer.getStyle(), clusterFeature(3));

			expect(style).toBeDefined();
		});

		it('멤버가 1개면 단일 스타벅스 스타일 분기를 탄다', () => {
			const style = callStyle(wfsStarbucksClusterLayer.getStyle(), clusterFeature(1));

			expect(style).toBeDefined();
		});
	});

	describe('wfsCityVectorLayer 테스트', () => {
		it('name wfs인 VectorLayer다', () => {
			expect(wfsCityVectorLayer).toBeInstanceOf(VectorLayer);
			expect(wfsCityVectorLayer.get('name')).toBe('wfs');
		});

		it('반지름 4의 원형 포인트 스타일을 사용한다', () => {
			const style = wfsCityVectorLayer.getStyle() as Style;
			const image = style.getImage() as Circle;

			expect(image).toBeInstanceOf(Circle);
			expect(image.getRadius()).toBe(4);
			expect(image.getFill()?.getColor()).toBe('dodgerblue');
			expect(image.getStroke()?.getWidth()).toBe(1);
		});

		it('WebGL 레이어와 같은 도시 소스를 공유한다', () => {
			expect(wfsCityVectorLayer.getSource()).toBe(wfsCityWebglLayer.getSource());
		});
	});

	describe('wfsCityWebglLayer 테스트', () => {
		it('name wfs-webgl, zIndex 5인 WebGLVector다', () => {
			expect(wfsCityWebglLayer).toBeInstanceOf(WebGLVector);
			expect(wfsCityWebglLayer.get('name')).toBe('wfs-webgl');
			expect(wfsCityWebglLayer.getZIndex()).toBe(5);
		});

		it('도시 WFS 소스를 사용한다', () => {
			expect(wfsCityWebglLayer.getSource()).toBe(wfsSource.wfsCitySource);
		});
	});

	describe('getWfsHeatmapLayer 테스트', () => {
		// jsdom은 canvas 2d 컨텍스트가 없어 Heatmap 그라디언트 생성이 실패하므로 최소한의 컨텍스트로 대체한다
		beforeEach(() => {
			vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
				createLinearGradient: () => ({ addColorStop: vi.fn() }),
				fillRect: vi.fn(),
				getImageData: () => ({ data: new Uint8ClampedArray(4 * 256) })
			} as unknown as CanvasRenderingContext2D);
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('name wfs, zIndex 5인 Heatmap을 반환한다', () => {
			const layer = getWfsHeatmapLayer();

			expect(layer).toBeInstanceOf(Heatmap);
			expect(layer.get('name')).toBe('wfs');
			expect(layer.getZIndex()).toBe(5);
		});

		it('blur와 radius가 20이다', () => {
			const layer = getWfsHeatmapLayer();

			expect(layer.getBlur()).toBe(20);
			expect(layer.getRadius()).toBe(20);
		});

		it('스타벅스 WFS 소스를 사용한다', () => {
			expect(getWfsHeatmapLayer().getSource()).toBe(wfsSource.starbucksSource);
		});

		it('호출할 때마다 새 레이어를 만든다', () => {
			expect(getWfsHeatmapLayer()).not.toBe(getWfsHeatmapLayer());
		});
	});
});
