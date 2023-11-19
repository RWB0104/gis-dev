/**
 * WFS 트랜잭션 삽입 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 18:02:07
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import TransactionInsertButton from '@gis-dev/components/organism/button/TransactionInsertButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import MapPanel from '@gis-dev/components/organism/panel/MapPanel';
import TransactionPopup from '@gis-dev/components/organism/popup/TransactionPopup';
import { selects } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position4326 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { View } from 'ol';
import { defaults } from 'ol/interaction/defaults';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * WFS 트랜잭션 삽입 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionInsertBox(): ReactNode
{
	const center = proj4('EPSG:4326', 'EPSG:3857', position4326.seoulPosition);

	const options: MapOptions = {
		interactions: defaults().extend([ selects.getWfsHoverSelect('name'), selects.getWfsClickSelect('name') ]),
		layers: [ wfsLayer.wfsTransactionLayer ],
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
					<TransactionInsertButton />
				</Stack>
			</BasicPanel>

			<TransactionPopup />
		</MapProvider>
	);
}