/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 18:34:32
 */

import { usePostFeature } from '@gis-dev/api/wfs';
import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import TransactionInsertModal, { TransactionInsertModalConfirmHandler } from '@gis-dev/components/organism/modal/TransactionInsertModal';
import { MapContext } from '@gis-dev/script/context/map';
import { draws } from '@gis-dev/script/map/interactions';
import { transactionLayer } from '@gis-dev/script/map/layers';
import Add from '@mui/icons-material/Add';
import { ModalProps } from '@mui/material/Modal';
import { FeatureLike } from 'ol/Feature';
import { Geometry, Polygon } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionInsertButton(): ReactNode
{
	const interactions = draws.drawInteraction;

	const { map } = useContext(MapContext);

	const { mutateAsync } = usePostFeature({
		onSuccess: () =>
		{
			// 맵이 유효할 경우
			if (map)
			{
				const layer = map.getAllLayers().find((i) => i.get('name') === 'wfs');
				layer?.getSource()?.refresh();

				const source: VectorSource<Geometry> | null = transactionLayer.drawLayer.getSource();
				source?.clear();

				setFeaturesState(undefined);
			}
		}
	});

	const [ disabledState, setDisabledState ] = useState(false);
	const [ featuresState, setFeaturesState ] = useState<FeatureLike[] | undefined>();

	const handleClick = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const source: VectorSource<Geometry> | null = transactionLayer.drawLayer.getSource();
			source?.clear();

			interactions.set('name', 'draw');
			map.addInteraction(interactions);

			setDisabledState(true);
		}
	}, [ map, interactions, setDisabledState ]);

	const handleDrawEnd = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			map.removeInteraction(interactions);

			const source: VectorSource<Geometry> | null = transactionLayer.drawLayer.getSource();
			const features = source?.getFeatures();

			setDisabledState(false);
			setFeaturesState(features);
		}
	}, [ map, setFeaturesState ]);

	const handleConfirm: TransactionInsertModalConfirmHandler = useCallback(async (data) =>
	{
		const polygons: Polygon[] = [];

		data.features.forEach((i) =>
		{
			const geometry = i.getGeometry();

			if (geometry && geometry.getType() === 'Polygon')
			{
				const polygon = geometry as Polygon;
				polygons.push(polygon);
			}
		});

		await mutateAsync({
			address: data.address,
			features: polygons,
			name: data.name
		});
	}, [ mutateAsync ]);

	const handleClose: ModalProps['onClose'] = useCallback(() =>
	{
		const source: VectorSource<Geometry> | null = transactionLayer.drawLayer.getSource();
		source?.clear();

		setFeaturesState(undefined);
	}, [ setFeaturesState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const drawLayer = map.getAllLayers().filter((layer) => layer.get('name') === 'draw')[0];

			// 드로우 벡터 레이어가 없을 경우
			if (!drawLayer)
			{
				map.addLayer(transactionLayer.drawLayer);
			}

			document.onkeyup = (e): void =>
			{
				// ESC를 눌렀을 경우
				if (e.key.toLowerCase() === 'escape')
				{
					const name = map.getInteractions().getArray().find((i) => i.get('name') === 'draw');

					// 드로우 인터렉션이 있을 경우
					if (name)
					{
						handleDrawEnd();
					}
				}
			};

			document.oncontextmenu = handleDrawEnd;
		}
	}, [ map, setDisabledState, handleDrawEnd ]);

	return (
		<>
			<BasicIconButton bgcolor='dodgerblue' disabled={disabledState} onClick={handleClick}>
				<Add htmlColor='white' />
			</BasicIconButton>

			<TransactionInsertModal features={featuresState} onClose={handleClose} onConfirm={handleConfirm} />
		</>
	);
}