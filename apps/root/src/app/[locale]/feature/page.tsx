/**
 * 피쳐 페이지 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 16:10:01
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import FeaturePage from '@gis-dev/root-ui-pack/page/FeaturePage';
import { SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';
import { getMetadataAlternates } from '@gis-dev/util-pack/seo';

/**
 * 메타데이터 비동기 메서드
 *
 * @param {PageProps<'/[locale]/feature'>} param0 PageProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/feature'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'page.feature' });

	return {
		alternates: getMetadataAlternates('/feature', locale),
		description: t('subtitle'),
		title: {
			default: t('title'),
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * 피쳐 페이지 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function Page(): React.JSX.Element {
	return <FeaturePage />;
}
