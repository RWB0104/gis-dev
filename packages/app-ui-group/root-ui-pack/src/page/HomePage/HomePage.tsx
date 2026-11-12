/**
 * 홈 page 컴포넌트
 *
 * @author RWB
 * @since 2026.11.04 수 19:12:00
 */

import { Space_Grotesk } from 'next/font/google';
import Image from 'next/image';

import { getLinkGroups } from '@gis-dev/root-service-pack/func/router';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';
import { SERVICE_TITLE } from '@gis-dev/util-pack/const';

import PageLinkSection from '#/molecule/PageLinkSection';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-title',
	weight: ['700']
});

/**
 * 홈 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default async function HomePage(): Promise<React.JSX.Element> {
	const links = await getLinkGroups();

	return (
		<main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8" data-testid="HomePage">
			<header className="flex flex-col gap-2">
				<Image alt={SERVICE_TITLE} height={48} src="/gis-dev/icon.svg" width={48} />

				<h1 className={cn('font-bold text-2xl', spaceGrotesk.className)}>{SERVICE_TITLE}</h1>
			</header>

			{links.map((group) => (
				<PageLinkSection key={group.title} {...group} />
			))}
		</main>
	);
}
