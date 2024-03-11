/**
 * 홈 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 02:02:30
 */

'use client';

import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import { MapContext } from '@gis-dev/script/context/map';

import Home from '@mui/icons-material/Home';
import { Coordinate } from 'ol/coordinate';
import { MouseEventHandler, ReactNode, useCallback, useContext, useState } from 'react';

export interface HomeButtonProps
{
	/**
	 * 홈 위치
	 */
	homePosition: Coordinate;
}

/**
 * 홈 버튼 organism 컴포넌트 반환 메서드
 *
 * @param {HomeButtonProps} param0: HomeButtonProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function HomeButton({ homePosition }: HomeButtonProps): ReactNode
{
	const { map } = useContext(MapContext);

	const [ disabledState, setDisabledState ] = useState(false);

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			setDisabledState(true);

			const zoom = map.getView().getZoom() || 0;

			map.getView().animate(
				{
					center: homePosition,
					duration: 2000
				}
			);

			map.getView().animate(
				{
					duration: 1000,
					zoom: zoom - 3
				},
				{
					duration: 1000,
					zoom
				},
				() =>
				{
					setDisabledState(false);
				}
			);
		}
	}, [ homePosition, map, setDisabledState ]);
	return (
		<BasicIconButton bgcolor='orange' disabled={disabledState} onClick={handleClick}>
			<Home htmlColor='white' />
		</BasicIconButton>
	);
}