/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:33:52
 */

import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';

import { APP_INFO } from '@gis-dev/script/common/env';

export interface HeaderProps extends BoxProps
{
	/**
	 * 메뉴 클릭 메서드
	 */
	onMenuClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * 헤더 molecule 컴포넌트 반환 메서드
 *
 * @param {HeaderProps} param0: HeaderProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Header({ onMenuClick, ...props }: HeaderProps): ReactNode
{
	return (
		<Box boxShadow='0px 3px 10px #00000033' data-component='Header' left={0} position='static' top={0} width='100%' {...props}>
			<Stack alignItems='center' flexDirection='row' gap={2} padding={1} paddingLeft={3} paddingRight={3}>
				{onMenuClick ? <IconButton onClick={onMenuClick} /> : null}

				<Image alt={APP_INFO.title} height={32} src={APP_INFO.image} width={32} />

				<Typography fontWeight='bold' variant='h6'>{APP_INFO.title}</Typography>
			</Stack>
		</Box>
	);
}