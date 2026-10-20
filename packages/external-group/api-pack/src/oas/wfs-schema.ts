/**
 * WFS 스키마 모듈
 *
 * @author RWB
 * @since 2026.10.16 금 16:20:15
 */

/** biome-ignore-all lint/style/useNamingConvention: for GeoServer parameter name */

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { geoJsonFeatureCollectionSchema } from './geojson-schema';

const wfsGetFeatureRequestBaseSchema = z.object({
	bbox: z.string().nullish(),
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
	filter: z.string().nullish(),
	outputformat: z.enum(['application/json']).nullish(),
	propertyname: z.string().nullish(),
	request: z.enum(['GetFeature']),
	service: z.enum(['WFS']),
	sortby: z.string().nullish(),
	srsname: z.string().nullish()
});

export const wfsGetFeatureV1RequestSchema = wfsGetFeatureRequestBaseSchema
	.extend({
		featureid: z.string().nullish(),
		maxfeatures: z.number().nullish(),
		typename: z.string(),
		version: z.enum(['1.0.0', '1.1.0'])
	})
	.openapi('WfsGetFeatureV1Request');

export const wfsGetFeatureV2RequestSchema = wfsGetFeatureRequestBaseSchema
	.extend({
		count: z.number().nullish(),
		namespaces: z.string().nullish(),
		resourceid: z.string().nullish(),
		startindex: z.number().nullish(),
		typenames: z.string(),
		version: z.enum(['2.0.0'])
	})
	.openapi('WfsGetFeatureV2Request');

/**
 * WFS 스키마 등록 메서드
 *
 * @param {OpenAPIRegistry} registry OpenAPIRegistry
 */
export function registWfsSchema(registry: OpenAPIRegistry): void {
	registry.registerPath({
		method: 'get',
		operationId: 'getFeatureV1',
		path: '/wfs?_v=getFeatureV1',
		request: {
			query: wfsGetFeatureV1RequestSchema
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
		summary: 'WFS 1.x.0 API',
		tags: ['wfs']
	});

	registry.registerPath({
		method: 'get',
		operationId: 'getFeatureV2',
		path: '/wfs?_v=getFeatureV2',
		request: {
			query: wfsGetFeatureV2RequestSchema
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
		summary: 'WFS 2.0.0 API',
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
