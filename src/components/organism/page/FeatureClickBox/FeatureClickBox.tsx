/**
 * 피쳐 클릭 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 11:13:49
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import MapPanel from '@gis-dev/components/organism/page/MapPanel';
import { selects } from '@gis-dev/script/map/interactions';
import { sejongLayer } from '@gis-dev/script/map/layers';
import { sejongPosition } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { View } from 'ol';
import { defaults } from 'ol/interaction/defaults';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * 피쳐 클릭 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function FeatureClickBox(): ReactNode
{
	const center = proj4('EPSG:4326', 'EPSG:3857', sejongPosition);

	const options: MapOptions = {
		interactions: defaults().extend([ selects.wfsHoverSelect, selects.wfsClickSelect ]),
		layers: [ sejongLayer ],
		view: new View({
			center,
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