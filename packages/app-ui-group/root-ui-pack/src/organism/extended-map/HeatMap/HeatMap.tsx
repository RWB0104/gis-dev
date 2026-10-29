/**
 * 히트맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.29 목 18:46:16
 */

'use client';

import type { MapOptions } from 'ol/Map';
import { useEffect, useState } from 'react';

import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { seoulMiddleView } from '@gis-dev/openlayers-service-pack/func/view';

import GeolocationButton from '#/atom/GeolocationButton';
import GuideDialog from '#/molecule/GuideDialog';
import HeatController from '#/organism/map/HeatController';
import MapController from '#/organism/map/MapController';
import MapProvider from '#/organism/map/MapProvider';
import InteractionTemplate from '#/template/InteractionTemplate';

/**
 * 히트맵 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element | null} JSX
 */
export default function HeatMap(): React.JSX.Element | null {
	const [options, setOptions] = useState<MapOptions>();

	// Heatmap 레이어는 생성 시 document가 필요하므로 SSR을 피해 마운트 후(클라이언트)에만 만든다
	useEffect(() => {
		setOptions({
			layers: [baseLayer.googleRoadLayer, wfsLayer.getWfsHeatmapLayer()],
			view: seoulMiddleView
		});
	}, []);

	if (!options) {
		return null;
	}

	return (
		<MapProvider options={options}>
			<MapController className="flex flex-col" direction="bottom">
				<HeatController />
			</MapController>

			<InteractionTemplate>
				<GeolocationButton />
				<GuideDialog title="Heat" />
			</InteractionTemplate>
		</MapProvider>
	);
}
