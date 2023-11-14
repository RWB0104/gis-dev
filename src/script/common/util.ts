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

/**
 * 날짜 변환 메서드
 *
 * @param {string} text: yyyyMMdd 형태의 텍스트
 *
 * @returns {string} yyyy-MM-dd
 */
export function dateConvert(text: string): string
{
	const regex = /^(\d{4})(\d{2})(\d{2})$/;
	const arr = regex.exec(text);

	if (arr)
	{
		return `${arr[1]}-${arr[2]}-${arr[3]}`;
	}

	return text;
}