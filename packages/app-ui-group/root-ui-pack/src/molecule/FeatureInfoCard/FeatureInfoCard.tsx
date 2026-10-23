/**
 * 피쳐 정보 카드 molecule 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 16:03:58
 */

import { XIcon } from 'lucide-react';
import type { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react';

import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

export interface FeatureInfoCardItem {
	/**
	 * 라벨
	 */
	label: string;

	/**
	 * 값
	 */
	value: string;
}

export interface FeatureInfoCardProps
	extends PropsWithoutChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
	/**
	 * 항목 배열
	 */
	items: FeatureInfoCardItem[];

	/**
	 * 닫기 이벤트 메서드
	 */
	onClose?: MouseEventHandler<HTMLButtonElement>;

	/**
	 * 제목
	 */
	title: string;
}

/**
 * 피쳐 정보 카드 molecule 컴포넌트 반환 메서드
 *
 * @param {FeatureInfoCardProps} param0 FeatureInfoCardProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function FeatureInfoCard({
	items,
	onClose,
	title,
	className,
	...props
}: FeatureInfoCardProps): React.JSX.Element {
	return (
		<div
			className={cn(
				'relative w-[min(16.25rem,calc(100vw-1rem))] rounded-xl border bg-popover px-4 pt-3.5 pb-1.5 text-popover-foreground shadow-lg',
				className
			)}
			data-testid="FeatureInfoCard"
			{...props}
		>
			<div className="mb-1.5 flex items-start justify-between gap-2">
				<h3 className="m-0 break-keep font-medium text-base text-blue-600 leading-snug dark:text-blue-400">{title}</h3>

				<Button aria-label="닫기" className="-mt-1 -mr-1.5" onClick={onClose} size="icon-xs" variant="ghost">
					<XIcon />
				</Button>
			</div>

			{items.map(({ label, value }) => (
				<div
					className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 border-t py-2 text-[13px] leading-normal"
					key={label}
				>
					<span className="text-muted-foreground">{label}</span>

					<span className="break-all tabular-nums">{value}</span>
				</div>
			))}

			<span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r border-b bg-popover" />
		</div>
	);
}
