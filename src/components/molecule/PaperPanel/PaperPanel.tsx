/**
 * 페이퍼 패널 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 22:17:40
 */

import BasicPanel, { BasicPanelProps } from '@gis-dev/components/atom/BasicPanel';

import Paper, { PaperProps } from '@mui/material/Paper';
import { ReactNode } from 'react';

export interface PaperPanelProps extends BasicPanelProps
{
	/**
	 * Paper 프로퍼티
	 */
	paperProps?: Omit<PaperProps, 'children'>;
}

/**
 * 페이퍼 패널 molecule 컴포넌트 반환 메서드
 *
 * @param {PaperPanelProps} param0: PaperPanelProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function PaperPanel({ paperProps, children, ...props }: PaperPanelProps): ReactNode
{
	return (
		<BasicPanel data-component='PaperPanel' {...props}>
			<Paper {...paperProps}>
				{children}
			</Paper>
		</BasicPanel>
	);
}