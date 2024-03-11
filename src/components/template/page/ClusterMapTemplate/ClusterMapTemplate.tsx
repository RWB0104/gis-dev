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
import Link from 'next/link';
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
							<Typography variant='caption'>이번엔 독특한 지도들에 대해 다뤄봅시다.</Typography>
							<Typography variant='caption'>지도에서 많은 양의 Feature를 한꺼번에 표시할 경우, 성능저하가 발생하게 됩니다.</Typography>
							<Typography variant='caption'>이 경우, Cluster Map을 적용하면 많은 양의 Feature를 효율적으로 표시할 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>클러스터 맵은 지도 구역을 적절히 나누고, 해당 구역에 포함되는 데이터를 통합하여 하나의 피쳐로 압축하여 보여줍니다.</Typography>
							<Typography variant='caption'>이러한 특성을 활용하면, 지도는 여전히 많은 객체의 정보를 포함하고 있지만, 실제 렌더링되는 객체의 수를 줄여 성능저하를 피할 수 있습니다.</Typography>
							<Typography variant='caption'>이 예시에서는 전국의 스타벅스 위치를 클러스터 맵으로 간략하게 표현해주고 있습니다.</Typography>
							<br />

							<Typography variant='caption'>Cluster 객체를 활용하여 간단하게 표현할 수 있습니다.</Typography>
							<Typography variant='caption'>클러스터 표현에 영향을 주는 몇 가지 옵션을 조정할 수 있습니다.</Typography>
							<Typography variant='caption'>우측 하단의 패널에서 해당 옵션을 조절하여 변화를 확인해보세요.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/06/01/gis-guide-for-programmer-23' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>OpenLayers를 여행하는 개발자를 위한 안내서 - 23. Cluster Map 표현하기</Typography></Link>를 참조해주세요.</Typography>
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