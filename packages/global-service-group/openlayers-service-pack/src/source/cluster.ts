/**
 * 클러스터 source 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 17:05:57
 */

import { Cluster } from 'ol/source';

import { starbucksSource } from '#/source/wfs';

export const starbucksClusterSource = new Cluster({ distance: 100, source: starbucksSource });
