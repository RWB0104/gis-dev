/**
 * WFS 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.23 금 16:59:11
 */

import { type Feature, Overlay } from 'ol';
import { Select } from 'ol/interaction';
import type { SelectEvent } from 'ol/interaction/Select';
import type React from 'react';
import { use, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { getWfsBuildingInfo } from '@gis-dev/openlayers-service-pack/func/feature';

import FeatureInfoCard from '#/molecule/FeatureInfoCard';

/**
 * WFS 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element | null} JSX
 */
export default function WfsPopup(): React.JSX.Element | null {
	const { map } = use(MapContext);

	const [featureState, setFeatureState] = useState<Feature | undefined>();
	const [overlayState, setOverlayState] = useState<Overlay | undefined>();

	const selectRef = useRef<Select>(undefined);

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

		const select = map
			.getInteractions()
			.getArray()
			.find((i): i is Select => i instanceof Select && i.get('name') === 'clickSelect');

		const handleSelect = (e: SelectEvent): void => {
			setFeatureState(e.selected[0]);
		};

		map.addOverlay(overlay);
		select?.on('select', handleSelect);

		selectRef.current = select;
		setOverlayState(overlay);

		return () => {
			select?.un('select', handleSelect);
			map.removeOverlay(overlay);
		};
	}, [map]);

	useEffect(() => {
		if (overlayState === undefined) {
			return;
		}

		const geometry = featureState?.getGeometry();

		if (geometry === undefined) {
			overlayState.setPosition(undefined);

			return;
		}

		const [minX = 0, minY = 0, maxX = 0, maxY = 0] = geometry.getExtent();

		overlayState.setPosition([(minX + maxX) / 2, (minY + maxY) / 2]);
	}, [featureState, overlayState]);

	const handleClose = (): void => {
		selectRef.current?.getFeatures().clear();

		setFeatureState(undefined);
	};

	const element = overlayState?.getElement();

	if (featureState === undefined || element === undefined) {
		return null;
	}

	const { id, name, noticeDate, serialNo } = getWfsBuildingInfo(featureState);

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
