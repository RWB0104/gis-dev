/**
 * VWorld template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 16:11:50
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import VWorldMap from '@gis-dev/components/organism/map/VWorldMap';
import VWorldPanel from '@gis-dev/components/organism/panel/VWorldPanel';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * VWorld template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function VWorldTemplate(): ReactNode
{
	return (
		<VWorldMap>
			<VWorldPanel />

			<BasicPanel right={20} top={20}>
				<HowToPlayButton defaultOpen>
					<Stack>
						<Typography variant='caption'>OSM을 보면서 어딘가 아쉬운 점은 없었나요?</Typography>
						<Typography variant='caption'>사실 OSM은 국내에서 주력으로 쓰기 좋은 지도는 아닙니다.</Typography>
						<Typography variant='caption'>오픈 소스의 자유로움으로 인해, 정보가 디테일하지 않을 뿐더러, 디자인도 투박합니다.</Typography>
						<br />

						<Typography variant='caption'><Typography color='primary' component='span' variant='inherit'>VWorld</Typography>는 국내에 특화된 타일맵을 OpenAPI 형태로 제공하고 있습니다.</Typography>
						<Typography variant='caption'>국가에서 제공하는 지도로, 비교적 정확한 정보와 사용자 친화적인 디자인을 가지고 있습니다.</Typography>
						<Typography variant='caption'>이를 통해 국내 친화적인 지도 서비스를 제공하는 것이 가능합니다.</Typography>
						<br />

						<Typography variant='caption'>VWorld에서는 <Typography color='primary' component='span' variant='inherit'>기본적인 지도는 물론, 백지도, 위성지도와 같은 다양한 레이어</Typography>를 제공합니다.</Typography>
						<Typography variant='caption'>우측 하단 메뉴에서 지도를 변경해보세요.</Typography>
						<br />

						<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/03/21/gis-guide-for-programmer-11' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 11. VWorld 맵 만들기</Typography></Link>를 참조해주세요.</Typography>
						<Typography variant='caption'>자세한 설명은 <Link href='https://www.vworld.kr/v4po_main.do' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>VWorld 공식 홈페이지</Typography></Link>에서 VWorld 서비스를 더 알아볼 수도 있습니다.</Typography>
					</Stack>
				</HowToPlayButton>
			</BasicPanel>
		</VWorldMap>
	);
}