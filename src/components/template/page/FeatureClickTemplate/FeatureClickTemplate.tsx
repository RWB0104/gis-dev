/**
 * 피쳐 클릭 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:48:07
 */

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import SejongFeatureWFSMap from '@gis-dev/components/organism/map/SejongFeatureWFSMap';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import { position3857 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * 피쳐 클릭 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function FeatureClickTemplate(): ReactNode
{
	return (
		<SejongFeatureWFSMap>
			<MapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography variant='caption'>OpenLayers에서 Feature로 생성된 객체들은 DOM 상에서 인식 가능한 개체로, 상호작용이 가능합니다.</Typography>
							<Typography variant='caption'>WFS 역시 응답 데이터를 통해 Feature를 생성하기 때문에, 여러 상호작용 이벤트를 붙일 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>해당 예시에선 OpenLayers의 Select 객체를 통해 마우스 호버, 클릭 이벤트를 구현하고 있습니다.</Typography>
							<Typography variant='caption'>각 이벤트 시의 스타일을 재정의하여, 각 이벤트에 따른 변화를 시각적으로 표현할 수 있습니다.</Typography>
							<br />

							<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/05/21/gis-guide-for-programmer-17' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={position3857.sejongPosition} />
				</Stack>
			</BasicPanel>
		</SejongFeatureWFSMap>
	);
}