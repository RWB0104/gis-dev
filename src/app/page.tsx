/**
 * 앱 컴포넌트
 *
 * @author RWB
 * @since 2023.10.18 Wed 18:40:21
 */

import { getMetadata } from '@gis-dev/script/common/util';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = getMetadata({ title: '홈' });

/**
 * 앱 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function App(): ReactNode
{
	return (
		<Stack gap={10}>
			<Link href='/osm'>
				<Typography>osm</Typography>
			</Link>
		</Stack>
	);
}