/**
 * 트랜잭션 수정 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:40:00
 */

import { render, screen } from '@testing-library/react';

import TransactionUpdatePage from '.';

vi.mock('#/organism/extended-map/TransactionUpdateMap', () => ({
	default: () => <div data-testid="TransactionUpdateMap" />
}));

describe('[@gis-dev/root-ui-pack] TransactionUpdatePage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<TransactionUpdatePage />);

		expect(screen.getByTestId('TransactionUpdatePage').tagName).toBe('MAIN');
	});

	it('main 안에 TransactionUpdateMap을 렌더링한다', () => {
		render(<TransactionUpdatePage />);

		expect(screen.getByTestId('TransactionUpdatePage')).toContainElement(screen.getByTestId('TransactionUpdateMap'));
	});
});
