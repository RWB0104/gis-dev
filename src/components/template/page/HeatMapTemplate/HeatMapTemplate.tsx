/**
 * 히트맵 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:52:55
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import HeatMap from '@gis-dev/components/organism/map/HeatMap';
import HeatMapPanel from '@gis-dev/components/organism/panel/HeatMapPanel';
import { position3857 } from '@gis-dev/script/map/positions';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 히트맵 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMapTemplate(): ReactNode
{
	return (
		<HeatMap>
			<HeatMapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>이번 예시에서는 히트맵을 표현해봅니다.</Typography>
							<Typography variant='caption'>히트맵은 각각의 데이터가 아닌 전체적인 데이터의 경향을 표현한다는 특징이 있습니다.</Typography>
							<Typography variant='caption'>여러 매체에서 바이러스 감염 지도 같은 걸 표현할 때 한 번쯤 보셨을 겁니다.</Typography>
							<br />

							<Typography variant='caption'>전국 스타벅스의 위치를 히트맵으로 표시하는 것을 확인할 수 있습니다.</Typography>
							<Typography variant='caption'>이를 통해 스타벅스는 주요 수도권에 집중적으로 배치되어 있으며, 특히 강남과 서울 시청 부근은 더욱 밀집되어있는 것을 확인할 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>Heatmap 객체를 통해 사용할 수 있으며, 방법 역시 어렵지 않습니다.</Typography>
							<Typography variant='caption'>히트맵 표현에 영향을 주는 몇 가지 옵션을 조정할 수 있습니다.</Typography>
							<Typography variant='caption'>우측 하단의 패널에서 해당 옵션을 조절하여 변화를 확인해보세요.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/06/02/gis-guide-for-programmer-24' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 24. Heat Map 표현하기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.seoulPosition} />
				</Stack>
			</BasicPanel>
		</HeatMap>
	);
}