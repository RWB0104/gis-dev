/**
 * 클러스터 source 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { Cluster } from 'ol/source';

import { starbucksClusterSource } from './cluster';

describe('[@gis-dev/openlayers-service-pack] source/cluster', () => {
	describe('starbucksClusterSource 테스트', () => {
		it('distance 100의 Cluster 인스턴스다', () => {
			expect(starbucksClusterSource).toBeInstanceOf(Cluster);
			expect(starbucksClusterSource.getDistance()).toBe(100);
		});
	});
});
