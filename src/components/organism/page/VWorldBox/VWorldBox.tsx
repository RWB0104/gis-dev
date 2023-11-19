/**
 * VWorld 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 02:06:48
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import VWorldPanel from '@gis-dev/components/organism/panel/VWorldPanel';
import { baseLayer } from '@gis-dev/script/map/layers';
import { position4326 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * VWorld 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function VWorldBox(): ReactNode
{
	const options: MapOptions = {
		layers: [ baseLayer.osmLayer ],
		view: new View({
			center: proj4('EPSG:4326', 'EPSG:3857', position4326.seoulPosition),
			projection: 'EPSG:3857',
			zoom: 17
		})
	};

	return (
		<MapProvider options={options} hasCursor>
			<VWorldPanel />

			<BasicPanel right={20} top={20}>
				<HowToPlayButton defaultOpen>
					<Stack>
						<Typography variant='caption'>OSM을 보면서 어딘가 아쉬운 점은 없었나요?</Typography>
						<Typography variant='caption'>사실 OSM은 국내에서 주력으로 쓰기 좋은 지도는 아닙니다.</Typography>
						<Typography variant='caption'>오픈 소스의 자유로움으로 인해, 정보가 디테일하지 않을 뿐더러, 디자인도 투박합니다.</Typography>
						<br />

						<Typography variant='caption'>VWorld는 국내에 특화된 타일맵을 OpenAPI 형태로 제공하고 있습니다.</Typography>
						<Typography variant='caption'>국가에서 제공하는 지도로, 비교적 정확한 정보와 사용자 친화적인 디자인을 가지고 있습니다.</Typography>
						<Typography variant='caption'>이를 통해 국내 친화적인 지도 서비스를 제공하는 것이 가능합니다.</Typography>
						<br />

						<Typography variant='caption'>VWorld에서는 기본적인 지도는 물론, 백지도, 위성지도와 같은 다양한 레이어를 제공합니다.</Typography>
						<Typography variant='caption'>우측 하단 메뉴에서 지도를 변경해보세요.</Typography>
						<br />

						<Typography variant='caption'>자세한 설명은 <Link href='https://blog.itcode.dev/projects/2022/03/21/gis-guide-for-programmer-11' target='_blank'><Typography color='hotpink' component='span' fontWeight='bold' variant='inherit'>이 문서</Typography></Link>를 참조해주세요.</Typography>
					</Stack>
				</HowToPlayButton>
			</BasicPanel>
		</MapProvider>
	);
}