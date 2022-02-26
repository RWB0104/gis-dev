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

export default function Meta({ title, description, url }: Props)
{
	const fullTitle = `${title} - ${TITLE}`;

	return (
		<Helmet>
			<meta name="description" content={description} />

			<meta property="og:site_name" content={TITLE} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${URL}${url}`} />
			<meta property="og:locale" content="ko_KR" />
			<meta property="og:image" content="https://user-images.githubusercontent.com/50317129/155851764-e49220c4-0568-4472-8d5c-ae0edeeb790c.png" />

			<link rel="canonical" href={`${URL}${url}`} />

			<title>{fullTitle}</title>

			<script async src="https://www.googletagmanager.com/gtag/js?id=G-1YPNLPR0CQ"></script>
			<script src="https://project.itcode.dev/js/ga.js"></script>
		</Helmet>
	);
}