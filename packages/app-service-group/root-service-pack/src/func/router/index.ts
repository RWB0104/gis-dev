/**
 * 라우터 서비스 인덱스 모듈
 *
 * @author RWB
 * @since 2026.11.11 수 12:59:14
 */

import { locale } from 'next/root-params';
import { getTranslations } from 'next-intl/server';

export interface PageLinkItem {
	/**
	 * 이동 경로
	 */
	href: string;

	/**
	 * 부제목
	 */
	subtitle: string;

	/**
	 * 제목
	 */
	title: string;
}

export interface PageLinkGroup {
	/**
	 * 그룹 설명
	 */
	description: string;

	/**
	 * 페이지 배열
	 */
	pages: PageLinkItem[];

	/**
	 * 그룹 제목
	 */
	title: string;
}

export async function getLinkGroups(): Promise<PageLinkGroup[]> {
	const loc = await locale();
	const t = await getTranslations({ locale: loc, namespace: 'page' });
	const gt = await getTranslations({ locale: loc, namespace: 'group' });

	return [
		{
			description: gt('basic.description'),
			pages: [
				{ href: '/osm', subtitle: t('osm.subtitle'), title: t('osm.title') },
				{ href: '/google', subtitle: t('google.subtitle'), title: t('google.title') }
			],
			title: gt('basic.title')
		},
		{
			description: gt('interaction.description'),
			pages: [
				{ href: '/map-info', subtitle: t('map-info.subtitle'), title: t('map-info.title') },
				{ href: '/geolocation', subtitle: t('geolocation.subtitle'), title: t('geolocation.title') },
				{ href: '/feature', subtitle: t('feature.subtitle'), title: t('feature.title') },
				{ href: '/feature-click', subtitle: t('feature-click.subtitle'), title: t('feature-click.title') }
			],
			title: gt('interaction.title')
		},
		{
			description: gt('geoserver.description'),
			pages: [
				{ href: '/wms', subtitle: t('wms.subtitle'), title: t('wms.title') },
				{ href: '/wms-popup', subtitle: t('wms-popup.subtitle'), title: t('wms-popup.title') },
				{ href: '/wfs', subtitle: t('wfs.subtitle'), title: t('wfs.title') },
				{ href: '/wfs-popup', subtitle: t('wfs-popup.subtitle'), title: t('wfs-popup.title') }
			],
			title: gt('geoserver.title')
		},
		{
			description: gt('transaction.description'),
			pages: [
				{
					href: '/transaction-insert',
					subtitle: t('transaction-insert.subtitle'),
					title: t('transaction-insert.title')
				},
				{
					href: '/transaction-update',
					subtitle: t('transaction-update.subtitle'),
					title: t('transaction-update.title')
				},
				{
					href: '/transaction-delete',
					subtitle: t('transaction-delete.subtitle'),
					title: t('transaction-delete.title')
				}
			],
			title: gt('transaction.title')
		},
		{
			description: gt('other.description'),
			pages: [
				{ href: '/cluster-map', subtitle: t('cluster-map.subtitle'), title: t('cluster-map.title') },
				{ href: '/heat-map', subtitle: t('heat-map.subtitle'), title: t('heat-map.title') },
				{ href: '/webgl', subtitle: t('webgl.subtitle'), title: t('webgl.title') }
			],
			title: gt('other.title')
		}
	];
}
