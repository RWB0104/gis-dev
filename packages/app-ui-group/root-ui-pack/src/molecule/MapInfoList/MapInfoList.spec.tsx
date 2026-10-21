/**
 * 맵 정보 리스트 molecule 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:29:22
 */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';

import MapInfoList, { type MapInfoListItemProps } from '.';

const writeText = vi.fn();

/**
 * 라벨과 ref를 가진 테스트용 아이템 배열을 생성하는 메서드
 */
function createItems(...labels: string[]): MapInfoListItemProps[] {
	return labels.map((label) => ({ label, ref: createRef<HTMLParagraphElement>() }));
}

describe('[@gis-dev/root-ui-pack] MapInfoList', () => {
	beforeEach(() => {
		vi.useFakeTimers();

		writeText.mockReset();
		writeText.mockResolvedValue(undefined);

		Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
	});

	afterEach(() => {
		vi.useRealTimers();

		Reflect.deleteProperty(navigator, 'clipboard');
	});

	it('items가 없으면 빈 컨테이너를 렌더링한다', () => {
		render(<MapInfoList />);

		expect(screen.getByTestId('MapInfoList')).toBeEmptyDOMElement();
	});

	it('아이템마다 라벨과 복사 버튼을 렌더링한다', () => {
		const items = createItems('SRS', '줌 레벨');

		render(<MapInfoList items={items} />);

		expect(screen.getByText('SRS')).toBeInTheDocument();
		expect(screen.getByText('줌 레벨')).toBeInTheDocument();
		expect(screen.getAllByTestId('CopyButton')).toHaveLength(2);
	});

	it('아이템의 ref를 값 엘리먼트에 연결한다', () => {
		const items = createItems('SRS');

		render(<MapInfoList items={items} />);

		const valueElement = items[0]?.ref.current;

		expect(valueElement?.tagName).toBe('P');
		expect(valueElement).toBe(screen.getByText('SRS').nextElementSibling);
	});

	it('ref로 기록한 값이 화면에 표시된다', () => {
		const items = createItems('SRS');

		render(<MapInfoList items={items} />);

		(items[0]?.ref.current as HTMLParagraphElement).textContent = 'EPSG:3857';

		expect(screen.getByText('EPSG:3857')).toBeInTheDocument();
	});

	it('복사 버튼은 클릭 시점의 ref 값을 복사한다', async () => {
		const items = createItems('SRS');

		render(<MapInfoList items={items} />);

		(items[0]?.ref.current as HTMLParagraphElement).textContent = 'EPSG:4326';

		// biome-ignore lint/nursery/useAwaitThenable: act는 Promise를 반환하는 콜백을 받으면 Promise를 반환한다
		await act(() => Promise.resolve(fireEvent.click(screen.getByTestId('CopyButton'))));

		expect(writeText).toHaveBeenCalledExactlyOnceWith('EPSG:4326');
	});

	it('여러 줄 값도 줄바꿈을 유지한 채 복사한다', async () => {
		const items = createItems('중심 좌표');

		render(<MapInfoList items={items} />);

		(items[0]?.ref.current as HTMLParagraphElement).textContent = '1000\n2000';

		// biome-ignore lint/nursery/useAwaitThenable: act는 Promise를 반환하는 콜백을 받으면 Promise를 반환한다
		await act(() => Promise.resolve(fireEvent.click(screen.getByTestId('CopyButton'))));

		expect(writeText).toHaveBeenCalledExactlyOnceWith('1000\n2000');
	});

	it('아이템별 복사 버튼은 각자의 ref 값을 복사한다', async () => {
		const items = createItems('SRS', '줌 레벨');

		render(<MapInfoList items={items} />);

		(items[0]?.ref.current as HTMLParagraphElement).textContent = 'EPSG:3857';
		(items[1]?.ref.current as HTMLParagraphElement).textContent = '17.0000';

		// biome-ignore lint/nursery/useAwaitThenable: act는 Promise를 반환하는 콜백을 받으면 Promise를 반환한다
		await act(() => Promise.resolve(fireEvent.click(screen.getAllByTestId('CopyButton')[1] as HTMLElement)));

		expect(writeText).toHaveBeenCalledExactlyOnceWith('17.0000');
	});

	it('className과 나머지 속성을 전달한다', () => {
		render(<MapInfoList className="custom" id="map-info" />);

		const list = screen.getByTestId('MapInfoList');

		expect(list).toHaveClass('custom', 'flex');
		expect(list).toHaveAttribute('id', 'map-info');
	});
});
