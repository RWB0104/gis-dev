/**
 * 피쳐 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.23 금 15:58:52
 */

import type { FeatureLike } from 'ol/Feature';

import { formatDate } from '@gis-dev/util-pack/date';

const EMPTY = '-';

/**
 * 속성 값을 문자열로 읽고, 비어 있으면 대체 문자를 반환하는 메서드
 */
function read(feature: FeatureLike, key: string): string {
	return `${feature.get(key) ?? ''}` || EMPTY;
}

export interface WfsBuildingInfo {
	/**
	 * 피쳐 ID
	 */
	id: string;

	/**
	 * 건물명
	 */
	name: string;

	/**
	 * 고시일자(yyyy-MM-dd)
	 */
	noticeDate: string;

	/**
	 * 고유일련번호
	 */
	serialNo: string;
}

/**
 * WFS 건물 피쳐에서 표시용 정보를 추출하는 메서드
 *
 * @param {FeatureLike} feature 피쳐
 *
 * @returns {WfsBuildingInfo} 건물 정보
 */
export function getWfsBuildingInfo(feature: FeatureLike): WfsBuildingInfo {
	return {
		id: `${feature.getId() ?? EMPTY}`,
		name: read(feature, 'buld_nm'),
		noticeDate: formatDate(({ year, month, date }) => `${year.text}-${month.text}-${date.text}`, read(feature, 'ntfc_de')),
		serialNo: read(feature, 'bul_man_no')
	};
}
