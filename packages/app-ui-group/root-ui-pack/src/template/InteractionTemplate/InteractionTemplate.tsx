/**
 * 인터렉션 template 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 19:44:03
 */

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

export type InteractionTemplateProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function InteractionTemplate({ className, ...props }: InteractionTemplateProps): React.JSX.Element {
	return (
		<div
			className={cn('absolute bottom-2 left-2 z-2 flex flex-col gap-2', className)}
			data-testid="InteractionTemplate"
			{...props}
		/>
	);
}
