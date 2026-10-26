/**
 * 트랜잭션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.26 월 21:12:02
 */

import type { Polygon } from 'ol/geom';

import { multiPolygonFragment, type PolygonFragmentParams, polygonFragment, wfsInsertXml } from '@gis-dev/api-pack/model/index';

const LAYER_NAME = 'buld_test';

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
 * @param {BuildingInsertParams} param0 BuildingInsertParams
 *
 * @returns {string} XML
 */
export function getBuildingInsertXml({ address, name, polygons, srsName }: BuildingInsertParams): string {
	const params = polygons.map((polygon) => toPolygonParams(polygon, srsName));
	const [single] = params;

	const shape =
		params.length === 1 && single ? polygonFragment(single) : multiPolygonFragment({ attr: { srsName }, polygons: params });

	return wfsInsertXml(LAYER_NAME, [
		{ tagName: 'name', type: 'string', value: name },
		{ tagName: 'address', type: 'string', value: address },
		{ tagName: 'SHAPE', type: 'xml', value: shape }
	]);
}
