/**
 * WMS 스키마 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 14:19:06
 */

/** biome-ignore-all lint/style/useNamingConvention: for GeoServer parameter name */

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { geoJsonFeatureCollectionSchema } from './geojson-schema';

const wmsGetMapRequestBaseSchema = z.object({
	bbox: z.string(),
	bgcolor: z.string().nullish(),
	exceptions: z
		.enum([
			'application/vnd.ogc.se_xml',
			'application/vnd.ogc.se_inimage',
			'application/vnd.ogc.se_blank',
			'application/vnd.gs.wms_partial',
			'application/json',
			'text/javascript'
		])
		.nullish(),
	format: z.enum([
		'image/png',
		'image/png8',
		'image/jpeg',
		'image/vnd.jpeg-png',
		'image/vnd.jpeg-png8',
		'image/gif',
		'image/tiff',
		'image/tiff8',
		'image/geotiff',
		'image/geotiff8',
		'image/svg',
		'application/pdf',
		'rss',
		'kml',
		'kmz',
		'text/mapml',
		'text/html;subtype=mapml',
		'application/openlayers',
		'application/json;type=utfgrid'
	]),
	height: z.number(),
	layers: z.string(),
	request: z.enum(['GetMap']),
	service: z.enum(['WMS']),
	sld: z.string().nullish(),
	sld_body: z.string().nullish(),
	styles: z.string(),
	time: z.string().nullish(),
	transparent: z.boolean().nullish(),
	width: z.number()
});

const wmsGetFeatureInfoRequestBaseSchema = z.object({
	bbox: z.string(),
	exceptions: z
		.enum([
			'application/vnd.ogc.se_xml',
			'application/vnd.ogc.se_inimage',
			'application/vnd.ogc.se_blank',
			'application/vnd.gs.wms_partial',
			'application/json',
			'text/javascript'
		])
		.nullish(),
	feature_count: z.number().nullish(),
	height: z.number(),
	info_format: z.string().nullish(),
	layers: z.string(),
	query_layers: z.string(),
	request: z.enum(['GetFeatureInfo']),
	service: z.enum(['WMS']),
	styles: z.string(),
	width: z.number()
});

export const wmsGetMapV1xRequestSchema = wmsGetMapRequestBaseSchema
	.extend({
		srs: z.string(),
		version: z.enum(['1.0.0', '1.1.0', '1.1.1'])
	})
	.openapi('WmsGetMapV1xRequest');

export const wmsGetMapV13RequestSchema = wmsGetMapRequestBaseSchema
	.extend({
		srs: z.string(),
		version: z.enum(['1.3.0'])
	})
	.openapi('WmsGetMapV13Request');

export const wmsGetFeatureInfoV1xRequestSchema = wmsGetFeatureInfoRequestBaseSchema
	.extend({
		srs: z.string(),
		version: z.enum(['1.0.0', '1.1.0', '1.1.1']),
		x: z.number(),
		y: z.number()
	})
	.openapi('wmsGetFeatureInfoV1xRequest');

export const wmsGetFeatureInfoV13RequestSchema = wmsGetFeatureInfoRequestBaseSchema
	.extend({
		crs: z.string(),
		i: z.number(),
		j: z.number(),
		version: z.enum(['1.3.0'])
	})
	.openapi('wmsGetFeatureInfoV13Request');

/**
 * WMS 스키마 등록 메서드
 *
 * @param {OpenAPIRegistry} registry OpenAPIRegistry
 */
export function registWmsSchema(registry: OpenAPIRegistry): void {
	registry.registerPath({
		method: 'get',
		operationId: 'getMapV1x',
		path: '/wms?_v=getMapV1x',
		request: {
			query: wmsGetMapV1xRequestSchema
		},
		responses: {
			200: {
				content: {
					'image/jpeg': { schema: z.string().openapi({ format: 'binary', type: 'string' }) },
					'image/png': { schema: z.string().openapi({ format: 'binary', type: 'string' }) }
				},
				description: '200 OK'
			}
		},
		summary: 'WMS GetMap 1.x.0 API',
		tags: ['wms']
	});

	registry.registerPath({
		method: 'get',
		operationId: 'getMapV13',
		path: '/wms?_v=getMapV13',
		request: {
			query: wmsGetMapV13RequestSchema
		},
		responses: {
			200: {
				content: {
					'image/jpeg': { schema: z.string().openapi({ format: 'binary', type: 'string' }) },
					'image/png': { schema: z.string().openapi({ format: 'binary', type: 'string' }) }
				},
				description: '200 OK'
			}
		},
		summary: 'WMS GetMap 1.3.0 API',
		tags: ['wms']
	});

	registry.registerPath({
		method: 'get',
		operationId: 'getFeatureInfoV1x',
		path: '/wms?_v=getFeatureInfoV1x',
		request: {
			query: wmsGetFeatureInfoV1xRequestSchema
		},
		responses: {
			200: {
				content: {
					'application/json': {
						schema: geoJsonFeatureCollectionSchema
					}
				},
				description: '200 OK'
			}
		},
		summary: 'WMS GetFeatureInfo 1.x.0 API',
		tags: ['wms']
	});

	registry.registerPath({
		method: 'get',
		operationId: 'getFeatureInfoV13',
		path: '/wms?_v=getFeatureInfoV13',
		request: {
			query: wmsGetFeatureInfoV13RequestSchema
		},
		responses: {
			200: {
				content: {
					'application/json': {
						schema: geoJsonFeatureCollectionSchema
					}
				},
				description: '200 OK'
			}
		},
		summary: 'WMS GetFeatureInfo 1.3.0 API',
		tags: ['wms']
	});
}
