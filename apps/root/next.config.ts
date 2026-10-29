/**
 * Nextjs 설정 모듈
 *
 * @author RWB
 * @since 2026.10.29 목 11:25:04
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

export default nextConfig;
