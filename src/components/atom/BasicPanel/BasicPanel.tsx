/**
 * 기본 패널 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 03:18:39
 */

import Box, { BoxProps } from '@mui/material/Box';
import { CSSProperties, ReactNode } from 'react';

export interface BasicPanelProps extends BoxProps
{
	/**
	 * 위 좌표
	 */
	top?: CSSProperties['top'];

	/**
	 * 아래 좌표
	 */
	bottom?: CSSProperties['bottom'];

	/**
	 * 왼쪽 좌표
	 */
	left?: CSSProperties['left'];

	/**
	 * 오른쪽 좌표
	 */
	right?: CSSProperties['right'];
}

/**
 * 기본 패널 molecule 컴포넌트 반환 메서드
 *
 * @param {BasicPanelProps} param0: BasicPanelProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicPanel({ top, bottom = 20, left, right = 20, ...props }: BasicPanelProps): ReactNode
{
	return (
		<Box bottom={bottom} left={left} position='absolute' right={right} top={top} {...props} />
	);
}