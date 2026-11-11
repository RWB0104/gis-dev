/**
 * 사전 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.11.11 수 13:42:00
 */

import en from '#/func/dictionary/en';
import ko from '#/func/dictionary/ko';

/**
 * 중첩된 객체의 모든 키를 `a.b.c` 형태로 펼치는 메서드
 *
 * @param {Record<string, unknown>} value 객체
 * @param {string} prefix 접두사
 *
 * @returns {string[]} 키 배열
 */
function flatKeys(value: Record<string, unknown>, prefix = ''): string[] {
	return Object.entries(value).flatMap(([key, child]) =>
		typeof child === 'object' && child !== null
			? flatKeys(child as Record<string, unknown>, `${prefix}${key}.`)
			: [`${prefix}${key}`]
	);
}

describe('[@gis-dev/i18n-service-pack] dictionary', () => {
	describe('사전 키 일치 테스트', () => {
		it('ko와 en은 같은 키를 가진다', () => {
			expect(flatKeys(en).sort((a, b) => a.localeCompare(b))).toEqual(flatKeys(ko).sort((a, b) => a.localeCompare(b)));
		});

		it('모든 페이지는 제목과 부제목 키를 가진다', () => {
			for (const dictionary of [ko, en]) {
				for (const page of Object.values(dictionary.page)) {
					expect(page).toHaveProperty('title');
					expect(page).toHaveProperty('subtitle');
				}
			}
		});

		it('모든 번역 값은 문자열이다', () => {
			const values = (dictionary: object): unknown[] =>
				Object.values(dictionary).flatMap((v) => (typeof v === 'object' ? values(v) : [v]));

			expect([...values(ko), ...values(en)].every((value) => typeof value === 'string')).toBe(true);
		});
	});
});
