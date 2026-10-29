/**
 * 피쳐 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.23 금 15:58:52
 */

import type { Coordinate } from 'ol/coordinate';
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

export interface TransactionBuildingInfo {
	/**
	 * 주소
	 */
	address: string;

	/**
	 * 피쳐 ID
	 */
	id: string;

	/**
	 * 이름
	 */
	name: string;
}

/**
 * WFS 트랜잭션 빌딩 정보 반환 메서드
 *
 * @param {FeatureLike} feature 피쳐
 *
 * @returns {WfsBuildingInfo} 건물 정보
 */
export function getTransactionBuildingInfo(feature: FeatureLike): TransactionBuildingInfo {
	return {
		address: read(feature, 'address'),
		id: `${feature.getId() ?? EMPTY}`,
		name: read(feature, 'name')
	};
}

export interface ClusterPointInfo {
	/**
	 * 주소
	 */
	addr: string;

	/**
	 * 코드
	 */
	code: string;

	/**
	 * 도로명주소
	 */
	doroAddr: string;

	/**
	 * 군구
	 */
	gungu: string;

	/**
	 * 피쳐 ID
	 */
	id: string;

	/**
	 * 이름
	 */
	name: string;

	/**
	 * 오픈일자
	 */
	open: number;

	/**
	 * 시도
	 */
	sido: string;

	/**
	 * 전화번호
	 */
	tel: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;
}

/**
 * 클러스터 포인트 표시 정보 반환 메서드
 *
 * @param {FeatureLike} feature FeatureLike
 *
 * @returns {ClusterPointInfo} 포인트 정보
 */
export function getClusterPointInfo(feature: FeatureLike): ClusterPointInfo {
	const source: FeatureLike = feature.get('features')?.[0] ?? feature;

	return {
		addr: read(source, 'addr'),
		code: read(source, 'code'),
		doroAddr: read(source, 'doro_addr'),
		gungu: read(source, 'gungu'),
		id: `${source.getId() ?? EMPTY}`,
		name: read(source, 'name'),
		open: Number(read(source, 'open')),
		sido: read(source, 'sido'),
		tel: read(source, 'tel'),
		thumbnail: `https://www.starbucks.co.kr${read(source, 'thumbnail')}`
	};
}

export interface FeatureDescriptionItem {
	/**
	 * 라벨
	 */
	label: string;

	/**
	 * 링크
	 */
	link?: string;

	/**
	 * 값
	 */
	value: string;
}

export interface FeatureDescription {
	/**
	 * 표시 항목 배열
	 */
	items: FeatureDescriptionItem[];

	/**
	 * 썸네일
	 */
	thumbnail?: string;

	/**
	 * 제목
	 */
	title: string;
}

/**
 * WFS 건물 피쳐를 정보 카드 표시 내용으로 변환하는 메서드
 *
 * @param {FeatureLike} feature 피쳐
 *
 * @returns {FeatureDescription} 제목과 표시 항목
 */
export function describeWfsBuilding(feature: FeatureLike): FeatureDescription {
	const { id, name, noticeDate, serialNo } = getWfsBuildingInfo(feature);

	return {
		items: [
			{ label: 'ID', value: id },
			{ label: '고유일련번호', value: serialNo },
			{ label: '고시일자', value: noticeDate }
		],
		title: name
	};
}

/**
 * WFS 트랜잭션 피쳐 정보 반환 메서드
 *
 * @param {FeatureLike} feature 피쳐
 *
 * @returns {FeatureDescription} 제목과 표시 항목
 */
export function describeTransactionBuilding(feature: FeatureLike): FeatureDescription {
	const { address, id, name } = getTransactionBuildingInfo(feature);

	return {
		items: [
			{
				label: 'ID',
				value: id
			},
			{
				label: '주소',
				value: address
			}
		],
		title: name
	};
}

/**
 * 클러스터 피쳐 정보 반환 메서드
 *
 * @param {FeatureLike} feature FeatureLike
 *
 * @returns {FeatureDescription} 제목과 표시 항목
 */
export function describeClusterPoint(feature: FeatureLike): FeatureDescription {
	const { addr, doroAddr, id, name, tel, thumbnail } = getClusterPointInfo(feature);

	return {
		items: [
			{
				label: 'ID',
				value: id
			},
			{
				label: '도로명주소',
				link: `https://map.naver.com/p/search/${encodeURIComponent(doroAddr)}`,
				value: doroAddr
			},
			{
				label: '지번주소',
				link: `https://map.naver.com/p/search/${encodeURIComponent(addr)}`,
				value: addr
			},
			{
				label: '연락처',
				link: `tel:${tel}`,
				value: tel
			}
		],
		thumbnail,
		title: name
	};
}

/**
 * 피쳐 지오메트리 extent의 중심 좌표 반환 메서드
 *
 * @param {FeatureLike | undefined} feature 피쳐
 *
 * @returns {Coordinate | undefined} 중심 좌표, 피쳐나 지오메트리가 없으면 undefined
 */
export function getFeatureCenter(feature: FeatureLike | undefined): Coordinate | undefined {
	const geometry = feature?.getGeometry();

	if (geometry === undefined) {
		return undefined;
	}

	const [minX = 0, minY = 0, maxX = 0, maxY = 0] = geometry.getExtent();

	return [(minX + maxX) / 2, (minY + maxY) / 2];
}
