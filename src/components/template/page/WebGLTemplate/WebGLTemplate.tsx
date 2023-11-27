/**
 * WebGL template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:58:25
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import WebGLMap from '@gis-dev/components/organism/map/WebGLMap';
import WebGLPanel from '@gis-dev/components/organism/panel/WebGLPanel';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * WebGL template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WebGLTemplate(): ReactNode
{
	return (
		<WebGLMap>
			<WebGLPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>이전 예시에서 다량의 Feature를 표현하면 성능저하가 발생함을 언급했었습니다.</Typography>
							<Typography variant='caption'>그렇다면 대량의 데이터를 표현할 수 있는 방법이 정말 없는걸까요?</Typography>
							<Typography variant='caption'>WebGL을 활용하면 10만 단위 이상의 많은 양의 데이터도 무리없이 표현이 가능합니다.</Typography>
							<Typography variant='caption'>일반적인 방식으로 Feature 표현 시, 사양에 따라 몇 천에서 몇 만 정도임을 감안하면, 그 차이를 실감할 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>이 예시에선 전세계의 주요 도시의 Point 데이터를 두 가지 방식으로 표현하고 있습니다.</Typography>
							<Typography variant='caption'>WebGL과 일반적인 Vector 방식을 비교하여 각 방식의 성능차이를 비교해보세요.</Typography>
							<Typography variant='caption'>지도를 많이 축소한 상태에서 Vector 방식을 활용할 경우, 브라우저가 멈출 수 있으니 주의하세요!</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/06/02/gis-guide-for-programmer-25' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 25. WebGL로 초대용량 데이터 표시하기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.seoulPosition} />
				</Stack>
			</BasicPanel>
		</WebGLMap>
	);
}