/**
 * GeoJSON 스키마 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:47:14
 */

import './setup';

import {
	geoJsonFeatureCollectionSchema,
	geoJsonFeatureSchema,
	geoJsonGeometryCollectionSchema,
	geoJsonGeometrySchema,
	geoJsonPointSchema,
	geoJsonPolygonSchema,
	geoJsonPositionSchema,
	geoJsonSchema
} from './geojson-schema';

describe('[@gis-dev/api-pack] geojson-schema', () => {
	describe('geoJsonPositionSchema 테스트', () => {
		it('2D 좌표를 허용한다', () => {
			expect(geoJsonPositionSchema.safeParse([127, 37]).success).toBe(true);
		});

		it('3D 좌표를 허용한다', () => {
			expect(geoJsonPositionSchema.safeParse([127, 37, 10]).success).toBe(true);
		});

		it('좌표가 1개면 거부한다', () => {
			expect(geoJsonPositionSchema.safeParse([127]).success).toBe(false);
		});
	});

	describe('geoJsonPointSchema 테스트', () => {
		it('type이 Point이고 coordinates가 Position이면 통과한다', () => {
			expect(geoJsonPointSchema.safeParse({ coordinates: [127, 37], type: 'Point' }).success).toBe(true);
		});

		it('type이 다르면 거부한다', () => {
			expect(geoJsonPointSchema.safeParse({ coordinates: [127, 37], type: 'LineString' }).success).toBe(false);
		});
	});

	describe('geoJsonPolygonSchema 테스트', () => {
		it('coordinates가 Position 배열의 배열이면 통과한다', () => {
			const polygon = {
				coordinates: [
					[
						[0, 0],
						[1, 0],
						[1, 1],
						[0, 0]
					]
				],
				type: 'Polygon'
			};

			expect(geoJsonPolygonSchema.safeParse(polygon).success).toBe(true);
		});
	});

	describe('geoJsonGeometryCollectionSchema 테스트', () => {
		it('geometries 배열을 가진 GeometryCollection을 통과시킨다', () => {
			const gc = {
				geometries: [{ coordinates: [127, 37], type: 'Point' }],
				type: 'GeometryCollection'
			};

			expect(geoJsonGeometryCollectionSchema.safeParse(gc).success).toBe(true);
		});
	});

	describe('geoJsonGeometrySchema 테스트', () => {
		it('단일 지오메트리를 통과시킨다', () => {
			expect(geoJsonGeometrySchema.safeParse({ coordinates: [127, 37], type: 'Point' }).success).toBe(true);
		});

		it('GeometryCollection을 통과시킨다', () => {
			const gc = { geometries: [], type: 'GeometryCollection' };

			expect(geoJsonGeometrySchema.safeParse(gc).success).toBe(true);
		});
	});

	describe('geoJsonFeatureSchema 테스트', () => {
		it('geometry와 properties를 가진 Feature를 통과시킨다', () => {
			const feature = {
				geometry: { coordinates: [127, 37], type: 'Point' },
				properties: { name: 'a' },
				type: 'Feature'
			};

			expect(geoJsonFeatureSchema.safeParse(feature).success).toBe(true);
		});

		it('geometry가 null이어도 통과시킨다', () => {
			const feature = { geometry: null, properties: null, type: 'Feature' };

			expect(geoJsonFeatureSchema.safeParse(feature).success).toBe(true);
		});
	});

	describe('geoJsonFeatureCollectionSchema 테스트', () => {
		it('features 배열을 가진 FeatureCollection을 통과시킨다', () => {
			const fc = {
				features: [
					{
						geometry: { coordinates: [127, 37], type: 'Point' },
						properties: null,
						type: 'Feature'
					}
				],
				type: 'FeatureCollection'
			};

			expect(geoJsonFeatureCollectionSchema.safeParse(fc).success).toBe(true);
		});

		it('type이 FeatureCollection이 아니면 거부한다', () => {
			expect(geoJsonFeatureCollectionSchema.safeParse({ features: [], type: 'Feature' }).success).toBe(false);
		});
	});

	describe('geoJsonSchema 테스트', () => {
		it('최상위에서 Feature를 통과시킨다', () => {
			const feature = {
				geometry: { coordinates: [127, 37], type: 'Point' },
				properties: null,
				type: 'Feature'
			};

			expect(geoJsonSchema.safeParse(feature).success).toBe(true);
		});

		it('최상위에서 지오메트리를 통과시킨다', () => {
			expect(geoJsonSchema.safeParse({ coordinates: [127, 37], type: 'Point' }).success).toBe(true);
		});

		it('알 수 없는 type은 거부한다', () => {
			expect(geoJsonSchema.safeParse({ type: 'Unknown' }).success).toBe(false);
		});
	});
});
