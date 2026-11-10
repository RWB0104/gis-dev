/**
 * 요청 인덱스 모듈
 *
 * @author RWB
 * @since 2026.11.10 화 14:53:20
 */
import { locale } from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import en from '#/func/dictionary/en';
import ko from '#/func/dictionary/ko';
import { routing } from '#/func/routing';

const dictionary = { en, ko };

export default getRequestConfig(async () => {
	const requested = await locale();
	const targetLocale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	return { locale: targetLocale, messages: dictionary[targetLocale] };
});
