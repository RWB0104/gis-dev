/**
 * OSM 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 04:44:54
 */

'use client';

import BasicMap from '@gis-dev/components/molecule/BasicMap';
import { osmLayer } from '@gis-dev/script/common/layers';
import { seoulPosition } from '@gis-dev/script/common/positions';
import { View } from 'ol';
import { MapOptions } from 'ol/Map';
import proj4 from 'proj4';
import { ReactNode } from 'react';

/**
 * OSM 박스 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function OSMBox(): ReactNode
{
	const options: MapOptions = {
		layers: [ osmLayer ],
		view: new View({
			center: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
			projection: 'EPSG:3857',
			zoom: 17
		})
	};

	return (
		<BasicMap options={options} />
	);
}