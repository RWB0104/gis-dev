/**
 * Google 페이지 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 18:39:20
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import GooglePage from '@gis-dev/root-ui-pack/page/GooglePage';
import { SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';

/**
 * 메타데이터 비동기 메서드
 *
 * @param {PageProps<'/[locale]/google'>} param0 PageProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/google'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'page.google' });

	return {
		description: t('subtitle'),
		title: {
			default: t('title'),
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * Google 페이지 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function Page(): React.JSX.Element {
	return <GooglePage />;
}
