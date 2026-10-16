/**
 * WFS 스키마 모듈
 *
 * @author RWB
 * @since 2026.10.16 Fri 16:20:15
 */

/** biome-ignore-all lint/style/useNamingConvention: for GeoServer parameter name */

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { geoJsonFeatureCollectionSchema } from './geojson-schema';

export const wfsRequestSchema = z
	.object({
		bbox: z.string().nullish(),
		count: z.number().nullish(),
		cql_filter: z.string().nullish(),
		featureID: z.string().nullish(),
		filter: z.string().nullish(),
		format_options: z.string().nullish(),
		maxFeatures: z.number().nullish(),
		outputFormat: z.enum(['application/json']).nullish(),
		propertyName: z.string().nullish(),
		request: z.enum(['GetCapabilities', 'DescribeFeatureType', 'GetFeature']),
		service: z.enum(['WFS']),
		sortBy: z.string().nullish(),
		srsName: z.string().nullish(),
		startIndex: z.number().nullish(),
		typeName: z.string(),
		typeNames: z.string(),
		version: z.enum(['1.0.0', '1.1.0', '2.0.0']),
		viewparams: z.number().nullish()
	})
	.openapi('WfsRequest');

export function registWfsSchema(registry: OpenAPIRegistry): void {
	registry.registerPath({
		method: 'get',
		operationId: 'wfs',
		path: '/wfs',
		request: {
			query: wfsRequestSchema
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
		summary: 'WFS API',
		tags: ['wfs']
	});

	registry.registerPath({
		method: 'post',
		operationId: 'wfsTransaction',
		path: '/wfs',
		request: {
			body: {
				content: {
					'application/xml': {
						schema: z.string().openapi('WfsTransactionRequest')
					}
				},
				description: 'WFS-T Transaction XML 본문'
			}
		},
		responses: {
			200: {
				content: {
					'application/xml': {
						schema: z.string().openapi('WfsTransactionResponse')
					}
				},
				description: '200 OK'
			}
		},
		summary: 'WFS-T Transaction API',
		tags: ['wfs']
	});
}
