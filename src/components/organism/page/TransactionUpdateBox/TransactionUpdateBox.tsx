/**
 * 트랜잭션 수정 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.18 Sat 02:24:18
 */

'use client';

import BasicPanel from '@gis-dev/components/atom/BasicPanel';
import GeolocationButton from '@gis-dev/components/organism/button/GeolocationButton';
import HomeButton from '@gis-dev/components/organism/button/HomeButton';
import HowToPlayButton from '@gis-dev/components/organism/button/HowToPlayButton';
import TransactionUpdateButton from '@gis-dev/components/organism/button/TransactionUpdateButton';
import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import MapPanel from '@gis-dev/components/organism/page/MapPanel';
import TransactionPopup from '@gis-dev/components/organism/popup/TransactionPopup';
import { modifys, selects, snaps } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position4326 } from '@gis-dev/script/map/positions';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { View } from 'ol';
import { defaults } from 'ol/interaction/defaults';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode, useMemo } from 'react';

/**
 * 트랜잭션 수정 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionUpdateBox(): ReactNode
{
	const center = proj4('EPSG:4326', 'EPSG:3857', position4326.seoulPosition);

	const interactions = useMemo(() =>
	{
		const { getWfsSnap } = snaps;
		const { getWfsModify } = modifys;
		const { getWfsClickSelect } = selects;

		const clickSelect = getWfsClickSelect('name');
		const wfsSnap = getWfsSnap(clickSelect.getFeatures());
		const wfsModify = getWfsModify(clickSelect.getFeatures());

		wfsSnap.setActive(false);
		wfsModify.setActive(false);

		return [ clickSelect, wfsSnap, wfsModify ];
	}, []);

	const options: MapOptions = {
		interactions: defaults().extend(interactions),
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
					<TransactionUpdateButton />
				</Stack>
			</BasicPanel>

			<TransactionPopup />
		</MapProvider>
	);
}