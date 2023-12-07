/**
 * 홈 템플릿 template 컴포넌트
 *
 * @author RWB
 * @since 2023.12.08 Fri 04:47:03
 */

import PageCard from '@gis-dev/components/molecule/PageCard';
import { Container } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

/**
 * 홈 템플릿 template 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeTemplate(): ReactNode
{
	return (
		<Container data-component='HomeTemplate'>
			<Stack gap={10} marginBottom={2} marginTop={2}>
				<Stack gap={2}>
					<Stack>
						<Typography fontWeight='bold' variant='h5' gutterBottom>기본 지도</Typography>

						<Divider />
					</Stack>

					<Grid spacing={2} container>
						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/osm'
								thumbnail='https://user-images.githubusercontent.com/50317129/171675095-54c8c18a-2bd4-4979-928d-e55c4184105d.png'
								title='OSM 지도'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/vworld'
								thumbnail='https://user-images.githubusercontent.com/50317129/171675864-9d886ca4-da97-4041-8854-8b2fa7593f61.png'
								title='V-World 지도'
							/>
						</Grid>
					</Grid>
				</Stack>

				<Stack gap={2}>
					<Stack>
						<Typography fontWeight='bold' variant='h5' gutterBottom>기초적인 맵 상호작용</Typography>

						<Divider />
					</Stack>

					<Grid spacing={2} container>
						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/map-info'
								thumbnail='https://user-images.githubusercontent.com/50317129/171676198-449a45b9-b2d3-4105-ba28-420fc96f7bc1.png'
								title='맵 정보'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/geolocation'
								thumbnail='https://user-images.githubusercontent.com/50317129/171676793-fa995885-32d7-4f0a-bb36-0475516ac19d.png'
								title='지오로케이션'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/feature'
								thumbnail='https://user-images.githubusercontent.com/50317129/171676976-63577e9d-26d5-49ab-8826-7d571c2ee169.png'
								title='맵 피쳐'
							/>
						</Grid>
					</Grid>
				</Stack>

				<Stack gap={2}>
					<Stack>
						<Typography fontWeight='bold' variant='h5' gutterBottom>GeoServer를 활용한 지도</Typography>

						<Divider />
					</Stack>

					<Grid spacing={2} container>
						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/wfs'
								thumbnail='https://user-images.githubusercontent.com/50317129/171677267-71a2d78a-bf5f-437e-b00d-81fa9af3ea58.png'
								title='WFS'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/wms'
								thumbnail='https://user-images.githubusercontent.com/50317129/171677419-bbf52eac-e3f5-4d71-b171-a28c961dd820.png'
								title='WMS'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/feature-click'
								thumbnail='https://user-images.githubusercontent.com/50317129/171677600-44136c02-a35b-4c3f-ab70-fb8fe313ae2b.png'
								title='맵 피쳐 상호작용'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/wfs-popup'
								thumbnail='https://user-images.githubusercontent.com/50317129/171677734-451d4297-c7cf-4821-89d6-35edc84252b9.png'
								title='WFS를 활용한 팝업'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/wms-popup'
								thumbnail='https://user-images.githubusercontent.com/50317129/171677876-7307d8a6-3442-4d15-b44a-574eee85947b.png'
								title='WMS를 활용한 팝업'
							/>
						</Grid>
					</Grid>
				</Stack>

				<Stack gap={2}>
					<Stack>
						<Typography fontWeight='bold' variant='h5' gutterBottom>WFS Transaction</Typography>

						<Divider />
					</Stack>

					<Grid spacing={2} container>
						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/transaction-insert'
								thumbnail='https://user-images.githubusercontent.com/50317129/171678036-b7810925-d0a0-4144-aa8e-e77f37e78d18.png'
								title='WFS-T 삽입'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/transaction-update'
								thumbnail='https://user-images.githubusercontent.com/50317129/171678295-5bf7fedb-9e78-49b8-8519-8a0afc37dac4.png'
								title='WFS-T 수정'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/transaction-delete'
								thumbnail='https://user-images.githubusercontent.com/50317129/171678189-b3e5262c-5670-42c9-8f95-51145ec395ec.png'
								title='WFS-T 삭제'
							/>
						</Grid>
					</Grid>
				</Stack>

				<Stack gap={2}>
					<Stack>
						<Typography fontWeight='bold' variant='h5' gutterBottom>OpenLayers의 다양한 지도</Typography>

						<Divider />
					</Stack>

					<Grid spacing={2} container>
						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/cluster-map'
								thumbnail='https://user-images.githubusercontent.com/50317129/171678364-6b66062f-143b-4076-a2ee-573d0f438172.png'
								title='클러스터맵'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/heat-map'
								thumbnail='https://user-images.githubusercontent.com/50317129/171678468-c495473f-1f23-4dd6-a7df-efeec8adc9bc.png'
								title='히트맵'
							/>
						</Grid>

						<Grid md={6} sm={12} width='100%' xl={4} item>
							<PageCard
								description='설명'
								link='/webgl'
								thumbnail='https://user-images.githubusercontent.com/50317129/171678561-4f173439-cf86-48e6-89be-d01b839b8762.png'
								title='WebGL을 활용한 맵'
							/>
						</Grid>
					</Grid>
				</Stack>
			</Stack>
		</Container>
	);
}