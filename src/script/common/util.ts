/**
 * 유틸 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 01:25:49
 */

import { APP_INFO } from '@gis-dev/script/common/env';
import { Metadata } from 'next';
import { Polygon } from 'ol/geom';

export interface QueryProps
{
	/**
	 * 데이터
	 */
	[key: string]: string | number | boolean | undefined;
}

export interface MetadataProps
{
	/**
	 * 제목
	 */
	title: string;

	/**
	 * 설명
	 */
	description?: string;

	/**
	 * 키워드
	 */
	keywords?: string[];

	/**
	 * URL
	 */
	url?: string;

	/**
	 * 커버 이미지
	 */
	image?: string;
}

/**
 * URL 반환 메서드
 *
 * @param {string} host: 호스트
 * @param {string} query: QueryProps 객체
 *
 * @returns {string} URL
 */
export function urlBuilder(host: string, query: QueryProps): string
{
	const param = Object.entries(query)
		.map(([ key, value ]) => (value ? `${key}=${encodeURIComponent(value)}` : ''))
		.join('&');

	return `${host}?${param}`;
}

/**
 * 날짜 변환 메서드
 *
 * @param {string} text: yyyyMMdd 형태의 텍스트
 *
 * @returns {string} yyyy-MM-dd
 */
export function dateConvert(text: string): string
{
	const regex = /^(\d{4})(\d{2})(\d{2})$/;
	const arr = regex.exec(text);

	if (arr)
	{
		return `${arr[1]}-${arr[2]}-${arr[3]}`;
	}

	return text;
}

/**
 * 폴리곤 XML 반환 메서드
 *
 * @param {Polygon} feature: Polygon 객체
 *
 * @returns {string} 폴리곤 XML
 */
export function getPolygonXml(feature: Polygon): string
{
	return `
	<gml:Polygon srsName="EPSG:3857">
		<gml:exterior>
			<gml:LinearRing srsName="EPSG:3857">
				<gml:posList>${feature.getFlatCoordinates().join(' ')}</gml:posList>
			</gml:LinearRing>
		</gml:exterior>
	</gml:Polygon>
	`;
}

/**
 * 메타데이터 반환 메서드
 *
 * @param {MetadataProps} param0: MetadataProps 객체
 *
 * @returns {Metadata} 메타데이터
 */
export function getMetadata({ title, description, keywords, url = '', image = APP_INFO.thumbnail }: MetadataProps): Metadata
{
	const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/gis-dev' : 'https://project.itcode.dev/gis-dev';
	const authors = Object.values(APP_INFO.author.social).map(({ link, name }) => ({ name, url: link }));

	return {
		authors,
		description: description || APP_INFO.description,
		icons: [
			'/gis-dev/favicon.ico',
			{ rel: 'shortcut icon', url: '/gis-dev/favicon.ico' },
			{ rel: 'apple-touch-icon', url: '/gis-dev/favicon.ico' }
		],
		keywords,
		metadataBase: new URL(baseUrl),
		openGraph: {
			description,
			images: image,
			locale: 'ko-KR',
			siteName: APP_INFO.title,
			title: `${title} - ${APP_INFO.title}`,
			type: 'website',
			url: `${baseUrl}${url}`
		},
		title: `${title} - ${APP_INFO.title}`
	};
}