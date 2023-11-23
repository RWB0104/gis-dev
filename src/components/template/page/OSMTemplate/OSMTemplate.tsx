/**
 * OSM template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 16:05:32
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import OSMMap from '@gis-dev/components/organism/map/OSMMap';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * OSM template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function OSMTemplate(): ReactNode
{
	return (
		<OSMMap>
			<BasicPanel right={20} top={20}>
				<HowToPlayButton defaultOpen>
					<Stack>
						<Typography variant='caption'>이 페이지는 베이스 레이어를 <Typography color='primary' component='span' variant='inherit'>Open Street Map(OSM)</Typography>으로 표현한 예제 페이지입니다.</Typography>
						<Typography variant='caption'>OSM은 누구나 기여할 수 있는 오픈 소스 지도입니다. 무료로 세계지도 타일맵을 사용할 수 있다는 장점이 있습니다.</Typography>
						<Typography variant='caption'>OpenLayers는 OSM 객체를 기본으로 제공하므로, OSM을 간단하게 적용할 수 있습니다.</Typography>
						<Typography variant='caption'>직접 지도를 조작하여 OSM 지도를 체험해보세요.</Typography>
						<br />

						<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/03/19/gis-guide-for-programmer-10' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
					</Stack>
				</HowToPlayButton>
			</BasicPanel>
		</OSMMap>
	);
}