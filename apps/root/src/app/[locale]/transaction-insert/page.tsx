/**
 * 트랜잭션 추가 페이지 컴포넌트
 *
 * @author RWB
 * @since 2026.10.28 수 16:10:23
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import TransactionInsertPage from '@gis-dev/root-ui-pack/page/TransactionInsertPage';
import { SERVICE_TITLE_TEMPLATE } from '@gis-dev/util-pack/const';

/**
 * 메타데이터 비동기 메서드
 *
 * @param {PageProps<'/[locale]/transaction-insert'>} param0 PageProps
 *
 * @returns {Promise<Metadata>} 메타데이터
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/transaction-insert'>): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'page.transaction-insert' });

	return {
		description: t('subtitle'),
		title: {
			default: t('title'),
			template: SERVICE_TITLE_TEMPLATE
		}
	};
}

/**
 * 트랜잭션 추가 페이지 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function Page(): React.JSX.Element {
	return <TransactionInsertPage />;
}
