/**
 * 포지션 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 17:55:37
 */

import proj4 from 'proj4';

const seoulPosition = [126.97836930289438, 37.56664507000858];
const sejongPosition = [127.28923267492068, 36.48024986578043];

export const position = {
	sejong: {
		3857: proj4('EPSG:4326', 'EPSG:3857', sejongPosition),
		4326: sejongPosition
	},
	seoul: {
		3857: proj4('EPSG:4326', 'EPSG:3857', seoulPosition),
		4326: seoulPosition
	}
};
