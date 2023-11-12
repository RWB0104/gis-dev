/**
 * 헤더 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:33:52
 */

import { montserrat } from '@gis-dev/components/organism/global/AppThemeProvider';
import { APP_INFO } from '@gis-dev/script/common/env';
import Menu from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

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
	const { palette: { background } } = useTheme();

	return (
		<Box
			bgcolor={background.default}
			boxShadow='0px 3px 10px #00000022'
			data-component='Header'
			left={0}
			position='sticky'
			top={0}
			width='100%'
			zIndex={10001}
			{...props}
		>
			<Stack alignItems='center' flexDirection='row' gap={2} padding={1} paddingLeft={3} paddingRight={3}>
				{onMenuClick ? (
					<IconButton size='small' onClick={onMenuClick}>
						<Menu />
					</IconButton>
				) : null}

				<Link href='/'>
					<Stack justifyContent='center'>
						<Image alt={APP_INFO.title} height={24} src={APP_INFO.image} width={24} />
					</Stack>
				</Link>

				<Link href='/'>
					<Typography fontFamily={montserrat.style.fontFamily} variant='h6'>{APP_INFO.title}</Typography>
				</Link>
			</Stack>
		</Box>
	);
}