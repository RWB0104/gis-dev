/**
 * 페이지 카드 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.12.08 Fri 04:44:46
 */

import { CardActionArea } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './PageCard.module.scss';

const cn = classNames.bind(styles);

export interface PageCardProps extends CardProps
{
	/**
	 * 링크
	 */
	link: string;

	/**
	 * 제목
	 */
	title: string;

	/**
	 * 설명
	 */
	description: string;

	/**
	 * 썸네일
	 */
	thumbnail: string;
}

/**
 * 페이지 카드 molecule 컴포넌트 반환 메서드
 *
 * @param {PageCardProps} param0: PageCardProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function PageCard({ link, title, description, thumbnail, className, ...props }: PageCardProps): ReactNode
{
	return (
		<Card className={cn('card', className)} data-component='PageCard' {...props}>
			<Link className='fullheight' href={link}>
				<CardActionArea className={cn('action')}>
					<CardMedia className={cn('media')}>
						<img alt={title} src={thumbnail} />
					</CardMedia>

					<CardContent className='fullheight'>
						<Typography gutterBottom>
							{title}
						</Typography>

						<Typography color='text.secondary' variant='body2'>
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
}