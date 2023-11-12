/**
 * 사이드바 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:53:44
 */

import { montserrat } from '@gis-dev/components/organism/global/AppThemeProvider';
import pkg from '@gis-dev/package';
import { APP_INFO, MENU_LIST } from '@gis-dev/script/common/env';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, MouseEventHandler, ReactNode } from 'react';

export interface SidebarProps extends DrawerProps
{
	/**
	 * 현재 링크
	 */
	currentLink?: string;

	/**
	 * 메뉴 아이템 클릭 이벤트
	 */
	onMenuItemClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * 사이드바 molecule 컴포넌트 반환 메서드
 *
 * @param {SidebarProps} param0: SidebarProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Sidebar({ currentLink, ...props }: SidebarProps): ReactNode
{
	return (
		<Drawer data-component='Sidebar' {...props}>
			<Stack
				alignItems='center'
				height='100%'
				justifyContent='space-between'
				minWidth={250}
				paddingTop='50px'
				width='100%'
			>
				<Stack alignItems='center' padding={4} width='100%'>
					<Image alt={APP_INFO.title} height={100} src={APP_INFO.image} width={100} />
				</Stack>

				<Stack width='100%'>
					{MENU_LIST.map(({ title, link, divide }) => (
						<Fragment key={`Sidebar-Link-${link}`}>
							<Box paddingLeft={1} paddingRight={1}>
								<Link href={link}>
									<Button fullWidth>
										<Stack
											alignItems='center'
											color={currentLink === link ? 'primary' : 'GrayText'}
											direction='row'
											fontSize='0.8rem'
											gap={1}
											textTransform='initial'
											width='100%'
										>
											<KeyboardArrowRight color='inherit' />

											<Typography color='inherit' fontSize='inherit'>{title}</Typography>
										</Stack>
									</Button>
								</Link>
							</Box>

							{divide ? (
								<Box padding={1}>
									<Divider />
								</Box>
							) : null}
						</Fragment>
					))}
				</Stack>

				<Stack alignItems='center' paddingBottom={4} paddingTop={4} spacing={1}>
					<Typography fontFamily={montserrat.style.fontFamily} variant='caption'>{APP_INFO.title}</Typography>
					<Typography color='GrayText' variant='caption'>{pkg.version}</Typography>
				</Stack>
			</Stack>
		</Drawer>
	);
}