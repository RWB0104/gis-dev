/**
 * 기본 아이콘 버튼 atom 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 23:04:25
 */

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { CSSProperties, ReactNode } from 'react';

export interface BasicIconButtonProps extends IconButtonProps
{
	/**
	 * 배경색
	 */
	bgcolor?: CSSProperties['backgroundColor'];
}

/**
 * 기본 아이콘 버튼 atom 컴포넌트 반환 메서드
 *
 * @param {BasicIconButtonProps} param0: BasicIconButtonProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function BasicIconButton({ bgcolor, children, ...props }: BasicIconButtonProps): ReactNode
{
	return (
		<IconButton data-component='BasicIconButton' {...props}>
			<Stack
				alignItems='center'
				bgcolor={bgcolor}
				borderRadius='50%'
				boxShadow='0px 0px 5px #00000080'
				justifyContent='center'
				padding={1}
			>
				{children}
			</Stack>
		</IconButton>
	);
}