/**
 * WMS template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:41:09
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import SejongMap from '@gis-dev/components/organism/map/SejongMap';
import WMSPanel from '@gis-dev/components/organism/panel/WMSPanel';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * WMS template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMSTemplate(): ReactNode
{
	return (
		<SejongMap>
			<WMSPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>GeoServer는 WFS 뿐만 아니라, WMS라는 서비스도 제공하고 있습니다.</Typography>
							<Typography variant='caption'>WFS는 데이터를 GeoJSON와 같이 텍스트 기반의 데이터를 제공해줍니다.</Typography>
							<Typography variant='caption'>WMS는 이와 달리, 데이터를 PNG와 같은 이미지로 제공해줍니다.</Typography>
							<br />

							<Typography variant='caption'>WMS 서비스 중에서도 GetImage API를 활용합니다.</Typography>
							<Typography variant='caption'>GetImage는 두 가지 방식을 사용할 수 있습니다.</Typography>
							<Typography variant='caption'>WMS의 GetImage는 WFS와 달리 소스코드가 아닌 API 요청 혹은 GeoServer에서 스타일을 지정합니다.</Typography>
							<br />

							<Typography variant='caption'>🖼️ Image - 현재 지도의 크기만큼 렌더링된 하나의 이미지를 제공합니다. 한 번에 큰 이미지를 불러오므로 용량도 크고, 요청시간도 상대적으로 길지만, 요청 횟수를 지도 이동 당 1번으로 줄일 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>🪟 Tile - 이미지를 정해진 크기만큼 잘라 여러개의 이미지를 제공합니다. Image 방식의 큰 지도를 잘게 자르므로, 요청 당 용량과 시간을 줄일 수 있습니다. 하지만 요청 횟수가 상대적으로 많아집니다. 이러한 방식을 타일맵이라 하며, 대부분의 지도 서비스에서는 배경지도를 타일맵으로 제공하고 있습니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/16/gis-guide-for-programmer-16' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.sejongPosition} />
				</Stack>
			</BasicPanel>
		</SejongMap>
	);
}