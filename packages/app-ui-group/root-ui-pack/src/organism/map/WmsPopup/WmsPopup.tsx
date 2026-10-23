/**
 * WMS 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 17:50:00
 */

import { skipToken, useQuery } from '@tanstack/react-query';
import { type MapBrowserEvent, Overlay } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { GeoJSON } from 'ol/format';
import type React from 'react';
import { use, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { getWfsBuildingInfo } from '@gis-dev/openlayers-service-pack/func/feature';
import { getWmsFeatureInfoUrl } from '@gis-dev/openlayers-service-pack/func/wms';

import FeatureInfoCard from '#/molecule/FeatureInfoCard';

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
 * 오버레이 요소는 OL이 DOM 위치를 옮기므로, React가 소유하지 않는 요소를 만들고 포털로 렌더링한다.
 *
 * @returns {React.JSX.Element | null} JSX
 */
export default function WmsPopup(): React.JSX.Element | null {
	const { map } = use(MapContext);

	const [clickState, setClickState] = useState<ClickState | undefined>();
	const [overlayState, setOverlayState] = useState<Overlay | undefined>();

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

		const overlay = new Overlay({
			autoPan: { animation: { duration: 250 } },
			element: document.createElement('div'),
			offset: [0, -20],
			positioning: 'bottom-center'
		});

		const handleClick = (e: MapBrowserEvent): void => {
			const featureInfoUrl = getWmsFeatureInfoUrl(map, e.coordinate);

			setClickState(featureInfoUrl === undefined ? undefined : { coordinate: e.coordinate, url: featureInfoUrl });
		};

		map.addOverlay(overlay);
		map.on('singleclick', handleClick);

		setOverlayState(overlay);

		return () => {
			map.un('singleclick', handleClick);
			map.removeOverlay(overlay);
		};
	}, [map]);

	useEffect(() => {
		overlayState?.setPosition(feature === undefined ? undefined : clickState?.coordinate);
	}, [overlayState, feature, clickState]);

	const handleClose = (): void => {
		setClickState(undefined);
	};

	const element = overlayState?.getElement();

	if (feature === undefined || element === undefined) {
		return null;
	}

	const { id, name, noticeDate, serialNo } = getWfsBuildingInfo(feature);

	return createPortal(
		<FeatureInfoCard
			items={[
				{ label: 'ID', value: id },
				{ label: '고유일련번호', value: serialNo },
				{ label: '고시일자', value: noticeDate }
			]}
			onClose={handleClose}
			title={name}
		/>,
		element
	);
}
