/**
 * 피쳐 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 17:10:00
 */

/** biome-ignore-all lint/style/useNamingConvention: for column name */

import { Feature } from 'ol';
import { Point, Polygon } from 'ol/geom';

import {
	describeClusterPoint,
	describeTransactionBuilding,
	describeWfsBuilding,
	getClusterPointInfo,
	getFeatureCenter,
	getTransactionBuildingInfo,
	getWfsBuildingInfo
} from '.';

/**
 * 속성이 지정된 피쳐를 생성하는 메서드
 */
function createFeature(properties: Record<string, unknown>, id?: string | number): Feature {
	const feature = new Feature(properties);

	if (id !== undefined) {
		feature.setId(id);
	}

	return feature;
}

describe('[@gis-dev/openlayers-service-pack] feature', () => {
	describe('getWfsBuildingInfo 테스트', () => {
		it('피쳐 ID, 건물명, 고유일련번호를 추출한다', () => {
			const feature = createFeature({ bul_man_no: '58190', buld_nm: '세종시청사' }, 'buld_sejong.108');

			expect(getWfsBuildingInfo(feature)).toMatchObject({
				id: 'buld_sejong.108',
				name: '세종시청사',
				serialNo: '58190'
			});
		});

		it('숫자 속성과 숫자 ID도 문자열로 변환한다', () => {
			const feature = createFeature({ bul_man_no: 58190 }, 108);

			expect(getWfsBuildingInfo(feature)).toMatchObject({ id: '108', serialNo: '58190' });
		});

		it('ID가 없으면 대체 문자를 반환한다', () => {
			expect(getWfsBuildingInfo(createFeature({})).id).toBe('-');
		});

		it('건물명과 고유일련번호가 없으면 대체 문자를 반환한다', () => {
			expect(getWfsBuildingInfo(createFeature({}))).toMatchObject({ name: '-', serialNo: '-' });
		});

		it('건물명과 고유일련번호가 null이거나 빈 문자열이면 대체 문자를 반환한다', () => {
			const feature = createFeature({ bul_man_no: '', buld_nm: null });

			expect(getWfsBuildingInfo(feature)).toMatchObject({ name: '-', serialNo: '-' });
		});

		it('yyyy-MM-dd 형식의 고시일자는 그대로 유지한다', () => {
			expect(getWfsBuildingInfo(createFeature({ ntfc_de: '2015-03-16' })).noticeDate).toBe('2015-03-16');
		});

		it.fails('yyyyMMdd 형식의 고시일자를 yyyy-MM-dd로 변환한다', () => {
			expect(getWfsBuildingInfo(createFeature({ ntfc_de: '20150316' })).noticeDate).toBe('2015-03-16');
		});

		it.fails('고시일자가 없으면 대체 문자를 반환한다', () => {
			expect(getWfsBuildingInfo(createFeature({})).noticeDate).toBe('-');
		});
	});

	describe('describeWfsBuilding 테스트', () => {
		it('건물명을 제목으로 한다', () => {
			expect(describeWfsBuilding(createFeature({ buld_nm: '세종시청사' })).title).toBe('세종시청사');
		});

		it('ID, 고유일련번호, 고시일자 순서로 항목을 만든다', () => {
			const feature = createFeature({ bul_man_no: '58190', ntfc_de: '2015-03-16' }, 'buld_sejong.108');

			expect(describeWfsBuilding(feature).items).toEqual([
				{ label: 'ID', value: 'buld_sejong.108' },
				{ label: '고유일련번호', value: '58190' },
				{ label: '고시일자', value: '2015-03-16' }
			]);
		});

		it('값이 없으면 제목과 ID, 일련번호를 대체 문자로 채운다', () => {
			const description = describeWfsBuilding(createFeature({}));

			expect(description.title).toBe('-');
			expect(description.items[0]).toEqual({ label: 'ID', value: '-' });
			expect(description.items[1]).toEqual({ label: '고유일련번호', value: '-' });
		});
	});

	describe('getTransactionBuildingInfo 테스트', () => {
		it('피쳐 ID, 이름, 주소를 추출한다', () => {
			const feature = createFeature({ address: '서울 중구', name: '청사' }, 'buld_test.12');

			expect(getTransactionBuildingInfo(feature)).toEqual({ address: '서울 중구', id: 'buld_test.12', name: '청사' });
		});

		it('숫자 ID도 문자열로 변환한다', () => {
			expect(getTransactionBuildingInfo(createFeature({}, 12)).id).toBe('12');
		});

		it('값이 없으면 대체 문자를 반환한다', () => {
			expect(getTransactionBuildingInfo(createFeature({}))).toEqual({ address: '-', id: '-', name: '-' });
		});

		it('이름과 주소가 null이거나 빈 문자열이면 대체 문자를 반환한다', () => {
			const feature = createFeature({ address: '', name: null });

			expect(getTransactionBuildingInfo(feature)).toMatchObject({ address: '-', name: '-' });
		});

		it('buld_sejong 전용 컬럼(buld_nm, bul_man_no)은 읽지 않는다', () => {
			const feature = createFeature({ bul_man_no: '58190', buld_nm: '세종시청사' });

			expect(getTransactionBuildingInfo(feature)).toMatchObject({ address: '-', name: '-' });
		});
	});

	describe('describeTransactionBuilding 테스트', () => {
		it('이름을 제목으로 한다', () => {
			expect(describeTransactionBuilding(createFeature({ name: '청사' })).title).toBe('청사');
		});

		it('ID, 주소 순서로 항목을 만든다', () => {
			const feature = createFeature({ address: '서울 중구', name: '청사' }, 'buld_test.12');

			expect(describeTransactionBuilding(feature).items).toEqual([
				{ label: 'ID', value: 'buld_test.12' },
				{ label: '주소', value: '서울 중구' }
			]);
		});

		it('값이 없으면 제목과 항목 값을 대체 문자로 채운다', () => {
			const description = describeTransactionBuilding(createFeature({}));

			expect(description.title).toBe('-');
			expect(description.items).toEqual([
				{ label: 'ID', value: '-' },
				{ label: '주소', value: '-' }
			]);
		});

		it('WFS 건물 정보와 달리 일련번호, 고시일자 항목을 만들지 않는다', () => {
			const labels = describeTransactionBuilding(createFeature({})).items.map((item) => item.label);

			expect(labels).not.toContain('고유일련번호');
			expect(labels).not.toContain('고시일자');
		});
	});

	describe('getFeatureCenter 테스트', () => {
		it('피쳐가 없으면 undefined를 반환한다', () => {
			expect(getFeatureCenter(undefined)).toBeUndefined();
		});

		it('지오메트리가 없으면 undefined를 반환한다', () => {
			expect(getFeatureCenter(createFeature({}))).toBeUndefined();
		});

		it('폴리곤 extent의 중심을 반환한다', () => {
			const polygon = new Polygon([
				[
					[0, 0],
					[10, 0],
					[10, 20],
					[0, 20],
					[0, 0]
				]
			]);

			expect(getFeatureCenter(createFeature({ geometry: polygon }))).toEqual([5, 10]);
		});

		it('포인트는 그 좌표를 반환한다', () => {
			expect(getFeatureCenter(createFeature({ geometry: new Point([100, 200]) }))).toEqual([100, 200]);
		});
	});

	describe('getClusterPointInfo 테스트', () => {
		const properties = {
			addr: '서울 강남구 역삼동',
			code: '1234',
			doro_addr: '서울 강남구 테헤란로 1',
			gungu: '강남구',
			name: '강남점',
			open: '2005',
			sido: '서울',
			tel: '02-123-4567',
			thumbnail: '/upload/store/a.jpg'
		};

		/**
		 * 원본 피쳐를 묶은 클러스터 래퍼 피쳐를 생성하는 메서드
		 */
		function createCluster(members: Feature[]): Feature {
			return new Feature({ features: members, geometry: new Point([0, 0]) });
		}

		it('클러스터 래퍼에서 첫 번째 원본 피쳐의 속성을 읽는다', () => {
			const member = createFeature(properties, 'point_starbucks.1');

			expect(getClusterPointInfo(createCluster([member, createFeature({ name: '다른점' })]))).toEqual({
				addr: '서울 강남구 역삼동',
				code: '1234',
				doroAddr: '서울 강남구 테헤란로 1',
				gungu: '강남구',
				id: 'point_starbucks.1',
				name: '강남점',
				open: 2005,
				sido: '서울',
				tel: '02-123-4567',
				thumbnail: 'https://www.starbucks.co.kr/upload/store/a.jpg'
			});
		});

		it('클러스터가 아닌 단일 피쳐는 그대로 읽는다', () => {
			const info = getClusterPointInfo(createFeature(properties, 7));

			expect(info.name).toBe('강남점');
			expect(info.id).toBe('7');
		});

		it('묶인 피쳐가 비어 있으면 래퍼 자신을 읽는다', () => {
			const info = getClusterPointInfo(createCluster([]));

			expect(info.name).toBe('-');
			expect(info.id).toBe('-');
		});

		it('값이 없는 속성은 대체 문자를 반환한다', () => {
			const info = getClusterPointInfo(createCluster([createFeature({})]));

			expect(info).toMatchObject({ addr: '-', code: '-', doroAddr: '-', gungu: '-', name: '-', sido: '-', tel: '-' });
		});

		it('썸네일 경로 앞에 스타벅스 도메인을 붙인다', () => {
			expect(getClusterPointInfo(createCluster([createFeature(properties)])).thumbnail).toBe(
				'https://www.starbucks.co.kr/upload/store/a.jpg'
			);
		});
	});

	describe('describeClusterPoint 테스트', () => {
		const properties = {
			addr: '서울 강남구 역삼동',
			doro_addr: '서울 강남구 테헤란로 1',
			name: '강남점',
			tel: '02-123-4567',
			thumbnail: '/upload/store/a.jpg'
		};

		/**
		 * 클러스터 래퍼에 담긴 설명을 반환하는 메서드
		 */
		function describeCluster(): ReturnType<typeof describeClusterPoint> {
			const member = createFeature(properties, 'point_starbucks.1');

			return describeClusterPoint(new Feature({ features: [member], geometry: new Point([0, 0]) }));
		}

		it('이름을 제목으로, 썸네일을 함께 반환한다', () => {
			const description = describeCluster();

			expect(description.title).toBe('강남점');
			expect(description.thumbnail).toBe('https://www.starbucks.co.kr/upload/store/a.jpg');
		});

		it('ID, 도로명주소, 지번주소, 연락처 순서로 항목을 구성한다', () => {
			expect(describeCluster().items.map(({ label, value }) => [label, value])).toEqual([
				['ID', 'point_starbucks.1'],
				['도로명주소', '서울 강남구 테헤란로 1'],
				['지번주소', '서울 강남구 역삼동'],
				['연락처', '02-123-4567']
			]);
		});

		it('주소는 네이버 지도 검색 링크로, 연락처는 전화 링크로 연결한다', () => {
			const [id, doro, jibun, tel] = describeCluster().items;

			expect(id?.link).toBeUndefined();
			expect(doro?.link).toBe(`https://map.naver.com/p/search/${encodeURIComponent('서울 강남구 테헤란로 1')}`);
			expect(jibun?.link).toBe(`https://map.naver.com/p/search/${encodeURIComponent('서울 강남구 역삼동')}`);
			expect(tel?.link).toBe('tel:02-123-4567');
		});
	});
});
