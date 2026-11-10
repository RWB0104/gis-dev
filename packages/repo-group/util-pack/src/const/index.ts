/**
 * 상수 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 13:51:43
 */

export const API_URL = 'https://api.itcode.dev/geoserver';

export const EPSG = {
	3857: 'EPSG:3857',
	4326: 'EPSG:4326'
};

export interface PageLinkItem {
	/**
	 * 설명
	 */
	description: string;

	/**
	 * 이동 경로
	 */
	href: string;

	/**
	 * 제목
	 */
	title: string;
}

export interface PageLinkGroup {
	/**
	 * 그룹 설명
	 */
	description: string;

	/**
	 * 페이지 배열
	 */
	pages: PageLinkItem[];

	/**
	 * 그룹 제목
	 */
	title: string;
}

export const PAGE_LINK_GROUPS: PageLinkGroup[] = [
	{
		description: '배경 지도 타일과 맵 상태 정보',
		pages: [
			{ description: 'OpenStreetMap 타일 레이어', href: '/osm', title: 'OSM' },
			{ description: 'Google 타일 레이어', href: '/google', title: 'Google' },
			{ description: 'SRS, 줌 레벨, 중심 좌표 등 맵 정보 확인', href: '/map-info', title: '맵 정보' }
		],
		title: '기본 지도'
	},
	{
		description: 'OGC 표준 및 GPU 기반 레이어',
		pages: [
			{ description: 'WMS 이미지 레이어', href: '/wms', title: 'WMS' },
			{ description: 'WMS 피처 정보 팝업', href: '/wms-popup', title: 'WMS 팝업' },
			{ description: 'WFS 벡터 레이어', href: '/wfs', title: 'WFS' },
			{ description: 'WFS 피처 정보 팝업', href: '/wfs-popup', title: 'WFS 팝업' },
			{ description: 'WebGL 기반 대용량 렌더링', href: '/webgl', title: 'WebGL' }
		],
		title: '레이어'
	},
	{
		description: '피처 추가 및 선택',
		pages: [
			{ description: '도형 그리기와 피처 관리', href: '/feature', title: '피처' },
			{ description: '피처 클릭 상호작용', href: '/feature-click', title: '피처 클릭' }
		],
		title: '피처'
	},
	{
		description: '데이터 밀집도 표현',
		pages: [
			{ description: '포인트 클러스터링', href: '/cluster-map', title: '클러스터 맵' },
			{ description: '히트맵 시각화', href: '/heat-map', title: '히트맵' }
		],
		title: '시각화'
	},
	{
		description: 'WFS-T 기반 데이터 변경',
		pages: [
			{ description: '피처 추가', href: '/transaction-insert', title: '트랜잭션 추가' },
			{ description: '피처 수정', href: '/transaction-update', title: '트랜잭션 수정' },
			{ description: '피처 삭제', href: '/transaction-delete', title: '트랜잭션 삭제' }
		],
		title: '트랜잭션'
	},
	{
		description: '기기 기능 연동',
		pages: [{ description: '현재 위치 조회', href: '/geolocation', title: '지오로케이션' }],
		title: '기타'
	}
];

export const LOCALES: Locale[] = ['ko', 'en'];

export const SERVICE_TITLE = 'OpenLayers Playground';
export const SERVICE_TITLE_TEMPLATE = '%s | OpenLayers Playground';
