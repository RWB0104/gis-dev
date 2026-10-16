/**
 * GeoJSON 스키마 모듈 (RFC 7946)
 *
 * @author RWB
 * @since 2026.10.16 금 18:03:05
 */

import { z } from 'zod';

/** 좌표(Position): [경도, 위도] 또는 [경도, 위도, 고도] */
export const geoJsonPositionSchema = z
	.union([z.tuple([z.number(), z.number()]), z.tuple([z.number(), z.number(), z.number()])])
	.openapi('GeoJsonPosition');

/** Bounding Box: 2D([minX,minY,maxX,maxY]) 또는 3D([minX,minY,minZ,maxX,maxY,maxZ]) */
export const geoJsonBboxSchema = z
	.union([
		z.tuple([z.number(), z.number(), z.number(), z.number()]),
		z.tuple([z.number(), z.number(), z.number(), z.number(), z.number(), z.number()])
	])
	.openapi('GeoJsonBbox');

/** Point */
export const geoJsonPointSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		coordinates: geoJsonPositionSchema,
		type: z.literal('Point')
	})
	.openapi('GeoJsonPoint');

/** MultiPoint */
export const geoJsonMultiPointSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		coordinates: z.array(geoJsonPositionSchema),
		type: z.literal('MultiPoint')
	})
	.openapi('GeoJsonMultiPoint');

/** LineString */
export const geoJsonLineStringSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		coordinates: z.array(geoJsonPositionSchema),
		type: z.literal('LineString')
	})
	.openapi('GeoJsonLineString');

/** MultiLineString */
export const geoJsonMultiLineStringSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		coordinates: z.array(z.array(geoJsonPositionSchema)),
		type: z.literal('MultiLineString')
	})
	.openapi('GeoJsonMultiLineString');

/** Polygon */
export const geoJsonPolygonSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		coordinates: z.array(z.array(geoJsonPositionSchema)),
		type: z.literal('Polygon')
	})
	.openapi('GeoJsonPolygon');

/** MultiPolygon */
export const geoJsonMultiPolygonSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		coordinates: z.array(z.array(z.array(geoJsonPositionSchema))),
		type: z.literal('MultiPolygon')
	})
	.openapi('GeoJsonMultiPolygon');

/** GeometryCollection을 제외한 단일 지오메트리 */
export const geoJsonSimpleGeometrySchema = z
	.discriminatedUnion('type', [
		geoJsonPointSchema,
		geoJsonMultiPointSchema,
		geoJsonLineStringSchema,
		geoJsonMultiLineStringSchema,
		geoJsonPolygonSchema,
		geoJsonMultiPolygonSchema
	])
	.openapi('GeoJsonSimpleGeometry');

/** GeometryCollection */
export const geoJsonGeometryCollectionSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		geometries: z.array(geoJsonSimpleGeometrySchema),
		type: z.literal('GeometryCollection')
	})
	.openapi('GeoJsonGeometryCollection');

/** 모든 지오메트리(단일 + GeometryCollection) */
export const geoJsonGeometrySchema = z
	.discriminatedUnion('type', [
		geoJsonPointSchema,
		geoJsonMultiPointSchema,
		geoJsonLineStringSchema,
		geoJsonMultiLineStringSchema,
		geoJsonPolygonSchema,
		geoJsonMultiPolygonSchema,
		geoJsonGeometryCollectionSchema
	])
	.openapi('GeoJsonGeometry');

/** Feature의 properties (임의의 객체 또는 null) */
export const geoJsonPropertiesSchema = z.record(z.string(), z.unknown()).nullable().openapi('GeoJsonProperties');

/** Feature */
export const geoJsonFeatureSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		geometry: geoJsonGeometrySchema.nullable(),
		id: z.union([z.string(), z.number()]).optional(),
		properties: geoJsonPropertiesSchema,
		type: z.literal('Feature')
	})
	.openapi('GeoJsonFeature');

/** FeatureCollection */
export const geoJsonFeatureCollectionSchema = z
	.object({
		bbox: geoJsonBboxSchema.optional(),
		features: z.array(geoJsonFeatureSchema),
		type: z.literal('FeatureCollection')
	})
	.openapi('GeoJsonFeatureCollection');

/** 최상위 GeoJSON 객체(지오메트리 | Feature | FeatureCollection) */
export const geoJsonSchema = z
	.discriminatedUnion('type', [
		geoJsonPointSchema,
		geoJsonMultiPointSchema,
		geoJsonLineStringSchema,
		geoJsonMultiLineStringSchema,
		geoJsonPolygonSchema,
		geoJsonMultiPolygonSchema,
		geoJsonGeometryCollectionSchema,
		geoJsonFeatureSchema,
		geoJsonFeatureCollectionSchema
	])
	.openapi('GeoJson');
