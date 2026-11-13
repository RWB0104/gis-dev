/**
 * WMS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2026.11.10 화 19:14:04
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import WmsPopupPage from '@gis-dev/root-ui-pack/page/WmsPopupPage';
import { SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';
import { getMetadataAlternates } from '@gis-dev/util-pack/seo';

/**
 * 메타데이터 비동기 메서드
 *
 * @param {PageProps<'/[locale]/wms-popup'>} param0 PageProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/wms-popup'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'page.wms-popup' });

	return {
		alternates: getMetadataAlternates('/wms-popup', locale),
		description: t('subtitle'),
		title: {
			default: t('title'),
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * WMS 팝업 페이지 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function Page(): React.JSX.Element {
	return <WmsPopupPage />;
}
