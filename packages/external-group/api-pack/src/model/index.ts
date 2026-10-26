/**
 * 모델 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.16 금 18:25:00
 */

import { create, fragment } from 'xmlbuilder2';

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

/**
 * 기본 XML 반환 메서드
 *
 * @returns {XmlBuilder} XmlBuilder
 */
function getBaseDoc(): XmlBuilder {
	return create({ encoding: 'UTF-8', version: '1.0' }).ele('wfs:Transaction', {
		service: 'WFS',
		version: '1.1.0',
		'xmlns:gml': 'http://www.opengis.net/gml',
		'xmlns:ogc': 'http://www.opengis.net/ogc',
		'xmlns:ows': 'http://www.opengis.net/ows',
		'xmlns:wfs': 'http://www.opengis.net/wfs',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
		'xsi:schemaLocation': 'http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd'
	});
}

export type XmlBuilder = ReturnType<typeof create>;

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

export interface LayerBaseItem {
	/**
	 * 태그명
	 */
	tagName: string;

	/**
	 * 타입
	 */
	type: 'string' | 'xml';
}

export interface LayerStringItem extends LayerBaseItem {
	/**
	 * 타입
	 */
	type: 'string';

	/**
	 * 값
	 */
	value: string;
}

export interface LayerXmlItem extends LayerBaseItem {
	/**
	 * 타입
	 */
	type: 'xml';

	/**
	 * 값
	 */
	value: XmlBuilder;
}

export type LayerItem = LayerStringItem | LayerXmlItem;

/**
 * WFS Insert XML 반환 메서드
 *
 * @param {string} layerName 레이어 이름
 * @param {LayerItem[]} items 아이템
 *
 * @returns {string} XML
 */
export function wfsInsertXml(layerName: string, items: LayerItem[]): string {
	const root = getBaseDoc();
	const layer = root.ele('wfs:Insert').ele(layerName);

	items.forEach((item) => {
		const child = layer.ele(item.tagName);

		if (item.type === 'xml') {
			child.import(item.value);
		} else {
			child.txt(item.value);
		}
	});

	return root.end({ headless: true });
}

/**
 * WFS Update XML 반환 메서드
 *
 * @param {string} layerName 레이어 이름
 * @param {LayerItem[]} items 아이템
 * @param {XmlBuilder} filter OGC 필터
 *
 * @returns {string} XML
 */
export function wfsUpdateXml(layerName: string, items: LayerItem[], filter: XmlBuilder): string {
	const root = getBaseDoc();
	const update = root.ele('wfs:Update').att('typeName', layerName);

	items.forEach((item) => {
		const property = update.ele('wfs:Property');

		property.ele('wfs:Name').txt(item.tagName);

		const value = property.ele('wfs:Value');

		if (item.type === 'xml') {
			value.import(item.value);
		} else {
			value.txt(item.value);
		}
	});

	update.ele('ogc:Filter').import(filter);

	return root.end({ headless: true });
}

/**
 * WFS Delete XML 반환 메서드
 *
 * @param {string} layerName 레이어 이름
 * @param {XmlBuilder} filter OGC 필터
 *
 * @returns {string} XML
 */
export function wfsDeleteXml(layerName: string, filter: XmlBuilder): string {
	const root = getBaseDoc();
	const del = root.ele('wfs:Delete').att('typeName', layerName);

	del.ele('ogc:Filter').import(filter);

	return root.end({ headless: true });
}
