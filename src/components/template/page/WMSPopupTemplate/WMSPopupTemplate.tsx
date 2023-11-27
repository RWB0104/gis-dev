/**
 * WMS 팝업 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:15:17
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import SejongMap from '@gis-dev/components/organism/map/SejongMap';
import WMSPanel from '@gis-dev/components/organism/panel/WMSPanel';
import WMSPopup from '@gis-dev/components/organism/popup/WMSPopup';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * WMS 팝업 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMSPopupTemplate(): ReactNode
{
	return (
		<SejongMap>
			<WMSPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>WFS 팝업의 경우, Feature에서 활용할 데이터를 호출할 수 있습니다. 하지만 이미지인 WMS라면 어떨까요?</Typography>
							<Typography variant='caption'>안타깝게도 이미지에서 정보를 추출하는 건 불가능하지만, 그렇다고 방법이 아예 없는 건 아닙니다.</Typography>
							<Typography variant='caption'>WMS의 GetFeatureInfo API를 활용하면, 현재 클릭한 위치의 객체 정보를 반환해줍니다.</Typography>
							<Typography variant='caption'>위 API를 적절히 활용하면, WFS 팝업과 비슷하게 팝업을 보여줄 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>하지만 지도 상에 이와 같은 상호작용이 필요할 경우, WMS를 기반으로 사용하지 않는 경우가 대부분입니다.</Typography>
							<Typography variant='caption'>이 예시에서는 팝업보단 GetFeatureInfo API 기능을 익혀두시는 걸 추천합니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/28/gis-guide-for-programmer-19' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 19. WMS에 팝업 붙이기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.sejongPosition} />
				</Stack>
			</BasicPanel>

			<WMSPopup />
		</SejongMap>
	);
}