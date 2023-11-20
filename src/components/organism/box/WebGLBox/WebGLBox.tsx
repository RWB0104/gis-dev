/**
 * WebGL 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 14:33:41
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import WebGLPanel from '@gis-dev/components/organism/panel/WebGLPanel';
import { position4326 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * WebGL 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WebGLBox(): ReactNode
{
	const center = proj4('EPSG:4326', 'EPSG:3857', position4326.seoulPosition);

	const options: MapOptions = {
		view: new View({
			center,
			projection: 'EPSG:3857',
			zoom: 5
		})
	};

	return (
		<MapProvider options={options} hasCursor>
			<WebGLPanel />

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