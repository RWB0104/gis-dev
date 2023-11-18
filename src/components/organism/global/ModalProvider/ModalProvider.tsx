/**
 * 모달 프로바이더 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 12:33:57
 */

'use client';

import BasicModal from '@gis-dev/components/molecule/BasicModal';
import { modalStore } from '@gis-dev/script/states/modal';
import Cancel from '@mui/icons-material/Cancel';
import Info from '@mui/icons-material/Info';
import { useTheme } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode, useCallback, useMemo } from 'react';

/**
 * 모달 프로바이더 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ModalProvider(): ReactNode
{
	const { palette } = useTheme();

	const { modal, setModal } = modalStore();

	const handleClose: ModalProps['onClose'] = useCallback(() =>
	{
		setModal(undefined);
	}, [ setModal ]);

	const header = useMemo(() =>
	{
		switch (modal?.type)
		{
			case 'info': return (
				<Stack alignItems='center' color={palette.info.main} flexDirection='row' gap={1}>
					<Info />

					<Typography fontWeight='bold'>{modal.title}</Typography>
				</Stack>
			);

			case 'error': return (
				<Stack alignItems='center' color={palette.error.main} flexDirection='row' gap={1}>
					<Cancel />

					<Typography fontWeight='bold'>{modal.title}</Typography>
				</Stack>
			);

			default: return '';
		}
	}, [ modal, palette ]);

	return (
		<BasicModal header={header} open={modal !== undefined} onClose={handleClose} onConfirm={modal?.onConfirm}>
			{modal?.body}
		</BasicModal>
	);
}