/**
 * 환경변수 모듈
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:22:33
 */

export interface MenuList
{
	/**
	 * 이미지
	 */
	image?: string;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 링크
	 */
	link: string;

	/**
	 * 구분 여부
	 */
	divide?: boolean;
}

export const APP_INFO = { image: '/gis-dev/logo.png', title: 'OpenLayers Box' };
export const API_BASE_URL = 'https://api.itcode.dev/geoserver';
export const VWORLD_KEY = '0834AFA9-AB19-30C2-8902-0E3790CDBB2F';

export const MENU_LIST: MenuList[] = [
	{
		divide: true,
		link: '/',
		title: '홈'
	},
	{
		link: '/osm',
		title: 'OSM 지도'
	},
	{
		divide: true,
		link: '/vworld',
		title: 'V-World 지도'
	},
	{
		link: '/map-info',
		title: '맵 정보'
	},
	{
		link: '/geolocation',
		title: '지오로케이션'
	},
	{
		divide: true,
		link: '/feature',
		title: '맵 피쳐'
	},
	{
		link: '/wfs',
		title: 'WFS'
	},
	{
		link: '/wms',
		title: 'WMS'
	},
	{
		link: '/feature-click',
		title: '맵 피쳐 상호작용'
	},
	{
		link: '/wfs-popup',
		title: 'WFS를 활용한 팝업'
	},
	{
		divide: true,
		link: '/wms-popup',
		title: 'WMS를 활용한 팝업'
	},
	{
		link: '/transaction-insert',
		title: 'WFS-T 삽입'
	},
	{
		link: '/transaction-update',
		title: 'WFS-T 수정'
	},
	{
		divide: true,
		link: '/transaction-delete',
		title: 'WFS-T 삭제'
	},
	{
		link: '/cluster-map',
		title: '클러스터맵'
	},
	{
		link: '/heat-map',
		title: '히트맵'
	},
	{
		link: '/webgl',
		title: 'WebGL을 활용한 맵'
	}
];