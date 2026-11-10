/**
 * 페이지 링크 섹션 molecule 컴포넌트
 *
 * @author RWB
 * @since 2026.11.04 수 19:10:00
 */

import { getLocale } from 'next-intl/server';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';
import type { PageLinkGroup } from '@gis-dev/util-pack/const';

import PageLinkCard from '#/molecule/PageLinkCard';

export type PageLinkSectionProps = PropsWithoutChildren<
	Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'title'>
> &
	PageLinkGroup;

/**
 * 페이지 링크 섹션 molecule 컴포넌트 반환 메서드
 *
 * @param {PageLinkSectionProps} param0 PageLinkSectionProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default async function PageLinkSection({
	description,
	pages,
	title,
	className,
	...props
}: PageLinkSectionProps): Promise<React.JSX.Element> {
	const locale = await getLocale();

	return (
		<section className={cn('flex flex-col gap-3', className)} data-testid="PageLinkSection" {...props}>
			<div>
				<h2 className="m-0 font-semibold text-base">{title}</h2>

				<p className="m-0 text-muted-foreground text-xs">{description}</p>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{pages.map(({ href, ...page }) => (
					<PageLinkCard href={`/${locale}${href}`} key={href} {...page} />
				))}
			</div>
		</section>
	);
}
