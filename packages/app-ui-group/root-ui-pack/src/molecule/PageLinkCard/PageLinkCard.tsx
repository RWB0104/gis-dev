/**
 * 페이지 링크 카드 molecule 컴포넌트
 *
 * @author RWB
 * @since 2026.11.04 수 19:08:00
 */

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

export interface PageLinkCardProps extends PropsWithoutChildren<Omit<ComponentProps<typeof Link>, 'href'>> {
	/**
	 * 이동 경로
	 */
	href: string;

	/**
	 * 설명
	 */
	subtitle: string;

	/**
	 * 제목
	 */
	title: string;
}

/**
 * 페이지 링크 카드 molecule 컴포넌트 반환 메서드
 *
 * @param {PageLinkCardProps} param0 PageLinkCardProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function PageLinkCard({ href, subtitle, title, className, ...props }: PageLinkCardProps): React.JSX.Element {
	return (
		<Link
			className={cn(
				'flex flex-col gap-1 rounded-lg border bg-card p-4 text-card-foreground no-underline transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring',
				className
			)}
			data-testid="PageLinkCard"
			href={href}
			{...props}
		>
			<span className="font-semibold text-sm">{title}</span>

			<span className="text-muted-foreground text-xs">{subtitle}</span>

			<span className="font-mono text-[11px] text-muted-foreground">{href}</span>
		</Link>
	);
}
