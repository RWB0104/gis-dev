/**
 * 홈 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.11.04 수 19:13:00
 */

import { render, screen } from '@testing-library/react';

import { PAGE_LINK_GROUPS } from '@gis-dev/util-pack/const';

import HomePage from '.';

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

	it('모든 페이지로 연결되는 카드를 렌더링한다', () => {
		render(<HomePage />);

		const total = PAGE_LINK_GROUPS.reduce((sum, { pages }) => sum + pages.length, 0);

		expect(screen.getAllByTestId('PageLinkCard')).toHaveLength(total);
	});
});
