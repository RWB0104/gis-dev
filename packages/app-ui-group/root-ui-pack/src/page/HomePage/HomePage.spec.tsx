/**
 * 홈 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.11.04 수 19:13:00
 */

import { render, screen } from '@testing-library/react';

import { getLinkGroups } from '@gis-dev/root-service-pack/func/router';

import HomePage from '.';

vi.mock('@gis-dev/root-service-pack/func/router', () => ({
	getLinkGroups: vi.fn()
}));

vi.mock('#/molecule/PageLinkSection', () => ({
	default: ({ pages, title }: { pages: unknown[]; title: string }) => (
		<section data-page-count={pages.length} data-testid="PageLinkSection" data-title={title} />
	)
}));

const mockedGetLinkGroups = vi.mocked(getLinkGroups);

const GROUPS = [
	{ description: '첫 번째 그룹', pages: [{ href: '/a', subtitle: 'a', title: 'A' }], title: '그룹 1' },
	{
		description: '두 번째 그룹',
		pages: [
			{ href: '/b', subtitle: 'b', title: 'B' },
			{ href: '/c', subtitle: 'c', title: 'C' }
		],
		title: '그룹 2'
	}
];

/**
 * async 서버 컴포넌트를 실행한 결과를 렌더링하는 메서드
 */
async function renderPage(): Promise<void> {
	render(await HomePage());
}

describe('[@gis-dev/root-ui-pack] HomePage', () => {
	beforeEach(() => {
		mockedGetLinkGroups.mockResolvedValue(GROUPS);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('main 요소를 렌더링한다', async () => {
		await renderPage();

		expect(screen.getByTestId('HomePage').tagName).toBe('MAIN');
	});

	it('프로젝트 제목을 렌더링한다', async () => {
		await renderPage();

		expect(screen.getByRole('heading', { level: 1, name: 'gis-dev' })).toBeInTheDocument();
	});

	it('링크 그룹마다 섹션을 렌더링한다', async () => {
		await renderPage();

		expect(screen.getAllByTestId('PageLinkSection')).toHaveLength(GROUPS.length);
	});

	it('섹션마다 그룹의 제목과 페이지 목록을 전달한다', async () => {
		await renderPage();

		const sections = screen.getAllByTestId('PageLinkSection');

		GROUPS.forEach(({ pages, title }, index) => {
			expect(sections[index]).toHaveAttribute('data-title', title);
			expect(sections[index]).toHaveAttribute('data-page-count', String(pages.length));
		});
	});

	it('링크 그룹이 없으면 섹션을 렌더링하지 않는다', async () => {
		mockedGetLinkGroups.mockResolvedValue([]);

		await renderPage();

		expect(screen.queryByTestId('PageLinkSection')).not.toBeInTheDocument();
	});
});
