/**
 * 맵 컨트롤러 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 15:07:16
 */

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

import LayerSelect from '#/organism/map/LayerSelect';
import MapInfoPopover from '#/organism/map/MapInfoPopover';

export interface MapControllerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	/**
	 * 방향
	 */
	direction?: 'top' | 'bottom';
}

/**
 * 맵 컨트롤러 organism 컴포넌트 반환 메서드
 *
 * @param {MapControllerProps} param0 MapControllerProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapController({ direction, className, children, ...props }: MapControllerProps): React.JSX.Element {
	return (
		<div
			className={cn('absolute top-2 right-2 z-10 flex items-center gap-1.5', className)}
			data-testid="MapController"
			{...props}
		>
			{direction !== 'bottom' && children}

			<div className="flex items-center gap-1.5">
				<LayerSelect defaultValue="base-google-road" />
				<MapInfoPopover />
			</div>

			{direction === 'bottom' && children}
		</div>
	);
}
