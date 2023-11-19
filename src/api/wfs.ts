import { ApiMutationOptions, ApiQueryOptions } from '@gis-dev/api';
import { API_BASE_URL } from '@gis-dev/script/common/env';
import { getPolygonXml } from '@gis-dev/script/common/util';
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { Feature } from 'ol';
import { Geometry, Polygon } from 'ol/geom';

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

export interface PostFeatureProps
{
	/**
	 * 빌딩명
	 */
	name: string;

	/**
	 * 빌딩 주소
	 */
	address: string;

	/**
	 * 피쳐
	 */
	features: Polygon[];
}

export interface PatchFeatureProps extends PostFeatureProps
{
	/**
	 * 아이디
	 */
	id: string | number;
}

/**
 * GetFeatureInfo 응답 반환 비동기 메서드
 *
 * @param {string} url: URL
 * @param {ApiQueryOptions} options: ApiQueryOptions 객체
 *
 * @returns {UseQueryResult} UseQueryResult 객체
 */
export function useGetFeatureInfo(url: string, options?: ApiQueryOptions<GeoJsonProps, Response>): UseQueryResult<GeoJsonProps, Response>
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

/**
 * 피쳐 추가 비동기 메서드
 *
 * @param {ApiMutationOptions} options: ApiMutationOptions 객체
 *
 * @returns {UseMutationResult} UseMutationResult 객체
 */
export function usePostFeature(options?: ApiMutationOptions<Document, Response, PostFeatureProps>): UseMutationResult<Document, Response, PostFeatureProps>
{
	return useMutation({
		mutationFn: async (data) =>
		{
			let geom = '';

			// 멀티 폴리곤일 경우
			if (data.features.length > 1)
			{
				const polygons = data.features.map((i) =>
				{
					const polygon = getPolygonXml(i).trim();

					return `
					<gml:polygonMember>
						${polygon}
					</gml:polygonMember>
					`;
				}).join('\n');

				geom = `
				<gml:MultiPolygon xmlns="http://www.opengis.net/gml" srsName="EPSG:3857">
					${polygons}
				</gml:MultiPolygon>
				`;
			}

			// 아닐 경우
			else
			{
				geom = getPolygonXml(data.features[0]);
			}

			const request = `
			<wfs:Transaction
				xmlns:wfs="http://www.opengis.net/wfs"
				xmlns:gml="http://www.opengis.net/gml"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
					service="WFS"
					version="1.1.0"
					xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd">
				<wfs:Insert>
					<buld_test>
						<name>${data.name}</name>
						<address>${data.address}</address>
						<SHAPE>
							${geom.trim()}
						</SHAPE>
					</buld_test>
				</wfs:Insert>
			</wfs:Transaction>
			`;

			const response = await fetch(`${API_BASE_URL}/wfs`, {
				body: request,
				method: 'POST'
			});

			const xml = await response.text();
			const document = new DOMParser().parseFromString(xml, 'text/xml');

			return document;
		},
		mutationKey: [ 'wfs', 'usePostFeature' ],
		...options
	});
}

/**
 * 피쳐 수정 비동기 메서드
 *
 * @param {ApiMutationOptions} options: ApiMutationOptions 객체
 *
 * @returns {UseMutationResult} UseMutationResult 객체
 */
export function useUpdateFeature(options?: ApiMutationOptions<Document, Response, PatchFeatureProps>): UseMutationResult<Document, Response, PatchFeatureProps>
{
	return useMutation({
		mutationFn: async (data) =>
		{
			let geom = '';

			// 멀티 폴리곤일 경우
			if (data.features.length > 1)
			{
				const polygons = data.features.map((i) =>
				{
					const polygon = getPolygonXml(i).trim();

					return `
					<gml:polygonMember>
						${polygon}
					</gml:polygonMember>
					`;
				}).join('\n');

				geom = `
				<gml:MultiPolygon xmlns="http://www.opengis.net/gml" srsName="EPSG:3857">
					${polygons}
				</gml:MultiPolygon>
				`;
			}

			// 아닐 경우
			else
			{
				geom = getPolygonXml(data.features[0]);
			}

			const request = `
			<wfs:Transaction
				xmlns:wfs="http://www.opengis.net/wfs"
				xmlns:gml="http://www.opengis.net/gml"
				xmlns:ogc="http://www.opengis.net/ogc"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				service="WFS"
				version="1.1.0"
				xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
				<wfs:Update typeName="buld_test">
					<wfs:Property>
						<wfs:Name>name</wfs:Name>
						<wfs:Value>${data.name}</wfs:Value>
					</wfs:Property>

					<wfs:Property>
						<wfs:Name>address</wfs:Name>
						<wfs:Value>${data.address}</wfs:Value>
					</wfs:Property>

					<wfs:Property>
						<wfs:Name>SHAPE</wfs:Name>
						<wfs:Value>
							${geom}
						</wfs:Value>
					</wfs:Property>

					<ogc:Filter>
						<ogc:FeatureId fid="${data.id}" />
					</ogc:Filter>
				</wfs:Update>
			</wfs:Transaction>
			`;

			const response = await fetch(`${API_BASE_URL}/wfs`, {
				body: request,
				method: 'POST'
			});

			const xml = await response.text();
			const document = new DOMParser().parseFromString(xml, 'text/xml');

			return document;
		},
		mutationKey: [ 'wfs', 'useUpdateFeature' ],
		...options
	});
}

/**
 * 피쳐 삭제 비동기 메서드
 *
 * @param {ApiMutationOptions} options: ApiMutationOptions 객체
 *
 * @returns {UseMutationResult} UseMutationResult 객체
 */
export function useDeleteFeature(options?: ApiMutationOptions<Document, Response, string | number>): UseMutationResult<Document, Response, string | number>
{
	return useMutation({
		mutationFn: async (data) =>
		{
			const request = `
			<wfs:Transaction
				xmlns:wfs="http://www.opengis.net/wfs"
				xmlns:ogc="http://www.opengis.net/ogc"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				service="WFS"
				version="1.1.0"
				xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
				<wfs:Delete typeName="buld_test">
					<ogc:Filter>
						<ogc:FeatureId fid="${data}" />
					</ogc:Filter>
				</wfs:Delete>
			</wfs:Transaction>
			`;

			const response = await fetch(`${API_BASE_URL}/wfs`, {
				body: request,
				method: 'POST'
			});

			const xml = await response.text();
			const document = new DOMParser().parseFromString(xml, 'text/xml');

			return document;
		},
		mutationKey: [ 'wfs', 'useDeleteFeature' ],
		...options
	});
}