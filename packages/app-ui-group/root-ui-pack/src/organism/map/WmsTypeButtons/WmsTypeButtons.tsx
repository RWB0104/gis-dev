/**
 * WMS 타입 버튼 그룹 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 12:27:55
 */

'use client';

import { Grid2X2Icon, ImageIcon } from 'lucide-react';
import { type ComponentProps, type MouseEventHandler, use, useEffect, useState } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wmsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { ButtonGroup } from '@gis-dev/shadcn-ui-pack/components/ui/button-group';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

type WmsType = 'tile' | 'image';
type ButtonGroupType = ComponentProps<typeof ButtonGroup>;

export interface WmsTypeButtonsProps extends ButtonGroupType {
	/**
	 * 버튼 클래스
	 */
	buttonClassName?: string;

	/**
	 * 버튼 클릭 이벤트 메서드
	 */
	onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * WMS 타입 버튼 그룹 organism 컴포넌트 반환 메서드
 *
 * @param {WmsTypeButtonsProps} param0 WmsTypeButtonsProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WmsTypeButtons({ buttonClassName, onButtonClick, ...props }: WmsTypeButtonsProps): React.JSX.Element {
	const { map } = use(MapContext);

	const [typeState, setTypeState] = useState<WmsType>('tile');

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		onButtonClick?.(e);

		const { value } = e.currentTarget;

		setTypeState(value === 'image' ? 'image' : 'tile');
	};

	useEffect(() => {
		if (map === undefined) {
			return;
		}

		const layer = typeState === 'image' ? wmsLayer.sejongImageWmsLayer : wmsLayer.sejongTileWmsLayer;

		map.removeLayer(wmsLayer.sejongImageWmsLayer);
		map.removeLayer(wmsLayer.sejongTileWmsLayer);

		map.addLayer(layer);
	}, [map, typeState]);

	return (
		<ButtonGroup {...props}>
			<Button
				aria-label="tile mode"
				aria-pressed={typeState === 'tile'}
				className={cn(
					{
						'bg-sky-400 text-white hover:bg-sky-400/90 focus-visible:ring-sky-400/40': typeState === 'tile'
					},
					buttonClassName
				)}
				onClick={handleClick}
				value="tile"
				variant="secondary"
			>
				<Grid2X2Icon />
			</Button>

			<Button
				aria-label="image mode"
				aria-pressed={typeState === 'image'}
				className={cn(
					{
						'bg-sky-400 text-white hover:bg-sky-400/90 focus-visible:ring-sky-400/40': typeState === 'image'
					},
					buttonClassName
				)}
				onClick={handleClick}
				value="image"
				variant="secondary"
			>
				<ImageIcon />
			</Button>
		</ButtonGroup>
	);
}
