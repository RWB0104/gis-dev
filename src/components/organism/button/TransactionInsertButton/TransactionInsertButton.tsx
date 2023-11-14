/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 18:34:32
 */

import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import { MapContext } from '@gis-dev/script/context/map';
import { draws } from '@gis-dev/script/map/interactions';
import { transactionLayer } from '@gis-dev/script/map/layers';
import Add from '@mui/icons-material/Add';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionInsertButton(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ disabledState, setDisabledState ] = useState(false);

	const handleClick = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const interactions = draws.drawInteraction;

			interactions.once('drawstart', () =>
			{
				const source: VectorSource<Geometry> | null = transactionLayer.drawLayer.getSource();
				source?.clear();
			});

			interactions.once('drawend', (e) =>
			{
				const source: VectorSource<Geometry> | null = transactionLayer.drawLayer.getSource();
				source?.addFeature(e.feature.clone());

				console.log(source?.getFeatures());
			});

			map.addInteraction(interactions);

			setDisabledState(true);
		}
	}, [ map, setDisabledState ]);

	const handleDrawEnd = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			map.removeInteraction(draws.drawInteraction);

			setDisabledState(false);
		}
	}, [ map ]);

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
					handleDrawEnd();
				}
			};

			document.oncontextmenu = handleDrawEnd;
		}
	}, [ map, setDisabledState, handleDrawEnd ]);

	return (
		<BasicIconButton bgcolor='dodgerblue' disabled={disabledState} onClick={handleClick}>
			<Add htmlColor='white' />
		</BasicIconButton>
	);
}