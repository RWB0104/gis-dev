/**
 * 페이지 링크 섹션 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.11.04 수 19:11:00
 */

import { render, screen } from '@testing-library/react';
import { getLocale } from 'next-intl/server';

import PageLinkSection, { type PageLinkSectionProps } from '.';

vi.mock('next-intl/server', () => ({
	getLocale: vi.fn()
}));

const mockedGetLocale = vi.mocked(getLocale);

const PAGES = [
	{ description: '첫 번째', href: '/a', title: 'A' },
	{ description: '두 번째', href: '/b', title: 'B' }
];

/**
 * async 서버 컴포넌트를 실행한 결과를 렌더링하는 메서드
 *
 * @param {PageLinkSectionProps} props PageLinkSectionProps
 */
async function renderSection(props: PageLinkSectionProps): Promise<void> {
	render(await PageLinkSection(props));
}

describe('[@gis-dev/root-ui-pack] PageLinkSection', () => {
	beforeEach(() => {
		mockedGetLocale.mockResolvedValue('ko');
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('그룹 제목과 설명을 렌더링한다', async () => {
		await renderSection({ description: '그룹 설명', pages: PAGES, title: '그룹' });

		expect(screen.getByRole('heading', { level: 2, name: '그룹' })).toBeInTheDocument();
		expect(screen.getByText('그룹 설명')).toBeInTheDocument();
	});

	it('페이지마다 카드를 렌더링한다', async () => {
		await renderSection({ description: '그룹 설명', pages: PAGES, title: '그룹' });

		expect(screen.getAllByTestId('PageLinkCard')).toHaveLength(2);
		expect(screen.getByText('첫 번째')).toBeInTheDocument();
		expect(screen.getByText('두 번째')).toBeInTheDocument();
	});

	it('카드의 href 앞에 현재 로케일을 붙인다', async () => {
		await renderSection({ description: '그룹 설명', pages: PAGES, title: '그룹' });

		const cards = screen.getAllByTestId('PageLinkCard');

		expect(cards[0]).toHaveAttribute('href', '/ko/a');
		expect(cards[1]).toHaveAttribute('href', '/ko/b');
	});

	it('로케일이 바뀌면 href의 접두사도 바뀐다', async () => {
		mockedGetLocale.mockResolvedValue('en');

		await renderSection({ description: '그룹 설명', pages: PAGES, title: '그룹' });

		const cards = screen.getAllByTestId('PageLinkCard');

		expect(cards[0]).toHaveAttribute('href', '/en/a');
		expect(cards[1]).toHaveAttribute('href', '/en/b');
	});

	it('className과 나머지 속성을 전달한다', async () => {
		await renderSection({ className: 'custom', description: 'd', id: 'section', pages: PAGES, title: 't' });

		const section = screen.getByTestId('PageLinkSection');

		expect(section).toHaveClass('custom');
		expect(section).toHaveAttribute('id', 'section');
	});
});
