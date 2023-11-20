/**
 * 정보 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 01:49:10
 */

'use client';

import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import { modalStore } from '@gis-dev/script/states/modal';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { PropsWithChildren, ReactNode, useCallback, useEffect } from 'react';

export interface HowToPlayButtonProps extends PropsWithChildren
{
	/**
	 * 기본 열기 여부
	 */
	defaultOpen?: boolean;
}

/**
 * 정보 버튼 organism 컴포넌트 반환 메서드
 *
 * @param {HowToPlayButtonProps} param0: HowToPlayButtonProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HowToPlayButton({ defaultOpen, children }: HowToPlayButtonProps): ReactNode
{
	const { setModal } = modalStore();

	const handleClick = useCallback(() =>
	{
		setModal({
			body: children,
			title: 'How to Play?',
			type: 'info'
		});
	}, [ setModal, children ]);

	useEffect(() =>
	{
		// 기본 열기일 경우
		if (defaultOpen)
		{
			handleClick();
		}
	}, [ defaultOpen, handleClick ]);

	return (
		<BasicIconButton bgcolor='hotpink' data-component='HowToPlayButton' onClick={handleClick}>
			<QuestionMark htmlColor='white' />
		</BasicIconButton>
	);
}