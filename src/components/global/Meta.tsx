/**
 * 메타 컴포넌트
 *
 * @author RWB
 * @since 2022.02.27 Sun 01:45:44
 */

import { Helmet } from 'react-helmet-async';

import { TITLE, URL } from '../../common/env';

interface Props
{
	title: string,
	description: string,
	url: string
}

/**
 * 메타 JSX 반환 메서드
 *
 * @param {Props} param0: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function Meta({ title, description, url }: Props): JSX.Element
{
	const fullTitle = `${title} - ${TITLE}`;

	return (
		<Helmet>
			<meta content={description} name='description' />

			<meta content={TITLE} property='og:site_name' />
			<meta content={fullTitle} property='og:title' />
			<meta content={description} property='og:description' />
			<meta content='website' property='og:type' />
			<meta content={`${URL}${url}`} property='og:url' />
			<meta content='ko_KR' property='og:locale' />
			<meta content='https://user-images.githubusercontent.com/50317129/155851764-e49220c4-0568-4472-8d5c-ae0edeeb790c.png' property='og:image' />

			<link href={`${URL}${url}`} rel='canonical' />

			<title>{fullTitle}</title>

			<script src='https://www.googletagmanager.com/gtag/js?id=G-1YPNLPR0CQ' async />
			<script src='https://project.itcode.dev/js/ga.js' />
		</Helmet>
	);
}