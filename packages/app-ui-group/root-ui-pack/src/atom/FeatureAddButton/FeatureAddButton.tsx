/**
 * 피쳐 추가 버튼 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.22 목 15:13:56
 */

'use client';

import { PinIcon } from 'lucide-react';
import { Feature } from 'ol';
import { type Geometry, Point } from 'ol/geom';
import type VectorSource from 'ol/source/Vector';
import {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	type MouseEventHandler,
	use,
	useEffect,
	useEffectEvent,
	useRef
} from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

export type FeatureAddButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

/**
 * 피쳐 추가 버튼 atom 컴포넌트 반환 메서드
 *
 * @param {FeatureAddButtonProps} param0 FeatureAddButtonProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function FeatureAddButton({ className, onClick, ...props }: FeatureAddButtonProps): React.JSX.Element {
	const { map } = use(MapContext);

	const sourceRef = useRef<VectorSource<Feature<Geometry>>>(null);

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: neutralize
	const addFeature = useEffectEvent(() => {
		if (map === undefined) {
			return;
		}

		if (sourceRef.current === null) {
			const hasFeatureLayer = map.getAllLayers().includes(transactionLayer.wfsFeatureVectorLayer);

			if (!hasFeatureLayer) {
				toast.add({
					description: 'feature 레이어가 존재하지 않습니다.',
					title: 'Feature action failed'
				});

				return;
			}

			const source = transactionLayer.wfsFeatureVectorLayer.getSource();

			if (source === null) {
				toast.add({
					description: '정의된 요소가 올바르지 않습니다. 새로고침 후 재시도해주세요.',
					title: 'Feature action failed'
				});

				return;
			}

			sourceRef.current = source;
		}

		const src = sourceRef.current;
		const center = map.getView().getCenter();

		if (src === null || center === undefined) {
			toast.add({
				description: '정의된 요소가 올바르지 않습니다. 새로고침 후 재시도해주세요.',
				title: 'Feature action failed'
			});

			return;
		}

		const pixel = map.getPixelFromCoordinate(center);
		const features = map.getFeaturesAtPixel(pixel, { layerFilter: (i) => i.get('name') === 'feature' });

		// 이미 피쳐가 있을 경우, 제거
		if (features.length > 0) {
			features.forEach((i) => {
				src.removeFeature(i as Feature);
			});
		}

		// 피쳐가 없을 경우
		else {
			src.addFeature(new Feature({ geometry: new Point(center) }));
		}
	});

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		onClick?.(e);

		addFeature();
	};

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			// 스페이스바를 누를 경우
			if (e.code === 'Space') {
				addFeature();
			}
		};

		document.addEventListener('keyup', handler);

		return () => {
			document.removeEventListener('keyup', handler);
		};
	}, []);

	return (
		<Button
			className={cn('bg-blue-600 text-white hover:bg-blue-600/90 focus-visible:ring-blue-600/40', className)}
			data-testid="FeatureAddButton"
			onClick={handleClick}
			{...props}
		>
			<PinIcon />
		</Button>
	);
}
