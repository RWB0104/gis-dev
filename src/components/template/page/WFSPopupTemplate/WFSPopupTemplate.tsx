/**
 * WFS 팝업 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:34:20
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import SejongFeatureWFSMap from '@gis-dev/components/organism/map/SejongFeatureWFSMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import WFSPopup from '@gis-dev/components/organism/popup/WFSPopup';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * WFS 팝업 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WFSPopupTemplate(): ReactNode
{
	return (
		<SejongFeatureWFSMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>구글이나 네이버 지도를 사용하다보면, 마커의 정보를 보여주는 팝업을 한 번쯤 보셨을겁니다.</Typography>
							<Typography variant='caption'>OpenLayers에선 Overlay 객체를 통해 지도 상의 좌표에 팝업을 띄울 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>해당 예시에선 WFS로 렌더링된 Feature 클릭 시, 해당 Feature의 간단한 정보를 팝업으로 보여줍니다.</Typography>
							<Typography variant='caption'>클릭 시 해당 위치에 피쳐가 있는지 계산하고, 있을 경우 해당 피쳐의 정보를 토대로 팝업을 띄워줍니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/25/gis-guide-for-programmer-18' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 18. WFS에 팝업 붙이기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.sejongPosition} />
				</Stack>
			</BasicPanel>

			<WFSPopup />
		</SejongFeatureWFSMap>
	);
}