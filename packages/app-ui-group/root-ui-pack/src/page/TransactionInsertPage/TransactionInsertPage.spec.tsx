/**
 * 트랜잭션 삽입 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:50:00
 */

import { render, screen } from '@testing-library/react';

import TransactionInsertPage from '.';

vi.mock('#/organism/extended-map/TransactionInsertMap', () => ({
	default: () => <div data-testid="TransactionInsertMap" />
}));

describe('[@gis-dev/root-ui-pack] TransactionInsertPage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<TransactionInsertPage />);

		expect(screen.getByTestId('TransactionInsertPage').tagName).toBe('MAIN');
	});

	it('main 안에 TransactionInsertMap을 렌더링한다', () => {
		render(<TransactionInsertPage />);

		expect(screen.getByTestId('TransactionInsertPage')).toContainElement(screen.getByTestId('TransactionInsertMap'));
	});
});
