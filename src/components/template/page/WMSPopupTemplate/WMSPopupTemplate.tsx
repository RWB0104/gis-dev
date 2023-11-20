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
import LocationSearching from '@mui/icons-material/LocationSearching';
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
							<Typography variant='caption'>웹이나 모바일의 GPS 정볼르 활용하여 자신의 위치 정보를 얻는 것을 지오로케이션이라고 합니다.</Typography>
							<Typography variant='caption'>하단의 <LocationSearching fontSize='inherit' htmlColor='limegreen' /> 버튼을 클릭하여 자신의 위치를 확인해보세요.</Typography>
							<Typography variant='caption'>인터넷 제공 업체나 사용 중인 네트워크의 구조에 따라 자신의 위치가 아닌 엉뚱한 위치(인터넷 중계 서버의 위치 등)가 표시될 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>지오로케이션은 브라우저 보안 정책의 이유로 localhost 혹은 HTTPS 환경에서만 사용이 가능합니다.</Typography>
							<Typography variant='caption'>macOS 환경에서 지오로케이션의 로딩이 지연되는 현상이 있으니, 사용 시 참고해주세요.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/04/03/gis-guide-for-programmer-13' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
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