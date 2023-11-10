/**
 * 루트 template 컴포넌트
 *
 * @author RWB
 * @since 2023.11.11 Sat 04:34:22
 */

import Stack from '@mui/material/Stack';
import { PropsWithChildren, ReactNode } from 'react';

export type RootTemplateProps = PropsWithChildren;

/**
 * 루트 template 컴포넌트 반환 메서드
 *
 * @param {RootTemplateProps} param0: RootTemplateProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function RootTemplate({ ...props }: RootTemplateProps): ReactNode
{
	return (
		<Stack data-component='RootTemplate' height='100vh' width='100%' {...props} />
	);
}