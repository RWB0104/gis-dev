/**
 * 히트맵 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 11:55:02
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import HeatMapPanel from '@gis-dev/components/organism/panel/HeatMapPanel';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position4326 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * 히트맵 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HeatMapBox(): ReactNode
{
	const center = proj4('EPSG:4326', 'EPSG:3857', position4326.seoulPosition);

	const options: MapOptions = {
		layers: [ wfsLayer.wfsStarbucksHeatLayer ],
		view: new View({
			center,
			projection: 'EPSG:3857',
			zoom: 13
		})
	};

	return (
		<MapProvider options={options} hasCursor>
			<HeatMapPanel />

			<BasicPanel right={20} top={20}>
				<Stack>
					<HowToPlayButton defaultOpen>
						<Stack>
							<Typography>테스트</Typography>
						</Stack>
					</HowToPlayButton>

					<GeolocationButton />
					<HomeButton homePosition={center} />
				</Stack>
			</BasicPanel>
		</MapProvider>
	);
}