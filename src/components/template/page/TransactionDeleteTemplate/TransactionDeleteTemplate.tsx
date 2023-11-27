/**
 * 트랜잭션 삭제 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:42:05
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import TransactionDeleteButton from '@gis-dev/components/organism/button/TransactionDeleteButton';
import TransactionMap from '@gis-dev/components/organism/map/TransactionMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import TransactionPopup from '@gis-dev/components/organism/popup/TransactionPopup';
import { position3857 } from '@gis-dev/script/map/positions';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 트랜잭션 삭제 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionDeleteTemplate(): ReactNode
{
	return (
		<TransactionMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>이번엔 WFS Transaction의 삭제 기능을 사용하여, 기존 데이터를 삭제합니다.</Typography>
							<br />

							<Typography variant='caption'>1. 삭제하기 원하는 도형을 클릭합니다.</Typography>
							<Typography variant='caption'>2. 우측 상단의 <Delete fontSize='inherit' htmlColor='crimson' />버튼을 클릭합니다.</Typography>
							<Typography variant='caption'>3. 원하는 도형인지 확인 후, 삭제합니다.</Typography>
							<br />

							<Typography variant='caption'>이전의 예시에서 몇 번 사용했던 Select 객체를 사용합니다.</Typography>
							<Typography variant='caption'>이 예시에서는 클릭한 도형 하나만 삭제할 수 있지만, XML 구성에 따라 특정 조건에 일치하는 모든 도형을 제거할 수도 있습니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/31/gis-guide-for-programmer-22' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 22. WFS Transaction으로 데이터 삭제하기</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.seoulPosition} />
					<TransactionDeleteButton />
				</Stack>
			</BasicPanel>

			<TransactionPopup />
		</TransactionMap>
	);
}