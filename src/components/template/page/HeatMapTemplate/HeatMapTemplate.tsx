/**
 * 히트맵 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:52:55
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import HeatMap from '@gis-dev/components/organism/map/HeatMap';
import HeatMapPanel from '@gis-dev/components/organism/panel/HeatMapPanel';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 히트맵 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMapTemplate(): ReactNode
{
	return (
		<HeatMap>
			<HeatMapPanel />

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
		</HeatMap>
	);
}