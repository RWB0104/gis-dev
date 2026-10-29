/**
 * 히트 컨트롤러 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 18:44:16
 */

import { Heatmap } from 'ol/layer';
import { type ComponentProps, use, useEffect, useState } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { Slider } from '@gis-dev/shadcn-ui-pack/components/ui/slider';

type SliderProps = ComponentProps<typeof Slider>;

interface HeatControllerForm {
	/**
	 * 블러
	 */
	blur: number;

	/**
	 * 반지름
	 */
	radius: number;
}

/**
 * 히트 컨트롤러 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function HeatController(): React.JSX.Element {
	const { map } = use(MapContext);

	const [formState, setFormState] = useState<HeatControllerForm>({
		blur: 20,
		radius: 20
	});

	const handleBlurChange: SliderProps['onValueChange'] = (value) => {
		if (typeof value !== 'number') {
			return;
		}

		setFormState((state) => ({
			...state,
			blur: value
		}));
	};

	const handleRadiusChange: SliderProps['onValueChange'] = (value) => {
		if (typeof value !== 'number') {
			return;
		}

		setFormState((state) => ({
			...state,
			radius: value
		}));
	};

	useEffect(() => {
		const layer = map?.getAllLayers().find((i) => i.get('name') === 'wfs');

		if (layer instanceof Heatmap) {
			layer.setBlur(formState.blur);
		}
	}, [map, formState.blur]);

	useEffect(() => {
		const layer = map?.getAllLayers().find((i) => i.get('name') === 'wfs');

		if (layer instanceof Heatmap) {
			layer.setRadius(formState.radius);
		}
	}, [map, formState.radius]);

	return (
		<div className="grid w-full grid-cols-[auto_1fr_25px] items-center gap-x-2 gap-y-4 rounded-md bg-background p-4">
			<p className="whitespace-nowrap text-xs">블러</p>
			<Slider max={100} min={0} name="blur" onValueChange={handleBlurChange} value={formState.blur} />
			<p className="whitespace-nowrap text-end text-xs">{formState.blur}</p>

			<p className="whitespace-nowrap text-xs">반지름</p>
			<Slider max={100} min={0} name="radius" onValueChange={handleRadiusChange} value={formState.radius} />
			<p className="whitespace-nowrap text-end text-xs">{formState.radius}</p>
		</div>
	);
}
