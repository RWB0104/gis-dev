/**
 * 레이어 셀렉트 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 17:12:48
 */

'use client';

import { LayersIcon } from 'lucide-react';
import { type ComponentProps, use } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@gis-dev/shadcn-ui-pack/components/ui/select';

const OPTIONS = [
	{
		label: 'OSM',
		value: 'base-osm'
	},
	{
		label: 'Google 로드맵',
		value: 'base-google-road'
	},
	{
		label: 'Google 지형도',
		value: 'base-google-terrain'
	},
	{
		label: 'Google 변경 로드맵',
		value: 'base-google-alter'
	},
	{
		label: 'Google 위성지도',
		value: 'base-google-satellite'
	},
	{
		label: 'Google 하이브리드 맵',
		value: 'base-google-hybrid'
	}
];

type SelectProps<T, K extends boolean | undefined = false> = ComponentProps<typeof Select<T, K>>;

export interface LayerSelectProps<T, K extends boolean | undefined = false> extends SelectProps<T, K> {
	/**
	 * 클래스명
	 */
	className?: string;
}

/**
 * 레이어 셀렉트 organism 컴포넌트 반환 메서드
 *
 * @param {LayerSelectProps} param0 LayerSelectProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function LayerSelect<T, K extends boolean | undefined = false>({
	onValueChange,
	...props
}: LayerSelectProps<T, K>): React.JSX.Element {
	const { map } = use(MapContext);

	const handleChange: SelectProps<T, K>['onValueChange'] = (value, e) => {
		onValueChange?.(value, e);

		if (map === undefined) {
			return;
		}

		map.getAllLayers()
			.filter((layer) => `${layer.get('name')}`.startsWith('base-'))
			.forEach((layer) => {
				map.removeLayer(layer);
			});

		const selectedLayer = Object.values(baseLayer).find((layer) => `${layer.get('name')}` === value);

		if (selectedLayer) {
			map.addLayer(selectedLayer);
		}
	};

	return (
		<div className="rounded-md bg-background" data-testid="LayerSelect">
			<Select<T, K> items={OPTIONS} onValueChange={handleChange} {...props}>
				<SelectTrigger aria-label="베이스 레이어" className="w-36 sm:w-48">
					<LayersIcon />

					<SelectValue>
						{(selected: string) => (
							<span className="min-w-0 truncate">{OPTIONS.find((i) => i.value === selected)?.label}</span>
						)}
					</SelectValue>
				</SelectTrigger>

				<SelectContent align="end" alignItemWithTrigger={false}>
					{OPTIONS.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
