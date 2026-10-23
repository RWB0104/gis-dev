/**
 * 피쳐 정보 카드 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 17:20:00
 */

import { fireEvent, render, screen } from '@testing-library/react';

import FeatureInfoCard, { type FeatureInfoCardItem } from '.';

const ITEMS: FeatureInfoCardItem[] = [
	{ label: 'ID', value: 'buld_sejong.108' },
	{ label: '고유일련번호', value: '58190' },
	{ label: '고시일자', value: '2015-03-16' }
];

describe('[@gis-dev/root-ui-pack] FeatureInfoCard', () => {
	it('제목을 제목 요소로 렌더링한다', () => {
		render(<FeatureInfoCard items={ITEMS} title="세종시청사" />);

		expect(screen.getByRole('heading', { name: '세종시청사' })).toBeInTheDocument();
	});

	it('항목마다 라벨과 값을 렌더링한다', () => {
		render(<FeatureInfoCard items={ITEMS} title="세종시청사" />);

		for (const { label, value } of ITEMS) {
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(value)).toBeInTheDocument();
		}
	});

	it('항목이 없으면 제목만 렌더링한다', () => {
		render(<FeatureInfoCard items={[]} title="세종시청사" />);

		expect(screen.getByRole('heading', { name: '세종시청사' })).toBeInTheDocument();
		expect(screen.queryByText('ID')).not.toBeInTheDocument();
	});

	it('닫기 버튼을 클릭하면 onClose를 호출한다', () => {
		const onClose = vi.fn();

		render(<FeatureInfoCard items={ITEMS} onClose={onClose} title="세종시청사" />);

		fireEvent.click(screen.getByRole('button', { name: '닫기' }));

		expect(onClose).toHaveBeenCalledOnce();
	});

	it('onClose가 없어도 닫기 버튼 클릭이 에러 없이 동작한다', () => {
		render(<FeatureInfoCard items={ITEMS} title="세종시청사" />);

		expect(() => fireEvent.click(screen.getByRole('button', { name: '닫기' }))).not.toThrow();
	});

	it('className을 병합하고 나머지 속성을 전달한다', () => {
		render(<FeatureInfoCard className="custom" id="card" items={ITEMS} title="세종시청사" />);

		const card = screen.getByTestId('FeatureInfoCard');

		expect(card).toHaveClass('custom', 'relative');
		expect(card).toHaveAttribute('id', 'card');
	});
});
