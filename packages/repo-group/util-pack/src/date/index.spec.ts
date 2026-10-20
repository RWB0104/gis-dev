/**
 * 날짜 유틸 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 화 11:30:44
 */

import { formatDate, parseDate } from '.';

describe('[@gis-dev/util-pack] date', () => {
	describe('parseDate 테스트', () => {
		afterEach(() => {
			vi.useRealTimers();
		});

		it('Date 객체를 파싱한다', () => {
			const source = new Date(2026, 9, 6, 9, 5, 3);

			const result = parseDate(source);

			expect(result.year).toEqual({ text: '2026', value: 2026 });
			expect(result.month).toEqual({ text: '10', value: 10 });
			expect(result.date).toEqual({ text: '06', value: 6 });
			expect(result.day).toEqual({ text: 'Tue', value: 2 });
			expect(result.hour).toEqual({ text: '09', value: 9 });
			expect(result.minute).toEqual({ text: '05', value: 5 });
			expect(result.second).toEqual({ text: '03', value: 3 });
			expect(result.timestamp).toBe(source.getTime());
			expect(result.timezone).toBe(source.getTimezoneOffset() / 60);
		});

		it('숫자(타임스탬프)와 문자열 소스를 파싱한다', () => {
			const source = new Date(2026, 0, 1, 0, 0, 0);

			expect(parseDate(source.getTime()).timestamp).toBe(source.getTime());
			expect(parseDate(source.toISOString()).timestamp).toBe(source.getTime());
		});

		it('일요일과 토요일의 요일 텍스트를 반환한다', () => {
			expect(parseDate(new Date(2026, 9, 4)).day).toEqual({ text: 'Sun', value: 0 });
			expect(parseDate(new Date(2026, 9, 10)).day).toEqual({ text: 'Sat', value: 6 });
		});

		it('소스가 없으면 현재 시각을 사용한다', () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2026, 9, 6, 12, 30, 45));

			const result = parseDate();

			expect(result.timestamp).toBe(new Date(2026, 9, 6, 12, 30, 45).getTime());
		});

		it('유효하지 않은 소스면 현재 시각으로 대체한다', () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2026, 9, 6, 12, 30, 45));

			const result = parseDate('invalid-date');

			expect(result.timestamp).toBe(new Date(2026, 9, 6, 12, 30, 45).getTime());
		});
	});

	describe('formatDate 테스트', () => {
		afterEach(() => {
			vi.useRealTimers();
		});

		it('파싱된 날짜를 포매팅 함수에 전달해 결과를 반환한다', () => {
			const result = formatDate(
				({ year, month, date }) => `${year.text}-${month.text}-${date.text}`,
				new Date(2026, 9, 6)
			);

			expect(result).toBe('2026-10-06');
		});

		it('소스가 없으면 현재 시각을 포매팅한다', () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2026, 9, 6, 9, 5, 3));

			const result = formatDate(({ hour, minute, second }) => `${hour.text}:${minute.text}:${second.text}`);

			expect(result).toBe('09:05:03');
		});
	});
});
