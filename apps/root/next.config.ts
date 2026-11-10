/**
 * Nextjs 설정 모듈
 *
 * @author RWB
 * @since 2026.10.29 목 11:25:04
 */

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('../../packages/global-service-group/i18n-service-pack/src/func/request/index.ts');

const nextConfig: NextConfig = {
	basePath: '/gis-dev',
	/* config options here */
	cacheComponents: true,
	experimental: {
		agentUpgrade: 'security'
	},
	images: {
		remotePatterns: [
			{
				hostname: 'www.starbucks.co.kr',
				pathname: '/upload/**',
				port: '',
				protocol: 'https'
			}
		]
	},
	partialPrefetching: true,
	reactCompiler: true
};

export default withNextIntl(nextConfig);
