/**
 * 기본 팝업 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 16:18:33
 */

import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { CSSProperties, MouseEventHandler, ReactNode } from 'react';

import styles from './BasicPopup.module.scss';

const cn = classNames.bind(styles);

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

	/**
	 * 색상
	 */
	color?: CSSProperties['color'];
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
	 * 이미지
	 */
	thumb?: string;

	/**
	 * 리스트
	 */
	list?: BasicPopupBody[];

	/**
	 * 닫기 이벤트 메서드
	 */
	onClose?: MouseEventHandler<HTMLButtonElement>;

	/**
	 * 이미지 클릭 이벤트 메서드
	 */
	onThumbClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 기본 팝업 molecule 컴포넌트 반환 메서드
 *
 * @param {BasicPopupProps} param0: BasicPopupProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicPopup({ id, header = '-', thumb, list, onClose, onThumbClick, ...props }: BasicPopupProps): ReactNode
{
	return (
		<Paper data-component='MapPopup' id={id} {...props}>
			<Stack gap={1} maxWidth={250} padding={2}>
				<Stack alignItems='center' direction='row' gap={1} justifyContent='space-between'>
					<Typography color='primary' fontWeight='bold'>{header}</Typography>

					{onClose ? (
						<IconButton size='small' onClick={onClose}>
							<Close fontSize='inherit' />
						</IconButton>
					) : null}
				</Stack>

				{thumb ? (
					<Box
						border='1px solid'
						borderColor='ActiveBorder'
						borderRadius={2}
						overflow='hidden'
						paddingTop='100%'
						position='relative'
					>
						<Box height='100%' left={0} position='absolute' top={0} width='100%'>
							<ButtonBase className={cn('button')} onClick={onThumbClick}>
								<img alt={thumb} className={cn('image')} height='100%' src={thumb} width='100%' />
							</ButtonBase>
						</Box>
					</Box>
				) : null}

				{list ? (
					<Stack gap={1}>
						{list.map(({ key, value, link, color }, num) => (
							<Stack direction='row' gap={1} key={num}>
								<Stack width={70}>
									<Typography fontWeight='bold' variant='caption'>{key}</Typography>
								</Stack>

								<Stack flex={1}>
									{link ? (
										<Typography color={color} variant='caption'>
											<Link href={link} target='_blank'>{value}</Link>
										</Typography>
									) : (
										<Typography color={color} variant='caption'>{value}</Typography>
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