/**
 * WFS template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:16:28
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import SejongWFSMap from '@gis-dev/components/organism/map/SejongWFSMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * WFS template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WFSTemplate(): ReactNode
{
	return (
		<SejongWFSMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>해당 예시 이후부터는 GeoServer와 연관된 예시들이 나옵니다.</Typography>
							<br />

							<Typography variant='caption'>나만의 데이터를 지도에 표현하고 싶으신가요? 그렇다면 WFS를 기억해두세요.</Typography>
							<Typography variant='caption'>GeoServer는 오픈 소스 기반의 GIS 엔진으로, 파일 혹은 DB에 연결된 공간정보 데이터를 API 서비스로 제공해줍니다.</Typography>
							<Typography variant='caption'>API 호출 과정에서 좌표계 변환, 공간 연산 등 다양하고 복잡한 작업을 쉽게 활용할 수 있습니다.</Typography>
							<Typography variant='caption'>이 예시에선 GeoServer의 WFS GetFeature API를 통해 데이터를 GeoJSON으로 받아 지도에 표시합니다.</Typography>
							<br />

							<Typography variant='caption'>지도에 표시된 데이터는 세종시 도로명주소 건물 데이터입니다.</Typography>
							<Typography variant='caption'>배경 지도 위에 상호작용 가능한 객체 형태로 건물들이 렌더링된 것을 확인할 수 있습니다.</Typography>
							<Typography variant='caption'>소스코드 상에서 원하는 스타일을 지정하여 표현해줄 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/15/gis-guide-for-programmer-15' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.sejongPosition} />
				</Stack>
			</BasicPanel>
		</SejongWFSMap>
	);
}