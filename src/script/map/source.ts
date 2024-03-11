/**
 * 소스 모듈
 *
 * @author RWB
 * @since 2023.11.14 Tue 01:24:02
 */

import { API_BASE_URL } from '@gis-dev/script/common/env';
import { urlBuilder } from '@gis-dev/script/common/util';

import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { Cluster, ImageWMS, TileWMS } from 'ol/source';
import VectorSource from 'ol/source/Vector';

// 세종 건물 벡터 소스
const sejongBuildingSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent): string => urlBuilder(`${API_BASE_URL}/wfs`, {
		bbox: `${extent.join(',')},EPSG:3857`,
		exceptions: 'application/json',
		outputFormat: 'application/json',
		request: 'GetFeature',
		service: 'WFS',
		srsName: 'EPSG:3857',
		typename: 'TEST:buld_sejong',
		version: '2.0.0'
	})
});

// 세종 건물 타일 이미지 소스
const sejongTileSource = new TileWMS({
	params: {
		exceptions: 'application/json',
		layers: 'buld_sejong'
	},
	serverType: 'geoserver',
	transition: 0.3,
	url: `${API_BASE_URL}/wms`
});

// 세종 건물 이미지 소스
const sejongImageSource = new ImageWMS({
	params: {
		exceptions: 'application/json',
		layers: 'buld_sejong'
	},
	serverType: 'geoserver',
	url: `${API_BASE_URL}/wms`
});

// 트랜잭션 벡터 소스
const transactionSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent): string => urlBuilder(`${API_BASE_URL}/wfs`, {
		bbox: `${extent.join(',')},EPSG:3857`,
		exceptions: 'application/json',
		outputFormat: 'application/json',
		request: 'GetFeature',
		service: 'WFS',
		srsName: 'EPSG:3857',
		typename: 'TEST:buld_test',
		version: '2.0.0'
	})
});

// 스타벅스 벡터 소스
const starbucksSource = new VectorSource({
	format: new GeoJSON(),
	strategy: bbox,
	url: (extent): string => urlBuilder(`${API_BASE_URL}/wfs`, {
		bbox: `${extent.join(',')},EPSG:3857`,
		exceptions: 'application/json',
		outputFormat: 'application/json',
		request: 'GetFeature',
		service: 'WFS',
		srsName: 'EPSG:3857',
		typename: 'TEST:point_starbucks',
		version: '2.0.0'
	})
});

// 스타벅스 클러스터 소스
const starbucksClusterSource = new Cluster({ distance: 100, source: starbucksSource });

// 도시 벡터 소스
const wfsCitySource = new VectorSource({
	format: new GeoJSON(),
	url: 'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson'
});

export const wfsSource = {
	sejongBuildingSource,
	starbucksSource,
	transactionSource,
	wfsCitySource
};

export const wmsSource = { sejongImageSource, sejongTileSource };

export const clusterSource = { starbucksClusterSource };