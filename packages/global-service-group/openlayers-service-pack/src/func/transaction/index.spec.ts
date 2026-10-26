/**
 * 트랜잭션 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:20:00
 */

import { Polygon } from 'ol/geom';

import { getBuildingInsertXml, toPolygonParams } from '.';

const SRS_NAME = 'EPSG:3857';

const EXTERIOR = [
	[0, 0],
	[10, 0],
	[10, 10],
	[0, 10],
	[0, 0]
];

const HOLE = [
	[2, 2],
	[4, 2],
	[4, 4],
	[2, 4],
	[2, 2]
];

/**
 * 외곽선만 있는 폴리곤을 생성하는 메서드
 */
function createPolygon(): Polygon {
	return new Polygon([EXTERIOR]);
}

describe('[@gis-dev/openlayers-service-pack] transaction', () => {
	describe('toPolygonParams 테스트', () => {
		it('외곽선 좌표를 평탄화하고 srsName 속성을 붙인다', () => {
			const params = toPolygonParams(createPolygon(), SRS_NAME);

			expect(params.exterior).toEqual([0, 0, 10, 0, 10, 10, 0, 10, 0, 0]);
			expect(params.attr).toEqual({ srsName: SRS_NAME });
		});

		it('내부 링(구멍)이 없으면 interior를 비운다', () => {
			expect(toPolygonParams(createPolygon(), SRS_NAME).interior).toEqual([]);
		});

		it('내부 링(구멍)을 interior로 분리한다', () => {
			const params = toPolygonParams(new Polygon([EXTERIOR, HOLE]), SRS_NAME);

			expect(params.exterior).toEqual([0, 0, 10, 0, 10, 10, 0, 10, 0, 0]);
			expect(params.interior).toEqual([[2, 2, 4, 2, 4, 4, 2, 4, 2, 2]]);
		});

		it('링이 없는 빈 폴리곤이면 빈 외곽선을 반환한다', () => {
			expect(toPolygonParams(new Polygon([]), SRS_NAME).exterior).toEqual([]);
		});
	});

	describe('getBuildingInsertXml 테스트', () => {
		it('buld_test 레이어에 WFS Insert를 구성한다', () => {
			const xml = getBuildingInsertXml({ address: '서울', name: '청사', polygons: [createPolygon()], srsName: SRS_NAME });

			expect(xml).toContain('<wfs:Insert><buld_test>');
			expect(xml).toContain('<name>청사</name>');
			expect(xml).toContain('<address>서울</address>');
		});

		it('폴리곤이 하나면 gml:Polygon으로 SHAPE에 넣는다', () => {
			const xml = getBuildingInsertXml({ address: 'a', name: 'n', polygons: [createPolygon()], srsName: SRS_NAME });

			expect(xml).toContain('<SHAPE><gml:Polygon srsName="EPSG:3857">');
			expect(xml).toContain('<gml:posList>0 0 10 0 10 10 0 10 0 0</gml:posList>');
			expect(xml).not.toContain('gml:MultiSurface');
		});

		it('폴리곤이 둘 이상이면 gml:MultiSurface로 묶는다', () => {
			const xml = getBuildingInsertXml({
				address: 'a',
				name: 'n',
				polygons: [createPolygon(), createPolygon()],
				srsName: SRS_NAME
			});

			expect(xml).toContain('<SHAPE><gml:MultiSurface srsName="EPSG:3857">');
			expect(xml.match(/<gml:surfaceMember>/gu)).toHaveLength(2);
		});

		it('폴리곤이 없으면 빈 MultiSurface를 만든다', () => {
			const xml = getBuildingInsertXml({ address: 'a', name: 'n', polygons: [], srsName: SRS_NAME });

			expect(xml).toContain('gml:MultiSurface');
			expect(xml).not.toContain('gml:surfaceMember');
		});

		it('전달한 srsName을 지오메트리에 사용한다', () => {
			const xml = getBuildingInsertXml({ address: 'a', name: 'n', polygons: [createPolygon()], srsName: 'EPSG:4326' });

			expect(xml).toContain('srsName="EPSG:4326"');
			expect(xml).not.toContain('EPSG:3857');
		});

		it('이름과 주소의 특수문자를 이스케이프한다', () => {
			const xml = getBuildingInsertXml({
				address: 'A&B',
				name: '<청사>',
				polygons: [createPolygon()],
				srsName: SRS_NAME
			});

			expect(xml).toContain('<name>&lt;청사&gt;</name>');
			expect(xml).toContain('<address>A&amp;B</address>');
		});

		it('피처 요소가 WFS 네임스페이스에 속하지 않도록 기본 네임스페이스를 선언하지 않는다', () => {
			const xml = getBuildingInsertXml({ address: 'a', name: 'n', polygons: [createPolygon()], srsName: SRS_NAME });

			expect(xml).not.toMatch(DEFAULT_NAMESPACE_REGEX);
		});
	});
});

const DEFAULT_NAMESPACE_REGEX = /\sxmlns=/u;
