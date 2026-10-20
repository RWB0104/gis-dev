/**
 * source 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 12:58:50
 */

import { starbucksClusterSource } from '#/source/cluster';
import { sejongBuildingSource, starbucksSource, transactionSource, wfsCitySource } from '#/source/wfs';
import { sejongImageSource, sejongTileSource } from '#/source/wms';

export const wfsSource = {
	sejongBuildingSource,
	starbucksSource,
	transactionSource,
	wfsCitySource
};

export const wmsSource = {
	sejongImageSource,
	sejongTileSource
};

export const clusterSource = {
	starbucksClusterSource
};
