/**
 * 맵 정보 리스트 molecule 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 14:44:08
 */

import type { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';

import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

import CopyButton from '#/atom/CopyButton';

export interface MapInfoListItemProps {
	/**
	 * 라벨
	 */
	label: string;

	/**
	 * Ref
	 */
	ref: RefObject<HTMLParagraphElement | null>;
}

export interface MapInfoListProps
	extends PropsWithoutChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
	/**
	 * 아이템 배열
	 */
	items?: MapInfoListItemProps[];
}

/**
 * 맵 정보 리스트 molecule 컴포넌트 반환 메서드
 *
 * @param {MapInfoListProps} param0 MapInfoListProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapInfoList({ items, className, ...props }: MapInfoListProps): React.JSX.Element {
	return (
		<div className={cn('flex flex-col', className)} data-testid="MapInfoList" {...props}>
			{items?.map(({ label, ref }) => {
				const handleText = () => ref.current?.textContent;

				return (
					<div className="flex items-start justify-between gap-2 border-t py-2 first:border-t-0" key={label}>
						<div>
							<p className="m-0 mb-0.5 text-[11px] text-muted-foreground">{label}</p>

							<p className="m-0 whitespace-pre font-mono text-xs leading-normal" ref={ref} />
						</div>

						<CopyButton copyText={handleText} />
					</div>
				);
			})}
		</div>
	);
}
