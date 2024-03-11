/**
 * 트랜잭션 수정 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:39:30
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import TransactionUpdateButton from '@gis-dev/components/organism/button/TransactionUpdateButton';
import TransactionUpdateMap from '@gis-dev/components/organism/map/TransactionUpdateMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import TransactionPopup from '@gis-dev/components/organism/popup/TransactionPopup';
import { position3857 } from '@gis-dev/script/map/positions';

import Edit from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 트랜잭션 수정 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionUpdateTemplate(): ReactNode
{
	return (
		<TransactionUpdateMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>이번엔 WFS Transaction의 수정 기능을 사용하여, 기존 데이터를 수정해봅니다.</Typography>
							<br />

							<Typography variant='caption'>1. 수정하기 원하는 도형을 클릭합니다.</Typography>
							<Typography variant='caption'>2. 우측 상단의 <Edit fontSize='inherit' htmlColor='cornflowerblue' />버튼을 클릭하여 수정 모드를 활성화합니다.</Typography>
							<Typography variant='caption'>3. 도형을 수정합니다., ESC 혹은 오른쪽 마우스, 지도를 클릭하면 수정을 종료할 수 있습니다.</Typography>
							<Typography variant='caption'>4. 수정하려는 정보를 입력하고, 도형을 수정합니다.</Typography>
							<br />

							<Typography variant='caption'>Modify와 Snap 객체를 활용하여 수정 기능을 구현하고 있습니다.</Typography>
							<Typography variant='caption'>Modify는 Feature를 수정할 수 있으며, Snap은 그리기 노드가 Feature에 적절히 붙을 수 있도록 유도하는 자석기능입니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/31/gis-guide-for-programmer-21' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 21. WFS Transaction으로 데이터 수정하기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.seoulPosition} />
					<TransactionUpdateButton />
				</Stack>
			</BasicPanel>

			<TransactionPopup />
		</TransactionUpdateMap>
	);
}