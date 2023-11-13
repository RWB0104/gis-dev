/**
 * 피쳐 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 23:42:05
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import FeatureButton from '@gis-dev/components/organism/button/FeatureButton';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import MapPanel from '@gis-dev/components/organism/page/MapPanel';
import { googleRoadLayer } from '@gis-dev/script/map/layers';
import { seoulPosition } from '@gis-dev/script/map/positions';
import PushPin from '@mui/icons-material/PushPin';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * 피쳐 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function FeatureBox(): ReactNode
{
	const options: MapOptions = {
		layers: [ googleRoadLayer ],
		view: new View({
			center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
			projection: 'EPSG:3857',
			zoom: 17
		})
	};

	return (
		<MapProvider options={options} hasCursor>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack justifyContent='center'>
							<Typography variant='caption'>지도위에 다양한 마커를 표시하여 지도가 제공하는 정보를 강화할 수 있습니다.</Typography>
							<Typography variant='caption'>이 페이지에선 버튼을 클릭하여 현재 바라보는 지도 중심에 마커를 추가하는 간단한 기능을 사용해볼 수 있습니다.</Typography>
							<Typography variant='caption'>우측 상단의 <PushPin fontSize='inherit' htmlColor='dodgerblue' /> 버튼 혹은 스페이스바를 눌러 마커를 추가해보세요.</Typography>
							<br />

							<Typography variant='caption'>이렇게 지도 상에 표현되는 요소를 Feature라고 합니다.</Typography>
							<Typography variant='caption'>Feature들은 상호작용이 가능한 객체로, 클릭 이벤트와 같은 다양한 상호작용을 할 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/04/04/gis-guide-for-programmer-14' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<FeatureButton />
				</Stack>
			</BasicPanel>
		</MapProvider>
	);
}