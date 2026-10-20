/**
 * 맵 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 14:19:18
 */

'use client';

import type { MapOptions } from 'ol/Map';
import { type DetailedHTMLProps, type HTMLAttributes, useEffect, useRef } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { useMap } from '@gis-dev/openlayers-service-pack/hooks/map';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

export interface MapProviderProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	/**
	 * 옵션
	 */
	options?: MapOptions;
}

/**
 * 맵 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @param {MapProviderProps} param0 MapProviderProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapProvider({ options, className, ...props }: MapProviderProps): React.JSX.Element {
	const map = useMap(options);

	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		/* v8 ignore next 3 -- useMap은 마운트 후 항상 Map을 반환하므로 도달 불가능한 방어 분기 */
		if (map === undefined) {
			return;
		}

		map.setTarget(ref.current);

		return () => map.setTarget(undefined);
	}, [map]);

	return (
		<MapContext
			value={{
				map
			}}
		>
			<section
				className={cn('h-dvh w-full', className)}
				data-testid="MapProvider"
				ref={ref}
				suppressHydrationWarning
				{...props}
			/>
		</MapContext>
	);
}
