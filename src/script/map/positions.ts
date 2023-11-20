/**
 * 좌표 모듈
 *
 * @author RWB
 * @since 2023.11.11 Sat 03:13:19
 */

import proj4 from 'proj4';

const seoulPosition = [ 126.97836930289438, 37.56664507000858 ];
const sejongPosition = [ 127.28923267492068, 36.48024986578043 ];

export const position4326 = {
	sejongPosition,
	seoulPosition
};

export const position3857 = {
	sejongPosition: proj4('EPSG:4326', 'EPSG:3857', position4326.sejongPosition),
	seoulPosition: proj4('EPSG:4326', 'EPSG:3857', position4326.seoulPosition)
};