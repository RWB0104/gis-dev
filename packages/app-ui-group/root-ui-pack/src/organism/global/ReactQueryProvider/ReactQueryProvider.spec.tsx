/**
 * 쿼리 클라이언트 프로바이더 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 11:57:19
 */

import { render, screen } from '@testing-library/react';

import ReactQueryProvider from '.';

describe('[@gis-dev/common-ui-pack] ReactQueryProvider', () => {
	it('children을 렌더링한다', () => {
		render(
			<ReactQueryProvider>
				<div>test-child</div>
			</ReactQueryProvider>
		);

		expect(screen.getByText('test-child')).toBeInTheDocument();
	});
});
