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
import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

export interface BasicPopupBody
{
	/**
	 * 키
	 */
	key: string | number;

	/**
	 * 값
	 */
	value: string | number;

	/**
	 * 링크
	 */
	link?: string;
}

export interface BasicPopupProps extends PaperProps
{
	/**
	 * 아이디
	 */
	id: string;

	/**
	 * 헤더
	 */
	header?: string | number;

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
export default function BasicPopup({ id, header = '-', list, onClose, ...props }: BasicPopupProps): ReactNode
{
	return (
		<Paper data-component='MapPopup' id={id} {...props}>
			<Stack gap={1} maxWidth={200} padding={2}>
				<Stack alignItems='center' direction='row' gap={1} justifyContent='space-between'>
					<Typography color='primary' fontWeight='bold'>{header}</Typography>

					{onClose ? (
						<IconButton size='small' onClick={onClose}>
							<Close fontSize='inherit' />
						</IconButton>
					) : null}
				</Stack>

				{list ? (
					<Stack>
						{list.map(({ key, value, link }, num) => (
							<Stack alignItems='center' direction='row' gap={1} key={num}>
								<Stack width={70}>
									<Typography fontWeight='bold' variant='caption'>{key}</Typography>
								</Stack>

								<Stack flex={1}>
									{link ? (
										<Typography color='primary' variant='caption'>
											<Link href={link} target='_blank'>{value}</Link>
										</Typography>

									) : (
										<Typography variant='caption'>{value}</Typography>
									)}
								</Stack>
							</Stack>
						))}
					</Stack>
				) : null}
			</Stack>
		</Paper>
	);
}