/**
 * 피쳐 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.13 Mon 01:54:34
 */

'use client';

import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import { MapContext } from '@gis-dev/script/context/map';
import PushPin from '@mui/icons-material/PushPin';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { ReactNode, useCallback, useContext, useEffect } from 'react';

const LAYER_NAME = 'feature';

/**
 * 피쳐 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function FeatureButton(): ReactNode
{
	const { map } = useContext(MapContext);

	const handleClick = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const source = map.getAllLayers().find((i) => i.get('name') === LAYER_NAME)?.getSource() as VectorSource | undefined;
			const center = map.getView().getCenter();

			// 소스, 중심값 모두 유효할 경우
			if (source && center)
			{
				const pixel = map.getPixelFromCoordinate(center);

				const features = map.getFeaturesAtPixel(pixel, { layerFilter: (i) => i.get('name') === LAYER_NAME });

				// 피쳐가 있을 경우
				if (features.length > 0)
				{
					features.forEach((i) => source.removeFeature(i as Feature));
				}

				// 피쳐가 없을 경우
				else
				{
					source.addFeature(new Feature({ geometry: new Point(center) }));
				}
			}
		}
	}, [ map ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const featureLayer = map.getAllLayers().find((i) => i.get('name') === LAYER_NAME);

			// 피쳐 레이어가 없을 경우
			if (!featureLayer)
			{
				const newLayer = new VectorLayer({
					properties: { name: LAYER_NAME },
					source: new VectorSource(),
					style: new Style({
						image: new Circle({
							fill: new Fill({ color: 'dodgerblue' }),
							radius: 7,
							stroke: new Stroke({
								color: 'black',
								width: 2
							})
						})
					}),
					zIndex: 10
				});

				map.addLayer(newLayer);
			}
		}

		const handleKeyUp = (e: KeyboardEvent): void =>
		{
			// 스페이스바를 누를 경우
			if (e.code === 'Space')
			{
				handleClick();
			}
		};

		document.addEventListener('keyup', handleKeyUp);

		return () =>
		{
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [ map, handleClick ]);

	return (
		<BasicIconButton bgcolor='dodgerblue' onClick={handleClick}>
			<PushPin htmlColor='white' />
		</BasicIconButton>
	);
}