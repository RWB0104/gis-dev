/**
 * 스타일 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { Feature } from 'ol';
import Point from 'ol/geom/Point';

import {
	basicStyle,
	clickStyle,
	clusterBasicStyle,
	drawStyle,
	getWebglStyle,
	hoverStyle,
	starbucksBasicStyle,
	starbucksClickStyle,
	starbucksHoverStyle
} from '.';

function labelFeature(column: string, value: string): Feature<Point> {
	return new Feature({ [column]: value, geometry: new Point([0, 0]) });
}

function clusterFeature(count: number, label = '스타벅스'): Feature<Point> {
	const members = Array.from({ length: count }, () => labelFeature('name', label));

	return new Feature({ features: members, geometry: new Point([0, 0]) });
}

describe('[@gis-dev/openlayers-service-pack] style', () => {
	describe('basicStyle 테스트', () => {
		it('라벨 컬럼 값을 텍스트로 설정한다', () => {
			const style = basicStyle(labelFeature('buld_nm', '건물'), 'buld_nm');

			expect(style.getText()?.getText()).toBe('건물');
			expect(style.getFill()).not.toBeNull();
			expect(style.getStroke()).not.toBeNull();
		});
	});

	describe('hoverStyle 테스트', () => {
		it('라벨 컬럼 값을 텍스트로 설정한다', () => {
			expect(hoverStyle(labelFeature('buld_nm', '건물'), 'buld_nm').getText()?.getText()).toBe('건물');
		});
	});

	describe('clickStyle 테스트', () => {
		it('라벨 컬럼 값을 텍스트로 설정한다', () => {
			expect(clickStyle(labelFeature('buld_nm', '건물'), 'buld_nm').getText()?.getText()).toBe('건물');
		});
	});

	describe('drawStyle 테스트', () => {
		it('fill과 stroke를 가진 Style 인스턴스다', () => {
			expect(drawStyle.getFill()).not.toBeNull();
			expect(drawStyle.getStroke()).not.toBeNull();
		});
	});

	describe('clusterBasicStyle 테스트', () => {
		it('클러스터 피처 개수를 텍스트로 설정한다', () => {
			const style = clusterBasicStyle(clusterFeature(3));

			expect(style.getText()?.getText()).toBe('3');
			expect(style.getImage()).not.toBeNull();
		});
	});

	describe('starbucksBasicStyle 테스트', () => {
		it('첫 멤버의 라벨 값을 텍스트로 설정한다', () => {
			const style = starbucksBasicStyle(clusterFeature(1, '강남점'), 'name');

			expect(style.getText()?.getText()).toBe('강남점');
			expect(style.getImage()).not.toBeNull();
		});
	});

	describe('starbucksHoverStyle 테스트', () => {
		it('첫 멤버의 라벨 값을 텍스트로 설정한다', () => {
			expect(starbucksHoverStyle(clusterFeature(1, '강남점'), 'name').getText()?.getText()).toBe('강남점');
		});
	});

	describe('starbucksClickStyle 테스트', () => {
		it('첫 멤버의 라벨 값을 텍스트로 설정한다', () => {
			expect(starbucksClickStyle(clusterFeature(1, '강남점'), 'name').getText()?.getText()).toBe('강남점');
		});
	});

	describe('getWebglStyle 테스트', () => {
		it('WebGL flat 스타일 객체를 반환한다', () => {
			const style = getWebglStyle();

			expect(style).toHaveProperty('circle-radius');
			expect(style).toHaveProperty('circle-fill-color');
		});

		it('hover 속성이 1이면 빨강, 아니면 기본 파랑으로 채운다', () => {
			expect((getWebglStyle() as Record<string, unknown>)['circle-fill-color']).toEqual([
				'match',
				['get', 'hover'],
				1,
				'#ff3f3f',
				'#006688'
			]);
		});

		it('인구수에 비례해 반지름 4~14, 투명도 0.6~0.92로 보간한다', () => {
			const style = getWebglStyle() as Record<string, unknown>;

			expect(style['circle-radius']).toEqual(['interpolate', ['linear'], ['get', 'population'], 40000, 4, 2000000, 14]);
			expect(style['circle-opacity']).toEqual([
				'interpolate',
				['linear'],
				['get', 'population'],
				40000,
				0.6,
				2000000,
				0.92
			]);
		});

		it('호출마다 새 객체를 반환한다', () => {
			expect(getWebglStyle()).not.toBe(getWebglStyle());
		});
	});
});
