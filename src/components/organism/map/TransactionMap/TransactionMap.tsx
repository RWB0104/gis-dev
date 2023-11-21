/**
 * 트랜잭션 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:26:24
 */

'use client';

import MapProvider, { MapProviderInitHandler } from '@gis-dev/components/organism/global/MapProvider';
import { selects } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position3857 } from '@gis-dev/script/map/positions';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import { PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';

/**
 * 트랜잭션 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionMap({ children }: PropsWithChildren): ReactNode
{
	const handleInit: MapProviderInitHandler = useCallback((map) =>
	{
		map.addInteraction(selects.getWfsHoverSelect('name'));
		map.addInteraction(selects.getWfsClickSelect('name'));
	}, []);

	const options: MapOptions = useMemo(() =>
	{
		wfsLayer.wfsTransactionLayer.getSource()?.refresh();

		return {
			layers: [ wfsLayer.wfsTransactionLayer ],
			view: new View({
				center: position3857.seoulPosition,
				projection: 'EPSG:3857',
				zoom: 17
			})
		};
	}, []);

	return (
		<MapProvider options={options} hasCursor onInit={handleInit}>
			{children}
		</MapProvider>
	);
}