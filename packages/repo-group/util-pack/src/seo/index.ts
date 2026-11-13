import type { Metadata } from 'next';

export function getMetadataAlternates(pathname: string, locale: string): Metadata['alternates'] {
	const path = `/gis-dev${pathname}`;

	return {
		canonical: `${path}/${locale}`,
		languages: {
			en: `${path}/en`,
			ko: `${path}/ko`,
			'x-default': `${path}/ko`
		}
	};
}
