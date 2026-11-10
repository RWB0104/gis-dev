/**
 * 루트 레이아웃 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 17:24:10
 */

import '@gis-dev/root-ui-pack/root.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { routing } from '@gis-dev/i18n-service-pack/func/routing';
import ThemeScript from '@gis-dev/root-ui-pack/atom/ThemeScript';
import ReactQueryProvider from '@gis-dev/root-ui-pack/organism/global/ReactQueryProvider';
import { Toaster } from '@gis-dev/shadcn-ui-pack/components/ui/toast';
import { SERVICE_TITLE, SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';

interface StaticParams {
	/**
	 * 로케일
	 */
	locale: Locale;
}

/**
 * 메타데이터 비동기 메서드
 *
 * @param {LayoutProps<'/[locale]'>} param0 LayoutProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'service' });

	return {
		description: t('subtitle'),
		title: {
			default: SERVICE_TITLE,
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * 정적 파라미터 반환 메서드
 *
 * @returns {StaticParams[]} 정적 파라미터 배열
 */
export function generateStaticParams(): StaticParams[] {
	return routing.locales.map((locale) => ({ locale }));
}

/**
 * 루트 레이아웃 컴포넌트 반환 비동기 메서드
 *
 * @param {LayoutProps<'/[locale]'>} param0 LayoutProps
 *
 * @returns {Promise<React.JSX.Element>} JSX
 */
export default async function RootLayout({ params, children }: LayoutProps<'/[locale]'>): Promise<React.JSX.Element> {
	const { locale } = await params;

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<ThemeScript />
			</head>

			<body>
				<NextIntlClientProvider>
					<ReactQueryProvider>
						{children}

						<Toaster />
					</ReactQueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
