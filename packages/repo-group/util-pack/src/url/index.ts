/**
 * URL 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 13:53:42
 */

/**
 * URL 빌더 메서드
 *
 * @param {string} basePath 기본 경로
 * @param {Record<string, number | string | boolean>} query 쿼리
 *
 * @returns {string} URL
 */
export function urlBuilder(basePath: string, query?: Record<string, number | string | boolean>): string {
	let path = basePath;

	if (query) {
		const sp = new URLSearchParams();

		Object.entries(query).forEach(([k, v]) => {
			sp.append(k, `${v}`);
		});

		path += `?${sp.toString()}`;
	}

	return path;
}
