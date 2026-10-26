/**
 * 모델 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:47:14
 */

import { fragment } from 'xmlbuilder2';

import {
	lineFragment,
	multiLineFragment,
	multiPointFragment,
	multiPolygonFragment,
	pointFragment,
	polygonFragment,
	wfsDeleteXml,
	wfsInsertXml,
	wfsUpdateXml
} from '.';

const DEFAULT_NAMESPACE_REGEX = /\sxmlns=/u;

describe('[@gis-dev/api-pack] model', () => {
	describe('pointFragment 테스트', () => {
		it('gml:Point와 gml:pos를 생성한다', () => {
			const xml = pointFragment({ position: [1, 2] }).toString();

			expect(xml).toContain('<gml:Point>');
			expect(xml).toContain('<gml:pos>1 2</gml:pos>');
		});

		it('attr를 속성으로 부착한다', () => {
			const xml = pointFragment({ attr: { srsName: 'EPSG:3857' }, position: [1, 2] }).toString();

			expect(xml).toContain('srsName="EPSG:3857"');
		});
	});

	describe('multiPointFragment 테스트', () => {
		it('각 포인트를 gml:pointMember로 감싼다', () => {
			const xml = multiPointFragment({
				points: [{ position: [1, 2] }, { position: [3, 4] }]
			}).toString();

			expect(xml).toContain('<gml:MultiPoint>');
			expect(xml.match(/<gml:pointMember>/gu)).toHaveLength(2);
		});

		it('attr를 속성으로 부착한다', () => {
			const xml = multiPointFragment({
				attr: { srsName: 'EPSG:3857' },
				points: [{ position: [1, 2] }]
			}).toString();

			expect(xml).toContain('srsName="EPSG:3857"');
		});
	});

	describe('lineFragment 테스트', () => {
		it('gml:LineString과 gml:posList를 생성한다', () => {
			const xml = lineFragment({ position: [1, 2, 3, 4] }).toString();

			expect(xml).toContain('<gml:LineString>');
			expect(xml).toContain('<gml:posList>1 2 3 4</gml:posList>');
		});

		it('attr를 속성으로 부착한다', () => {
			const xml = lineFragment({ attr: { srsName: 'EPSG:3857' }, position: [1, 2] }).toString();

			expect(xml).toContain('srsName="EPSG:3857"');
		});
	});

	describe('multiLineFragment 테스트', () => {
		it('각 라인을 gml:curveMember로 감싸 gml:MultiCurve에 넣는다', () => {
			const xml = multiLineFragment({
				lines: [{ position: [1, 2, 3, 4] }, { position: [5, 6, 7, 8] }]
			}).toString();

			expect(xml).toContain('<gml:MultiCurve>');
			expect(xml.match(/<gml:curveMember>/gu)).toHaveLength(2);
		});

		it('attr를 속성으로 부착한다', () => {
			const xml = multiLineFragment({
				attr: { srsName: 'EPSG:3857' },
				lines: [{ position: [1, 2] }]
			}).toString();

			expect(xml).toContain('srsName="EPSG:3857"');
		});
	});

	describe('polygonFragment 테스트', () => {
		it('gml:exterior의 LinearRing posList를 생성한다', () => {
			const xml = polygonFragment({ exterior: [0, 0, 1, 0, 1, 1, 0, 0] }).toString();

			expect(xml).toContain('<gml:Polygon>');
			expect(xml).toContain('<gml:exterior>');
			expect(xml).toContain('<gml:posList>0 0 1 0 1 1 0 0</gml:posList>');
		});

		it('interior가 있으면 gml:interior를 추가한다', () => {
			const xml = polygonFragment({
				exterior: [0, 0, 1, 0, 1, 1, 0, 0],
				interior: [[0.2, 0.2, 0.4, 0.2, 0.4, 0.4, 0.2, 0.2]]
			}).toString();

			expect(xml).toContain('<gml:interior>');
			expect(xml).toContain('<gml:posList>0.2 0.2 0.4 0.2 0.4 0.4 0.2 0.2</gml:posList>');
		});

		it('interior가 없으면 gml:interior를 추가하지 않는다', () => {
			const xml = polygonFragment({ exterior: [0, 0, 1, 0, 1, 1, 0, 0] }).toString();

			expect(xml).not.toContain('<gml:interior>');
		});

		it('attr를 속성으로 부착한다', () => {
			const xml = polygonFragment({
				attr: { srsName: 'EPSG:3857' },
				exterior: [0, 0, 1, 0, 1, 1, 0, 0]
			}).toString();

			expect(xml).toContain('srsName="EPSG:3857"');
		});
	});

	describe('multiPolygonFragment 테스트', () => {
		it('각 폴리곤을 gml:surfaceMember로 감싸 gml:MultiSurface에 넣는다', () => {
			const xml = multiPolygonFragment({
				polygons: [{ exterior: [0, 0, 1, 0, 1, 1, 0, 0] }, { exterior: [2, 2, 3, 2, 3, 3, 2, 2] }]
			}).toString();

			expect(xml).toContain('<gml:MultiSurface>');
			expect(xml.match(/<gml:surfaceMember>/gu)).toHaveLength(2);
		});

		it('attr를 속성으로 부착한다', () => {
			const xml = multiPolygonFragment({
				attr: { srsName: 'EPSG:3857' },
				polygons: [{ exterior: [0, 0, 1, 0, 1, 1, 0, 0] }]
			}).toString();

			expect(xml).toContain('srsName="EPSG:3857"');
		});
	});

	describe('wfsInsertXml 테스트', () => {
		it('wfs:Transaction/wfs:Insert 안에 레이어와 항목을 넣는다', () => {
			const xml = wfsInsertXml('buld_test', [{ tagName: 'name', type: 'string', value: '건물A' }]);

			expect(xml).toContain('<wfs:Transaction');
			expect(xml).toContain('<wfs:Insert>');
			expect(xml).toContain('<buld_test>');
			expect(xml).toContain('<name>건물A</name>');
		});

		it('string 값을 태그 안에 넣는다(형제로 새지 않는다)', () => {
			const xml = wfsInsertXml('buld_test', [{ tagName: 'address', type: 'string', value: '서울' }]);

			expect(xml).toContain('<address>서울</address>');
			expect(xml).not.toContain('<address/>');
		});

		it('xml 타입 항목은 import로 자식에 삽입한다', () => {
			const poly = polygonFragment({ exterior: [0, 0, 1, 0, 1, 1, 0, 0] });
			const xml = wfsInsertXml('buld_test', [{ tagName: 'SHAPE', type: 'xml', value: poly }]);

			expect(xml).toContain('<SHAPE><gml:Polygon>');
		});

		it('특수문자를 이스케이프한다', () => {
			const xml = wfsInsertXml('buld_test', [{ tagName: 'name', type: 'string', value: '<A>' }]);

			expect(xml).toContain('&lt;A&gt;');
		});

		it('루트 wfs:Transaction에 WFS 1.1.0 네임스페이스/스키마를 선언한다', () => {
			const xml = wfsInsertXml('buld_test', [{ tagName: 'name', type: 'string', value: 'a' }]);

			expect(xml).toContain('version="1.1.0"');
			expect(xml).toContain('xmlns:gml="http://www.opengis.net/gml"');
			expect(xml).toContain('wfs/1.1.0/wfs.xsd');
		});

		it('기본 네임스페이스(xmlns=)를 선언하지 않아 피처 요소가 WFS 네임스페이스에 속하지 않는다', () => {
			const xml = wfsInsertXml('buld_test', [{ tagName: 'name', type: 'string', value: 'a' }]);

			expect(xml).not.toMatch(DEFAULT_NAMESPACE_REGEX);
			expect(xml).toContain('xmlns:wfs="http://www.opengis.net/wfs"');
		});
	});

	describe('wfsUpdateXml 테스트', () => {
		it('wfs:Property 안에 Name과 Value를 쌍으로 넣는다', () => {
			const filter = fragment().ele('ogc:FeatureId', { fid: 'buld_test.1' }).up();
			const xml = wfsUpdateXml('buld_test', [{ tagName: 'name', type: 'string', value: '건물B' }], filter);

			expect(xml).toContain('<wfs:Property><wfs:Name>name</wfs:Name><wfs:Value>건물B</wfs:Value></wfs:Property>');
		});

		it('typeName 속성을 부착한다', () => {
			const filter = fragment().ele('ogc:FeatureId', { fid: 'buld_test.1' }).up();
			const xml = wfsUpdateXml('buld_test', [{ tagName: 'name', type: 'string', value: 'a' }], filter);

			expect(xml).toContain('typeName="buld_test"');
		});

		it('xml 타입 값은 Value 안에 import한다', () => {
			const filter = fragment().ele('ogc:FeatureId', { fid: 'buld_test.1' }).up();
			const poly = polygonFragment({ exterior: [0, 0, 1, 0, 1, 1, 0, 0] });
			const xml = wfsUpdateXml('buld_test', [{ tagName: 'SHAPE', type: 'xml', value: poly }], filter);

			expect(xml).toContain('<wfs:Value><gml:Polygon>');
		});

		it('filter를 ogc:Filter로 삽입한다', () => {
			const filter = fragment().ele('ogc:FeatureId', { fid: 'buld_test.42' }).up();
			const xml = wfsUpdateXml('buld_test', [{ tagName: 'name', type: 'string', value: 'a' }], filter);

			expect(xml).toContain('<ogc:Filter><ogc:FeatureId fid="buld_test.42"/></ogc:Filter>');
		});
	});

	describe('wfsDeleteXml 테스트', () => {
		it('typeName과 ogc:Filter를 가진 wfs:Delete를 생성한다', () => {
			const filter = fragment().ele('ogc:FeatureId', { fid: 'buld_test.2' }).up();
			const xml = wfsDeleteXml('buld_test', filter);

			expect(xml).toContain('<wfs:Delete typeName="buld_test">');
			expect(xml).toContain('<ogc:Filter><ogc:FeatureId fid="buld_test.2"/></ogc:Filter>');
		});

		it('루트 wfs:Transaction 래퍼를 포함한다', () => {
			const filter = fragment().ele('ogc:FeatureId', { fid: 'buld_test.2' }).up();
			const xml = wfsDeleteXml('buld_test', filter);

			expect(xml).toContain('<wfs:Transaction');
		});
	});
});
