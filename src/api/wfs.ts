import { ApiOptions } from '@gis-dev/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

export interface GeoJsonCrsPropertiesProps
{
	/**
	 * CRS URN
	 */
	name: string;
}

export interface GeoJsonCrsProps
{
	/**
	 * CRS 타입
	 */
	type: string;

	/**
	 * CRS 속성
	 */
	properties: GeoJsonCrsPropertiesProps;
}

export interface GeoJsonProps
{
	/**
	 * CRS
	 */
	crs: GeoJsonCrsProps;

	/**
	 * 피쳐 리스트
	 */
	features: Feature<Geometry>[];

	/**
	 * 데이터 갯수
	 */
	numberReturned: number;

	/**
	 * 타임스탬프
	 */
	timeStamp: string;

	/**
	 * 전체 피쳐
	 */
	totalFeatures: string;

	/**
	 * 타입
	 */
	type: string;
}

/**
 * GetFeatureInfo 응답 반환 비동기 메서드
 *
 * @param {string} url: URL
 * @param {ApiOptions} options: ApiOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetFeatureInfo(url: string, options?: ApiOptions<GeoJsonProps, Response>): UseQueryResult<GeoJsonProps, Response>
{
	return useQuery<GeoJsonProps, Response>({
		queryFn: async () =>
		{
			const response = await fetch(url, { method: 'GET' });
			const json = await response.json() as GeoJsonProps;

			return json;
		},
		queryKey: [ 'wfs', 'useGetFeatureInfo', url ],
		...options
	});
}