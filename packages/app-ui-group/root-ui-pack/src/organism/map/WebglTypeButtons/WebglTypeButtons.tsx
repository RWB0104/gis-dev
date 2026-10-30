/**
 * WebGL 타입 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.30 금 18:06:19
 */

import { VectorPolygonIcon, ZapIcon } from 'lucide-react';
import { type ComponentProps, type MouseEventHandler, use, useEffect, useState } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { ButtonGroup } from '@gis-dev/shadcn-ui-pack/components/ui/button-group';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

type LayerType = 'webgl' | 'vector';
type ButtonGroupType = ComponentProps<typeof ButtonGroup>;

export interface WebglTypeButtonsProps extends ButtonGroupType {
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
 * WebGL 타입 버튼 organism 컴포넌트 반환 메서드
 *
 * @param {WebglTypeButtonsProps} param0 WebglTypeButtonsProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function WebglTypeButtons({
	buttonClassName,
	onButtonClick,
	...props
}: WebglTypeButtonsProps): React.JSX.Element {
	const { map } = use(MapContext);

	const [typeState, setTypeState] = useState<LayerType>('webgl');

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		onButtonClick?.(e);

		const { value } = e.currentTarget;

		setTypeState(value === 'vector' ? 'vector' : 'webgl');
	};

	useEffect(() => {
		if (map === undefined) {
			return;
		}

		const layer = typeState === 'vector' ? wfsLayer.wfsCityVectorLayer : wfsLayer.wfsCityWebglLayer;

		map.removeLayer(wfsLayer.wfsCityVectorLayer);
		map.removeLayer(wfsLayer.wfsCityWebglLayer);

		map.addLayer(layer);
	}, [map, typeState]);

	return (
		<ButtonGroup {...props}>
			<Button
				aria-label="tile mode"
				aria-pressed={typeState === 'webgl'}
				className={cn(
					{
						'bg-sky-400 text-white hover:bg-sky-400/90 focus-visible:ring-sky-400/40': typeState === 'webgl'
					},
					buttonClassName
				)}
				onClick={handleClick}
				value="webgl"
				variant="secondary"
			>
				<ZapIcon />
			</Button>

			<Button
				aria-label="image mode"
				aria-pressed={typeState === 'vector'}
				className={cn(
					{
						'bg-sky-400 text-white hover:bg-sky-400/90 focus-visible:ring-sky-400/40': typeState === 'vector'
					},
					buttonClassName
				)}
				onClick={handleClick}
				value="vector"
				variant="secondary"
			>
				<VectorPolygonIcon />
			</Button>
		</ButtonGroup>
	);
}
