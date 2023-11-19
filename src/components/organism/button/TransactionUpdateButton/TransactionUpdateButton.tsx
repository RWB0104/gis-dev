/**
 * 트랜잭션 수정 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.18 Sat 02:22:13
 */

import { useUpdateFeature } from '@gis-dev/api/wfs';
import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import TransactionUpdateModal, { TransactionUpdateModalConfirmHandler } from '@gis-dev/components/organism/page/TransactionUpdateModal';
import { MapContext } from '@gis-dev/script/context/map';
import { wfsLayer } from '@gis-dev/script/map/layers';
import Edit from '@mui/icons-material/Edit';
import { ModalProps } from '@mui/material/Modal';
import { FeatureLike } from 'ol/Feature';
import { Geometry, MultiPolygon, Polygon } from 'ol/geom';
import Modify from 'ol/interaction/Modify';
import Select, { SelectEvent } from 'ol/interaction/Select';
import { ObjectEvent } from 'ol/Object';
import VectorSource from 'ol/source/Vector';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface FeatureStateProps
{
	/**
	 * 선택된 피쳐
	 */
	selected?: FeatureLike[];

	/**
	 * 선택 해제된 피쳐
	 */
	deselected?: FeatureLike[];
}

/**
 * 트랜잭션 수정 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionUpdateButton(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ featureState, setFeatureState ] = useState<FeatureStateProps>({});
	const [ modifiedState, setModifiedState ] = useState<FeatureLike[] | undefined>();

	const { mutateAsync } = useUpdateFeature({
		onSuccess: () =>
		{
			// 맵이 유효할 경우
			if (map)
			{
				const layer = map.getAllLayers().find((i) => i.get('name') === 'wfs');
				layer?.getSource()?.refresh();

				setModifiedState(undefined);
			}
		}
	});

	const handleConfirm: TransactionUpdateModalConfirmHandler = useCallback(async (data) =>
	{
		const polygons: Polygon[] = [];

		data.features.forEach((i) =>
		{
			const geometry = i.getGeometry();

			// 지오메트리가 유효할 경우
			if (geometry)
			{
				// 폴리곤일 경우
				if (geometry.getType() === 'Polygon')
				{
					const polygon = geometry as Polygon;

					polygons.push(polygon);
				}

				// 멀티폴리곤일 경우
				else if (geometry.getType() === 'MultiPolygon')
				{
					const multiPolygon = geometry as MultiPolygon;

					multiPolygon.getPolygons().forEach((i) => polygons.push(i));
				}
			}
		});

		// 폴리곤이 하나도 없을 경우
		if (polygons.length === 0)
		{
			return;
		}

		await mutateAsync({
			address: data.address,
			features: polygons,
			id: data.id,
			name: data.name
		});
	}, [ mutateAsync ]);

	const handleClose: ModalProps['onClose'] = useCallback(() =>
	{
		const source: VectorSource<Geometry> | null = wfsLayer.wfsTransactionLayer.getSource();
		source?.refresh();

		setModifiedState(undefined);
	}, [ setModifiedState ]);

	const setInteractionActive = useCallback((isActive: boolean) =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const allows = [ 'snap', 'modify' ];

			map.getInteractions().forEach((i) =>
			{
				// 대상에 해당될 경우
				if (allows.includes(i.get('name')))
				{
					i.setActive(isActive);
				}
			});
		}
	}, [ map ]);

	const handleClick = useCallback(() =>
	{
		map?.getOverlayById('popup').setPosition(undefined);

		setInteractionActive(true);
	}, [ map, setInteractionActive ]);

	useEffect(() =>
	{
		const select = map?.getInteractions().getArray().find((i) => i.get('name') === 'clickSelect') as Select | undefined;
		const modify = map?.getInteractions().getArray().find((i) => i.get('name') === 'modify') as Modify | undefined;

		const selectHandle = (e: SelectEvent): void =>
		{
			setFeatureState({
				deselected: e.deselected.length > 0 ? e.deselected : undefined,
				selected: e.selected.length > 0 ? e.selected : undefined
			});
		};

		const modifyHandle = (e: ObjectEvent): void =>
		{
			setModifiedState(e.oldValue ? featureState.deselected : undefined);
		};

		select?.on('select', selectHandle);
		modify?.on('propertychange', modifyHandle);

		return () =>
		{
			select?.un('select', selectHandle);
			modify?.un('propertychange', modifyHandle);
		};
	}, [ map, featureState, setFeatureState, setModifiedState ]);

	useEffect(() =>
	{
		setInteractionActive(false);
	}, [ featureState, setInteractionActive ]);

	return (
		<>
			<BasicIconButton
				bgcolor={featureState.selected ? 'cornflowerblue' : 'gainsboro'}
				data-component='TransactionUpdateButton'
				disabled={featureState.selected === undefined}
				onClick={handleClick}
			>
				<Edit htmlColor='white' />
			</BasicIconButton>

			<TransactionUpdateModal features={modifiedState} onClose={handleClose} onConfirm={handleConfirm} />
		</>
	);
}