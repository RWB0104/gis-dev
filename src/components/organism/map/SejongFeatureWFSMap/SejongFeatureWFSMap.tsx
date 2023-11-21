/**
 * 세종 피쳐 WFS 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:45:30
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
 * 세종 피쳐 WFS 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function SejongFeatureWFSMap({ children }: PropsWithChildren): ReactNode
{
	const handleInit: MapProviderInitHandler = useCallback((map) =>
	{
		map.addInteraction(selects.getWfsHoverSelect('buld_nm'));
		map.addInteraction(selects.getWfsClickSelect('buld_nm'));
	}, []);

	const options: MapOptions = useMemo(() =>
	{
		wfsLayer.sejongWfsLayer.getSource()?.refresh();

		return {
			layers: [ wfsLayer.sejongWfsLayer ],
			view: new View({
				center: position3857.sejongPosition,
				projection: 'EPSG:3857',
				zoom: 17
			})
		};
	}, [ children ]);

	return (
		<MapProvider options={options} hasCursor onInit={handleInit}>
			{children}
		</MapProvider>
	);
}