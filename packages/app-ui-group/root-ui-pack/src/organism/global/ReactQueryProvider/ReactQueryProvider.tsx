'use client';

/**
 * 쿼리 클라이언트 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 11:57:12
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';

const client = new QueryClient();

export interface ReactQueryProviderProps extends PropsWithChildren {
	/**
	 * 기본 클라이언트
	 */
	defaultClient?: QueryClient;
}

/**
 * 쿼리 클라이언트 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {ReactQueryProviderProps} param0 ReactQueryProviderProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function ReactQueryProvider({ defaultClient = client, children }: ReactQueryProviderProps): React.JSX.Element {
	return (
		<QueryClientProvider client={defaultClient}>
			{children}

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
