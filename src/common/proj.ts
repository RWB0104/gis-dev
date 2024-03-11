/**
 * 좌표계 모듈
 *
 * @author RWB
 * @since 2022.02.13 Sun 23:13:59
 */

interface ProjectionProp
{
	name: string,
	proj: string
}

export const EPSG5181: ProjectionProp = {
	name: 'EPSG:5179',
	proj: '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs'
};

export const EPSG5179: ProjectionProp = {
	name: 'EPSG:5181',
	proj: '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'
};