/**
 * 기본 모달 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 23:53:09
 */

import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MouseEventHandler, ReactNode, useCallback } from 'react';

export interface BasicModalProps extends DialogProps
{
	/**
	 * 헤더
	 */
	header: ReactNode;

	/**
	 * 확인 이벤트 메서드
	 */
	onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 기본 모달 molecule 컴포넌트 반환 메서드
 *
 * @param {BasicModalProps} param0: BasicModalProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicModal({ header, onConfirm, children, ...props }: BasicModalProps): ReactNode
{
	const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback((e) =>
	{
		props.onClose?.(e, 'escapeKeyDown');
	}, [ props.onClose ]);

	return (
		<Dialog data-component='BasicModal' {...props}>
			<DialogTitle>{header}</DialogTitle>

			<DialogContent>{children}</DialogContent>

			<DialogActions>
				{onConfirm ? <Button>확인</Button> : null}
				{props.onClose ? <Button onClick={handleClose}>닫기</Button> : null}
			</DialogActions>
		</Dialog>
	);
}