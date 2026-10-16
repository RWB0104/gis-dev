/**
 * 모델 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.16 Fri 18:25:00
 */

import { type create, fragment } from 'xmlbuilder2';

/**
 * 속성 추가 메서드
 *
 * @param {XmlBuilder} docs XmlBuilder
 * @param {FragmentAttr} attr FragmentAttr
 */
function addAttr(docs: XmlBuilder, attr: FragmentAttr): void {
	Object.entries(attr).forEach(([k, v]) => {
		docs.att(k, `${v}`);
	});
}

export type XmlBuilder = ReturnType<typeof create>;

export interface LayerItem {
	tagName: string;
	type?: 'string' | 'xml';
}

export interface LayerStringItem extends LayerItem {
	type: 'string';
	value: string;
}

export interface LayerXmlItem extends LayerItem {
	type: 'xml';
	value: XmlBuilder;
}

export type FragmentAttr = Record<string, string | number | boolean>;

export interface FragmentParams {
	/**
	 * 속성
	 */
	attr?: FragmentAttr;
}

export interface PointFragmentParams extends FragmentParams {
	/**
	 * 위치
	 */
	position: [number, number];
}

/**
 * 포인트 XML 반환 메서드
 *
 * @param {PointFragmentParams} param0 PointFragmentParams
 *
 * @returns {XmlBuilder} XmlBuilder
 */
export function pointFragment({ attr, position }: PointFragmentParams): XmlBuilder {
	const docs = fragment().ele('gml:Point');

	if (attr) {
		addAttr(docs, attr);
	}

	docs.ele('gml:pos').txt(position.join(' '));

	return docs;
}

export interface MultiPointFragmentParams extends FragmentParams {
	/**
	 * 포인트 배열
	 */
	points: PointFragmentParams[];
}

/**
 * 멀티 포인트 XML 반환 메서드
 *
 * @param {MultiPointFragmentParams} param0 MultiPointFragmentParams
 *
 * @returns {XmlBuilder} XmlBuilder
 */
export function multiPointFragment({ attr, points }: MultiPointFragmentParams): XmlBuilder {
	const docs = fragment().ele('gml:MultiPoint');

	if (attr) {
		addAttr(docs, attr);
	}

	points.forEach((point) => {
		docs.ele('gml:pointMember').import(pointFragment(point)).up();
	});

	return docs;
}

export interface LineFragmentParams extends FragmentParams {
	/**
	 * 위치
	 */
	position: number[];
}

/**
 * 라인 XML 반환 메서드
 *
 * @param {LineFragmentParams} param0 LineFragmentParams
 *
 * @returns {XmlBuilder} XmlBuilder
 */
export function lineFragment({ attr, position }: LineFragmentParams): XmlBuilder {
	const docs = fragment().ele('gml:LineString');

	if (attr) {
		addAttr(docs, attr);
	}

	docs.ele('gml:posList').txt(position.join(' '));

	return docs;
}

export interface MultiLineFragmentParams extends FragmentParams {
	/**
	 * 라인 배열
	 */
	lines: LineFragmentParams[];
}

/**
 * 멀티 라인 XML 반환 메서드
 *
 * @param {MultiLineFragmentParams} param0 MultiLineFragmentParams
 *
 * @returns {XmlBuilder} XmlBuilder
 */
export function multiLineFragment({ attr, lines }: MultiLineFragmentParams): XmlBuilder {
	const docs = fragment().ele('gml:MultiCurve');

	if (attr) {
		addAttr(docs, attr);
	}

	lines.forEach((line) => {
		docs.ele('gml:curveMember').import(lineFragment(line)).up();
	});

	return docs;
}

export interface PolygonFragmentParams extends FragmentParams {
	/**
	 * 외부 테두리
	 */
	exterior: number[];

	/**
	 * 내부 테두리
	 */
	interior?: number[][];
}

/**
 * 폴리곤 XML 반환 메서드
 *
 * @param {PolygonFragmentParams} param0 PolygonFragmentParams
 *
 * @returns {XmlBuilder} XmlBuilder
 */
export function polygonFragment({ attr, exterior, interior }: PolygonFragmentParams): XmlBuilder {
	const docs = fragment().ele('gml:Polygon');

	if (attr) {
		addAttr(docs, attr);
	}

	docs.ele('gml:exterior').ele('gml:LinearRing').ele('gml:posList').txt(exterior.join(' ')).up().up().up();

	interior?.forEach((i) => {
		docs.ele('gml:interior').ele('gml:LinearRing').ele('gml:posList').txt(i.join(' ')).up().up().up();
	});

	return docs;
}

export interface MultiPolygonFragmentParams extends FragmentParams {
	/**
	 * 폴리곤 배열
	 */
	polygons: PolygonFragmentParams[];
}

/**
 * 멀티 폴리곤 XML 반환 메서드
 *
 * @param {MultiPolygonFragmentParams} param0 MultiPolygonFragmentParams
 *
 * @returns {XmlBuilder} XmlBuilder
 */
export function multiPolygonFragment({ attr, polygons }: MultiPolygonFragmentParams): XmlBuilder {
	const docs = fragment().ele('gml:MultiSurface');

	if (attr) {
		addAttr(docs, attr);
	}

	polygons.forEach((polygon) => {
		docs.ele('gml:surfaceMember').import(polygonFragment(polygon)).up();
	});

	return docs;
}

export function wfsInsertFragment() {

}

// const doc = create({ encoding: 'UTF-8', version: '1.0' })
// 	.ele('wfs:Transaction', {
// 		service: 'WFS',
// 		updateSequence: '0',
// 		version: '1.1.0',
// 		xmlns: 'http://www.opengis.net/wfs',
// 		'xmlns:gml': 'http://www.opengis.net/gml',
// 		'xmlns:ogc': 'http://www.opengis.net/ogc',
// 		'xmlns:ows': 'http://www.opengis.net/ows',
// 		'xmlns:wfs': 'http://www.opengis.net/wfs',
// 		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
// 		'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
// 		'xsi:schemaLocation': 'http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-capabilities.xsd'
// 	})
// 	.ele('wfs:Insert')
// 	.ele(layerName)
// 	.ele('name')
// 	.txt(data.name)
// 	.up()
// 	.ele('address')
// 	.txt(data.address)
// 	.up()
// 	.ele(columnName)
// 	.txt(data.name)
// 	.up()
// 	.up()
// 	.up()
// 	.up();
