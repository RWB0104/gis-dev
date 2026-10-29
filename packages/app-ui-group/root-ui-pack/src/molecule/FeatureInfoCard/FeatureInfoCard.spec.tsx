/**
 * 피쳐 정보 카드 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 17:20:00
 */

import { fireEvent, render, screen } from '@testing-library/react';

import type { FeatureDescriptionItem } from '@gis-dev/openlayers-service-pack/func/feature';

import FeatureInfoCard from '.';

const ITEMS: FeatureDescriptionItem[] = [
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

	it('Escape 키를 떼면 onClose를 호출한다', () => {
		const onClose = vi.fn();

		render(<FeatureInfoCard items={ITEMS} onClose={onClose} title="세종시청사" />);

		fireEvent.keyUp(document, { code: 'Escape' });

		expect(onClose).toHaveBeenCalledOnce();
	});

	it('Escape가 아닌 키는 무시한다', () => {
		const onClose = vi.fn();

		render(<FeatureInfoCard items={ITEMS} onClose={onClose} title="세종시청사" />);

		fireEvent.keyUp(document, { code: 'Enter' });

		expect(onClose).not.toHaveBeenCalled();
	});

	it('onClose가 없어도 Escape 키가 에러 없이 동작한다', () => {
		render(<FeatureInfoCard items={ITEMS} title="세종시청사" />);

		expect(() => fireEvent.keyUp(document, { code: 'Escape' })).not.toThrow();
	});

	it('언마운트된 뒤에는 Escape 키를 무시한다', () => {
		const onClose = vi.fn();

		const { unmount } = render(<FeatureInfoCard items={ITEMS} onClose={onClose} title="세종시청사" />);

		unmount();

		fireEvent.keyUp(document, { code: 'Escape' });

		expect(onClose).not.toHaveBeenCalled();
	});

	it('className을 병합하고 나머지 속성을 전달한다', () => {
		render(<FeatureInfoCard className="custom" id="card" items={ITEMS} title="세종시청사" />);

		const card = screen.getByTestId('FeatureInfoCard');

		expect(card).toHaveClass('custom', 'relative');
		expect(card).toHaveAttribute('id', 'card');
	});

	describe('썸네일', () => {
		it('썸네일이 있으면 제목을 대체 텍스트로 이미지를 렌더링한다', () => {
			render(<FeatureInfoCard items={ITEMS} thumbnail="https://www.starbucks.co.kr/upload/a.jpg" title="강남점" />);

			const image = screen.getByAltText('강남점');

			expect(image.tagName).toBe('IMG');
			expect(decodeURIComponent(image.getAttribute('src') ?? '')).toContain('https://www.starbucks.co.kr/upload/a.jpg');
		});

		it('썸네일이 없으면 이미지를 렌더링하지 않는다', () => {
			render(<FeatureInfoCard items={ITEMS} title="강남점" />);

			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
	});

	describe('링크 항목', () => {
		const LinkItems: FeatureDescriptionItem[] = [
			{ label: '주소', link: 'https://map.naver.com/p/search/a', value: '서울' },
			{ label: '연락처', link: 'tel:02-123-4567', value: '02-123-4567' },
			{ label: 'ID', value: 'point.1' }
		];

		it('link가 있으면 새 탭으로 여는 링크로 렌더링한다', () => {
			render(<FeatureInfoCard items={LinkItems} title="강남점" />);

			const link = screen.getByRole('link', { name: '서울' });

			expect(link).toHaveAttribute('href', 'https://map.naver.com/p/search/a');
			expect(link).toHaveAttribute('target', '_blank');
		});

		it('일반 링크는 하늘색, 전화 링크는 초록색으로 표시한다', () => {
			render(<FeatureInfoCard items={LinkItems} title="강남점" />);

			expect(screen.getByRole('link', { name: '서울' })).toHaveClass('text-sky-500');
			expect(screen.getByRole('link', { name: '서울' })).not.toHaveClass('text-green-500');
			expect(screen.getByRole('link', { name: '02-123-4567' })).toHaveClass('text-green-500');
			expect(screen.getByRole('link', { name: '02-123-4567' })).toHaveAttribute('href', 'tel:02-123-4567');
		});

		it('link가 없는 항목은 링크 없이 텍스트로 렌더링한다', () => {
			render(<FeatureInfoCard items={LinkItems} title="강남점" />);

			expect(screen.getByText('point.1').tagName).toBe('SPAN');
			expect(screen.getAllByRole('link')).toHaveLength(2);
		});
	});
});
