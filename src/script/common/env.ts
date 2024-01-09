/**
 * 환경변수 모듈
 *
 * @author RWB
 * @since 2023.11.10 Fri 17:22:33
 */

export type MenuGroup = 'HOME' | 'MAP' | 'BASIC' | 'GEOSERVER' | 'TRANSACTION' | 'VARIATION'

export interface Menu
{
	/**
	 * 그룹
	 */
	group: MenuGroup;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 설명
	 */
	description: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;

	/**
	 * 링크
	 */
	link: string;

	/**
	 * 구분 여부
	 */
	divide?: boolean;
}

export const APP_INFO = {
	author: {
		email: 'psj2716@mensakorea.org',
		nickname: 'RWB',
		social: {
			github: {
				link: 'https://github.com/RWB0104',
				name: 'Kapoo'
			},
			linkedin: {
				link: 'https://www.linkedin.com/in/itcode/',
				name: 'RWB'
			}
		}
	},
	description: 'OpenLayers Sandbox',
	image: '/gis-dev/logo.png',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/260221872-30486c85-667f-4919-8445-3499b318748d.png',
	title: 'OpenLayers Box'
};
export const API_BASE_URL = 'https://api.itcode.dev/geoserver';
export const VWORLD_KEY = '0834AFA9-AB19-30C2-8902-0E3790CDBB2F';

export const MENU_HOME: Menu = {
	description: 'OpenLayers 8과 GeoServer를 통해 생성한 다양한 지도의 예시를 확인할 수 있습니다.',
	divide: true,
	group: 'HOME',
	link: '/',
	thumbnail: APP_INFO.thumbnail,
	title: '홈'
};

export const MENU_OSM: Menu = {
	description: '기본적으로 제공되는 OSM 객체를 VectorLayer에 적용하여 OSM 지도를 생성합니다.',
	group: 'MAP',
	link: '/osm',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171675095-54c8c18a-2bd4-4979-928d-e55c4184105d.png',
	title: 'OSM 지도'
};

export const MENU_VWORLD: Menu = {
	description: '임의의 타일 레이어를 적용하여 다양한 지도를 생성합니다. 국가에서 제공하는 V-World 타일맵을 예시로 적용하였으며, XYZ 기반의 타일맵이라면 동일한 방법으로 활용이 가능합니다.',
	divide: true,
	group: 'MAP',
	link: '/vworld',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171675864-9d886ca4-da97-4041-8854-8b2fa7593f61.png',
	title: 'V-World 지도'
};

export const MENU_MAP_INFO: Menu = {
	description: '지도의 좌표계, 바운더리 등, 여러 정보를 추출하고, 이를 별도의 패널에 표시하는 지도를 생성합니다.',
	group: 'BASIC',
	link: '/map-info',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171676198-449a45b9-b2d3-4105-ba28-420fc96f7bc1.png',
	title: '맵 정보'
};

export const MENU_GEOLOCATION: Menu = {
	description: '브라우저의 Geolocation API를 활용하여 현재 경위도 위치를 구하고, 해당 위치로 이동할 수 있는 지도를 생성합니다. 우측 상단의 버튼을 클릭하여 현재 위치로 이동할 수 있습니다.',
	group: 'BASIC',
	link: '/geolocation',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171676793-fa995885-32d7-4f0a-bb36-0475516ac19d.png',
	title: '지오로케이션'
};

export const MENU_FEATURE: Menu = {
	description: '지도에 상호작용 가능한 객체인 Feature를 생성, 삭제할 수 있는 지도를 생성합니다. 스페이스바를 눌러 지도의 중앙에 마커를 생성합니다. 이미 마커가 있을 경우, 삭제합니다.',
	divide: true,
	group: 'BASIC',
	link: '/feature',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171676976-63577e9d-26d5-49ab-8826-7d571c2ee169.png',
	title: '맵 피쳐'
};

export const MENU_WFS: Menu = {
	description: 'GeoServer를 통해 세종시 도로명주소 데이터를 지도에 표시하는 지도를 생성합니다. WFS의 GetFeature API를 사용하며, 지도에 Feature로 데이터를 표시합니다.',
	group: 'GEOSERVER',
	link: '/wfs',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171677267-71a2d78a-bf5f-437e-b00d-81fa9af3ea58.png',
	title: 'WFS'
};

export const MENU_WMS: Menu = {
	description: 'GeoServer를 통해 세종시 도로명주소 데이터를 지도에 표시하는 지도를 생성합니다. WMS의 GetMap API를 사용하며, 지도에 이미지로 데이터를 표시합니다. Tile, Image 두 방식을 선택할 수 있습니다.',
	group: 'GEOSERVER',
	link: '/wms',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171677419-bbf52eac-e3f5-4d71-b171-a28c961dd820.png',
	title: 'WMS'
};

export const MENU_FEATURE_CLICK: Menu = {
	description: 'WFS 지도의 Feature에 클릭, 호버와 같은 상호작용이 추가된 지도를 생성합니다.',
	group: 'GEOSERVER',
	link: '/feature-click',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171677600-44136c02-a35b-4c3f-ab70-fb8fe313ae2b.png',
	title: '맵 피쳐 상호작용'
};

export const MENU_WFS_POPUP: Menu = {
	description: 'WFS 지도에서 Feature 클릭 시, 해당 Feature의 정보 팝업이 나오는 지도를 생성합니다. Overlay 객체를 통해 클릭한 Feature의 정보를 받아 표시합니다.',
	group: 'GEOSERVER',
	link: '/wfs-popup',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171677734-451d4297-c7cf-4821-89d6-35edc84252b9.png',
	title: 'WFS를 활용한 팝업'
};

export const MENU_WMS_POPUP: Menu = {
	description: 'WMS 지도에서 빌딩 클릭 시, 해당 빌딩의 정보 팝업이 나오는 지도를 생성합니다. Overlay 객체를 통해 클릭한 Feature의 정보를 받아 표시합니다. WFS와 달리, 객체가 아닌 이미지이므로, 클릭 시 WMS의 GetFeatureInfo API를 사용하여 정보를 받아옵니다.',
	divide: true,
	group: 'GEOSERVER',
	link: '/wms-popup',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171677876-7307d8a6-3442-4d15-b44a-574eee85947b.png',
	title: 'WMS를 활용한 팝업'
};

export const MENU_TRANSACTION_INSERT: Menu = {
	description: 'WFS의 Transaction 기능을 활용하여 도형을 추가할 수 있는 지도를 생성합니다. 우측 상단의 버튼 클릭 시, 원하는 도형을 그리고 정보를 입력하면 해당 도형이 데이터베이스에 추가됩니다.',
	group: 'TRANSACTION',
	link: '/transaction-insert',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171678036-b7810925-d0a0-4144-aa8e-e77f37e78d18.png',
	title: 'WFS-T 삽입'
};

export const MENU_TRANSACTION_UPDATE: Menu = {
	description: 'WFS의 Transaction 기능을 활용하여 도형을 수정할 수 있는 지도를 생성합니다. 지도를 클릭하고, 이미 그려진 도형의 모양이나 정보를 수정할 수 있습니다.',
	group: 'TRANSACTION',
	link: '/transaction-update',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171678295-5bf7fedb-9e78-49b8-8519-8a0afc37dac4.png',
	title: 'WFS-T 수정'
};

export const MENU_TRANSACTION_DELETE: Menu = {
	description: 'WFS의 Transaction 기능을 활용하여 도형을 삭제할 수 있는 지도를 생성합니다. 도형을 클릭하고 삭제할 수 있습니다.',
	divide: true,
	group: 'TRANSACTION',
	link: '/transaction-delete',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171678189-b3e5262c-5670-42c9-8f95-51145ec395ec.png',
	title: 'WFS-T 삭제'
};

export const MENU_CLUSTER_MAP: Menu = {
	description: '전국 스타벅스 위치 정보를 활용하여 클러스터 맵을 생성합니다. 많은 객체를 표시할 경우, 이를 압축하여 보여줄 수 있습니다.',
	group: 'VARIATION',
	link: '/cluster-map',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171678364-6b66062f-143b-4076-a2ee-573d0f438172.png',
	title: '클러스터맵'
};

export const MENU_HEAT_MAP: Menu = {
	description: '전국 스타벅스 위치 정보를 활용하여 히트맵을 생성합니다.',
	group: 'VARIATION',
	link: '/heat-map',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171678468-c495473f-1f23-4dd6-a7df-efeec8adc9bc.png',
	title: '히트맵'
};

export const MENU_WEBGL: Menu = {
	description: '전세계 도시 위치 정보를 활용하여, WebGL 지도를 생성합니다. WebGL 레이어는 기존 레이어보다 훨씬 많은 데이터를 표시할 수 있습니다. 지도에서 WebGL, Vector 레이어를 선택하여 성능 차이를 비교할 수 있습니다.',
	group: 'VARIATION',
	link: '/webgl',
	thumbnail: 'https://user-images.githubusercontent.com/50317129/171678561-4f173439-cf86-48e6-89be-d01b839b8762.png',
	title: 'WebGL을 활용한 맵'
};

export const MENU_LIST: Menu[] = [
	MENU_HOME,
	MENU_OSM,
	MENU_VWORLD,
	MENU_MAP_INFO,
	MENU_GEOLOCATION,
	MENU_FEATURE,
	MENU_WFS,
	MENU_WMS,
	MENU_FEATURE_CLICK,
	MENU_WFS_POPUP,
	MENU_WMS_POPUP,
	MENU_TRANSACTION_INSERT,
	MENU_TRANSACTION_UPDATE,
	MENU_TRANSACTION_DELETE,
	MENU_CLUSTER_MAP,
	MENU_HEAT_MAP,
	MENU_WEBGL
];