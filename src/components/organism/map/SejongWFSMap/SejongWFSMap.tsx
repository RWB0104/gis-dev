/**
 * 세종 WFS 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 17:14:20
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position3857 } from '@gis-dev/script/map/positions';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

/**
 * 세종 WFS 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function SejongWFSMap({ children }: PropsWithChildren): ReactNode
{
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
		<MapProvider options={options} hasCursor>
			{children}
		</MapProvider>
	);
}