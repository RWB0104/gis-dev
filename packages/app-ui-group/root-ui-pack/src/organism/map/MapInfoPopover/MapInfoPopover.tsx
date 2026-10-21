/**
 * 맵 정보 popover organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 15:06:35
 */

'use client';

import { InfoIcon } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@gis-dev/shadcn-ui-pack/components/ui/popover';

import MapInfoPanel from '#/organism/map/MapInfoPanel';

/**
 * 맵 정보 popover organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapInfoPopover(): React.JSX.Element {
	const [open, setOpen] = useState(false);

	const handleOpenChange: ComponentProps<typeof Popover>['onOpenChange'] = (next, details) => {
		if (details.reason === 'outside-press') {
			return;
		}

		setOpen(next);
	};

	return (
		<Popover onOpenChange={handleOpenChange} open={open}>
			<PopoverTrigger render={<Button aria-label="맵 정보" size="icon" variant="secondary" />}>
				<InfoIcon />
			</PopoverTrigger>

			<PopoverContent align="end" className="w-[min(20rem,calc(100vw-1rem))]" side="bottom">
				<PopoverTitle>맵 정보</PopoverTitle>

				<MapInfoPanel />
			</PopoverContent>
		</Popover>
	);
}
