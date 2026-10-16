/**
 * OAS 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.16 Fri 16:14:28
 */

import './setup';

import { writeFileSync } from 'node:fs';

import { OpenAPIRegistry, OpenApiGeneratorV32 } from '@asteasolutions/zod-to-openapi';
import { stringify } from 'yaml';

import { registWfsSchema } from './wfs-schema';

function generateDocs(): void {
	const registry = new OpenAPIRegistry();

	registWfsSchema(registry);

	const docs = new OpenApiGeneratorV32(registry.definitions).generateDocument({
		info: {
			title: 'GIS DEV',
			version: 'latest'
		},
		openapi: '3.1.0',
		servers: [{ url: 'https://api.itcode.dev/gis-dev' }]
	});

	writeFileSync('./oas.yaml', stringify(docs));
}

generateDocs();
