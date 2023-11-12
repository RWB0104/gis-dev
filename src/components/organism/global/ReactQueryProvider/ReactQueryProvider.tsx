/**
 * react-query organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 16:00:09
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, ReactNode } from 'react';

export type ReactQueryProviderProps = PropsWithChildren;

/**
 * react-query organism 컴포넌트 반환 메서드
 *
 * @param {ReactQueryProviderProps} param0: ReactQueryProviderProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ReactQueryProvider({ children }: ReactQueryProviderProps): ReactNode
{
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client} data-component='ReactQueryProvider'>
			{children}

			<ReactQueryDevtools buttonPosition='bottom-left' />
		</QueryClientProvider>
	);
}