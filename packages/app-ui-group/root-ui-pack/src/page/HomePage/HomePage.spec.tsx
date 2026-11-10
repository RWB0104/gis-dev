/**
 * 홈 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.11.04 수 19:13:00
 */

import { render, screen } from '@testing-library/react';

import { PAGE_LINK_GROUPS } from '@gis-dev/util-pack/const';

import HomePage from '.';

vi.mock('#/molecule/PageLinkSection', () => ({
	default: ({ pages, title }: { pages: unknown[]; title: string }) => (
		<section data-page-count={pages.length} data-testid="PageLinkSection" data-title={title} />
	)
}));

describe('[@gis-dev/root-ui-pack] HomePage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<HomePage />);

		expect(screen.getByTestId('HomePage').tagName).toBe('MAIN');
	});

	it('프로젝트 제목을 렌더링한다', () => {
		render(<HomePage />);

		expect(screen.getByRole('heading', { level: 1, name: 'gis-dev' })).toBeInTheDocument();
	});

	it('그룹마다 섹션을 렌더링한다', () => {
		render(<HomePage />);

		expect(screen.getAllByTestId('PageLinkSection')).toHaveLength(PAGE_LINK_GROUPS.length);
	});

	it('섹션마다 그룹의 제목과 페이지 목록을 전달한다', () => {
		render(<HomePage />);

		const sections = screen.getAllByTestId('PageLinkSection');

		PAGE_LINK_GROUPS.forEach(({ pages, title }, index) => {
			expect(sections[index]).toHaveAttribute('data-title', title);
			expect(sections[index]).toHaveAttribute('data-page-count', String(pages.length));
		});
	});
});
