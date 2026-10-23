/**
 * WMS 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.23 금 17:50:00
 */

/** biome-ignore-all lint/style/useNamingConvention: for column name */

import type { Map as OlMap } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { ImageWMS, TileWMS } from 'ol/source';

/**
 * 맵에 올라간 WMS 레이어의 GetFeatureInfo URL 반환 메서드
 *
 * name이 wms인 레이어의 소스(TileWMS, ImageWMS)를 기준으로, 해당 좌표의 피쳐를 GeoJSON으로 조회하는 URL을 만든다.
 *
 * @param {OlMap} map 맵
 * @param {Coordinate} coordinate 조회 좌표(맵 투영 기준)
 *
 * @returns {string | undefined} URL, WMS 레이어가 없거나 URL을 만들 수 없으면 undefined
 */
export function getWmsFeatureInfoUrl(map: OlMap, coordinate: Coordinate): string | undefined {
	const source = map
		.getAllLayers()
		.find((layer) => layer.get('name') === 'wms')
		?.getSource();

	if (!(source instanceof TileWMS || source instanceof ImageWMS)) {
		return undefined;
	}

	const view = map.getView();

	// 소스 params 키는 이 레포의 규칙(소문자, api-pack의 WMS 파라미터 타입 기준)을 따르므로,
	// OL이 대문자 LAYERS로 채워 주는 QUERY_LAYERS 기본값이 비어 있다. 소스의 layers를 직접 넘긴다.
	const { layers } = source.getParams() as { layers?: string };

	return source.getFeatureInfoUrl(coordinate, view.getResolution() ?? 0, view.getProjection().getCode(), {
		info_format: 'application/json',
		query_layers: layers
	});
}
