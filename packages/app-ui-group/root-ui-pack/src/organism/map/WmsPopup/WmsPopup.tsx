/**
 * WMS 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 17:50:00
 */

import { skipToken, useQuery } from '@tanstack/react-query';
import type { MapBrowserEvent } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { GeoJSON } from 'ol/format';
import type React from 'react';
import { use, useEffect, useMemo, useState } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { describeWfsBuilding } from '@gis-dev/openlayers-service-pack/func/feature';
import { getWmsFeatureInfoUrl } from '@gis-dev/openlayers-service-pack/func/wms';

import FeaturePopup from '#/organism/map/FeaturePopup';

interface ClickState {
	/**
	 * 클릭 좌표
	 */
	coordinate: Coordinate;

	/**
	 * GetFeatureInfo URL
	 */
	url: string;
}

/**
 * WMS 팝업 organism 컴포넌트 반환 메서드
 *
 * 맵을 클릭하면 해당 좌표의 WMS GetFeatureInfo를 조회하고, 피쳐가 있으면 클릭한 위치에 정보 카드를 보여준다.
 *
 * @returns {React.JSX.Element | null} JSX
 */
export default function WmsPopup(): React.JSX.Element | null {
	const { map } = use(MapContext);

	const [clickState, setClickState] = useState<ClickState | undefined>();

	const url = clickState?.url;

	const { data } = useQuery({
		queryFn:
			url === undefined
				? skipToken
				: async ({ signal }) => {
						const response = await fetch(url, { signal });

						if (!response.ok) {
							throw new Error(`GetFeatureInfo failed - ${response.status}`);
						}

						return (await response.json()) as unknown;
					},
		queryKey: ['wms', 'feature-info', url]
	});

	const feature = useMemo(() => (data === undefined ? undefined : new GeoJSON().readFeatures(data)[0]), [data]);

	useEffect(() => {
		if (map === undefined) {
			return;
		}

		const handleClick = (e: MapBrowserEvent): void => {
			const featureInfoUrl = getWmsFeatureInfoUrl(map, e.coordinate);

			setClickState(featureInfoUrl === undefined ? undefined : { coordinate: e.coordinate, url: featureInfoUrl });
		};

		map.on('singleclick', handleClick);

		return () => {
			map.un('singleclick', handleClick);
		};
	}, [map]);

	const handleClose = (): void => {
		setClickState(undefined);
	};

	return (
		<FeaturePopup
			feature={feature}
			getDescription={describeWfsBuilding}
			onClose={handleClose}
			position={clickState?.coordinate}
		/>
	);
}
