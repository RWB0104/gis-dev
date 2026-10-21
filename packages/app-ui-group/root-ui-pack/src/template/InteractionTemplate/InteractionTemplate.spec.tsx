/**
 * 인터렉션 template 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 19:20:00
 */

import { render, screen } from '@testing-library/react';

import InteractionTemplate from '.';

describe('[@gis-dev/root-ui-pack] InteractionTemplate', () => {
	it('div 컨테이너를 렌더링한다', () => {
		render(<InteractionTemplate />);

		expect(screen.getByTestId('InteractionTemplate').tagName).toBe('DIV');
	});

	it('자식 요소를 렌더링한다', () => {
		render(
			<InteractionTemplate>
				<button type="button">첫 번째</button>
				<button type="button">두 번째</button>
			</InteractionTemplate>
		);

		const template = screen.getByTestId('InteractionTemplate');

		expect(template).toContainElement(screen.getByRole('button', { name: '첫 번째' }));
		expect(template).toContainElement(screen.getByRole('button', { name: '두 번째' }));
	});

	it('맵 좌측 하단에 세로로 쌓아 고정 배치한다', () => {
		render(<InteractionTemplate />);

		expect(screen.getByTestId('InteractionTemplate')).toHaveClass(
			'absolute',
			'bottom-2',
			'left-2',
			'flex',
			'flex-col',
			'gap-2'
		);
	});

	it('전달된 className을 병합한다', () => {
		render(<InteractionTemplate className="custom" />);

		expect(screen.getByTestId('InteractionTemplate')).toHaveClass('custom', 'absolute');
	});

	it('나머지 속성을 그대로 전달한다', () => {
		render(<InteractionTemplate id="interaction" />);

		expect(screen.getByTestId('InteractionTemplate')).toHaveAttribute('id', 'interaction');
	});
});
