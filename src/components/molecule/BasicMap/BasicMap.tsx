/**
 * 기본 맵 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 04:39:07
 */

'use client';

import { MapContext } from '@gis-dev/script/context/map';
import Add from '@mui/icons-material/Add';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { Map } from 'ol';
import { MapOptions } from 'ol/Map';
import { ReactNode, useContext, useEffect, useRef } from 'react';

import styles from './BasicMap.module.scss';

import 'ol/ol.css';

const cn = classNames.bind(styles);

export interface BasicMapProps extends BoxProps
{
	/**
	 * 맵 옵션
	 */
	options: MapOptions;

	/**
	 * 커서 여부
	 */
	hasCursor?: boolean;
}

/**
 * 기본 맵 molecule 컴포넌트 반환 메서드
 *
 * @param {BasicMapProps} param0: BasicMapProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicMap({ options, hasCursor, children, ...props }: BasicMapProps): ReactNode
{
	const { setMap } = useContext(MapContext);

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() =>
	{
		// DOM이 유효하지 않을 경우
		if (ref.current === null)
		{
			return;
		}

		const map = new Map(options);

		map.setTarget(ref.current);
		setMap?.(map);

		// eslint-disable-next-line consistent-return
		return (): void =>
		{
			map.setTarget(undefined);
		};
	}, [ options, ref, setMap ]);

	return (
		<Box
			bgcolor='gainsboro'
			data-component='BasicMap'
			height='100%'
			ref={ref}
			width='100%'
			zIndex={1}
			{...props}
		>
			{hasCursor ? (
				<Stack
					alignItems='center'
					className={cn('pointer')}
					justifyContent='center'
					left='50%'
					position='absolute'
					top='50%'
					zIndex={2}
				>
					<Add htmlColor='#00000070' />
				</Stack>
			) : null}

			{children}
		</Box>
	);
}