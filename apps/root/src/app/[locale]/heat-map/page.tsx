/**
 * 히트맵 페이지 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 18:48:31
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import HeatMapPage from '@gis-dev/root-ui-pack/page/HeatMapPage';
import { SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';

/**
 * 메타데이터 비동기 메서드
 *
 * @param {PageProps<'/[locale]/heat-map'>} param0 PageProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/heat-map'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'page.heat-map' });

	return {
		description: t('subtitle'),
		title: {
			default: t('title'),
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * 히트맵 페이지 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function Page(): React.JSX.Element {
	return <HeatMapPage />;
}
