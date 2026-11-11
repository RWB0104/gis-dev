/**
 * 라우팅 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.11.11 수 13:40:00
 */

import { routing } from '.';

describe('[@gis-dev/i18n-service-pack] routing', () => {
	describe('routing 테스트', () => {
		it('지원 로케일은 ko, en이다', () => {
			expect(routing.locales).toEqual(['ko', 'en']);
		});

		it('기본 로케일은 ko다', () => {
			expect(routing.defaultLocale).toBe('ko');
		});

		it('모든 로케일에 접두사를 붙인다', () => {
			expect(routing.localePrefix).toBe('always');
		});
	});
});
