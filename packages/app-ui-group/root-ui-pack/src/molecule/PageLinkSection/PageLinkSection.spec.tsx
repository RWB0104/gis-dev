/**
 * 페이지 링크 섹션 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.11.04 수 19:11:00
 */

import { render, screen } from '@testing-library/react';

import PageLinkSection from '.';

const PAGES = [
	{ description: '첫 번째', href: '/a', title: 'A' },
	{ description: '두 번째', href: '/b', title: 'B' }
];

describe('[@gis-dev/root-ui-pack] PageLinkSection', () => {
	it('그룹 제목과 설명을 렌더링한다', () => {
		render(<PageLinkSection description="그룹 설명" pages={PAGES} title="그룹" />);

		expect(screen.getByRole('heading', { level: 2, name: '그룹' })).toBeInTheDocument();
		expect(screen.getByText('그룹 설명')).toBeInTheDocument();
	});

	it('페이지마다 카드를 렌더링한다', () => {
		render(<PageLinkSection description="그룹 설명" pages={PAGES} title="그룹" />);

		const cards = screen.getAllByTestId('PageLinkCard');

		expect(cards).toHaveLength(2);
		expect(cards[0]).toHaveAttribute('href', '/a');
		expect(cards[1]).toHaveAttribute('href', '/b');
	});

	it('className과 나머지 속성을 전달한다', () => {
		render(<PageLinkSection className="custom" description="d" id="section" pages={PAGES} title="t" />);

		const section = screen.getByTestId('PageLinkSection');

		expect(section).toHaveClass('custom');
		expect(section).toHaveAttribute('id', 'section');
	});
});
