/**
 * 클러스터 맵 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:48:22
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import ClusterMap from '@gis-dev/components/organism/map/ClusterMap';
import ClusterMapPanel from '@gis-dev/components/organism/panel/ClusterMapPanel';
import StarbucksPopup from '@gis-dev/components/organism/popup/StarbucksPopup';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 클러스터 맵 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function ClusterMapTemplate(): ReactNode
{
	return (
		<ClusterMap>
			<ClusterMapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography>테스트</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.seoulPosition} />
				</Stack>
			</BasicPanel>

			<StarbucksPopup />
		</ClusterMap>
	);
}