/**
 * API 인덱스 모듈
 *
 * @author RWB
 * @since 2023.11.15 Wed 01:40:34
 */

import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type ApiQueryOptions<T, K> = Omit<UseQueryOptions<T, K>, 'queryFn' | 'queryKey'>;
export type ApiMutationOptions<T, K, J> = Omit<UseMutationOptions<T, K, J>, 'queryFn' | 'queryKey'>