/**
 * 공통 타입 모듈
 *
 * @author RWB
 * @since 2026.10.20 Tue 11:19:09
 */

type Func<T, K = void> = (params: T) => K;
type Updater<T> = T | Func<T, T>;

type Theme = 'light' | 'dark';

type PropsWithoutChildren<T> = Omit<T, 'children'>;

type DateSource = string | number | Date;
