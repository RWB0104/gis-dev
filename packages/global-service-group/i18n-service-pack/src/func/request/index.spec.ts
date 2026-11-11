/**
 * 요청 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.11.11 수 13:41:00
 */

import { locale } from 'next/root-params';

import en from '#/func/dictionary/en';
import ko from '#/func/dictionary/ko';

import requestConfig from '.';

vi.mock('next/root-params', () => ({
	locale: vi.fn()
}));

// getRequestConfig는 Next 요청 컨텍스트가 필요하므로, 전달받은 콜백을 그대로 돌려주도록 대체한다.
vi.mock('next-intl/server', () => ({
	getRequestConfig: (callback: unknown) => callback
}));

const mockedLocale = vi.mocked(locale);

/**
 * 요청 설정 콜백을 실행하는 메서드
 */
function getConfig(): Promise<{ locale: string; messages: unknown }> {
	return (requestConfig as unknown as () => Promise<{ locale: string; messages: unknown }>)();
}

describe('[@gis-dev/i18n-service-pack] request', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('요청 설정 테스트', () => {
		it('ko 요청이면 한국어 사전을 반환한다', async () => {
			mockedLocale.mockResolvedValue('ko' as never);

			expect(await getConfig()).toEqual({ locale: 'ko', messages: ko });
		});

		it('en 요청이면 영어 사전을 반환한다', async () => {
			mockedLocale.mockResolvedValue('en' as never);

			expect(await getConfig()).toEqual({ locale: 'en', messages: en });
		});

		it('지원하지 않는 로케일이면 기본 로케일(ko)로 대체한다', async () => {
			mockedLocale.mockResolvedValue('fr' as never);

			expect(await getConfig()).toEqual({ locale: 'ko', messages: ko });
		});
	});
});
