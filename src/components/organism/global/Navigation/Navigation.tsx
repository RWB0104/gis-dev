/**
 * 네비게이션 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:50:29
 */

import { MouseEventHandler, ReactNode, useCallback, useState } from 'react';

import Header from '@gis-dev/components/molecule/Header';
import Sidebar from '@gis-dev/components/molecule/Sidebar';

/**
 * 네비게이션 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Navigation(): ReactNode
{
	const [ isMenuOpenState, setMenuOpenState ] = useState(false);

	const handleMenuClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		setMenuOpenState((state) => !state);
	}, [ setMenuOpenState ]);

	return (
		<>
			<Header onMenuClick={handleMenuClick} />
			<Sidebar open={isMenuOpenState} />
		</>
	);
}