/**
 * 문자열 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 11:29:31
 */

import { pad2 } from '.';

describe('[@gis-dev/util-pack] string', () => {
	describe('pad2 테스트', () => {
		it('한 자리 숫자는 앞을 0으로 채운다', () => {
			expect(pad2(0)).toBe('00');
			expect(pad2(5)).toBe('05');
			expect(pad2(9)).toBe('09');
		});

		it('두 자리 이상 숫자는 그대로 반환한다', () => {
			expect(pad2(10)).toBe('10');
			expect(pad2(59)).toBe('59');
			expect(pad2(123)).toBe('123');
		});
	});
});
