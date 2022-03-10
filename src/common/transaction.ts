/**
 * 트랜잭션 API 모듈
 *
 * @author RWB
 * @since 2022.02.24 Thu 00:38:16
 */

import { WFS_URL } from './env';

interface InsertProps
{
	body?: {
		name?: string,
		address?: string
	},
	geom: number[]
}

interface UpdateProps
{
	id: string | number,
	body?: {
		name?: string,
		address?: string
	},
	geom: number[]
}

interface DeleteProps
{
	id: string | number
}

/**
 * WFS Transaction Insert API 응답 결과 반환 메서드
 *
 * @param {InsertProps} param0: 프로퍼티
 *
 * @returns {Promise} API 응답
 */
export async function insertTransaction({ body, geom }: InsertProps)
{
	let coord = '';

	for (let i = 0; i < geom.length; i += 2)
	{
		coord += `${geom[i]},${geom[i + 1]} `;
	}

	coord.trim();

	const xml = `
	<wfs:Transaction
		xmlns:wfs="http://www.opengis.net/wfs"
		xmlns:gml="http://www.opengis.net/gml"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		service="WFS"
		version="1.0.0"
		xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
		<wfs:Insert>
			<buld_test>
				${body?.name && `<name>${body.name}</name>`}
				${body?.address && `<address>${body.address}</address>`}
				<SHAPE>
					<gml:Polygon srsName="EPSG:3857">
						<gml:outerBoundaryIs>
							<gml:LinearRing>
								<gml:coordinates>${coord}</gml:coordinates>
							</gml:LinearRing>
						</gml:outerBoundaryIs>
					</gml:Polygon>
				</SHAPE>
			</buld_test>
		</wfs:Insert>
	</wfs:Transaction>
	`;

	return fetch(WFS_URL, {
		method: 'POST',
		body: xml
	});
}

/**
 * WFS Transaction Update API 응답 결과 반환 메서드
 *
 * @param {UpdateProps} param0: 프로퍼티
 *
 * @returns {Promise} API 응답
 */
export async function updateTransaction({ id, body, geom }: UpdateProps)
{
	let coord = '';

	for (let i = 0; i < geom.length; i += 2)
	{
		coord += `${geom[i]},${geom[i + 1]} `;
	}

	coord.trim();

	const xml = `
	<wfs:Transaction
		xmlns:wfs="http://www.opengis.net/wfs"
		xmlns:ogc="http://www.opengis.net/ogc"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		service="WFS"
		version="1.0.0"
		xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
		<wfs:Update typeName="buld_test">
			${body?.name && `<wfs:Property>
				<wfs:Name>name</wfs:Name>
				<wfs:Value>${body.name}</wfs:Value>
			</wfs:Property>`}

			${body?.address && `<wfs:Property>
				<wfs:Name>address</wfs:Name>
				<wfs:Value>${body.address}</wfs:Value>
			</wfs:Property>`}

			${body?.address && `<wfs:Property>
				<wfs:Name>SHAPE</wfs:Name>
				<wfs:Value>
					<gml:Polygon srsName="EPSG:3857">
						<gml:outerBoundaryIs>
							<gml:LinearRing>
								<gml:coordinates>${coord}</gml:coordinates>
							</gml:LinearRing>
						</gml:outerBoundaryIs>
					</gml:Polygon>
				</wfs:Value>
			</wfs:Property>`}
			<ogc:Filter>
				<ogc:FeatureId fid="${id}" />
			</ogc:Filter>
		</wfs:Update>
	</wfs:Transaction>
	`;

	return fetch(WFS_URL, {
		method: 'POST',
		body: xml
	});
}

/**
 * WFS Transaction Delete API 응답 결과 반환 메서드
 *
 * @param {DeleteProps} param0: 프로퍼티
 *
 * @returns {Promise} API 응답
 */
export async function deleteTransaction({ id }: DeleteProps)
{
	const xml = `
	<wfs:Transaction
		xmlns:wfs="http://www.opengis.net/wfs"
		xmlns:ogc="http://www.opengis.net/ogc"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		service="WFS"
		version="1.0.0"
		xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
		<wfs:Delete typeName="buld_test">
			<ogc:Filter>
				<ogc:FeatureId fid="${id}" />
			</ogc:Filter>
		</wfs:Delete>
	</wfs:Transaction>
	`;

	return fetch(WFS_URL, {
		method: 'POST',
		body: xml
	});
}