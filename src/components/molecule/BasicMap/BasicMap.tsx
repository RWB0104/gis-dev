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
import { Collection, Map, Overlay, View } from 'ol';
import { defaults } from 'ol/interaction/defaults';
import Interaction from 'ol/interaction/Interaction';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { ViewOptions } from 'ol/View';
import { ReactNode, useContext, useEffect, useRef } from 'react';

import styles from './BasicMap.module.scss';

import 'ol/ol.css';

const cn = classNames.bind(styles);

export type BasicMapInteractions = Interaction[];
export type BasicMapLayers = BaseLayer[] | Collection<BaseLayer> | LayerGroup;
export type BasicMapOverlays = Collection<Overlay> | Overlay[];
export type BasicMapView = View | Promise<ViewOptions>;

export interface BasicMapProps extends BoxProps
{
	/**
	 * 상호작용 배열
	 */
	interactions?: BasicMapInteractions;

	/**
	 * 레이어 배열
	 */
	layers?: BasicMapLayers;

	/**
	 * 오버레이
	 */
	overlays?: BasicMapOverlays;

	/**
	 * 뷰
	 */
	view?: BasicMapView;

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
export default function BasicMap({ interactions, layers, overlays, view, hasCursor, children, ...props }: BasicMapProps): ReactNode
{
	const { setMap } = useContext(MapContext);

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() =>
	{
		const interactionsList = interactions ? defaults().extend(interactions) : undefined;

		const map = new Map({
			interactions: interactionsList,
			layers,
			overlays,
			view
		});

		// DOM이 유효하지 않을 경우
		if (ref.current !== null)
		{
			map.setTarget(ref.current);
			setMap?.(map);
		}

		return (): void =>
		{
			map.setTarget(undefined);
		};
	}, [ interactions, layers, overlays, view, ref, setMap ]);

	return (
		<Box
			bgcolor='gainsboro'
			data-component='BasicMap'
			height='100%'
			position='absolute'
			ref={ref}
			width='100%'
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