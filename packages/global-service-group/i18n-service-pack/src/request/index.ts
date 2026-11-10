/**
 * 요청 인덱스 모듈
 *
 * @author RWB
 * @since 2026.11.10 화 14:53:20
 */

import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import en from '#/dictionary/en';
import ko from '#/dictionary/ko';
import { routing } from '#/routing';

const dictionary = { en, ko };

export default getRequestConfig(({ locale }) => {
	const requested = locale;
	const targetLocale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	return { dictionary: dictionary[targetLocale], locale: targetLocale };
});
