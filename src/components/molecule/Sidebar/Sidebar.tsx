/**
 * 사이드바 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:53:44
 */

import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { ReactNode } from 'react';

export interface SidebarProps extends DrawerProps
{
	/**
	 * 메뉴 리스트
	 */
	menuList?: string[];
}

/**
 * 사이드바 molecule 컴포넌트 반환 메서드
 *
 * @param {SidebarProps} param0: SidebarProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function Sidebar({ ...props }: SidebarProps): ReactNode
{
	return (
		<Drawer data-component='Sidebar' {...props} />
	);
}