/**
 * 라우팅 인덱스 모듈
 *
 * @author RWB
 * @since 2026.11.10 화 14:53:42
 */

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	defaultLocale: 'ko',
	localePrefix: 'always',
	locales: ['ko', 'en']
});
