/**
 * 트랜잭션 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.26 월 21:20:00
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map } from 'ol';
import { LineString, MultiPolygon, Point, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import {
	getBuildingDeleteXml,
	getBuildingInsertXml,
	getBuildingUpdateXml,
	refreshWfsLayer,
	toPolygonParams,
	toPolygons
} from '.';

const SRS_NAME = 'EPSG:3857';

const DEFAULT_NAMESPACE_REGEX = /\sxmlns=/u;

const POLYGON_XML_REGEX = /<gml:Polygon.*<\/gml:Polygon>/u;

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

	describe('getBuildingDeleteXml 테스트', () => {
		it('buld_test 레이어에 WFS Delete를 구성한다', () => {
			const xml = getBuildingDeleteXml('buld_test.12');

			expect(xml).toContain('<wfs:Delete typeName="buld_test">');
			expect(xml).not.toContain('<wfs:Insert>');
			expect(xml).not.toContain('<wfs:Update');
		});

		it('피쳐 ID 필터로 대상을 특정한다', () => {
			const xml = getBuildingDeleteXml('buld_test.12');

			expect(xml).toContain('<ogc:Filter><ogc:FeatureId fid="buld_test.12"/></ogc:Filter>');
		});

		it('기본 xmlns 선언을 포함하지 않는다', () => {
			expect(getBuildingDeleteXml('buld_test.12')).not.toMatch(DEFAULT_NAMESPACE_REGEX);
		});
	});

	describe('getBuildingUpdateXml 테스트', () => {
		const params = { address: '서울', id: 'buld_test.12', name: '청사', polygons: [createPolygon()], srsName: SRS_NAME };

		it('buld_test 레이어에 WFS Update를 구성한다', () => {
			const xml = getBuildingUpdateXml(params);

			expect(xml).toContain('<wfs:Update typeName="buld_test">');
			expect(xml).not.toContain('<wfs:Insert>');
		});

		it('name, address, SHAPE를 프로퍼티로 갱신한다', () => {
			const xml = getBuildingUpdateXml(params);

			expect(xml).toContain('<wfs:Name>name</wfs:Name><wfs:Value>청사</wfs:Value>');
			expect(xml).toContain('<wfs:Name>address</wfs:Name><wfs:Value>서울</wfs:Value>');
			expect(xml).toContain('<wfs:Name>SHAPE</wfs:Name><wfs:Value><gml:Polygon srsName="EPSG:3857">');
		});

		it('피쳐 ID 필터로 대상을 특정한다', () => {
			expect(getBuildingUpdateXml(params)).toContain('<ogc:Filter><ogc:FeatureId fid="buld_test.12"/></ogc:Filter>');
		});

		it('폴리곤이 둘 이상이면 gml:MultiSurface로 묶는다', () => {
			const xml = getBuildingUpdateXml({ ...params, polygons: [createPolygon(), createPolygon()] });

			expect(xml).toContain('<gml:MultiSurface srsName="EPSG:3857">');
		});

		it('이름과 주소의 특수문자를 이스케이프한다', () => {
			const xml = getBuildingUpdateXml({ ...params, address: 'A&B', name: '<청사>' });

			expect(xml).toContain('<wfs:Value>&lt;청사&gt;</wfs:Value>');
			expect(xml).toContain('<wfs:Value>A&amp;B</wfs:Value>');
		});

		it('삽입 XML과 같은 SHAPE 조각을 사용한다', () => {
			const { id, ...insertParams } = params;

			const pick = (xml: string): string | undefined => xml.match(POLYGON_XML_REGEX)?.[0];

			expect(id).toBe('buld_test.12');
			expect(pick(getBuildingUpdateXml(params))).toBeDefined();
			expect(pick(getBuildingUpdateXml(params))).toBe(pick(getBuildingInsertXml(insertParams)));
		});
	});

	describe('toPolygons 테스트', () => {
		it('Polygon은 그대로 배열에 담는다', () => {
			const polygon = createPolygon();

			expect(toPolygons(polygon)).toEqual([polygon]);
		});

		it('MultiPolygon은 폴리곤으로 펼친다', () => {
			const multi = new MultiPolygon([[EXTERIOR], [EXTERIOR]]);

			const polygons = toPolygons(multi);

			expect(polygons).toHaveLength(2);
			expect(polygons.every((polygon) => polygon instanceof Polygon)).toBe(true);
		});

		it('폴리곤이 아닌 지오메트리는 빈 배열을 반환한다', () => {
			expect(toPolygons(new Point([0, 0]))).toEqual([]);
			expect(
				toPolygons(
					new LineString([
						[0, 0],
						[1, 1]
					])
				)
			).toEqual([]);
		});

		it('지오메트리가 없으면 빈 배열을 반환한다', () => {
			expect(toPolygons(undefined)).toEqual([]);
		});
	});

	describe('refreshWfsLayer 테스트', () => {
		it('name이 wfs인 레이어의 소스를 다시 불러온다', () => {
			const source = new VectorSource();
			const refresh = vi.spyOn(source, 'refresh');
			const map = new Map({ layers: [new VectorLayer({ properties: { name: 'wfs' }, source })] });

			refreshWfsLayer(map);

			expect(refresh).toHaveBeenCalledOnce();
		});

		it('다른 이름의 레이어는 갱신하지 않는다', () => {
			const source = new VectorSource();
			const refresh = vi.spyOn(source, 'refresh');
			const map = new Map({ layers: [new VectorLayer({ properties: { name: 'draw' }, source })] });

			refreshWfsLayer(map);

			expect(refresh).not.toHaveBeenCalled();
		});

		it('WFS 레이어가 없어도 에러 없이 동작한다', () => {
			expect(() => refreshWfsLayer(new Map())).not.toThrow();
		});

		it('맵이 없어도 에러 없이 동작한다', () => {
			expect(() => refreshWfsLayer(undefined)).not.toThrow();
		});
	});
});
