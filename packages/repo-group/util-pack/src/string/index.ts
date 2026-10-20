/**
 * 문자열 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.20 화 11:29:43
 */

/**
 * 숫자를 두 자리 문자열로 변환하는 메서드
 *
 * @param {number} value 값
 *
 * @returns {string} 두 자리로 앞을 0으로 채운 문자열 (e.g. 5 -> 05)
 */
export function pad2(value: number): string {
	return `${value}`.padStart(2, '0');
}
