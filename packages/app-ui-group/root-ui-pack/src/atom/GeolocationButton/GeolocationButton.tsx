/**
 * 지오로케이션 버튼 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 19:09:26
 */

'use client';

import { LocateFixedIcon } from 'lucide-react';
import proj4 from 'proj4';
import { type ButtonHTMLAttributes, type DetailedHTMLProps, type MouseEventHandler, use, useState } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

export type GeolocationButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

/**
 * 지오로케이션 버튼 atom 컴포넌트 반환 메서드
 *
 * @param {GeolocationButtonProps} param0 GeolocationButtonProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GeolocationButton({ className, onClick, ...props }: GeolocationButtonProps): React.JSX.Element {
	const { map } = use(MapContext);

	const [isPendingState, setIsPendingState] = useState(false);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		onClick?.(e);

		if (map === undefined) {
			return;
		}

		setIsPendingState(true);

		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				const epsg = map.getView().getProjection().getCode();

				const coord = proj4('EPSG:4326', epsg, [longitude, latitude]);

				map.getView().animate({
					center: coord,
					duration: 2000
				});

				setIsPendingState(false);
			},
			(error) => {
				toast.add({
					description: error.message,
					title: `Geolocation failed - ${error.code}`
				});

				setIsPendingState(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 3000
			}
		);
	};

	return (
		<Button
			className={cn('bg-emerald-600 text-white hover:bg-emerald-600/90 focus-visible:ring-emerald-600/40', className)}
			data-testid="GeolocationButton"
			disabled={isPendingState}
			onClick={handleClick}
			{...props}
		>
			<LocateFixedIcon />
		</Button>
	);
}
