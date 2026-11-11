/**
 * 페이지 링크 카드 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.11.04 수 19:09:00
 */

import { render, screen } from '@testing-library/react';

import PageLinkCard from '.';

describe('[@gis-dev/root-ui-pack] PageLinkCard', () => {
	it('제목, 부제목, 경로를 렌더링한다', () => {
		render(<PageLinkCard href="/osm" subtitle="설명" title="OSM" />);

		expect(screen.getByText('OSM')).toBeInTheDocument();
		expect(screen.getByText('설명')).toBeInTheDocument();
		expect(screen.getByText('/osm')).toBeInTheDocument();
	});

	it('a 태그로 href에 연결된다', () => {
		render(<PageLinkCard href="/osm" subtitle="설명" title="OSM" />);

		const card = screen.getByTestId('PageLinkCard');

		expect(card.tagName).toBe('A');
		expect(card).toHaveAttribute('href', '/osm');
	});

	it('className과 나머지 속성을 전달한다', () => {
		render(<PageLinkCard className="custom" href="/osm" id="card" subtitle="설명" title="OSM" />);

		const card = screen.getByTestId('PageLinkCard');

		expect(card).toHaveClass('custom');
		expect(card).toHaveAttribute('id', 'card');
	});
});
