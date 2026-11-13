/**
 * 홈 페이지 컴포넌트
 *
 * @author RWB
 * @since 2026.11.04 수 19:14:00
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import HomePage from '@gis-dev/root-ui-pack/page/HomePage';
import { SERVICE_TITLE, SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';
import { getMetadataAlternates } from '@gis-dev/util-pack/seo';

/**
 * 메타데이터 비동기 메서드
 *
 * @param {PageProps<'/[locale]/wms-popup'>} param0 PageProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'service' });

	return {
		alternates: getMetadataAlternates('', locale),
		description: t('subtitle'),
		title: {
			default: SERVICE_TITLE,
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * 홈 페이지 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function Page(): React.JSX.Element {
	return <HomePage />;
}
