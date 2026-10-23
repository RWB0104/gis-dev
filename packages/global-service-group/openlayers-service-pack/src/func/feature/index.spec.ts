/**
 * 피쳐 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 17:10:00
 */

/** biome-ignore-all lint/style/useNamingConvention: for column name */

import { Feature } from 'ol';

import { getWfsBuildingInfo } from '.';

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
});
