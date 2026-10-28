/**
 * 트랜잭션 삭제 page 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.28 수 18:10:00
 */

import { render, screen } from '@testing-library/react';

import TransactionDeletePage from '.';

vi.mock('#/organism/extended-map/TransactionDeleteMap', () => ({
	default: () => <div data-testid="TransactionDeleteMap" />
}));

describe('[@gis-dev/root-ui-pack] TransactionDeletePage', () => {
	it('main 요소를 렌더링한다', () => {
		render(<TransactionDeletePage />);

		expect(screen.getByTestId('TransactionDeletePage').tagName).toBe('MAIN');
	});

	it('main 안에 TransactionDeleteMap을 렌더링한다', () => {
		render(<TransactionDeletePage />);

		expect(screen.getByTestId('TransactionDeletePage')).toContainElement(screen.getByTestId('TransactionDeleteMap'));
	});
});
