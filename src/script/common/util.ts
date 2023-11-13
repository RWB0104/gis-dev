/**
 * 유틸 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 01:25:49
 */

export interface QueryProps
{
	/**
	 * 데이터
	 */
	[key: string]: string | number | boolean | undefined;
}

/**
 * URL 반환 메서드
 *
 * @param {string} host: 호스트
 * @param {string} query: QueryProps 객체
 *
 * @returns {string} URL
 */
export function urlBuilder(host: string, query: QueryProps): string
{
	const param = Object.entries(query)
		.map(([ key, value ]) => (value ? `${key}=${encodeURIComponent(value)}` : ''))
		.join('&');

	return `${host}?${param}`;
}