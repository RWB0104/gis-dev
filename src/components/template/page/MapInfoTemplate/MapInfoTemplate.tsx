/**
 * 맵 정보 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 16:42:41
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import SeoulMap from '@gis-dev/components/organism/map/SeoulMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 맵 정보 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function MapInfoTemplate(): ReactNode
{
	return (
		<SeoulMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<HowToPlayButton defaultOpen>
					<Stack>
						<Typography variant='caption'>지도를 사용하다보면, 지도의 여러 정보가 필요한 순간이 반드시 생기게 됩니다.</Typography>
						<Typography variant='caption'>우측 하단의 패널은 지도에서 자주 사용할만한 정보를 모아 표시해주고 있습니다.</Typography>
						<Typography variant='caption'>주요 정보는 아래와 같습니다.</Typography>
						<br />

						<Typography variant='caption'>🌍 EPSG 좌표계</Typography>
						<Typography variant='caption'>🔍 현재 줌 레벨</Typography>
						<Typography variant='caption'>🗺️ 바운더리 좌표</Typography>
						<Typography variant='caption'>📍 중심 좌표</Typography>
						<Typography variant='caption'>🖱️ 마우스 커서 좌표</Typography>
						<br />

						<Typography variant='caption'>마우스 좌표를 제외한 대부분의 정보는 View 객체에서 얻을 수 있습니다.</Typography>
						<br />

						<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/03/21/gis-guide-for-programmer-11' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
					</Stack>
				</HowToPlayButton>
			</BasicPanel>
		</SeoulMap>
	);
}