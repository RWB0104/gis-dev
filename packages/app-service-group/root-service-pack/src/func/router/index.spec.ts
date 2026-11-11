/**
 * 라우터 서비스 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.11.11 수 13:30:00
 */

import { locale } from 'next/root-params';
import { getTranslations } from 'next-intl/server';

import { getLinkGroups } from '.';

vi.mock('next/root-params', () => ({
	locale: vi.fn()
}));

vi.mock('next-intl/server', () => ({
	getTranslations: vi.fn()
}));

const mockedLocale = vi.mocked(locale);
const mockedGetTranslations = vi.mocked(getTranslations);

/**
 * 호출된 namespace와 키를 그대로 문자열로 돌려주는 번역 함수를 모킹하는 메서드
 */
function mockTranslations(): void {
	mockedGetTranslations.mockImplementation(
		(async ({ namespace }: { namespace: string }) =>
			(key: string) =>
				`${namespace}:${key}`) as never
	);
}

describe('[@gis-dev/root-service-pack] router', () => {
	beforeEach(() => {
		mockedLocale.mockResolvedValue('ko' as never);

		mockTranslations();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('getLinkGroups 테스트', () => {
		it('현재 로케일로 page, group 네임스페이스의 번역을 가져온다', async () => {
			mockedLocale.mockResolvedValue('en' as never);

			await getLinkGroups();

			expect(mockedGetTranslations).toHaveBeenCalledWith({ locale: 'en', namespace: 'page' });
			expect(mockedGetTranslations).toHaveBeenCalledWith({ locale: 'en', namespace: 'group' });
		});

		it('그룹 5개를 정해진 순서로 반환한다', async () => {
			const groups = await getLinkGroups();

			expect(groups.map(({ title }) => title)).toEqual([
				'group:basic.title',
				'group:interaction.title',
				'group:geoserver.title',
				'group:transaction.title',
				'group:other.title'
			]);
		});

		it('모든 그룹은 한 개 이상의 페이지를 가진다', async () => {
			const groups = await getLinkGroups();

			expect(groups.every(({ pages }) => pages.length > 0)).toBe(true);
		});

		it('모든 경로는 /로 시작하며 중복되지 않는다', async () => {
			const hrefs = (await getLinkGroups()).flatMap(({ pages }) => pages.map(({ href }) => href));

			expect(hrefs).toHaveLength(16);
			expect(hrefs.every((href) => href.startsWith('/'))).toBe(true);
			expect(new Set(hrefs).size).toBe(hrefs.length);
		});

		it('페이지의 제목과 부제목은 경로와 같은 이름의 번역 키를 사용한다', async () => {
			const pages = (await getLinkGroups()).flatMap((group) => group.pages);

			for (const { href, subtitle, title } of pages) {
				const key = href.slice(1);

				expect(title).toBe(`page:${key}.title`);
				expect(subtitle).toBe(`page:${key}.subtitle`);
			}
		});

		it('그룹의 설명은 같은 그룹의 description 키를 사용한다', async () => {
			const groups = await getLinkGroups();

			for (const { description, title } of groups) {
				const group = title.replace('group:', '').replace('.title', '');

				expect(description).toBe(`group:${group}.description`);
			}
		});
	});
});
