/**
 * 홈 템플릿 template 컴포넌트
 *
 * @author RWB
 * @since 2023.12.08 Fri 04:47:03
 */

import Footer from '@gis-dev/components/molecule/Footer';
import CardBox from '@gis-dev/components/organism/global/CardBox';
import { MENU_LIST } from '@gis-dev/script/common/env';

import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
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
				<CardBox list={MENU_LIST.filter(({ group }) => group === 'MAP')} title='기본 지도' />
				<CardBox list={MENU_LIST.filter(({ group }) => group === 'BASIC')} title='기초적인 맵 상호작용' />
				<CardBox list={MENU_LIST.filter(({ group }) => group === 'GEOSERVER')} title='GeoServer를 활용한 지도' />
				<CardBox list={MENU_LIST.filter(({ group }) => group === 'TRANSACTION')} title='WFS Transaction' />
				<CardBox list={MENU_LIST.filter(({ group }) => group === 'VARIATION')} title='OpenLayers의 다양한 지도' />
			</Stack>

			<Footer />
		</Container>
	);
}