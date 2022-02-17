/**
 * 맵 보드 컴포넌트
 *
 * @author RWB
 * @since 2022.02.18 Fri 00:09:24
 */

import { Map } from 'ol';
import { ReactElement, useEffect } from 'react';
import './MapBoard.scss';

interface Props
{
	map?: Map
}

/**
 * 맵 보드 ReactElement 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {ReactElement | null} ReactElement
 */
export default function MapBoard({ map }: Props): ReactElement | null
{
	// 맵이 유효할 경우
	if (map)
	{
		useEffect(() =>
		{
			const projection = document.querySelector('.map-board > [data-name=projection]') as HTMLElement;
			const proj = projection.querySelector('input[name=proj]') as HTMLInputElement;
			proj.value = map.getView().getProjection().getCode();
		}, [ map ]);

		map.on('pointermove', (e) =>
		{
			const boundary = document.querySelector('.map-board > [data-name=boundary]');
			const position = document.querySelector('.map-board > [data-name=position]');

			// 영역 보드 태그가 유효할 경우
			if (boundary)
			{
				const [ minX, minY, maxX, maxY ] = e.map.getView().calculateExtent();

				const tag1 = boundary.querySelector('input[name=minX]') as HTMLInputElement;
				const tag2 = boundary.querySelector('input[name=minY]') as HTMLInputElement;
				const tag3 = boundary.querySelector('input[name=maxX]') as HTMLInputElement;
				const tag4 = boundary.querySelector('input[name=maxY]') as HTMLInputElement;

				tag1.value = minX.toString();
				tag2.value = minY.toString();
				tag3.value = maxX.toString();
				tag4.value = maxY.toString();
			}

			// 위치 보드 태그가 유효할 경우
			if (position)
			{
				const [ x, y ] = e.coordinate;

				const tag1 = position.querySelector('input[name=x]') as HTMLInputElement;
				const tag2 = position.querySelector('input[name=y]') as HTMLInputElement;

				tag1.value = x.toString();
				tag2.value = y.toString();
			}
		});

		const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
		{
			const div = e.currentTarget.parentElement as HTMLElement;
			const input = div.querySelector('input') as HTMLInputElement;
			input.select();

			document.execCommand('Copy');
		};

		return (
			<div className='map-board'>
				<div className='item' data-name='projection'>
					<div>
						<small>proj</small>
						<input name='proj' value='' readOnly />
						<button onClick={copy}>📋</button>
					</div>
				</div>

				<div className='item' data-name='boundary'>
					<div>
						<small>minX</small>
						<input name='minX' value='0' readOnly />
						<button onClick={copy}>📋</button>
					</div>

					<div>
						<small>minY</small>
						<input name='minY' value='0' readOnly />
						<button onClick={copy}>📋</button>
					</div>

					<div>
						<small>maxX</small>
						<input name='maxX' value='0' readOnly />
						<button onClick={copy}>📋</button>
					</div>

					<div>
						<small>maxY</small>
						<input name='maxY' value='0' readOnly />
						<button onClick={copy}>📋</button>
					</div>
				</div>

				<div className='item' data-name='position'>
					<div>
						<small>x</small>
						<input name='x' value='0' readOnly />
						<button onClick={copy}>📋</button>
					</div>

					<div>
						<small>y</small>
						<input name='y' value='0' readOnly />
						<button onClick={copy}>📋</button>
					</div>
				</div>
			</div>
		);
	}

	// 아닐 경우
	else
	{
		return null;
	}
}