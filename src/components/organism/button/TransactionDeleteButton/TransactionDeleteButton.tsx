/**
 * 트랜잭션 삭제 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 02:45:06
 */

'use client';

import { useDeleteFeature } from '@gis-dev/api/wfs';
import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import { MapContext } from '@gis-dev/script/context/map';
import { modalStore } from '@gis-dev/script/states/modal';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FeatureLike } from 'ol/Feature';
import Select, { SelectEvent } from 'ol/interaction/Select';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

/**
 * 트랜잭션 삭제 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionDeleteButton(): ReactNode
{
	const { map } = useContext(MapContext);

	const { setModal } = modalStore();

	const [ featureState, setFeatureState ] = useState<FeatureLike | undefined>();

	const { mutateAsync } = useDeleteFeature({
		onSuccess: () =>
		{
			// 맵이 유효할 경우
			if (map)
			{
				setFeatureState(undefined);
				setModal(undefined);

				const layer = map.getAllLayers().find((i) => i.get('name') === 'wfs');
				layer?.getSource()?.refresh();

				const popup = map.getOverlayById('popup');
				popup.setPosition(undefined);
			}
		}
	});

	const handleClick = useCallback(() =>
	{
		const id = featureState?.getId();

		// 피쳐 아이디가 유효할 경우
		if (id)
		{
			setModal({
				body: (
					<Stack alignItems='center' gap={1}>
						<Typography color='primary' fontWeight='bold'>{id}</Typography>
						<Typography variant='caption'>정말 해당 피쳐를 삭제하시겠습니까?</Typography>
					</Stack>
				),
				onConfirm: () =>
				{
					mutateAsync(id);
				},
				title: '트랜잭션 삭제',
				type: 'info'
			});
		}
	}, [ mutateAsync, featureState, setModal ]);

	useEffect(() =>
	{
		const select = map?.getInteractions().getArray().find((i) => i.get('name') === 'clickSelect') as Select | undefined;

		const selectHandle = (e: SelectEvent): void =>
		{
			setFeatureState(e.selected.length > 0 ? e.selected[0] : undefined);
		};

		select?.on('select', selectHandle);

		return () =>
		{
			select?.un('select', selectHandle);
		};
	}, [ map, featureState, setFeatureState ]);

	return (
		<BasicIconButton bgcolor={featureState ? 'crimson' : 'gainsboro'} disabled={featureState === undefined} onClick={handleClick}>
			<Delete htmlColor='white' />
		</BasicIconButton>
	);
}