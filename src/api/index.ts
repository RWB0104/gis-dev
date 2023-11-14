/**
 * API 인덱스 모듈
 *
 * @author RWB
 * @since 2023.11.15 Wed 01:40:34
 */

import { UseQueryOptions } from '@tanstack/react-query';

export type ApiOptions<T, K> = Omit<UseQueryOptions<T, K>, 'queryFn' | 'queryKey'>;