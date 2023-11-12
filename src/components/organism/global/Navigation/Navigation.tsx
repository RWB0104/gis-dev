/**
 * 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:50:29
 */

'use client';

import Header from '@gis-dev/components/molecule/Header';
import Sidebar from '@gis-dev/components/molecule/Sidebar';
import { ModalProps } from '@mui/material/Modal';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';

/**
 * 네비게이션 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Navigation(): ReactNode
{
	const pathname = usePathname();

	const [ isMenuOpenState, setMenuOpenState ] = useState(false);

	const handleMenuClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		setMenuOpenState((state) => !state);
	}, [ setMenuOpenState ]);

	const handleClose: ModalProps['onClose'] = useCallback(() =>
	{
		setMenuOpenState(false);
	}, [ setMenuOpenState ]);

	useEffect(() =>
	{
		setMenuOpenState(false);
	}, [ pathname, setMenuOpenState ]);

	return (
		<>
			<Header onMenuClick={handleMenuClick} />
			<Sidebar
				currentLink={pathname}
				open={isMenuOpenState}
				onClose={handleClose}
			/>
		</>
	);
}