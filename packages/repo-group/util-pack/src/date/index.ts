/**
 * 날짜 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.20 화 11:27:50
 */

import { pad2 } from '#/string';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface DateItem {
	/**
	 * 텍스트
	 */
	text: string;

	/**
	 * 값
	 */
	value: number;
}

export interface ParsedDate {
	/**
	 * 일
	 */
	date: DateItem;

	/**
	 * 요일
	 */
	day: DateItem;

	/**
	 * 시
	 */
	hour: DateItem;

	/**
	 * 분
	 */
	minute: DateItem;

	/**
	 * 월
	 */
	month: DateItem;

	/**
	 * 초
	 */
	second: DateItem;

	/**
	 * 타임스탬프
	 */
	timestamp: number;

	/**
	 * 타임존
	 */
	timezone: number;

	/**
	 * 연도
	 */
	year: DateItem;
}

/**
 * 날짜 파싱 메서드
 *
 * @param {DateSource} source 날짜 소스
 *
 * @returns {ParsedDate} ParsedDate
 */
export function parseDate(source: DateSource = new Date()): ParsedDate {
	let d = source instanceof Date ? source : new Date(source);

	if (Number.isNaN(d.getTime())) {
		d = new Date();
	}

	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const date = d.getDate();
	const day = d.getDay();
	const hour = d.getHours();
	const minute = d.getMinutes();
	const second = d.getSeconds();
	const timezone = d.getTimezoneOffset() / 60;

	return {
		date: {
			text: pad2(date),
			value: date
		},
		day: {
			text: `${DAYS.at(day)}`,
			value: day
		},
		hour: {
			text: pad2(hour),
			value: hour
		},
		minute: {
			text: pad2(minute),
			value: minute
		},
		month: {
			text: pad2(month),
			value: month
		},
		second: {
			text: pad2(second),
			value: second
		},
		timestamp: d.getTime(),
		timezone,
		year: {
			text: `${year}`,
			value: year
		}
	};
}

/**
 * 날짜 포매팅 메서드
 *
 * @param {Func<ParsedDate, string>} func 포매팅 메서드
 * @param {DateSource} source 날짜 소스
 *
 * @returns {string} 포매팅 텍스트
 */
export function formatDate(func: Func<ParsedDate, string>, source: DateSource = new Date()): string {
	return func(parseDate(source));
}
