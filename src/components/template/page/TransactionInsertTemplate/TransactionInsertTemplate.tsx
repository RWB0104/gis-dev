/**
 * 트랜잭션 삽입 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:28:17
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import TransactionInsertButton from '@gis-dev/components/organism/button/TransactionInsertButton';
import TransactionMap from '@gis-dev/components/organism/map/TransactionMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import TransactionPopup from '@gis-dev/components/organism/popup/TransactionPopup';
import { position3857 } from '@gis-dev/script/map/positions';

import Add from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 트랜잭션 삽입 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionInsertTemplate(): ReactNode
{
	return (
		<TransactionMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>GeoServer에선 WFS Transaction이라는 기능을 제공합니다.</Typography>
							<Typography variant='caption'>지금까지의 기능은 단순 조회에 불과했지만, 해당 기능을 사용하면 연결된 데이터에 자신이 원하는 공간정보를 직접 추가할 수 있습니다.</Typography>
							<Typography variant='caption'>트랜잭션은 삽입, 수정, 삭제가 있으며, 이 예시에선 삽입에 대해 다루고 있습니다.</Typography>
							<br />

							<Typography variant='caption'>1. 우측 상단의 <Add fontSize='inherit' htmlColor='dodgerblue' />버튼을 클릭하여 그리드 모드를 활성화합니다.</Typography>
							<Typography variant='caption'>2. 하나 이상의 도형을 그리고, ESC 혹은 오른쪽 마우스를 클릭하여 그리기 모드를 종료합니다.</Typography>
							<Typography variant='caption'>3. 원하는 정보를 입력하고, 도형을 추가합니다.</Typography>
							<br />

							<Typography variant='caption'>Draw 객체를 사용하여 지도 상에 도형을 그리고, 좌표를 받아올 수 있습니다.</Typography>
							<Typography variant='caption'>그린 좌표와 입력한 정보를 토대로 XML를 구성하고, 이를 통해 API를 사용하게 됩니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/30/gis-guide-for-programmer-20' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 20. WFS Transaction으로 데이터 추가하기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.seoulPosition} />
					<TransactionInsertButton />
				</Stack>
			</BasicPanel>

			<TransactionPopup />
		</TransactionMap>
	);
}