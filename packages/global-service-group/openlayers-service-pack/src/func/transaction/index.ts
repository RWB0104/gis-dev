/**
 * 트랜잭션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.26 월 21:12:02
 */

import type { Map as OlMap } from 'ol';
import { type Geometry, MultiPolygon, Polygon } from 'ol/geom';

import {
	featureIdFilter,
	type LayerItem,
	multiPolygonFragment,
	type PolygonFragmentParams,
	polygonFragment,
	wfsInsertXml,
	wfsUpdateXml
} from '@gis-dev/api-pack/model/index';

const LAYER_NAME = 'buld_test';

/**
 * 건물 정보를 WFS-T 항목 배열로 변환하는 메서드
 *
 * 폴리곤이 하나면 gml:Polygon, 둘 이상이면 gml:MultiSurface로 묶는다.
 *
 * @param {BuildingInsertParams} param0 BuildingInsertParams
 *
 * @returns {LayerItem[]} 항목 배열
 */
function getBuildingItems({ address, name, polygons, srsName }: BuildingInsertParams): LayerItem[] {
	const params = polygons.map((polygon) => toPolygonParams(polygon, srsName));
	const [single] = params;

	const shape =
		params.length === 1 && single ? polygonFragment(single) : multiPolygonFragment({ attr: { srsName }, polygons: params });

	return [
		{ tagName: 'name', type: 'string', value: name },
		{ tagName: 'address', type: 'string', value: address },
		{ tagName: 'SHAPE', type: 'xml', value: shape }
	];
}

/**
 * 폴리곤을 XML 파라미터로 변환하는 메서드
 *
 * @param {Polygon} polygon Polygon
 * @param {string} srsName SRS
 *
 * @returns {PolygonFragmentParams} PolygonFragmentParams
 */
export function toPolygonParams(polygon: Polygon, srsName: string): PolygonFragmentParams {
	const [exterior = [], ...interior] = polygon.getLinearRings().map((ring) => ring.getFlatCoordinates());

	return { attr: { srsName }, exterior, interior };
}

export interface BuildingInsertParams {
	/**
	 * 빌딩 주소
	 */
	address: string;

	/**
	 * 빌딩명
	 */
	name: string;

	/**
	 * 폴리곤 배열
	 */
	polygons: Polygon[];

	/**
	 * 좌표계(예: EPSG:3857)
	 */
	srsName: string;
}

/**
 * 건물 삽입 WFS-T XML 반환 메서드
 *
 * @param {BuildingInsertParams} params BuildingInsertParams
 *
 * @returns {string} XML
 */
export function getBuildingInsertXml(params: BuildingInsertParams): string {
	return wfsInsertXml(LAYER_NAME, getBuildingItems(params));
}

export interface BuildingUpdateParams extends BuildingInsertParams {
	/**
	 * 피쳐 ID(예: buld_test.12)
	 */
	id: string;
}

/**
 * 건물 수정 WFS-T XML 반환 메서드
 *
 * @param {BuildingUpdateParams} param0 BuildingUpdateParams
 *
 * @returns {string} XML
 */
export function getBuildingUpdateXml({ id, ...params }: BuildingUpdateParams): string {
	return wfsUpdateXml(LAYER_NAME, getBuildingItems(params), featureIdFilter(id));
}

/**
 * 지오메트리를 폴리곤 배열로 변환하는 메서드
 *
 * Polygon은 그대로, MultiPolygon은 펼쳐서 반환한다. 그 외 타입이나 지오메트리가 없으면 빈 배열을 반환한다.
 *
 * @param {Geometry | undefined} geometry 지오메트리
 *
 * @returns {Polygon[]} 폴리곤 배열
 */
export function toPolygons(geometry: Geometry | undefined): Polygon[] {
	if (geometry instanceof Polygon) {
		return [geometry];
	}

	if (geometry instanceof MultiPolygon) {
		return geometry.getPolygons();
	}

	return [];
}

/**
 * 맵의 WFS 레이어(name이 wfs) 소스를 다시 불러오는 메서드
 *
 * @param {OlMap | undefined} map 맵
 */
export function refreshWfsLayer(map: OlMap | undefined): void {
	map?.getAllLayers()
		.find((layer) => layer.get('name') === 'wfs')
		?.getSource()
		?.refresh();
}
