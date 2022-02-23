/**
 * 트랜잭션 API 모듈
 *
 * @author RWB
 * @since 2022.02.24 Thu 00:38:16
 */

interface InsertProps
{
	body?: {
		name?: string,
		address?: string
	},
	geom: number[]
}

export async function insertTransaction({ body, geom }: InsertProps)
{
	let coord = '';

	for (let i = 0; i < geom.length; i += 2)
	{
		coord += `${geom[i]},${geom[i + 1]} `;
	}

	coord.trim();

	const xml = `
	<wfs:Transaction xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WFS" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">
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
				<name>alley</name>
			</buld_test>
		</wfs:Insert>
	</wfs:Transaction>
	`;

	return fetch('https://api.itcode.dev/geoserver/wfs', {
		method: 'POST',
		body: xml
	});
}