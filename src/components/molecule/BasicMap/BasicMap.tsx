/**
 * 기본 맵 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 04:39:07
 */

'use client';

import Box, { BoxProps } from '@mui/material/Box';
import { Map } from 'ol';
import { MapOptions } from 'ol/Map';
import { ReactNode, useEffect, useRef } from 'react';

import 'ol/ol.css';

export interface BasicMapProps extends BoxProps
{
	/**
	 * 맵 옵션
	 */
	options: MapOptions;
}

/**
 * 기본 맵 molecule 컴포넌트 반환 메서드
 *
 * @param {BasicMapProps} param0: BasicMapProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicMap({ options, ...props }: BasicMapProps): ReactNode
{
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

		// eslint-disable-next-line consistent-return
		return (): void =>
		{
			map.setTarget(undefined);
		};
	}, [ options, ref ]);

	return (
		<Box
			bgcolor='gainsboro'
			data-component='BasicMapProps'
			height='100%'
			id='map'
			ref={ref}
			width='100%'
			{...props}
		/>
	);
}