/**
 * 기본 팝업 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 16:18:33
 */

import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MouseEventHandler, ReactNode } from 'react';

export interface BasicPopupBody
{
	/**
	 * 키
	 */
	key: string;

	/**
	 * 값
	 */
	value: string;
}

export interface BasicPopupProps extends PaperProps
{
	/**
	 * 아이디
	 */
	id: string;

	/**
	 * 타이틀
	 */
	title?: string;

	/**
	 * 리스트
	 */
	list?: BasicPopupBody[];

	/**
	 * 닫기 이벤트 메서드
	 */
	onClose?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 기본 팝업 molecule 컴포넌트 반환 메서드
 *
 * @param {BasicPopupProps} param0: BasicPopupProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicPopup({ id, title = '-', list, onClose, ...props }: BasicPopupProps): ReactNode
{
	return (
		<Paper data-component='MapPopup' id={id} {...props}>
			<Stack gap={1} maxWidth={200} padding={1}>
				<Stack alignItems='center' direction='row' gap={1} justifyContent='space-between'>
					<Typography color='primary' fontWeight='bold'>{title}</Typography>

					{onClose ? (
						<IconButton size='small' onClick={onClose}>
							<Close fontSize='inherit' />
						</IconButton>
					) : null}
				</Stack>

				{list ? (
					<Stack>
						{list.map(({ key, value }, num) => (
							<Stack alignItems='center' direction='row' gap={1} key={num}>
								<Typography fontWeight='bold' variant='caption' width={70}>{key}</Typography>
								<Typography variant='caption'>{value}</Typography>
							</Stack>
						))}
					</Stack>
				) : null}
			</Stack>
		</Paper>
	);
}