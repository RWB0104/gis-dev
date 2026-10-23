/**
 * WMS 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 18:10:00
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Map, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import { ImageWMS, OSM, TileWMS } from 'ol/source';

import { getWmsFeatureInfoUrl } from '.';

const WMS_URL = 'https://example.com/geoserver/wms';
const COORDINATE = [14000010, 4300010];

/**
 * 레이어와 뷰를 가진 맵을 생성하는 메서드
 */
function createMap(layer?: TileLayer | ImageLayer<ImageWMS>, view = new View({ center: [14000000, 4300000], zoom: 17 })): Map {
	const map = new Map({ layers: layer ? [layer] : [], view });

	map.setSize([800, 600]);

	return map;
}

/**
 * 타일 WMS 레이어를 생성하는 메서드
 */
function createTileLayer(params: Record<string, unknown> = { layers: 'test_layer' }, name = 'wms'): TileLayer {
	return new TileLayer({ properties: { name }, source: new TileWMS({ params, url: WMS_URL }) });
}

/**
 * 이미지 WMS 레이어를 생성하는 메서드
 */
function createImageLayer(): ImageLayer<ImageWMS> {
	return new ImageLayer({
		properties: { name: 'wms' },
		source: new ImageWMS({ params: { layers: 'test_layer' }, url: WMS_URL })
	});
}

/**
 * 쿼리 문자열을 객체로 파싱하는 메서드
 */
function parseQuery(url: string | undefined): URLSearchParams {
	return new URL(url as string).searchParams;
}

describe('[@gis-dev/openlayers-service-pack] wms', () => {
	describe('getWmsFeatureInfoUrl 테스트', () => {
		it('맵에 레이어가 없으면 undefined를 반환한다', () => {
			expect(getWmsFeatureInfoUrl(createMap(), COORDINATE)).toBeUndefined();
		});

		it('name이 wms인 레이어가 없으면 undefined를 반환한다', () => {
			const map = createMap(createTileLayer({ layers: 'test_layer' }, 'base-osm'));

			expect(getWmsFeatureInfoUrl(map, COORDINATE)).toBeUndefined();
		});

		it('name이 wms여도 소스가 WMS 소스가 아니면 undefined를 반환한다', () => {
			const layer = new TileLayer({ properties: { name: 'wms' }, source: new OSM() });

			expect(getWmsFeatureInfoUrl(createMap(layer), COORDINATE)).toBeUndefined();
		});

		it('타일 WMS 소스의 GetFeatureInfo URL을 만든다', () => {
			const url = getWmsFeatureInfoUrl(createMap(createTileLayer()), COORDINATE);
			const query = parseQuery(url);

			expect(url?.startsWith(`${WMS_URL}?`)).toBe(true);
			expect(query.get('REQUEST')).toBe('GetFeatureInfo');
			expect(query.get('info_format')).toBe('application/json');
			expect(query.get('query_layers')).toBe('test_layer');
		});

		it('이미지 WMS 소스의 GetFeatureInfo URL을 만든다', () => {
			const url = getWmsFeatureInfoUrl(createMap(createImageLayer()), COORDINATE);
			const query = parseQuery(url);

			expect(query.get('REQUEST')).toBe('GetFeatureInfo');
			expect(query.get('info_format')).toBe('application/json');
			expect(query.get('query_layers')).toBe('test_layer');
		});

		it('맵 뷰의 투영 코드를 CRS로 사용한다', () => {
			const view = new View({ center: [127, 37], projection: 'EPSG:4326', zoom: 17 });
			const url = getWmsFeatureInfoUrl(createMap(createTileLayer(), view), [127, 37]);

			expect(parseQuery(url).get('CRS')).toBe('EPSG:4326');
		});

		it('소스에 layers가 없으면 query_layers를 넘기지 않는다', () => {
			const url = getWmsFeatureInfoUrl(createMap(createTileLayer({})), COORDINATE);

			expect(parseQuery(url).has('query_layers')).toBe(false);
		});

		it('여러 레이어 중 name이 wms인 레이어를 기준으로 한다', () => {
			const map = createMap(createTileLayer({ layers: 'other' }, 'base-osm'));

			map.addLayer(createTileLayer({ layers: 'target' }));

			expect(parseQuery(getWmsFeatureInfoUrl(map, COORDINATE)).get('query_layers')).toBe('target');
		});

		it('뷰에 해상도가 없어도 에러 없이 동작한다', () => {
			const map = createMap(createTileLayer(), new View());

			expect(() => getWmsFeatureInfoUrl(map, COORDINATE)).not.toThrow();
		});
	});
});
