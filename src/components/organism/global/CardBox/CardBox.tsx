/**
 * 카드 박스 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.12.10 Sun 04:17:56
 */

import PageCard from '@gis-dev/components/molecule/PageCard';
import { Menu } from '@gis-dev/script/common/env';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export interface CardBoxProps
{
	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 메뉴
	 */
	list: Menu[];
}

/**
 * 카드 박스 organism 컴포넌트 반환 메서드
 *
 * @param {CardBoxProps} param0: CardBoxProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function CardBox({ title, list }: CardBoxProps): ReactNode
{
	return (
		<Stack data-component='CardBox' gap={2}>
			<Stack>
				<Typography fontWeight='bold' variant='h5' gutterBottom>{title}</Typography>

				<Divider />
			</Stack>

			<Grid spacing={2} container>
				{list.map(({ title, description, link, thumbnail }) => (
					<Grid key={link} md={6} sm={12} width='100%' xl={4} item>
						<PageCard
							description={description}
							link={link}
							thumbnail={thumbnail}
							title={title}
						/>
					</Grid>
				))}
			</Grid>
		</Stack>
	);
}