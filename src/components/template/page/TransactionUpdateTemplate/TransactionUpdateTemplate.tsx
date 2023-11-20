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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
							<Typography>테스트</Typography>
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