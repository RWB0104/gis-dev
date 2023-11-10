/**
 * 앱 컴포넌트
 *
 * @author RWB
 * @since 2023.10.18 Wed 18:40:21
 */

import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 앱 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function App(): ReactNode
{
	return (
		<Stack gap={10}>
			<Link href='/osm'>osm</Link>
		</Stack>
	);
}