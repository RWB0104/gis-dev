/**
 * 푸터 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.12.10 Sun 05:25:53
 */

'use client';

import { montserrat } from '@gis-dev/components/organism/global/AppThemeProvider';
import pkg from '@gis-dev/package';
import { APP_INFO } from '@gis-dev/script/common/env';

import GitHub from '@mui/icons-material/GitHub';
import Mail from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

/**
 * 푸터 molecule 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function Footer(): ReactNode
{
	return (
		<Stack component='footer' data-component='Footer' marginTop={10}>
			<Divider />

			<Stack direction='row' padding={1}>
				<Stack width='100%'>
					<Typography fontFamily={montserrat.style.fontFamily} variant='caption'>{APP_INFO.title}</Typography>
					<Typography color='text.secondary' fontFamily={montserrat.style.fontFamily} variant='caption'>{pkg.version}</Typography>
				</Stack>

				<Stack alignItems='center' direction='row' justifyContent='end' spacing={1} width='100%'>
					<Link className={cn('button')} href='https://itcode.dev' target='_blank'>
						<IconButton size='small'>
							<img alt='itcode.dev' height={20} src='https://itcode.dev/logo.png' width={20} />
						</IconButton>
					</Link>

					<Link className={cn('button')} href='https://github.com/RWB0104' target='_blank'>
						<IconButton size='small'>
							<GitHub fontSize='small' />
						</IconButton>
					</Link>

					<Link className={cn('button')} href='mailto:psj2716@mensakorea.org' target='_blank'>
						<IconButton size='small'>
							<Mail fontSize='small' />
						</IconButton>
					</Link>
				</Stack>
			</Stack>
		</Stack>
	);
}