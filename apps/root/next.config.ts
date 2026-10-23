import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	experimental: {
		agentUpgrade: 'security'
	},
	partialPrefetching: true,
	reactCompiler: true
};

export default nextConfig;
